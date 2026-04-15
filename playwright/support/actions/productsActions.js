const { expect } = require('@playwright/test');

function createProductsActions(page) {
  const form = {
    name: page.locator('#name'),
    quantity: page.locator('#quantity'),
    minQuantity: page.locator('#minQuantity'),
    submit: page.getByRole('button', { name: 'Cadastrar' }),
  };

  const table = page.locator('#product-table');
  const tableBody = page.locator('#product-table-body');
  const notification = page.locator('#notification-container');
  const refreshButton = page.locator('#refresh-button');
  const loadingMessage = page.locator('#loading-message');

  return {
    elements: {
      form,
      table,
      tableBody,
      notification,
      refreshButton,
      loadingMessage,
    },

    async open() {
      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'Gestão de Compras de Supermercado' })).toBeVisible();
      await this.waitForProductsLoaded();
    },

    async waitForProductsLoaded() {
      await expect(loadingMessage).toBeHidden();
    },

    async fillProductForm(product) {
      await form.name.fill(product.name);
      await form.quantity.fill(String(product.quantity));

      if (product.minQuantity === undefined || product.minQuantity === null) {
        await form.minQuantity.fill('');
      } else {
        await form.minQuantity.fill(String(product.minQuantity));
      }
    },

    async submitProduct(product) {
      await this.fillProductForm(product);
      await form.submit.click();
    },

    rowByProductName(name) {
      return tableBody.locator('tr').filter({ has: page.getByRole('cell', { name }) });
    },

    async expectNotificationContains(text) {
      await expect(notification).toContainText(text);
    },

    async expectHeaders(headers) {
      for (const header of headers) {
        await expect(table.getByRole('columnheader', { name: header })).toBeVisible();
      }
    },

    async expectProductRow(name, expected = {}) {
      const row = this.rowByProductName(name);
      await expect(row).toBeVisible();

      if (expected.quantity !== undefined) {
        await expect(row).toContainText(String(expected.quantity));
      }

      if (expected.minQuantity !== undefined) {
        await expect(row).toContainText(String(expected.minQuantity));
      }

      if (expected.status) {
        await expect(row).toContainText(expected.status);
      }

      return row;
    },

    async expectEmptyState(text = 'Nenhum produto cadastrado.') {
      await expect(tableBody).toContainText(text);
    },

    async refreshList() {
      await refreshButton.click();
      await this.waitForProductsLoaded();
    },
  };
}

module.exports = {
  createProductsActions,
};

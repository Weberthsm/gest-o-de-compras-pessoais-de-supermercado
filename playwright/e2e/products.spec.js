const { test, expect } = require('../support/fixtures');

function uniqueProductName(prefix) {
  return `${prefix} ${Date.now()} ${Math.floor(Math.random() * 1000)}`;
}

test.describe('Gestão de produtos - fluxos web automatizáveis', () => {
  test.beforeEach(async ({ api }) => {
    await api.clearProducts();
  });

  test('CTC-01/04/05: deve cadastrar produto com sucesso usando quantidade mínima padrão e exibir data de criação', async ({ app }) => {
    const product = {
      name: uniqueProductName('Arroz'),
      quantity: 3,
      minQuantity: 0,
    };

    await app.products.open();
    await app.products.submitProduct(product);

    await app.products.expectNotificationContains(`Produto "${product.name}" cadastrado com sucesso.`);
    const row = await app.products.expectProductRow(product.name, {
      quantity: product.quantity,
      minQuantity: product.minQuantity,
      status: 'Estável',
    });

    const createdAtCell = row.getByRole('cell').nth(4);
    await expect(createdAtCell).not.toHaveText('-');
  });

  test('CTC-02: deve impedir cadastro com nome duplicado', async ({ api, app }) => {
    const product = {
      name: uniqueProductName('Feijão'),
      quantity: 2,
      minQuantity: 1,
    };

    const response = await api.createProduct(product);
    expect(response.ok()).toBeTruthy();

    await app.products.open();
    await app.products.submitProduct(product);

    await app.products.expectNotificationContains('Produto com nome duplicado');
    await expect(app.products.rowByProductName(product.name)).toHaveCount(1);
  });

  test('CTC-03: deve rejeitar produto com quantidade inicial negativa', async ({ app }) => {
    const product = {
      name: uniqueProductName('Leite'),
      quantity: -1,
      minQuantity: 0,
    };

    await app.products.open();
    await app.products.elements.form.quantity.evaluate(node => node.removeAttribute('min'));
    await app.products.submitProduct(product);

    await app.products.expectNotificationContains('Quantidade inicial não pode ser menor que 0');
    await expect(app.products.rowByProductName(product.name)).toHaveCount(0);
  });

  test('CTC-06/13: deve manter produto na listagem após recarregar e atualizar a lista automaticamente após o cadastro', async ({ page, app }) => {
    const product = {
      name: uniqueProductName('Café'),
      quantity: 1,
      minQuantity: 0,
    };

    await app.products.open();
    await app.products.submitProduct(product);
    await app.products.expectProductRow(product.name, {
      quantity: product.quantity,
      minQuantity: product.minQuantity,
    });

    await page.reload();
    await app.products.waitForProductsLoaded();
    await app.products.expectProductRow(product.name, {
      quantity: product.quantity,
      minQuantity: product.minQuantity,
    });
  });

  test('CTC-07/08: deve listar produtos cadastrados com as colunas obrigatórias', async ({ api, app }) => {
    const products = [
      { name: uniqueProductName('Macarrão'), quantity: 5, minQuantity: 2 },
      { name: uniqueProductName('Açúcar'), quantity: 0, minQuantity: 1 },
    ];

    for (const product of products) {
      const response = await api.createProduct(product);
      expect(response.ok()).toBeTruthy();
    }

    await app.products.open();
    await app.products.expectHeaders(['Nome', 'Quantidade', 'Qtd. mínima', 'Status', 'Criado em']);

    for (const product of products) {
      await app.products.expectProductRow(product.name, {
        quantity: product.quantity,
        minQuantity: product.minQuantity,
      });
    }
  });

  test('CTC-14/15/16: deve classificar e destacar visualmente produtos em baixo estoque', async ({ app }) => {
    const product = {
      name: uniqueProductName('Óleo'),
      quantity: 2,
      minQuantity: 2,
    };

    await app.products.open();
    await app.products.submitProduct(product);

    const row = await app.products.expectProductRow(product.name, {
      quantity: product.quantity,
      minQuantity: product.minQuantity,
      status: 'Repor',
    });

    await expect(row.locator('.status-chip.tag-alert')).toHaveText('Repor');
  });

  test('CTC-19: deve classificar produto como estável quando quantidade estiver acima da mínima', async ({ app }) => {
    const product = {
      name: uniqueProductName('Farinha'),
      quantity: 10,
      minQuantity: 3,
    };

    await app.products.open();
    await app.products.submitProduct(product);

    const row = await app.products.expectProductRow(product.name, {
      quantity: product.quantity,
      minQuantity: product.minQuantity,
      status: 'Estável',
    });

    await expect(row.locator('.status-chip.tag-ok')).toHaveText('Estável');
  });
});

const base = require('@playwright/test');
const { createProductsActions } = require('./actions/productsActions');
const { createProductsApiClient } = require('./helpers/productsApiClient');

const test = base.test.extend({
  app: async ({ page }, use) => {
    const app = {
      products: createProductsActions(page),
    };

    await use(app);
  },

  api: async ({ request }, use) => {
    await use(createProductsApiClient(request));
  },
});

module.exports = {
  test,
  expect: base.expect,
};

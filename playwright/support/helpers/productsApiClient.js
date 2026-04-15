const { expect } = require('@playwright/test');
const { apiURL } = require('./env');

function createProductsApiClient(request) {
  return {
    async clearProducts() {
      const response = await request.delete(`${apiURL}/products`);
      expect(response.ok()).toBeTruthy();
    },

    async createProduct(product) {
      const response = await request.post(`${apiURL}/products`, {
        data: product,
      });
      return response;
    },

    async listProducts() {
      const response = await request.get(`${apiURL}/products`);
      expect(response.ok()).toBeTruthy();
      return response.json();
    },
  };
}

module.exports = {
  createProductsApiClient,
};

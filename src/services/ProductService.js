const Product = require('../models/Product');

class ProductService {
  constructor() {
    this.products = []; // in-memory storage
  }

  createProduct(name, quantity, minQuantity = 0) {
    // Check if name already exists
    const existingProduct = this.products.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existingProduct) {
      throw new Error('Produto com nome duplicado não é permitido');
    }

    // Validate quantity
    if (quantity < 0) {
      throw new Error('Quantidade inicial não pode ser menor que 0');
    }

    // Validate minQuantity
    if (minQuantity < 0) {
      throw new Error('Quantidade mínima não pode ser menor que 0');
    }

    const product = new Product(name, quantity, minQuantity);
    this.products.push(product);
    return product;
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  clearProducts() {
    this.products = [];
  }
}

module.exports = new ProductService(); // singleton for in-memory
const { v4: uuidv4 } = require('uuid');

class Product {
  constructor(name, quantity, minQuantity = 0) {
    this.id = uuidv4();
    this.name = name;
    this.quantity = quantity;
    this.minQuantity = minQuantity;
    this.createdAt = new Date();
  }
}

module.exports = Product;
const productService = require('../services/ProductService');

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, quantity, minQuantity } = req.body;

      if (!name || quantity === undefined) {
        return res.status(400).json({ error: 'Nome e quantidade são obrigatórios' });
      }

      const product = productService.createProduct(name, quantity, minQuantity);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = productService.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new ProductController();
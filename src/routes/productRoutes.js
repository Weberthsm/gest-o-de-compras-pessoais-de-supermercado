const express = require('express');
const productController = require('../controllers/ProductController');

const router = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cadastrar um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *               quantity:
 *                 type: number
 *                 description: Quantidade atual do produto
 *               minQuantity:
 *                 type: number
 *                 description: Quantidade mínima para alerta
 *                 default: 0
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 minQuantity:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   quantity:
 *                     type: number
 *                   minQuantity:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obter um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 minQuantity:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', productController.getProductById);

// DELETE /products - Clear all products (for testing)
router.delete('/', (req, res) => {
  const productService = require('../services/ProductService');
  productService.clearProducts();
  res.status(200).json({ message: 'Produtos limpos' });
});

module.exports = router;
require('dotenv').config();

import express, { json } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.WEBAPP_ORIGIN || process.env.BASE_URL_WEB || 'http://localhost:4000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gestão de Compras de Supermercado',
    version: '1.0.0',
    description: 'API para cadastro de produtos em sistema de gestão de compras pessoais',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento',
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // paths to files containing OpenAPI definitions
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Swagger UI
app.use('/api-docs', serve, setup(swaggerSpec));

// Routes
app.use('/products', productRoutes);

// Endpoint to render Swagger JSON
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Start server when this file is executed directly.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
}

export default app;

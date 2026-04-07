# Gestão de Compras Pessoais de Supermercado

Este projeto é uma API REST para gestão de compras pessoais de supermercado, desenvolvida em JavaScript usando Express.js. Permite aos usuários cadastrar produtos para controlar itens da despensa e saber o que precisa repor.

## Funcionalidades

### User Story 1: Cadastro de Produtos
- Cadastrar produtos com nome, quantidade atual e quantidade mínima para alerta.
- Validações: nome único, quantidade >= 0, data de criação registrada.

## Tecnologias Utilizadas
- Node.js
- Express.js
- Swagger para documentação da API
- Banco de dados em memória

## Estrutura do Projeto
```
src/
├── controllers/
│   └── ProductController.js
├── models/
│   └── Product.js
├── routes/
│   └── productRoutes.js
├── services/
│   └── ProductService.js
└── server.js
resources/
└── (swagger files gerados automaticamente)
```

## Como Executar

1. Instale as dependências:
   ```
   npm install
   ```

2. Execute o servidor:
   ```
   npm start
   ```

3. A API estará disponível em `http://localhost:3000`

4. Documentação Swagger: `http://localhost:3000/api-docs`

## Endpoints

- `POST /products` - Cadastrar produto
- `GET /products` - Listar produtos
- `GET /products/:id` - Obter produto por ID

## Regras de Negócio

- Produto deve ter nome e quantidade atual.
- Não permite nomes duplicados.
- Quantidade inicial >= 0.
- Permite definir quantidade mínima para alerta.
- Registra data de criação.

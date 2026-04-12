# Gestão de Compras Pessoais de Supermercado

Este projeto é uma API REST para gestão de compras pessoais de supermercado, desenvolvida em JavaScript usando Express.js. Permite aos usuários cadastrar produtos para controlar itens da despensa e saber o que precisa repor.

## Funcionalidades

### User Story 1: Cadastro de Produtos

Como usuário
Quero cadastrar produtos
Para controlar os itens da minha despensa e saber o que preciso repor

Regras de negócio:

O produto deve possuir pelo menos nome e quantidade atual
Deve permitir definir uma quantidade mínima (estoque mínimo) para alerta
Não permitir cadastro de produtos com nome duplicado
A quantidade inicial não pode ser menor que 0
O sistema deve registrar data de criação do produto

### User Story 2: Listar produtos
Funcionalidade: Listar produtos
Como usuário
Quero visualizar a lista de produtos cadastrados
Para acompanhar o que tenho disponível na minha despensa

Regras de negócio:

A listagem deve exibir nome, quantidade atual e estoque mínimo
Deve permitir ordenação por nome ou quantidade
Deve permitir filtro por produtos com ou sem estoque
A listagem deve ser atualizada em tempo real após alterações

### User Story 3: Identificar produtos com baixo estoque


Como usuário
Quero identificar produtos com baixo estoque
Para saber rapidamente quais itens preciso comprar

Regras de negócio:

Um produto é considerado com baixo estoque quando a quantidade atual for menor ou igual ao estoque mínimo definido
O sistema deve destacar visualmente os produtos com baixo estoque
Deve permitir filtrar apenas produtos com baixo estoque
A verificação deve ocorrer automaticamente sempre que houver alteração de quantidade
Caso nenhum produto esteja com baixo estoque deve ser classificado como Estável


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

### Iniciar a API

1. Execute o servidor da API:
   ```
   npm start
   ```

2. A API estará disponível em `http://localhost:3000`

3. Documentação Swagger:
   `http://localhost:3000/api-docs`

### Iniciar a aplicação web

1. Abra outra janela de terminal e execute:
   ```
   npm run start:web
   ```

2. A aplicação web estará disponível em `http://localhost:4000`

3. A aplicação web consome a API em `http://localhost:3000`

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

require('dotenv').config();
const chai = require('chai');
const supertest = require('supertest');
const expect = chai.expect;

const request = supertest(process.env.BASE_URL);
const fixtures = require('../fixtures/products');

describe('User Story 1: Cadastro de produtos', () => {
  beforeEach(async () => {
    // Limpar produtos antes de cada teste para isolamento via API
    await request.delete('/products').expect(200);
  });

  describe('CT-01: Cadastro de produto com dados válidos', () => {
    it('deve criar produto com sucesso e retornar campos esperados', async () => {
      const response = await request
        .post('/products')
        .send(fixtures.validProduct)
        .expect(201);

      expect(response.body).to.have.property('id');
      expect(response.body.name).to.equal(fixtures.validProduct.name);
      expect(response.body.quantity).to.equal(fixtures.validProduct.quantity);
      expect(response.body.minQuantity).to.equal(fixtures.validProduct.minQuantity);
      expect(response.body).to.have.property('createdAt');
    });
  });

  describe('CT-02: Cadastro de produto com nome já existente', () => {
    it('deve rejeitar cadastro e retornar erro de nome duplicado', async () => {
      // Primeiro, criar produto
      await request.post('/products').send(fixtures.validProduct).expect(201);

      // Tentar criar com mesmo nome
      const response = await request
        .post('/products')
        .send(fixtures.duplicateNameProduct)
        .expect(400);

      expect(response.body.error).to.equal('Produto com nome duplicado não é permitido');
    });
  });

  describe('CT-03: Cadastro de produto com quantidade inicial negativa', () => {
    it('deve rejeitar cadastro e retornar erro de validação de quantidade', async () => {
      const response = await request
        .post('/products')
        .send(fixtures.negativeQuantityProduct)
        .expect(400);

      expect(response.body.error).to.equal('Quantidade inicial não pode ser menor que 0');
    });
  });

  describe('CT-04: Cadastro de produto sem quantidade mínima informada', () => {
    it('deve criar produto com sucesso e minQuantity padrão 0', async () => {
      const response = await request
        .post('/products')
        .send(fixtures.validProductWithoutMin)
        .expect(201);

      expect(response.body.minQuantity).to.equal(0);
    });
  });

  describe('CT-05: Registro de data de criação no produto cadastrado', () => {
    it('deve registrar data de criação válida no momento do cadastro', async () => {
      const beforeCreate = new Date();
      const response = await request
        .post('/products')
        .send(fixtures.validProduct)
        .expect(201);

      const afterCreate = new Date();
      const createdAt = new Date(response.body.createdAt);

      expect(createdAt).to.be.at.least(beforeCreate);
      expect(createdAt).to.be.at.most(afterCreate);
    });
  });

  describe('CT-06: Persistência em memória após cadastro do produto', () => {
    it('deve manter produto disponível para consulta após cadastro bem-sucedido', async () => {
      const createResponse = await request
        .post('/products')
        .send(fixtures.validProduct)
        .expect(201);

      const productId = createResponse.body.id;

      const getResponse = await request
        .get(`/products/${productId}`)
        .expect(200);

      expect(getResponse.body.id).to.equal(productId);
      expect(getResponse.body.name).to.equal(fixtures.validProduct.name);
    });
  });
});
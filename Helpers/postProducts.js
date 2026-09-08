const request = require('supertest');
const postProducts = require('../Fixtures/postProducts.json');
const app = require('../src/server').default;

const cadastrarProdutoValido = async (customPayload = {}) => {
    const bodyProducts = { ...postProducts, ...customPayload };

    const resposta = await request(app)
        .post('/products')
        .set('Content-Type', 'application/json')
        .send(bodyProducts);

    return resposta;
};

module.exports = {
    cadastrarProdutoValido
}

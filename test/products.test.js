const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/server').default;
const postProducts = require('../Fixtures/postProducts.json');
const { cadastrarProdutoValido } = require('../Helpers/postProducts.js')

describe('Produtos', () => {
    // Parte feita para deletar os dados do cadastro logo antes de cada teste
    beforeEach(async () => {
        await request(app)
            .delete('/products')
            .expect(200);
    });

    describe('POST /products', () => {
        it('Deve retornar 201 e o objeto do produto com tipos corretos ao cadastrar produto com valores válidos', async () => {
            const resposta = await cadastrarProdutoValido();

            expect(resposta.status).to.equal(201);
            expect(resposta.body.name).to.be.a('string');
            expect(resposta.body.quantity).to.be.a('number');
            expect(resposta.body.minQuantity).to.be.a('number');
            expect(resposta.body.createdAt).to.be.a('string');
        });

        it('Deve retornar 400 ao cadastrar produto com nome invalido (numéros)', async () => {
            const resposta = await cadastrarProdutoValido({ name: 123654 });

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.be.a('string')
        });

        it('Deve retornar 400 ao cadastrar produto com nome invalido (simbolos)', async () => {
            const resposta = await cadastrarProdutoValido({ name: "----" });

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.be.a('string')
        });

        it('Deve retornar 400 ao cadastrar produto com quantidade minima menor que zero', async () => {
            const resposta = await cadastrarProdutoValido({ minQuantity: -1 });

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.be.a('string')
            expect(resposta.body.error).to.equal('Quantidade mínima não pode ser menor que 0')
        });

        it('Deve retornar 400 ao cadastrar produto com quantidade inicial menor que zero', async () => {
            const resposta = await cadastrarProdutoValido({ quantity: -1 });

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.be.a('string')
            expect(resposta.body.error).to.equal('Quantidade inicial não pode ser menor que 0')
        });

        it('Deve retornar 400 ao cadastrar produto com campo do nome e quantidade inicial vazias', async () => {
            const resposta = await cadastrarProdutoValido({ name: "", quantity: null });

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.be.a('string')
            expect(resposta.body.error).to.equal('Nome e quantidade são obrigatórios')
        });
        
        it('Deve retornar 400 ao cadastrar dois produtos com o mesmo nome', async () => {
            const cadastroParaComparar = await cadastrarProdutoValido();

            expect(cadastroParaComparar.status).to.equal(201);

            const resposta = await cadastrarProdutoValido();

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.be.a('string')
            expect(resposta.body.error).to.equal('Produto com nome duplicado não é permitido')
        });
    })

    describe('GET /products', () => {
        it('Deve retornar 200 e exibir campos corretamente', async () => {
            const cadastroParaLista = await cadastrarProdutoValido();

            expect(cadastroParaLista.status).to.equal(201)

            const resposta = await request(app)
                .get('/products')
                .set('Content-Type', 'application/json')

            expect(resposta.status).to.equal(200)
            expect(resposta.body).to.be.an('array')
            expect(resposta.body[0].name).to.be.a('string')
            expect(resposta.body[0].quantity).to.be.a('number')
            expect(resposta.body[0].minQuantity).to.be.a('number')
        })
    }) 

    describe('GET /products/{id}', () => {
        it('Deve retornar 200 e exibir campos do produto procurado corretamente', async () => {
            const cadastroParaLista = await cadastrarProdutoValido();
            produtoTesteId = cadastroParaLista.body.id
            
            expect(cadastroParaLista.status).to.equal(201)

            const resposta = await request(app)
                .get(`/products/${produtoTesteId}`)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.name).to.be.a('string')
            expect(resposta.body.quantity).to.be.a('number')
            expect(resposta.body.minQuantity).to.be.a('number')
        })
    }) 
})
const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')


describe('Login', () => { //describe cria agrupameto de testes - primeiro parâmetro é o nome do teste e o segundo é uma função ou arrow function (mais utilizado)
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais váldas', async() => {
            const bodyLogin = { ...postLogin}
            
            const resposta = await request(process.env.BASE_URL)           
                .post('/login')
                .set('Content-Type', 'application/json') //Setando o cabeçalho para essa requisição
                .send(bodyLogin)

            expect(resposta.status).to.equal(200)       
            expect(resposta.body.token).to.be.a('string')   
        })
    })
})
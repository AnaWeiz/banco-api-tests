const request = require('supertest');
const { expect } = require('chai');

describe('Login', () => { //describe cria agrupameto de testes - primeiro parâmetro é o nome do teste e o segundo é uma função ou arrow function (mais utilizado)
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais váldas', async() => {
            const resposta = await request('http://localhost:3000')           
                .post('/login')
                .set('Content-Type', 'application/json') //Setando o cabeçalho para essa requisição
                .send({  //Body da requisição
                    'username': 'julio.lima',
                    'senha': '123456'
                    })

            expect(resposta.status).to.equal(200)       
            expect(resposta.body.token).to.be.a('string')   
        })
    })
})
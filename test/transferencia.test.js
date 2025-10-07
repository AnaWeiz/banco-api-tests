const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$10,00', async () => {
            //Capturar o token
            const token = await obterToken('julio.lima', '123456') //Posso trocar usuário e senha 

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send({ //Objeto que quero enviar
                     contaOrigem: 1, //antes vejo no banco as contas disponíveis
                     contaDestino: 2,
                     valor: 11,
                     token: "" //não precisa pq não é >5000
                }) 

            expect(resposta.status).to.equal(201)       
        })

        it('Deve retornar sucesso com 422 quando o valor da transferência for abaixo de R$10,00', async () => {
            const token = await obterToken('julio.lima', '123456')

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send({ //Objeto que quero enviar
                     contaOrigem: 1, //antes vejo no banco as contas disponíveis
                     contaDestino: 2,
                     valor: 7,
                     token: "" //não precisa pq não é >5000
                }) 

            expect(resposta.status).to.equal(422)  
        })
    })
})
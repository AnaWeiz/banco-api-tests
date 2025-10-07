const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        let token
        
        beforeEach(async() => { //acontece antes de cada it
            token = await obterToken('julio.lima', '123456') //Posso trocar usuário e senha 
        })

        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$10,00', async () => {
            const bodyTransferencias = { ...postTransferencias}

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(bodyTransferencias) 

            expect(resposta.status).to.equal(201)       
        })

        it('Deve retornar sucesso com 422 quando o valor da transferência for abaixo de R$10,00', async () => {
            const bodyTransferencias = { ...postTransferencias}
            bodyTransferencias.valor = 7 //Pq nesse o valor é diferente
          
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(bodyTransferencias) 

            expect(resposta.status).to.equal(422)  
        })
    })
})
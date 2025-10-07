const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferências', () => {
    let token
        
    beforeEach(async() => { //acontece antes de cada it
        token = await obterToken('julio.lima', '123456') //Posso trocar usuário e senha 
    })

    describe('POST /transferencias', () => {

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

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferência contido no banco de dados quando o ID for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/19') //id da transferência que quero testar (vi no banco)
                .set('Authorization', 'Bearer ' + token)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.id).to.equal(19)
            expect(resposta.body.id).to.be.a('number') //Valida o tipo (numero, string)
            expect(resposta.body.conta_origem_id).to.equal(1)
            expect(resposta.body.conta_destino_id).to.equal(2)
            expect(resposta.body.valor).to.equal(11.00) //vai dar erro pq na API o numero está como string, mas deve ser float, igual mostra no Swagger
        })
    })

    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10') //Copiar do postman
                .set('Authorization', 'Bearer ' + token)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.limit).to.equal(10)
            expect(resposta.body.transferencias).to.have.lengthOf(10) //conta quantos itens tem - quanto tem vetor { }
        })
    })
})
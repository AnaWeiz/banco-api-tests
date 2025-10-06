const request = require('supertest');
const { expect } = require('chai');

describe('Transferências', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$10,00', async () => {
            //Capturar o token
            const respostaLogin = await request('http://localhost:3000')           
                .post('/login')
                .set('Content-Type', 'application/json') //Setando o cabeçalho para essa requisição
                .send({  //Body da requisição
                    'username': 'julio.lima',
                    'senha': '123456'
                })

            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
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
            const respostaLogin = await request('http://localhost:3000')           
                .post('/login')
                .set('Content-Type', 'application/json') //Setando o cabeçalho para essa requisição
                .send({  //Body da requisição
                    'username': 'julio.lima',
                    'senha': '123456'
                })

            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
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
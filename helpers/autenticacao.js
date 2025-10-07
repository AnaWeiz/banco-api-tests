const request = require('supertest')
const postLogin = require('../fixtures/postLogin.json')

const obterToken = async (usuario, senha) => { //Quem chamar obterToken vai ter que passar usuário e senha para fazer login
    const bodyLogin = { ...postLogin }
    
    const respostaLogin = await request(process.env.BASE_URL) //Requisição para API
        .post('/login')
        .set('Content-Type', 'application/json') //Setando o cabeçalho para essa requisição
        .send(bodyLogin)

    return respostaLogin.body.token
}

module.exports = {
    obterToken
}
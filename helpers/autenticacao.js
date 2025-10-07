const request = require('supertest')

const obterToken = async (usuario, senha) => { //Quem chamar obterToken vai ter que passar usuário e senha para fazer login
    const respostaLogin = await request(process.env.BASE_URL) //Requisição para API
        .post('/login')
        .set('Content-Type', 'application/json') //Setando o cabeçalho para essa requisição
        .send({  //Body da requisição
            'username': usuario,
            'senha': senha
        })

    return respostaLogin.body.token
}

module.exports = {
    obterToken
}
# banco-api-tests

## Objetivo
Este projeto realiza testes automatizados na API REST do [banco-api](https://github.com/juliodelimas/banco-api), validando suas funcionalidades e contribuindo a qualidade de suas operações.


## Stack Utilizada
| Categoria | Tecnologia |
|------------|-------------|
| Linguagem | [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) |
| Framework de Testes | [Mocha](https://mochajs.org/) |
| Asserções | [Chai](https://www.chaijs.com/) |
| Biblioteca de requisições HTTP | [Supertest](https://github.com/ladjs/supertest) |
| Relatórios | [Mochawesome](https://www.npmjs.com/package/mochawesome) |
| Variáveis de ambiente | [dotenv](https://www.npmjs.com/package/dotenv) |

---

## Estrutura de Diretórios
```
banco-api-tests/
├── test/                     # Testes relacionados a contas
│   ├── login.test.js     
│   └── transferencias.test.js
├── mochawesome-report/       # Diretório gerado automaticamente com o relatório HTML dos testes
├── .env                      # Arquivo para configuração da variável BASE_URL
├── package.json            
└── README.md                 
```

---

## Configuração do Arquivo `.env`
O arquivo `.env` deve ser criado na raiz do projeto com o seguinte formato:

```
BASE_URL=http://localhost:3000
```

> Essa URL deve apontar para a API **Banco API** em execução localmente ou em outro servidor.

---

## Comandos para execução

### Instale as dependências
```bash
npm install
```

### Execute os testes
```bash
npm test
```

### Gerar o relatório HTML (Mochawesome)
Após a execução dos testes, um relatório será gerado automaticamente em:

```
/mochawesome-report/mochawesome.html
```

Abra o arquivo no navegador para visualizar os resultados detalhados.

---

## Scripts do `package.json` (exemplo)
```json
"scripts": {
   "test:report": "npm test && open mochawesome-report/mochawesome.html"
}
```

---

## Documentação das Dependências

- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Supertest](https://github.com/ladjs/supertest)
- [Mochawesome](https://www.npmjs.com/package/mochawesome)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

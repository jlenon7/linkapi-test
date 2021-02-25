# LinkAPI Test 🧠

> Project developed in test for LinkApi

[![GitHub followers](https://img.shields.io/github/followers/jlenon7.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/jlenon7?tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/jlenon7/linkapi-test.svg?style=social&label=Star&maxAge=2592000)](https://github.com/jlenon7/linkapi-test/stargazers/)

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/jlenon7/linkapi-test?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/jlenon7/linkapi-test?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">
</p>

Uma `API` que integre os serviços `Pipedrive` e `Bling`, a fim de poder realizar pedidos de vendas para fornecedores dentro do `Bling`.

<img src="https://extrato.vtex.com/images/linkapi_avatar-linkapiX800.png" width="200px" align="right" hspace="30px" vspace="100px">

## ENDPOINTS

| METHOD    | URI                   | NAME              |
| --------- | --------------------- | ----------------- |
| GET       | api/v1/orders         | orders.index      |
| POST      | api/v1/orders         | orders.store      |
| GET       | api/v1/orders/:token  | orders.show       |

### Query Search em orders.index

Listagem paginadas: `?offset=0&limit=10`

Listagem entre preços: `?since_price=2000.00&max_price=4000.00`

Listagem entre datas: `?since_date=2021-02-23T05:00:00.000Z&max_date=2021-02-24T06:00:00.000Z`

## OBSERVAÇÃO

Essa API está rodando dentro de um servidor no Heroku apenas para ver o funcionamento do `Webhook` e para ter um acesso mais simplificado ao `Swagger`. [Clique aqui para acessar!](https://linkapi-test.herokuapp.com/api/swagger)

Não esqueça de criar o arquivo com as váriaveis de ambiente para rodar os testes ou modo development.

## COMANDOS

Instale as dependências

```bash
yarn
```

Gere o arquivo .env

```bash
cp .env.example .env && cp .env.example .env.testing
```

Para rodar os testes E2E e Unitários

```bash
yarn test
```

Para rodar a aplicação em modo desenvolvimento

```bash
yarn start:dev
```

## OBJETIVO

- [x] Deverá construir uma API RESTful usando a tecnologia NodeJS.

## REQUISITOS

- [x] Criar contas testes nas plataformas Pipedrive e Bling.
- [x] Criar uma integração entre as plataformas Pipedrive e Bling. (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).
- [x] Criar banco de dados mongo, existem serviços como MongoDB Atlas para criar de graça
- [x] Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.
- [x] Criar endpoint para trazer os dados consolidados da collection do MongoDB.

## INSTRUÇÕES

- [x] Desenvolva e versione o projeto usando git
- [x] Utilize o GitHub para hospedar o código
- [x] Enviar o link do repositório para people@linkapi.com.br

## O QUE SERÁ AVALIADO

- Quantidade de requisitos realizados
- Desacoplamento de código
- Legibilidade
- Boas práticas de desenvolvimento de API RESTful
- Performance

## SELF IMPROVEMENTS

- [ ] Enfileirar as requisições das collections com RabbitMQ
- [x] Adicionar Rate limiter
- [x] Implementar Webhook para quando um Deal for atualizado no Pipedrive ajustar no Bling
- [x] Criar testes para a collection do Bling
- [x] Criar testes para os endpoints de Orders
- [x] Criar testes para a collection do Pipedrive

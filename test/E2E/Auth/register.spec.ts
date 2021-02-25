import 'start/env'
import * as request from 'supertest'

import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'

describe('\n[E2E] Register Users 🏘', () => {
  it('should register a new User', async () => {
    const status = 201
    const method = 'POST'
    const code = 'RESPONSE'
    const path = '/v1/auth/register'

    const payload = {
      name: 'João Lenon',
      email: 'lenonSec7@gmail.com',
      password: '12345678',
      password_confirmation: '12345678',
    }

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .send(payload)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.name).toBe(payload.name)
  })

  it('should throw a validation error when email and password is null', async () => {
    const status = 400
    const method = 'POST'
    const code = 'Error'
    const path = '/v1/auth/register'

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .send({ email: null, password: null, password_confirmation: null })
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.error).toEqual({
      name: 'Error',
      message: {
        statusCode: status,
        message: [
          'name should not be empty',
          'name must be a string',
          'email should not be empty',
          'email must be a string',
          'password should not be empty',
          'password must be a string',
          'password_confirmation should not be empty',
          'password_confirmation must be a string',
        ],
        error: 'Bad Request',
      },
    })
  })
})

let app: App
let database: Database

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)
})

afterEach(async () => {
  await database.dropDatabase()
  await database.closeConnection()
  await app.closeApp()
})

import 'start/env'
import * as bcrypt from 'bcrypt'
import * as request from 'supertest'

import { payload } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { UserRepository } from 'app/Repositories/UserRepository'

describe('\n[E2E] Login Users 🏘', () => {
  it('should login the User in the application', async () => {
    const status = 201
    const method = 'POST'
    const code = 'RESPONSE'
    const path = '/v1/auth/login'

    const user = await userRepository.storeOne({
      ...payload,
      password: await bcrypt.hash(payload.password, 10),
    })

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .send({ email: user.email, password: payload.password })
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.access_token).toBeTruthy()
  })

  it('should throw a validation error when email and password is null', async () => {
    const status = 400
    const method = 'POST'
    const code = 'Error'
    const path = '/v1/auth/login'

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .send({ email: null, password: null })
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
          'email should not be empty',
          'email must be a string',
          'password should not be empty',
          'password must be a string',
        ],
        error: 'Bad Request',
      },
    })
  })
})

let app: App
let database: Database
let userRepository: UserRepository

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)

  userRepository = database.getRepository<UserRepository>(UserRepository)
})

afterEach(async () => {
  await database.dropDatabase()
  await database.closeConnection()
  await app.closeApp()
})

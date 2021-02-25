import 'start/env'
import * as bcrypt from 'bcrypt'
import * as request from 'supertest'

import { payload } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { UserRepository } from 'app/Repositories/UserRepository'

describe('\n[E2E] Me Users 🏘', () => {
  it('should return my User when authenticated', async () => {
    const status = 200
    const method = 'GET'
    const code = 'RESPONSE'
    const path = '/v1/auth/me'

    const user = await userRepository.storeOne({
      ...payload,
      password: await bcrypt.hash(payload.password, 10),
    })

    const loginRequest = await request(app.server.getHttpServer())
      .post('/v1/auth/login')
      .send({ email: user.email, password: payload.password })

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .set('Authorization', `Bearer ${loginRequest.body.data.access_token}`)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data._id).toBeFalsy()
    expect(body.data.password).toBeFalsy()
    expect(body.data.name).toBe(payload.name)
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

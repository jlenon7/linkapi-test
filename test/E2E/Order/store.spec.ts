import 'start/env'
import * as bcrypt from 'bcrypt'
import * as request from 'supertest'

import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { OrderService } from 'app/Services/Api/OrderService'
import { UserRepository } from 'app/Repositories/UserRepository'

describe('\n[E2E] Store Order 🏘', () => {
  it('should store all system Orders', async () => {
    const status = 201
    const method = 'POST'
    const code = 'RESPONSE'
    const path = '/v1/orders'

    const order = {
      code: new Token().generate(),
      date: new Date(),
      seller: 'João Lenon',
      client: {
        name: 'Juares Luis',
        email: 'jmartinifilho@gmail.com',
      },
      discount: 1,
      price: '4000',
      blingId: '1',
      pipedriveId: '1',
      quantity: 1,
      description: 'Negócio São Jose Industrial',
      token: new Token().generate('ord'),
      deletedAt: null,
      status: 'pendent',
    }

    jest.spyOn(orderService, 'createOne').mockImplementation(async () => order)

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .set('Authorization', `Bearer ${token}`)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.message).toBe(
      'Orders being created on Bling, please wait and list the Orders',
    )
  })
})

let app: App
let token: string
let database: Database
let orderService: OrderService
let userRepository: UserRepository

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)

  userRepository = database.getRepository<UserRepository>(UserRepository)

  const user = await userRepository.storeOne({
    name: 'João Lenon',
    email: 'jlenon7@hotmail.com',
    password: await bcrypt.hash('12345678', 10),
    token: new Token().generate('usr'),
  })

  const { body } = await request(app.server.getHttpServer())
    .post('/v1/auth/login')
    .send({ email: user.email, password: '12345678' })

  token = body.data.access_token

  orderService = app.getInstance<OrderService>(OrderService.name)
})

afterEach(async () => {
  await database.dropDatabase()
  await database.closeConnection()
  await app.closeApp()
})

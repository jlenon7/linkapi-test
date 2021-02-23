import 'start/env'
import * as request from 'supertest'

import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { OrderService } from 'app/Services/Api/OrderService'

describe('\n[E2E] Store Order 🏘', () => {
  it('should store all system Orders', async () => {
    const status = 201
    const method = 'POST'
    const code = 'RESPONSE'
    const path = '/orders'

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
let database: Database
let orderService: OrderService

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)

  orderService = app.getInstance<OrderService>(OrderService.name)
})

afterEach(async () => {
  await database.dropDatabase()
  await database.closeConnection()
  await app.closeApp()
})

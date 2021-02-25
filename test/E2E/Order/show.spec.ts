import 'start/env'
import * as request from 'supertest'

import { payload } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { OrderRepository } from 'app/Repositories/OrderRepository'

describe('\n[E2E] Show Order 🏘', () => {
  it('should return one order', async () => {
    const order = await orderRepository.storeOne({
      ...payload,
      token: new Token().generate('ord'),
    })

    const status = 200
    const method = 'GET'
    const code = 'RESPONSE'
    const path = `/v1/orders/${order.token}`

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data._id).toBeFalsy()
    expect(body.data.token).toBe(`${order.token}`)
  })

  it('should throw a not found error', async () => {
    const status = 404
    const method = 'GET'
    const code = 'Error'
    const path = '/v1/orders/ord-as12312sad'

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .expect(404)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.error).toEqual({
      name: 'Error',
      message: {
        error: 'Not Found',
        message: 'NOT_FOUND_ORDER',
        statusCode: 404,
      },
    })
  })
})

let app: App
let database: Database
let orderRepository: OrderRepository

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)

  orderRepository = database.getRepository(OrderRepository)
})

afterEach(async () => {
  await database.dropDatabase()
  await database.closeConnection()
  await app.closeApp()
})

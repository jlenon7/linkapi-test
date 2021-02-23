import 'start/env'
import * as request from 'supertest'

import { payload } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { OrderRepository } from 'app/Repositories/OrderRepository'
import { Token } from '@secjs/core/build/Utils/Classes/Token'

describe('\n[E2E] Index Orders 🏘', () => {
  it('should return all orders paginated', async () => {
    const status = 200
    const method = 'GET'
    const code = 'RESPONSE'
    const path = `/orders?offset=0&limit=10`

    await orderRepository.storeOne({
      ...payload,
      token: new Token().generate('ord'),
    })
    await orderRepository.storeOne({
      ...payload,
      token: new Token().generate('ord'),
    })

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.data).toHaveLength(2)
    expect(body.data.pagination.offset).toBe(0)
    expect(body.data.pagination.limit).toBe(10)
    expect(body.data.pagination.total).toBeTruthy()
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

import 'start/env'

import { App } from 'test/Utils'
import { AppModule } from 'app/AppModule'
import { HttpException } from '@nestjs/common'
import { BlingCollection } from 'app/Services/Collections/BlingCollection'
import { CreateOrderDto } from 'app/Contracts/Dtos/CreateOrderDto'
import { Token } from '@secjs/core/build/Utils/Classes/Token'

describe('\n[Unit] Bling Collection 🏘', () => {
  it('should get contact from Bling by email and name', async () => {
    const name = 'São Jose Industrial'
    const email = 'jmartinifilho@gmail.com'

    const contact = await blingCollection.getContact(name, email)

    expect(contact.contato.nome).toBe(name)
    expect(contact.contato.email).toBe(email)
  })

  it('should throw not found error when dont find contact', async () => {
    const name = ''
    const email = 'jmartinifilho@gmail.com'

    try {
      await blingCollection.getContact(name, email)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.response.message).toBe(
        'This client was not found on Bling, please create this client with this email: jmartinifilho@gmail.com and this name: ',
      )
    }
  })

  it('should create order in Bling API', async () => {
    const orderVo = new CreateOrderDto()

    orderVo.client = {}
    orderVo.pipedriveId = 1
    orderVo.date = new Date()
    orderVo.seller = 'João Lenon'
    orderVo.description = 'Negócio São Jose Industrial'
    orderVo.code = new Token().generate()
    orderVo.price = '4000'
    orderVo.client.name = 'São Jose Industrial'
    orderVo.quantity = 1
    orderVo.discount = orderVo.quantity / 2
    orderVo.client.email = 'jmartinifilho@gmail.com'

    const blingOrder = await blingCollection.createOrder(orderVo)

    expect(blingOrder.idPedido).toBeTruthy()
  })
})

let app: App
let blingCollection: BlingCollection

beforeEach(async () => {
  app = await new App([AppModule]).initApp()

  blingCollection = app.getInstance<BlingCollection>(BlingCollection.name)
})

afterEach(async () => {
  await app.closeApp()
})

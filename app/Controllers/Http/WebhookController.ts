import { Body, Controller, Inject, Post } from '@nestjs/common'
import { CreateOrderDto } from 'app/Contracts/Dtos/CreateOrderDto'
import { OrderService } from 'app/Services/Api/OrderService'

@Controller('/webhooks')
export class WebhookController {
  @Inject(OrderService) private orderService: OrderService

  @Post('/create')
  async create(@Body() body) {
    console.log('Webhook', body.current)
    if (body.status.current !== 'won') {
      return
    }

    const orderVo = new CreateOrderDto()

    orderVo.code = body.current.id
    orderVo.description = body.title
    orderVo.date = body.current.update_time
    orderVo.seller = body.current.owner_name
    orderVo.price = body.current.weighted_value
    orderVo.client.email = body.current.cc_email
    orderVo.quantity = body.current.products_count
    orderVo.client.name = body.current.org_name || body.current.person_name

    return this.orderService.create(orderVo)
  }
}

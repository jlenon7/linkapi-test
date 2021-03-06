import { ApiTags } from '@nestjs/swagger'
import { OrderService } from 'app/Services/Api/OrderService'
import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { Body, Controller, Inject, Post } from '@nestjs/common'
import { CreateOrderDto } from 'app/Contracts/Dtos/CreateOrderDto'

@ApiTags('Webhooks')
@Controller('/v1/webhooks')
export class WebhookController {
  @Inject(OrderService) private orderService: OrderService

  @Post('/create')
  async store(@Body() body) {
    const data = body.current

    if (data.status !== 'won') {
      return
    }

    const orderVo = new CreateOrderDto()

    orderVo.pipedriveId = data.id
    orderVo.description = data.title
    orderVo.date = data.update_time
    orderVo.seller = data.owner_name
    orderVo.price = data.weighted_value
    orderVo.client.email = data.cc_email
    orderVo.code = new Token().generate()
    orderVo.quantity = data.products_count
    orderVo.client.name = data.org_name || data.person_name

    return this.orderService.createOne(orderVo)
  }
}

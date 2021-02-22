import { Body, Controller, Post } from '@nestjs/common'

@Controller('/webhooks')
export default class WebhookController {
  @Post('/create')
  async create(@Body() body) {
    console.log(body)
  }
}

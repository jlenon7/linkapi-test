import { Controller, Post } from '@nestjs/common'

@Controller('/webhooks')
export default class WebhookController {
  @Post('/create')
  async create() {
    console.log('Executei o webhook, by pipedrive')
  }
}

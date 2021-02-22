import { Controller, Get } from '@nestjs/common'

@Controller('/webhooks')
export default class WebhookController {
  @Get('/create')
  async create() {
    console.log('Executei o webhook, by pipedrive')
  }
}

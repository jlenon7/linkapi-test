import 'start/env'
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'

import { AppModule } from 'app/AppModule'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { HttpExceptionFilter } from 'app/Controllers/Http/Filters/HttpExceptionFilter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const Config = app.get(ConfigService)

  app.use(helmet())
  app.enableCors(Config.get('cors'))
  app.use(rateLimit(Config.get('ratelimit')))
  app.setGlobalPrefix(Config.get('app.prefix'))
  app.useGlobalFilters(new HttpExceptionFilter(Config))

  await app.listen(Config.get('app.port'))
}

bootstrap().catch()

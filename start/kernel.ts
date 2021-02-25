import app from 'config/app'
import http from 'config/http'
import cors from 'config/cors'
import swagger from 'config/swagger'
import database from 'config/database'
import ratelimit from 'config/ratelimit'

import { JwtModule } from '@nestjs/jwt'
import { HttpModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'

const configuration = () => ({
  app,
  http,
  cors,
  swagger,
  database,
  ratelimit,
})

const kernel = [
  HttpModule.register(http),
  JwtModule.register(app.authorization.jwt),
  MongooseModule.forFeature(database.schemas),
  MongooseModule.forRoot(database.connection.url),
  ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
  PassportModule.register({ defaultStrategy: app.authorization.strategy }),
]

export default kernel

import app from 'config/app'
import http from 'config/http'
import cors from 'config/cors'
import database from 'config/database'

import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { HttpModule } from '@nestjs/common'

const configuration = () => ({
  app,
  http,
  cors,
  database,
})

const kernel = [
  HttpModule.register(http),
  MongooseModule.forFeature(database.schemas),
  MongooseModule.forRoot(database.connection.url),
  ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
]

export default kernel

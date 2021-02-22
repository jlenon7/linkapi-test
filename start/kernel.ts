import app from '../config/app'
import cors from '../config/cors'
import database from '../config/database'

import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

const configuration = () => ({
  app,
  cors,
  database,
})

const kernel = [
  MongooseModule.forFeature(database.schemas),
  MongooseModule.forRoot(database.connection.url),
  ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
]

export default kernel

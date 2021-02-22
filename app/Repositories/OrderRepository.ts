import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order, OrderDocument } from 'app/Schemas/Order'
import { MongooseRepository } from '@secjs/core/build/Base/Repositories/MongooseRepository'

@Injectable()
export class OrderRepository extends MongooseRepository<OrderDocument> {
  @InjectModel(Order.name) protected Model: Model<OrderDocument>
}

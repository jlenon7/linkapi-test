import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from 'app/Schemas/User'
import { MongooseRepository } from '@secjs/core/build/Base/Repositories/MongooseRepository'

@Injectable()
export class UserRepository extends MongooseRepository<UserDocument> {
  @InjectModel(User.name) protected Model: Model<UserDocument>
}

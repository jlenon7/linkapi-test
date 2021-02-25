import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserDocument = User & mongoose.Document

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true, unique: true })
  email: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ type: String, required: true, index: true, unique: true })
  token: string

  @Prop({ type: Date, default: null })
  deletedAt?: Date

  @Prop({ type: String, default: 'pendent' })
  status: 'pendent' | 'approved' | 'reproved' | string
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.methods.toJSON = function() {
  const obj = this.toObject() as any

  delete obj._id
  delete obj.__v
  delete obj.password

  return obj
}

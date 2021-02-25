import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type OrderDocument = Order & mongoose.Document

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: String, required: true, unique: true })
  code: string

  @Prop({ type: Date, required: true, index: true })
  date: Date

  @Prop({ type: String, required: true })
  seller: string

  @Prop({ type: Object, required: true })
  client: {
    name: string
    email: string
  }

  @Prop({ type: Number, required: true })
  discount: number

  @Prop({
    type: String,
    required: true,
    index: true,
  })
  price: string

  @Prop({
    type: String,
    require: true,
  })
  blingId: string

  @Prop({
    type: String,
    require: true,
  })
  pipedriveId: string

  @Prop({ type: Number, required: true })
  quantity: number

  @Prop({ type: String, required: true })
  description: string

  @Prop({ type: String, required: true, index: true, unique: true })
  token: string

  @Prop({ type: Date, default: null })
  deletedAt?: Date

  @Prop({ type: String, default: 'pendent' })
  status: 'pendent' | 'approved' | 'reproved' | string
}

export const OrderSchema = SchemaFactory.createForClass(Order)

OrderSchema.methods.toJSON = function() {
  const obj = this.toObject() as any

  delete obj._id
  delete obj.__v

  return obj
}

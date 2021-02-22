export class CreateOrderDto {
  code: string
  date: Date
  seller: string
  client: {
    name: string
    email: string
  }

  discount?: number
  price: string
  quantity: number
  description: string
  deletedAt: Date
  token?: string
  status?: 'pendent' | 'approved' | 'reproved'
}

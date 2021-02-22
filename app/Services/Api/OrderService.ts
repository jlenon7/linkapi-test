import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { PaginationContract } from '@secjs/core/build/Contracts'
import { BlingCollection } from '../Collections/BlingCollection'
import { CreateOrderDto } from 'app/Contracts/Dtos/CreateOrderDto'
import { OrderRepository } from 'app/Repositories/OrderRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class OrderService {
  @Inject(OrderRepository)
  private orderRepository: OrderRepository

  @Inject(BlingCollection)
  private blingCollection: BlingCollection

  async list(pagination: PaginationContract) {
    return this.orderRepository.getAll(pagination)
  }

  async create(dto: CreateOrderDto) {
    dto.token = new Token().generate('ord')

    const blingResponse = await this.blingCollection
      .createOrder(dto)
      .toPromise()

    console.log(blingResponse)

    // return this.orderRepository.storeOne(dto)
    return blingResponse
  }

  async show(id: string) {
    const order = await this.orderRepository.getOne(id)

    if (!order) {
      throw new NotFoundException('NOT_FOUND_ORDER')
    }

    return order
  }
}

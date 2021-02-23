import { endOfDay, startOfDay } from 'date-fns'

import { Token } from '@secjs/core/build/Utils/Classes/Token'
import {
  ApiRequestContract,
  PaginationContract,
} from '@secjs/core/build/Contracts'
import { BlingCollection } from '../Collections/BlingCollection'
import { CreateOrderDto } from 'app/Contracts/Dtos/CreateOrderDto'
import { OrderRepository } from 'app/Repositories/OrderRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PipedriveCollection } from '../Collections/PipedriveCollection'

@Injectable()
export class OrderService {
  @Inject(OrderRepository)
  private orderRepository: OrderRepository

  @Inject(BlingCollection)
  private blingCollection: BlingCollection

  @Inject(PipedriveCollection)
  private pipedriveCollection: PipedriveCollection

  async createMany() {
    const deals = await this.pipedriveCollection.getDeals('won')

    const promises = []

    deals.forEach(deal => {
      const orderVo = new CreateOrderDto()

      orderVo.client = {}
      orderVo.date = deal.update_time
      orderVo.seller = deal.owner_name
      orderVo.description = deal.title
      orderVo.code = new Token().generate()
      orderVo.price = deal.value.toFixed(2)
      orderVo.client.name = deal.org_name
      orderVo.quantity = deal.products_count
      orderVo.discount = orderVo.quantity / 2
      orderVo.client.email = deal.person_id.email[0].value

      promises.push(this.createOne(orderVo))
    })

    await Promise.all(promises)

    return {
      numberOfDeals: deals.length,
      message: 'All orders created successfully!',
    }
  }

  async list(pagination: PaginationContract, dates?: any[], prices?: any[]) {
    const data: ApiRequestContract = {}

    data.where = []

    if (dates) {
      data.where.push({
        key: 'date',
        value: {
          $gte: startOfDay(new Date(dates[1].replace(' ', ''))),
          $lt: endOfDay(new Date(dates[0].replace(' ', ''))),
        },
      })
    }

    if (prices) {
      data.where.push({
        key: 'price',
        value: {
          $gte: prices[1].replace(' ', ''),
          $lt: prices[0].replace(' ', ''),
        },
      })
    }

    return this.orderRepository.getAll(pagination, data)
  }

  async createOne(dto: CreateOrderDto) {
    await this.blingCollection.createOrder(dto)

    dto.token = new Token().generate('ord')

    return this.orderRepository.storeOne(dto)
  }

  async show(id: string) {
    const order = await this.orderRepository.getOne(id)

    if (!order) {
      throw new NotFoundException('NOT_FOUND_ORDER')
    }

    return order
  }
}

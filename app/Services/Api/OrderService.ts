import {
  ApiRequestContract,
  PaginationContract,
} from '@secjs/core/build/Contracts'
import { endOfDay, startOfDay } from 'date-fns'
import { Token } from '@secjs/core/build/Utils/Classes/Token'
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

    deals.forEach(deal => {
      const orderVo = new CreateOrderDto()

      orderVo.client = {}
      orderVo.pipedriveId = deal.id
      orderVo.date = deal.update_time
      orderVo.seller = deal.owner_name
      orderVo.description = deal.title
      orderVo.code = new Token().generate()
      orderVo.price = deal.value.toFixed(2)
      orderVo.client.name = deal.org_name
      orderVo.quantity = deal.products_count
      orderVo.discount = orderVo.quantity / 2
      orderVo.client.email = deal.person_id.email[0].value

      this.createOne(orderVo)
    })

    return {
      numberOfDeals: deals.length,
      message: 'Orders being created on Bling, please wait and list the Orders',
    }
  }

  async list(pagination: PaginationContract, queries) {
    const data: ApiRequestContract = {}

    data.where = []

    if (queries.sinceDate && queries.maxDate) {
      data.where.push({
        key: 'date',
        value: {
          $gte: startOfDay(new Date(queries.sinceDate)),
          $lt: endOfDay(new Date(queries.maxDate)),
        },
      })
    }

    if (queries.maxPrice && queries.sincePrice) {
      data.where.push({
        key: 'price',
        value: {
          $gte: queries.sincePrice,
          $lt: queries.maxPrice,
        },
      })
    }

    return this.orderRepository.getAll(pagination, data)
  }

  async createOne(dto: CreateOrderDto): Promise<any> {
    const alreadyCreated = await this.orderRepository.getOne(null, {
      where: [{ key: 'pipedriveId', value: dto.pipedriveId }],
    })

    if (alreadyCreated) {
      return
    }

    const blingOrder = await this.blingCollection.createOrder(dto)

    dto.token = new Token().generate('ord')
    dto.blingId = blingOrder.idPedido

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

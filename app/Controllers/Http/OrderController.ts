import { Pagination } from 'app/Decorators/Pagination'
import { OrderService } from 'app/Services/Api/OrderService'
import { ResponseInterceptor } from './Interceptors/ResponseInterceptor'
import {
  Controller,
  Get,
  Query,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { PaginationContract } from '@secjs/core/build/Contracts/PaginationContract'

@Controller('/orders')
@UseInterceptors(ResponseInterceptor)
export class OrderController {
  @Inject(OrderService) private orderService: OrderService

  @Get()
  async list(
    @Query() queries?: string[],
    @Pagination() pagination: PaginationContract,
  ) {
    return this.orderService.list(pagination, dates, prices)
  }

  @Post()
  async create() {
    return this.orderService.createMany()
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    return this.orderService.show(id)
  }
}

import {
  Controller,
  Get,
  Query,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { Pagination } from 'app/Decorators/Pagination'
import { OrderService } from 'app/Services/Api/OrderService'
import { ResponseInterceptor } from './Interceptors/ResponseInterceptor'
import { PaginationContract } from '@secjs/core/build/Contracts/PaginationContract'

@Controller('/orders')
@UseInterceptors(ResponseInterceptor)
export class OrderController {
  @Inject(OrderService) private orderService: OrderService

  @Get()
  async list(
    @Query() queries: any,
    @Pagination() pagination: PaginationContract,
  ) {
    const formatedQueries = {
      maxDate: queries.max_date,
      sinceDate: queries.since_date,
      maxPrice: queries.max_price,
      sincePrice: queries.since_price,
    }

    return this.orderService.list(pagination, formatedQueries)
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

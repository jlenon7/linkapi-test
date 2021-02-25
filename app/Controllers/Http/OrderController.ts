import {
  Controller,
  Get,
  Query,
  Inject,
  Param,
  Post,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common'

import { JwtGuard } from './Guards/JwtGuard'
import { Pagination } from 'app/Decorators/Pagination'
import { OrderService } from 'app/Services/Api/OrderService'
import { ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger'
import { ResponseInterceptor } from './Interceptors/ResponseInterceptor'
import { PaginationContract } from '@secjs/core/build/Contracts/PaginationContract'

@ApiBearerAuth()
@ApiTags('Orders')
@UseGuards(JwtGuard)
@Controller('/v1/orders')
@UseInterceptors(ResponseInterceptor)
export class OrderController {
  @Inject(OrderService) private orderService: OrderService

  @Get()
  @ApiQuery({ name: 'limit', allowEmptyValue: true })
  @ApiQuery({ name: 'offset', allowEmptyValue: true })
  @ApiQuery({ name: 'max_date', allowEmptyValue: true })
  @ApiQuery({ name: 'since_date', allowEmptyValue: true })
  @ApiQuery({ name: 'max_price', allowEmptyValue: true })
  @ApiQuery({ name: 'since_price', allowEmptyValue: true })
  async index(
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
  async store() {
    return this.orderService.createMany()
  }

  @Get('/:token')
  async show(@Param('token') token: string) {
    return this.orderService.show(token)
  }
}

import { Controller, Get, Post } from '@nestjs/common'
import { Pagination } from 'app/Decorators/Pagination'
import { PaginationContract } from '@secjs/core/build/Contracts/PaginationContract'

@Controller('/orders')
export default class OrderController {
  @Get()
  async list(@Pagination() pagination: PaginationContract) {
    console.log(pagination)
    // TODO List all opportunities
  }

  @Post()
  async create() {
    // TODO Fetch deals with status won and register in Bling
  }

  @Get('/id')
  async show() {
    // TODO Show Opportunities
  }
}

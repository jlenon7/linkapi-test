import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req, res, next) {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0
    const limit = req.query.limit ? parseInt(req.query.limit) : 10

    req.pagination = {
      offset,
      limit,
    }

    next()
  }
}

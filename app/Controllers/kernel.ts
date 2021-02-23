import { RequestMethod } from '@nestjs/common'

/*
|--------------------------------------------------------------------------
| Http Controllers
|--------------------------------------------------------------------------
|
| All Http Controllers of the application.
|
*/
export const httpControllers = [
  require('./Http/OrderController').OrderController,
  require('./Http/WebhookController').WebhookController,
  require('./Http/WelcomeController').WelcomeController,
]

/*
|--------------------------------------------------------------------------
| Collections
|--------------------------------------------------------------------------
|
| All Collections of other applications.
|
*/

export const collections = [
  require('../Services/Collections/BlingCollection').BlingCollection,
  require('../Services/Collections/PipedriveCollection').PipedriveCollection,
]

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
|
| All Middlewares of the application.
|
*/

export const middlewares = [
  {
    middleware: require('./Http/Middlewares/PaginationMiddleware')
      .PaginationMiddleware,
    routes: [{ path: '/orders', method: RequestMethod.GET }],
  },
]

/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
|
| All Filters of the application.
|
*/

export const filters = [
  require('./Http/Filters/HttpExceptionFilter').HttpExceptionFilter,
]

/*
|--------------------------------------------------------------------------
| Guards
|--------------------------------------------------------------------------
|
| All type of guards of the application.
|
*/

export const guards = []

/*
|--------------------------------------------------------------------------
| Interceptors
|--------------------------------------------------------------------------
|
| All Interceptors of the application.
|
*/

export const interceptors = [
  require('./Http/Interceptors/ResponseInterceptor').ResponseInterceptor,
]

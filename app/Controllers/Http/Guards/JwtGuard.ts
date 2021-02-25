import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { UserService } from 'app/Services/Api/UserService'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  @Inject(JwtService) private jwtService: JwtService
  @Inject(UserService) private userService: UserService

  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest()

    const { sub } = await this.validateToken(request)
    request.user = (await this.userService.findOneByToken(sub)).toJSON()

    return true
  }

  async validateToken(request: any) {
    if (!request.headers.authorization) {
      throw new UnauthorizedException(
        'TOKEN_NOT_FOUND',
        'Any token found in context',
      )
    }

    let token = ''
    const requestToken = request.headers.authorization.split(' ')

    if (requestToken[0] === 'Bearer') {
      token = requestToken[1]
    } else {
      token = requestToken[0]
    }

    try {
      return this.jwtService.verify(token)
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }
}

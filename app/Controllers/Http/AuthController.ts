import {
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common'

import { User } from 'app/Decorators/User'
import { JwtGuard } from './Guards/JwtGuard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthService } from 'app/Services/Api/AuthService'
import { LoginValidator } from '../Validators/LoginValidator'
import { RegisterValidator } from '../Validators/RegisterValidator'
import { ResponseInterceptor } from './Interceptors/ResponseInterceptor'

@ApiTags('Auth')
@Controller('/v1/auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  @Inject(AuthService) private authService: AuthService

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async me(@User() user) {
    return user
  }

  @Post('/login')
  async login(@Body(ValidationPipe) body: LoginValidator) {
    return this.authService.login(body.email, body.password)
  }

  @Post('/register')
  async register(@Body(ValidationPipe) body: RegisterValidator) {
    return this.authService.register(body)
  }
}

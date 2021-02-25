import * as bcrypt from 'bcrypt'

import { JwtService } from '@nestjs/jwt'
import { UserService } from './UserService'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AuthService {
  @Inject(JwtService) private jwtService: JwtService
  @Inject(UserService) private userService: UserService

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email)

    if (await bcrypt.compare(pass, user.password)) {
      return user
    }

    return null
  }

  async login(email, password) {
    email.toLowerCase().trim()

    const user = await this.validateUser(email, password)

    if (!user) {
      throw new UnauthorizedException('USER_NOT_FOUND')
    }

    const payload = { email: user.email, sub: user.token }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(data) {
    data.email.toLowerCase().trim()
    data.password = await bcrypt.hash(data.password, 10)

    return this.userService.create(data)
  }
}

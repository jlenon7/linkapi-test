import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { ApiRequestContract } from '@secjs/core/build/Contracts'
import { UserRepository } from 'app/Repositories/UserRepository'

@Injectable()
export class UserService {
  @Inject(UserRepository) private userRepository: UserRepository

  private async validateEmail(email: string) {
    const user = await this.userRepository.getOne(null, {
      where: [{ key: 'email', value: email }],
    })

    if (user) {
      throw new HttpException('EMAIL_ALREADY_TAKEN', 422)
    }
  }

  private async validateToken(token: string) {
    const user = await this.userRepository.getOne(null, {
      where: [{ key: 'token', value: token }],
    })

    if (user) {
      throw new HttpException('TOKEN_ALREADY_TAKEN', 422)
    }
  }

  async create(dto) {
    dto.token = new Token().generate('usr')

    await this.validateEmail(dto.email)
    await this.validateToken(dto.token)

    return this.userRepository.storeOne(dto)
  }

  async findOneByEmail(email: string) {
    const data: ApiRequestContract = {}

    data.where = [{ key: 'email', value: email }]

    const user = await this.userRepository.getOne(null, data)

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND')
    }

    return user
  }

  async findOneByToken(token: string) {
    const data: ApiRequestContract = {}

    data.where = [{ key: 'token', value: token }]

    const user = await this.userRepository.getOne(null, data)

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND')
    }

    return user
  }
}

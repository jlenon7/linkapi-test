import * as bcrypt from 'bcrypt'
import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { ApiRequestContract } from '@secjs/core/build/Contracts'
import { UserRepository } from 'app/Repositories/UserRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UserService {
  @Inject(UserRepository) private userRepository: UserRepository

  async create({ name, email, password }) {
    return this.userRepository.storeOne({
      name,
      email,
      token: new Token().generate('usr'),
      password: await bcrypt.hash(password, 10),
    })
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

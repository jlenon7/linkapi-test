import { Token } from '@secjs/core/build/Utils/Classes/Token'

const payload = {
  name: 'João Lenon',
  email: 'lenonSec7@gmail.com',
  password: '12345678',
  token: new Token().generate('usr'),
  deletedAt: null,
  status: 'approved',
}

export { payload }

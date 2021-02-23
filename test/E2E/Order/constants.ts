import { Token } from '@secjs/core/build/Utils/Classes/Token'

const payload = {
  code: new Token().generate(),
  date: new Date(),
  seller: 'João Lenon',
  client: {
    name: 'São Jose Industrial',
    email: 'jmartinifilho@gmail.com',
  },
  discount: 1,
  price: '5.000',
  blingId: '1',
  pipedriveId: '1',
  quantity: '1',
  description: 'Aplicativo Ecommerce',
  deletedAt: null,
  status: 'approved',
}

export { payload }

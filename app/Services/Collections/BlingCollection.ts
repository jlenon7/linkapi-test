import { ConfigService } from '@nestjs/config'
import { CreateOrderDto } from 'app/Contracts/Dtos/CreateOrderDto'
import { BlingOrderContract } from 'app/Contracts/BlingOrderContract'
import { HttpException, HttpService, Inject, Injectable } from '@nestjs/common'

@Injectable()
export class BlingCollection {
  private url: string
  private token: string

  @Inject(HttpService) private httpService: HttpService

  constructor(private configService: ConfigService) {
    this.url = this.configService.get('http.services.bling.url')
    this.token = this.configService.get('http.services.bling.token')
  }

  async getContact(name: string, email: string): Promise<any> {
    let contacts = []

    try {
      const response = await this.httpService
        .get(`${this.url}/contatos/json/?apikey=${this.token}`)
        .toPromise()

      contacts = response.data.retorno.contatos
    } catch (error) {
      error.response.data.isBlingError = true
      error.response.data.method = this.getContact.name

      throw new HttpException(error.response.data, error.response.status)
    }

    const contact = contacts.find(
      contato =>
        contato.contato.nome === name &&
        contato.contato.email === email &&
        contato.contato.situacao === 'A',
    )

    if (!contact) {
      // TODO Call Bling API to create the contact
      throw new HttpException(
        {
          isBlingError: true,
          method: this.getContact.name,
          name: 'Contact Not Found',
          message: `This client was not found on Bling, please create this client with this email: ${email} and this name: ${name}`,
        },
        404,
      )
    }

    return contact
  }

  async createOrder(data: CreateOrderDto): Promise<BlingOrderContract> {
    const contact = await this.getContact(data.client.name, data.client.email)

    const xml = `
    <?xml version="1.0" encoding="ISO-8859-1"?>
      <pedido>
        <vendedor>${data.seller}</vendedor>
        <cliente>
          <id>${contact.id}</id>
          <nome>${contact.nome}</nome>
          <email>${contact.email}</email>
          <tipoPessoa>${contact.tipoPessoa}</tipoPessoa>
          <cpf_cnpj>${contact.cnpj}</cpf_cnpj>
        </cliente>
        <transporte>
          <volume>
            <servico>Ecommerce</servico>
          </volume>
        </transporte>
        <itens>
            <item>
                <codigo>${data.code}</codigo>
                <descricao>${data.description}</descricao>
                <qtde>${data.quantity}</qtde>
                <vlr_unit>${data.price}</vlr_unit>
                <vlr_desconto>${data.discount || '0.00'}</vlr_desconto>
            </item>
        </itens>
      </pedido>
    `

    try {
      const response = await this.httpService
        .post(`${this.url}/pedido/json/?apikey=${this.token}&xml=${xml}`)
        .toPromise()

      return response.data.retorno.pedidos[0].pedido
    } catch (error) {
      console.log(error)
      error.response.data.isBlingError = true
      error.response.data.method = this.createOrder.name

      throw new HttpException(error.response.data, error.response.status)
    }
  }
}

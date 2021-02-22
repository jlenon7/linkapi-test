import { Observable } from 'rxjs'
import { AxiosResponse } from 'axios'
import { ConfigService } from '@nestjs/config'
import { HttpService, Inject, Injectable } from '@nestjs/common'
import { CreateOrderDto } from 'app/Contracts/Dtos/CreateOrderDto'
import { BlingOrderContract } from 'app/Contracts/BlingOrderContract'

@Injectable()
export class BlingCollection {
  private url: string
  private token: string

  @Inject(HttpService) private httpService: HttpService

  constructor(private configService: ConfigService) {
    this.url = this.configService.get('http.bling.services.url')
    this.token = this.configService.get('http.bling.services.token')
  }

  createOrder(
    data: CreateOrderDto,
  ): Observable<AxiosResponse<BlingOrderContract>> {
    console.log('orderVo', data)
    const xml = `
    <?xml version="1.0" encoding="ISO-8859-1"?>
      <pedido>
        <vendedor>${data.seller}</vendedor>
        <cliente>
            <nome>${data.client.name}</nome>
            <email>${data.client.email}</email>
        </cliente>
        <transporte>
          <volume>
            <servico>Internet</servico>
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

    return this.httpService.post(
      `${this.url}/pedido/json/?apikey=${this.token}&xml=${xml}`,
    )
  }
}

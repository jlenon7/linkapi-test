import { ConfigService } from '@nestjs/config'
import { PipedriveDealContract } from 'app/Contracts/PipedriveDealContract'
import { HttpException, HttpService, Inject, Injectable } from '@nestjs/common'

@Injectable()
export class PipedriveCollection {
  private url: string
  private token: string

  @Inject(HttpService) private httpService: HttpService

  constructor(private configService: ConfigService) {
    this.url = this.configService.get('http.services.pipedrive.url')
    this.token = this.configService.get('http.services.pipedrive.token')
  }

  async getDeals(status?: string): Promise<PipedriveDealContract[]> {
    let url = `${this.url}/v1/deals?start=0&api_token=${this.token}`

    if (status) url += `&status=${status}`

    try {
      const response = await this.httpService.get(url).toPromise()

      return response.data.data
    } catch (error) {
      error.response.data.isPipedriveError = true
      error.response.data.method = this.getDeals.name

      throw new HttpException(error.response.data, error.response.status)
    }
  }
}

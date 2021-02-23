import 'start/env'

import { App } from 'test/Utils'
import { AppModule } from 'app/AppModule'
import { PipedriveCollection } from 'app/Services/Collections/PipedriveCollection'

describe('\n[Unit] Pipedrive Collection 🏘', () => {
  it('should get all deals from Pipedrive', async () => {
    const deals = await pipedriveCollection.getDeals()

    expect(deals[0]).toBeTruthy()
  })

  it('should get all deals from Pipedrive by status', async () => {
    const deals = await pipedriveCollection.getDeals('won')

    expect(deals[0]).toBeTruthy()
  })
})

let app: App
let pipedriveCollection: PipedriveCollection

beforeEach(async () => {
  app = await new App([AppModule]).initApp()

  pipedriveCollection = app.getInstance<PipedriveCollection>(
    PipedriveCollection.name,
  )
})

afterEach(async () => {
  await app.closeApp()
})

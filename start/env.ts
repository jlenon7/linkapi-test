import * as path from 'path'
import * as dotenv from 'dotenv'
;(async function() {
  if (process.env.NODE_ENV) {
    dotenv.config({
      path: path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`),
    })
  }

  dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })
})()

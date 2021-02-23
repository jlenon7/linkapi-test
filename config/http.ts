import Env from '@secjs/env/build'

export default {
  /*
  |--------------------------------------------------------------------------
  | Http timeout
  |--------------------------------------------------------------------------
  |
  | Each request has a maximum time limit of five milliseconds
  |
  */
  timeout: 5000,

  /*
  |--------------------------------------------------------------------------
  | Max redirects
  |--------------------------------------------------------------------------
  |
  | The maximum of redirections that a request can do
  |
  */
  maxRedirects: 5,

  /*
  |--------------------------------------------------------------------------
  | Default services
  |--------------------------------------------------------------------------
  |
  | Default services token for communication.
  |
  */
  services: {
    bling: {
      url: Env('BLING_URL', ''),
      token: Env('BLING_TOKEN', ''),
    },
    pipedrive: {
      url: Env('PIPEDRIVE_URL', ''),
      token: Env('PIPEDRIVE_TOKEN', ''),
    },
  },
}

import { ServiceAddons } from '@feathersjs/feathers'
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { Web3Strategy } from './strategies/web3.strategy'

import { Application } from './declarations'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('web3', new Web3Strategy())

  app.use('/authentication', authentication)
}

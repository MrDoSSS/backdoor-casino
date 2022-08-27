// Initializes the `shop` service on path `/shop`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Shop } from './shop.class'
import hooks from './shop.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    shop: Shop & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {}

  // Initialize our service with any options it requires
  app.use('/shop', new Shop(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('shop')

  service.hooks(hooks)
}

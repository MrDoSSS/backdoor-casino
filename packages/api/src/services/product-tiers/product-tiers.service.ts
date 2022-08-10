// Initializes the `product-tiers` service on path `/product-tiers`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { ProductTiers } from './product-tiers.class'
import createModel from '../../models/product-tiers.model'
import hooks from './product-tiers.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'product-tiers': ProductTiers & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  }

  // Initialize our service with any options it requires
  app.use('/product-tiers', new ProductTiers(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('product-tiers')

  service.hooks(hooks)
}

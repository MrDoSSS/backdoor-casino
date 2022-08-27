// Initializes the `rewards` service on path `/rewards`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Rewards } from './rewards.class'
import createModel from '../../models/rewards.model'
import hooks from './rewards.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    rewards: Rewards & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    lean: true,
  }

  // Initialize our service with any options it requires
  app.use('/rewards', new Rewards(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('rewards')

  service.hooks(hooks)
}

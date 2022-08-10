// Initializes the `slot-machine` service on path `/slot-machine`
import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { SlotMachine } from './slot-machine.class'
import hooks from './slot-machine.hooks'

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'slot-machine': SlotMachine & ServiceAddons<any>
  }
}

export default function (app: Application): void {
  const options = {}

  // Initialize our service with any options it requires
  app.use('/slot-machine', new SlotMachine(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('slot-machine')

  service.hooks(hooks)
}

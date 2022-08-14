// Initializes the `withdraw` service on path `/withdraw`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Withdraw } from './withdraw.class';
import hooks from './withdraw.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'withdraw': Withdraw & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/withdraw', new Withdraw(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('withdraw');

  service.hooks(hooks);
}

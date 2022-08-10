// Initializes the `whitelist` service on path `/whitelist`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Whitelist } from './whitelist.class';
import createModel from '../../models/whitelist.model';
import hooks from './whitelist.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'whitelist': Whitelist & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/whitelist', new Whitelist(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('whitelist');

  service.hooks(hooks);
}

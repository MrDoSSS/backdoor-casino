import { Application } from '../declarations'
import users from './users/users.service'
import settings from './settings/settings.service';
import products from './products/products.service';
import productTiers from './product-tiers/product-tiers.service';
import whitelist from './whitelist/whitelist.service';
import rewards from './rewards/rewards.service';
import slotMachine from './slot-machine/slot-machine.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users)
  app.configure(settings);
  app.configure(products);
  app.configure(productTiers);
  app.configure(whitelist);
  app.configure(rewards);
  app.configure(slotMachine);
}

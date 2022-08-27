import { Params, Paginated } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { PaymentError, TooManyRequests, NotFound } from '@feathersjs/errors'

interface CreateData {
  tierId: string
  productId: string
}

interface Result {
  login?: string
  password?: string
  key?: string
}

interface ServiceOptions {}

export class Shop {
  app: Application
  options: ServiceOptions
  lock = new Set<string>()

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options
    this.app = app
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: CreateData, params: Params): Promise<Result> {
    if (this.lock.has(params.user!.address)) {
      throw new TooManyRequests()
    }

    this.lock.add(params.user!.address)

    try {
      const usersService = this.app.service('users')
      const productTiersService = this.app.service('product-tiers')
      const rewardsService = this.app.service('rewards')

      const user = await usersService.get(params.user!.address)
      const tier = await productTiersService.get(data.tierId)

      if (user.prizeTickets < tier.cost) {
        throw new PaymentError('You do not have enough prize tickets')
      }

      const rewards = (await rewardsService.find({
        query: { used: false, product: data.productId },
      })) as Paginated<any>

      if (!rewards.total) {
        throw new NotFound('Reward is out of stock')
      }

      const [reward] = rewards.data

      await usersService.patch(user.address, {
        prizeTickets: user.prizeTickets - tier.cost,
      })

      await rewardsService.patch(reward._id, {
        used: true,
        address: user.address,
      })

      return {
        login: reward.login,
        password: reward.password,
        key: reward.key,
      }
    } catch (e) {
      throw e
    } finally {
      this.lock.delete(params.user!.address)
    }
  }
}

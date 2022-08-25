import { Params } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { PaymentError, TooManyRequests } from '@feathersjs/errors'
import { Transaction } from 'web3-eth'

interface CreateData {
  amount: number
}

interface ServiceOptions {}

export class Withdraw {
  app: Application
  options: ServiceOptions
  lock = new Set<string>()

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options
    this.app = app
  }

  async create(data: CreateData, params: Params): Promise<Transaction | null> {
    if (this.lock.has(params.user!.address)) {
      throw new TooManyRequests()
    }

    this.lock.add(params.user!.address)

    try {
      const usersService = this.app.service('users')
      const web3 = this.app.get('web3Client')
      const account = this.app.get('web3Account')

      const user = await usersService.get(params.user!.address)
      const amount = web3.utils.toBN(user.eth)

      const gasAmount = 21000
      const gasPrice = await web3.eth.getGasPrice()
      const fee = web3.utils.toBN(gasPrice * gasAmount)

      if (amount.sub(fee).isZero() || amount.sub(fee).isNeg()) {
        throw new PaymentError('You do not have enough eth fee')
      }

      const tx = await web3.eth.sendTransaction({
        from: account.address,
        to: user.address,
        gas: 21000,
        value: amount.sub(fee).toString(),
      })

      await usersService.patch(user.address, {
        eth: web3.utils.toBN(user.eth).sub(amount).toString(),
      })

      return tx
    } catch (e) {
      throw e
    } finally {
      this.lock.delete(params.user!.address)
    }
  }
}

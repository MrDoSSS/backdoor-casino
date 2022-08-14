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
    const usersService = this.app.service('users')
    const web3 = this.app.get('web3Client')
    const account = this.app.get('web3Account')

    const user = await usersService.get(params.user!.address)
    const amount = web3.utils.toBN(
      web3.utils.toWei(data.amount.toString(), 'ether')
    )
    let lockedEth = web3.utils.toBN(user.lockedEth)

    try {
      if (amount.gt(web3.utils.toBN(user.availableEth))) {
        throw new PaymentError('You do not have enough eth')
      }

      lockedEth = lockedEth.add(amount)
      await usersService.patch(user.address, {
        lockedEth: lockedEth.toString(),
      })

      const gasAmount = 21000
      const gasPrice = await web3.eth.getGasPrice()
      const fee = gasPrice * gasAmount

      const tx = await web3.eth.sendTransaction({
        from: account.address,
        to: user.address,
        gas: 21000,
        value: amount.sub(web3.utils.toBN(fee)).toString(),
      })

      lockedEth = lockedEth.sub(amount)

      await usersService.patch(user.address, {
        lockedEth: lockedEth.toString(),
        eth: web3.utils.toBN(user.eth).sub(amount).toString(),
      })

      return tx
    } catch (e) {
      if (e instanceof PaymentError) throw e

      await usersService.patch(user.address, {
        lockedEth: lockedEth.sub(amount).toString(),
      })

      return null
    } finally {
      this.lock.delete(params.user!.address)
    }
  }
}

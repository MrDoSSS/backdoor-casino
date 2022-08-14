import { Application } from './declarations'
import { EventData } from 'web3-eth-contract'

export default function (app: Application): void {
  const paymentContract = app.get('web3PaymentContract')

  paymentContract.events.ChipsPurchased(async (err: any, data: EventData) => {
    if (err) return

    const usersService = app.service('users')

    const address = data.returnValues.receiver.toLowerCase()
    const amount = parseInt(data.returnValues.amount)

    const user = await usersService.get(address).catch(() => null)

    if (!user) {
      return usersService.create({ address, playingChips: amount })
    }

    usersService.patch(address, { playingChips: user.playingChips + amount })
  })
}

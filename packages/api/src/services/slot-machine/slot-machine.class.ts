import { Params } from '@feathersjs/feathers'
import { PaymentError, TooManyRequests } from '@feathersjs/errors'
import { Application } from '../../declarations'
import Chance from 'chance'
import omit from 'lodash/omit'

interface Data {}

interface ServiceOptions {}

interface Tier {
  id: number
  multiplier: number
  chance: number
}

interface Symbol {
  id: number
  prize: number
  chance: number
  unit: 'eth' | 'ticket'
}

interface Payline {
  id: number
  combination: number[]
  tier: number
}

interface Result {
  win: boolean
  tier?: Omit<Tier, 'chance'>
  symbol?: Omit<Symbol, 'chance'>
  payline?: Payline
  multiplier?: number
}

const TIERS: Tier[] = [
  {
    id: 1,
    chance: 84,
    multiplier: 1,
  },
  {
    id: 2,
    chance: 15,
    multiplier: 1.5,
  },
  {
    id: 3,
    chance: 1,
    multiplier: 2,
  },
]

const SYMBOLS: Symbol[] = [
  {
    id: 1,
    chance: 0,
    prize: 3,
    unit: 'eth',
  },
  {
    id: 2,
    chance: 0,
    prize: 0.15,
    unit: 'eth',
  },
  {
    id: 3,
    chance: 0,
    prize: 0.085,
    unit: 'eth',
  },
  {
    id: 4,
    chance: 0.1,
    prize: 0.01,
    unit: 'eth',
  },
  {
    id: 5,
    chance: 0.9,
    prize: 0.004,
    unit: 'eth',
  },
  {
    id: 6,
    chance: 9,
    prize: 0.001,
    unit: 'eth',
  },
  {
    id: 7,
    chance: 2,
    prize: 10,
    unit: 'ticket',
  },
  {
    id: 8,
    chance: 3,
    prize: 8,
    unit: 'ticket',
  },
  {
    id: 9,
    chance: 10,
    prize: 6,
    unit: 'ticket',
  },
  {
    id: 10,
    chance: 15,
    prize: 4,
    unit: 'ticket',
  },
  {
    id: 11,
    chance: 25,
    prize: 2,
    unit: 'ticket',
  },
  {
    id: 12,
    chance: 35,
    prize: 1,
    unit: 'ticket',
  },
]

const PAYLINES: Payline[] = [
  {
    id: 1,
    combination: [0, 1, 0, 0, 1, 0, 0, 1, 0],
    tier: 1,
  },
  {
    id: 2,
    combination: [1, 0, 0, 1, 0, 0, 1, 0, 0],
    tier: 1,
  },
  {
    id: 3,
    combination: [0, 0, 1, 0, 0, 1, 0, 0, 1],
    tier: 1,
  },
  {
    id: 4,
    combination: [0, 0, 1, 0, 1, 0, 1, 0, 0],
    tier: 1,
  },
  {
    id: 5,
    combination: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    tier: 1,
  },
  {
    id: 6,
    combination: [1, 0, 0, 0, 1, 0, 1, 0, 0],
    tier: 2,
  },
  {
    id: 7,
    combination: [0, 1, 0, 0, 0, 1, 0, 1, 0],
    tier: 2,
  },
  {
    id: 8,
    combination: [0, 1, 0, 1, 0, 0, 0, 1, 0],
    tier: 2,
  },
  {
    id: 9,
    combination: [0, 0, 1, 0, 1, 0, 0, 0, 1],
    tier: 2,
  },
  {
    id: 10,
    combination: [0, 1, 0, 1, 0, 1, 0, 1, 0],
    tier: 2,
  },
  {
    id: 11,
    combination: [1, 0, 1, 0, 1, 0, 0, 1, 0],
    tier: 2,
  },
  {
    id: 12,
    combination: [0, 1, 0, 0, 1, 0, 1, 0, 1],
    tier: 2,
  },
  {
    id: 13,
    combination: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    tier: 3,
  },
]

const WIN_CHANCE = 33

export class SlotMachine {
  app: Application
  options: ServiceOptions
  lock = new Set<string>()

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options
    this.app = app
  }

  async create(data: Data, params: Params): Promise<Result> {
    if (this.lock.has(params.user!.address)) {
      throw new TooManyRequests()
    }

    this.lock.add(params.user!.address)

    try {
      const usersService = this.app.service('users')
      const user = await usersService.get(params!.user!.address)
      const web3 = this.app.get('web3Client')
      const collectionContract = this.app.get('web3CollectionContract')
      const tokensOfOwner = await collectionContract.methods
        .tokensOfOwner(user.address)
        .call()

      if (tokensOfOwner.length < 3) {
        throw new PaymentError('You do not have enough tokens')
      }

      if (user.playingChips <= 0) {
        throw new PaymentError('You do not have enough playing chips')
      }

      await usersService.patch(user.address, {
        playingChips: user.playingChips - 1,
      })

      const chance = Chance()
      const win = chance.bool({ likelihood: WIN_CHANCE })
      const pathData: {
        playingChips: number
        prizeTickets?: number
        eth?: string
      } = {
        playingChips: user.playingChips - 1,
      }

      if (!win) {
        await usersService.patch(user.address, pathData)

        return {
          win: false,
        }
      }

      const tier = chance.weighted(
        TIERS,
        TIERS.map((t) => t.chance)
      )

      const symbol = chance.weighted(
        SYMBOLS,
        SYMBOLS.map((s) => s.chance)
      )

      const payline = chance.pickone(PAYLINES.filter((p) => p.tier === tier.id))

      const result = {
        win: true,
        tier: omit(tier, ['chance']),
        symbol: omit(symbol, ['chance']),
        multiplier: tier.multiplier * Math.floor(tokensOfOwner.length / 3),
        payline,
      }

      switch (symbol.unit) {
        case 'eth':
          const amount = web3.utils.toBN(
            web3.utils.toWei(
              (symbol.prize * result.multiplier).toString(),
              'ether'
            )
          )
          pathData.eth = web3.utils.toBN(user.eth).add(amount).toString()
          break
        case 'ticket':
          pathData.prizeTickets =
            user.prizeTickets + symbol.prize * result.multiplier
          break
      }

      await usersService.patch(user.address, pathData)

      return result
    } catch (e) {
      throw e
    } finally {
      this.lock.delete(params.user!.address)
    }
  }
}

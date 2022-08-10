import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from '@feathersjs/feathers'
import { PaymentError } from '@feathersjs/errors'
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
  combination: number[]
  tier: number
}

interface Result {
  win: boolean
  tier?: Omit<Tier, 'chance'>
  symbol?: Omit<Symbol, 'chance'>
  payline?: Payline
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
    combination: [0, 0, 0, 1, 1, 1, 0, 0, 0],
    tier: 1,
  },
  {
    combination: [1, 1, 1, 0, 0, 0, 0, 0, 0],
    tier: 1,
  },
  {
    combination: [0, 0, 0, 0, 0, 0, 1, 1, 1],
    tier: 1,
  },
  {
    combination: [0, 0, 1, 0, 1, 0, 1, 0, 0],
    tier: 1,
  },
  {
    combination: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    tier: 1,
  },
  {
    combination: [1, 0, 1, 0, 1, 0, 0, 0, 0],
    tier: 2,
  },
  {
    combination: [0, 0, 0, 1, 0, 1, 0, 1, 0],
    tier: 2,
  },
  {
    combination: [0, 1, 0, 1, 0, 1, 0, 0, 0],
    tier: 2,
  },
  {
    combination: [0, 0, 0, 0, 1, 0, 1, 0, 1],
    tier: 2,
  },
  {
    combination: [0, 1, 0, 1, 0, 1, 0, 1, 0],
    tier: 2,
  },
  {
    combination: [1, 0, 0, 0, 1, 1, 1, 0, 0],
    tier: 2,
  },
  {
    combination: [0, 0, 1, 1, 1, 0, 0, 0, 1],
    tier: 2,
  },
  {
    combination: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    tier: 3,
  },
]

const WIN_CHANCE = 33

export class SlotMachine implements ServiceMethods<Data> {
  app: Application
  options: ServiceOptions

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options
    this.app = app
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Data> {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: Params): Promise<Result> {
    const userService = this.app.service('users')
    const user = await userService.get(params!.user!.address)

    if (user.balance <= 0) {
      throw new PaymentError('Invalid balance')
    }

    const { bool, weighted, pickone } = Chance()
    const win = bool({ likelihood: WIN_CHANCE })

    if (!win) {
      return {
        win: false,
      }
    }

    const tier = weighted(
      TIERS,
      TIERS.map((t) => t.chance)
    )

    const symbol = weighted(
      SYMBOLS,
      SYMBOLS.map((s) => s.chance)
    )

    const payline = pickone(PAYLINES.filter((p) => p.tier === tier.id))

    const result = {
      win: true,
      tier: omit(tier, ['chance']),
      symbol: omit(symbol, ['chance']),
      payline,
    }

    return result
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return { id }
  }
}

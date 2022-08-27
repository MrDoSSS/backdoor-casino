import * as authentication from '@feathersjs/authentication'
import checkPermissions from 'feathers-permissions'
import limitToUser from '../../hooks/limit-to-user'
import { populate } from 'feathers-hooks-common'

// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks

const rewardSchema = {
  include: {
    service: 'products',
    nameAs: 'product',
    parentField: 'product',
    childField: '_id',
  },
}

export default {
  before: {
    all: [authenticate('jwt')],
    find: [limitToUser()],
    get: [limitToUser()],
    create: [checkPermissions({ roles: ['admin'] })],
    update: [checkPermissions({ roles: ['admin'] })],
    patch: [checkPermissions({ roles: ['admin'] })],
    remove: [checkPermissions({ roles: ['admin'] })],
  },

  after: {
    all: [],
    find: [populate({ schema: rewardSchema })],
    get: [populate({ schema: rewardSchema })],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}

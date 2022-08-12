import checkPermissions from 'feathers-permissions'
import * as authentication from '@feathersjs/authentication'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [checkPermissions({ roles: ['admin'] })],
    patch: [checkPermissions({ roles: ['admin'] })],
    remove: [checkPermissions({ roles: ['admin'] })],
  },

  after: {
    all: [],
    find: [],
    get: [],
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

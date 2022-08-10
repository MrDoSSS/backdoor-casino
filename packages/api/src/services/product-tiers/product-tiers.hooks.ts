import * as feathersAuthentication from '@feathersjs/authentication'
import checkPermissions from 'feathers-permissions'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), checkPermissions({ roles: ['admin'] })],
    update: [authenticate('jwt'), checkPermissions({ roles: ['admin'] })],
    patch: [authenticate('jwt'), checkPermissions({ roles: ['admin'] })],
    remove: [authenticate('jwt'), checkPermissions({ roles: ['admin'] })],
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

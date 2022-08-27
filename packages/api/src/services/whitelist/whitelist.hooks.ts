import * as feathersAuthentication from '@feathersjs/authentication'
import checkPermissions from 'feathers-permissions'
import limitToUser from '../../hooks/limit-to-user'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks

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

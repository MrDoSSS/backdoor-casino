import * as feathersAuthentication from '@feathersjs/authentication'
import checkPermissions from 'feathers-permissions'
import limitToUser from '../../hooks/limit-to-user'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks

export default {
  before: {
    all: [],
    find: [authenticate('jwt'), limitToUser()],
    get: [authenticate('jwt'), limitToUser()],
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

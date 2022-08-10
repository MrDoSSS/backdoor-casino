import * as feathersAuthentication from '@feathersjs/authentication'
import limitToUser from '../../hooks/limit-to-user'
import { discard, iff, isProvider } from 'feathers-hooks-common'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks

const discardData = iff(isProvider('external'), discard('nonce', 'permissions'))

export default {
  before: {
    all: [],
    find: [authenticate('jwt'), limitToUser()],
    get: [],
    create: [],
    update: [authenticate('jwt'), limitToUser(), discardData],
    patch: [authenticate('jwt'), limitToUser(), discardData],
    remove: [authenticate('jwt'), limitToUser()],
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

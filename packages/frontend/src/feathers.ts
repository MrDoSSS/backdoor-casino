import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import auth from '@feathersjs/authentication-client'

export const api = feathers()
  .configure(rest(import.meta.env.VITE_API_URL).fetch(fetch))
  .configure(auth())

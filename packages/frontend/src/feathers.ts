import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import auth from '@feathersjs/authentication-client'

export const api = feathers()
  .configure(rest('http://localhost:3030').fetch(fetch))
  .configure(auth())

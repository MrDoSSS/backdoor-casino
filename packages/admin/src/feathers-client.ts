import feathers from '@feathersjs/client'
import rest from '@feathersjs/rest-client'
import auth from '@feathersjs/authentication-client'

const app = feathers()
const restClient = rest(import.meta.env.VITE_API_URL)

app.configure(restClient.fetch(window.fetch.bind(window)))
app.configure(auth({ jwtStrategy: 'jwt', storageKey: 'feathers-jwt' }))

export default app

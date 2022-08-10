import client from './feathers-client'
import { AuthProvider } from 'react-admin'

const login = async (params: Record<string, string>) => {
  const { address, signature } = params
  const { accessToken } = await client.authenticate({
    strategy: 'web3',
    address,
    signature,
  })
  return client.authenticate({ strategy: 'jwt', accessToken })
}
const logout = () => {
  return client.logout()
}
const checkAuth = async () => {
  const hasJwtInStorage = !!localStorage.getItem('feathers-jwt')
  const hasReAuthenticate =
    Object.getOwnPropertyNames(client).includes('reAuthenticate') &&
    typeof client.reAuthenticate === 'function'

  if (hasJwtInStorage && hasReAuthenticate) {
    return client
      .reAuthenticate()
      .then(() => Promise.resolve())
      .catch(() => Promise.reject())
  }

  return hasJwtInStorage ? Promise.resolve() : Promise.reject()
}
const checkError = (error: { code: number }) => {
  const { code } = error
  if (code === 401 || code === 403) {
    localStorage.removeItem('feathers-jwt')
    return Promise.reject()
  }
  return Promise.resolve()
}

const getPermissions = () => {
  return Promise.resolve()
}

export default {
  login,
  logout,
  checkAuth,
  checkError,
  getPermissions,
} as unknown as AuthProvider

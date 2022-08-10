import Web3 from 'web3/dist/web3.min'
import authProvider from './auth-provider'

export let instance: Web3
export let contract: any
export let currentAccount: string
export let initialized: boolean
export let connected: boolean

export const init = () => {
  if (!window.ethereum || initialized) return

  instance = new Web3(window.ethereum)

  window.ethereum.on('chainChanged', () => window.location.reload())
  window.ethereum.on('accountsChanged', async () => {
    console.log(123)
    await authProvider.logout({})
    window.location.reload()
  })
  initialized = true
}

export const connect = async () => {
  if (!window.ethereum) return

  try {
    await window.ethereum.request?.({ method: 'eth_requestAccounts' })
    currentAccount = window.ethereum.selectedAddress?.toLowerCase()
    connected = !!window.ethereum.selectedAddress
  } catch (e) {
    console.error(e)
  }
}

import { createPinia } from 'pinia'
import { useWalletStore } from './wallet'
import { useWhitelistStore } from './whitelist'
import { useAuthStore } from './auth'
import { useContractStore } from './contract'
import { setInbrowserProvider } from '@/ethereum'
import { useTwitterCodeStore } from './twitter-code'
import { initWeb3 } from '@/web3'

export const pinia = createPinia()

export const initStore: {
  ready: boolean
  readyHandlers: (() => void)[]
  install: () => Promise<void>
  isReady: () => Promise<void>
} = {
  ready: false,
  readyHandlers: [],
  async install() {
    try {
      const walletStore = useWalletStore()
      const authStore = useAuthStore()

      setInbrowserProvider()

      walletStore.init()
      await walletStore.checkAccount()
      await authStore.checkAuth()

      if (
        authStore.loggedIn &&
        walletStore.connected &&
        authStore.address === walletStore.currentAccount
      ) {
        initWeb3(walletStore.currentAccount)

        const whitelistStore = useWhitelistStore()
        const twitterCodeStore = useTwitterCodeStore()
        const contractStore = useContractStore()

        await whitelistStore.find(walletStore.currentAccount)
        await twitterCodeStore.find(walletStore.currentAccount)
        await contractStore.init(walletStore.currentAccount)
      } else {
        walletStore.disconnect()
      }
    } finally {
      this.ready = true

      this.readyHandlers.forEach((resolve) => resolve())
    }
  },
  isReady() {
    if (this.ready) return Promise.resolve()

    return new Promise((resolve) => {
      this.readyHandlers.push(resolve)
    })
  },
}

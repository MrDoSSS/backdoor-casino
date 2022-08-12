import { api } from '@/feathers'
import { useUserStore } from './user'
import { web3 } from '@/web3'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    address: '',
    loggedIn: false,
  }),
  actions: {
    async signIn(address: string) {
      try {
        address = address.toLowerCase()
        const usersStore = useUserStore()
        let user = await usersStore.get(address).catch(() => false)

        if (!user) {
          user = await usersStore.create({ address })
        }

        const signature = await web3.eth.personal.sign(
          web3.utils.utf8ToHex(
            `Welcome to Backdoor Casino!\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\nAddress: ${address}\n\nNonce: ${user.nonce}`
          ),
          address,
          ''
        )
        const { accessToken } = await api.authenticate({
          address,
          signature,
          strategy: 'web3',
        })

        await api.authenticate({
          accessToken,
          strategy: 'jwt',
        })

        this.address = address
        this.loggedIn = true
      } catch {
        this.loggedIn = false
      }
    },
    async checkAuth() {
      const hasJwtInStorage = !!localStorage.getItem('feathers-jwt')
      if (hasJwtInStorage) {
        this.loggedIn = await api
          .reAuthenticate()
          .then(({ user }) => {
            this.address = user.address
            return true
          })
          .catch(() => {
            localStorage.removeItem('feathers-jwt')
            return false
          })
      } else {
        this.loggedIn = false
      }
    },
    async signOut() {
      await api.logout()
      this.loggedIn = false
    },
  },
})

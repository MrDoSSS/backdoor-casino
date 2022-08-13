import { defineStore } from 'pinia'
import { api } from '@/feathers'

const service = api.service('users')

type User = {
  address: string
  username: string
  playingChips: number
  unclaimedPlayingChips: number
  prizeTickets: number
  eth: number
  nonce: number
}

export const useUserStore = defineStore('user', {
  state: (): { user: User | null } => ({
    user: null,
  }),
  actions: {
    async get(address: string) {
      this.user = await service.get(address)
      return this.user
    },
    async create(data: any) {
      this.user = await service.create(data)
      return this.user
    },
  },
})

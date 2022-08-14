import { defineStore } from 'pinia'
import { usersService } from '@/services'

type User = {
  address: string
  username: string
  playingChips: number
  unclaimedPlayingChips: number
  prizeTickets: number
  eth: string
  nonce: number
}

export const useUserStore = defineStore('user', {
  state: (): { user: User | null } => ({
    user: null,
  }),
  actions: {
    async get(address: string) {
      this.user = await usersService.get(address)
      return this.user
    },
    async create(data: any) {
      this.user = await usersService.create(data)
      return this.user
    },
  },
})

import { defineStore } from 'pinia'
import { whitelistService } from '@/services'

export const useWhitelistStore = defineStore('whitelist', {
  state: () => ({
    exists: false,
    signature: '',
  }),
  actions: {
    async find(address: string) {
      const { data, total } = await whitelistService.find({
        query: { address },
      })

      if (total) {
        const [result] = data
        this.signature = result.signature
      }

      this.exists = !!total
    },
    reset() {
      this.exists = false
      this.signature = ''
    },
  },
})

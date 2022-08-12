import { defineStore } from 'pinia'
import { api } from '@/feathers'

const service = api.service('whitelist')

export const useWhitelistStore = defineStore('whitelist', {
  state: () => ({
    exists: false,
    signature: '',
  }),
  actions: {
    async find(address: string) {
      const { data, total } = await service.find({ query: { address } })

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

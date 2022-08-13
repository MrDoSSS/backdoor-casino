import { defineStore } from 'pinia'
import { api } from '@/feathers'

const service = api.service('twitter-codes')

export const useTwitterCodeStore = defineStore('twitter-code', {
  state: () => ({
    exists: false,
    code: '',
  }),
  actions: {
    async find(address: string) {
      const { data, total } = await service.find({ query: { address } })

      if (total) {
        const [result] = data
        this.code = result.code
      }

      this.exists = !!total
    },
    create(data: any) {
      return service.create(data)
    },
    reset() {
      this.exists = false
      this.code = ''
    },
  },
})

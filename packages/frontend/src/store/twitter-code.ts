import { defineStore } from 'pinia'
import { twitterCodesService } from '@/services'

export const useTwitterCodeStore = defineStore('twitter-code', {
  state: () => ({
    exists: false,
    code: '',
  }),
  actions: {
    async find(address: string) {
      const { data, total } = await twitterCodesService.find({
        query: { address },
      })

      if (total) {
        const [result] = data
        this.code = result.code
      }

      this.exists = !!total
    },
    create(data: any) {
      return twitterCodesService.create(data)
    },
    reset() {
      this.exists = false
      this.code = ''
    },
  },
})

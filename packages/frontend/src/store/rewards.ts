import { defineStore } from 'pinia'
import { rewardsService } from '@/services'

export const useRewardStore = defineStore('reward', {
  state: (): {
    items: BD.Reward[]
  } => ({
    items: [],
  }),
  actions: {
    async fetch() {
      const { data } = await rewardsService.find({})
      this.items = data
    },
  },
})

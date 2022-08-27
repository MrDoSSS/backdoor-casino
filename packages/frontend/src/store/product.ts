import { defineStore } from 'pinia'
import { productsService } from '@/services'

export const useProductStore = defineStore('product', {
  state: (): {
    items: BD.Product[]
  } => ({
    items: [],
  }),
  getters: {
    byTier: (state) => (tierId: string) =>
      state.items.filter((item) => item.tier === tierId),
  },
  actions: {
    async fetch() {
      const { data } = await productsService.find({})
      this.items = data
    },
  },
})

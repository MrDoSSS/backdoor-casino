import { defineStore } from 'pinia'
import { productTiersService } from '@/services'

export const useProductTierStore = defineStore('product-tier', {
  state: (): {
    items: BD.ProductTier[]
  } => ({
    items: [],
  }),
  actions: {
    async fetch() {
      const { data } = await productTiersService.find({})
      this.items = data
    },
  },
})

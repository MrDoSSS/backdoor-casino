import { defineStore } from 'pinia'
import { api } from '@/feathers'

const service = api.service('users')

export const useUserStore = defineStore('user', {
  actions: {
    get(address: string) {
      return service.get(address)
    },
    create(data: any) {
      return service.create(data)
    },
  },
})

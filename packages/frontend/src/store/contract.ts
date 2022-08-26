import { defineStore } from 'pinia'
import { web3, collectionContract } from '@/web3'

export const useContractStore = defineStore('contract', {
  state: () => ({
    paused: false,
    presaled: false,
    allowedPublic: false,
    price: 0,
    presalePrice: 0,
    totalSupply: 0,
    maxTotalSupply: 0,
    numberMinted: 0,
    tokens: [],
  }),

  actions: {
    async init(address: string) {
      this.totalSupply = await collectionContract.methods
        .totalSupply()
        .call()
        .then(parseInt)
      this.presaled = await collectionContract.methods.presaled().call()
      this.paused = await collectionContract.methods.paused().call()
      this.maxTotalSupply = await collectionContract.methods
        .maxTotalSupply()
        .call()
        .then(parseInt)
      this.price = await collectionContract.methods
        .price()
        .call()
        .then(parseInt)
      this.presalePrice = await collectionContract.methods
        .presalePrice()
        .call()
        .then(parseInt)

      await this.fetchTokensOfOwner(address)
    },
    async fetchTokensOfOwner(address: string) {
      this.tokens = await collectionContract.methods
        .tokensOfOwner(address)
        .call()
    },
  },
})

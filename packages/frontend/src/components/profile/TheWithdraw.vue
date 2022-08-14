<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { withdrawService } from '@/services'
import { web3 } from '@/web3'
import { ref, computed } from 'vue'

const loading = ref(false)

const userStore = useUserStore()

const availableEth = computed(() =>
  parseFloat(web3.utils.fromWei(userStore.user!.availableEth, 'ether'))
)
const lockedEth = computed(() =>
  parseFloat(web3.utils.fromWei(userStore.user!.lockedEth, 'ether'))
)

const amount = ref(availableEth.value)

const withdraw = async () => {
  try {
    loading.value = true
    await withdrawService.create({ amount: amount.value })
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="mb-1 lh-1">
    Available Balance:
    <span class="ms-1">{{ availableEth }} ETH</span>
  </div>
  <div class="mb-1 lh-1">
    Locked Balance:
    <span class="ms-1">{{ lockedEth }} ETH</span>
  </div>
  <div class="mb-2 lh-1">
    Withdraw Amount:
    <span class="ms-1"
      ><input type="number" :max="availableEth" step="0.01" v-model="amount"
    /></span>
  </div>
  <button
    class="btn btn-primary btn-sm"
    :disabled="availableEth === 0 || loading"
    @click="withdraw"
  >
    Request Withdraw
  </button>
</template>

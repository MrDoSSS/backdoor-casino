<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { withdrawService } from '@/services'
import { web3 } from '@/web3'
import { ref, computed } from 'vue'

const loading = ref(false)
const success = ref(false)
const error = ref(false)

const userStore = useUserStore()

const eth = computed(() =>
  parseFloat(web3.utils.fromWei(userStore.user!.eth, 'ether'))
)
const withdraw = async () => {
  success.value = false
  error.value = false

  try {
    loading.value = true
    await withdrawService.create({})
    userStore.user!.eth = '0'
    success.value = true
  } catch (e) {
    error.value = true
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="mb-2 lh-1">
    ETH Balance:
    <span class="ms-1">{{ eth }}</span>
  </div>
  <button
    class="btn btn-primary btn-sm btn-round"
    :disabled="eth === 0 || loading"
    @click="withdraw"
  >
    Withdraw
  </button>
  <div class="mt-1">
    <div class="text-success" v-if="success">
      ETH will be sent to your wallet shortly.
    </div>
    <div class="text-danger" v-else-if="error">Something went wrong...</div>
    <div class="text-warning" v-else-if="loading">Wait...</div>
  </div>
</template>

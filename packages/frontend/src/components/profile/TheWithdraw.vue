<script lang="ts" setup>
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
</script>

<template>
  <div class="mb-2 lh-1">
    Current Balance: <span class="ms-1">{{ userStore.user?.eth }} ETH</span>
  </div>
  <button class="btn btn-primary btn-sm" :disabled="userStore.user?.eth === 0">
    Request Withdraw
  </button>
</template>

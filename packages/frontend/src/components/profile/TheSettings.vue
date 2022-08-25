<script lang="ts" setup>
import { useWalletStore } from '@/store/wallet'
import { useUserStore } from '@/store/user'
import { ref, computed } from 'vue'

const walletStore = useWalletStore()
const userStore = useUserStore()

const username = ref(
  window.localStorage.getItem('username') || userStore.user!.username
)

const save = () => {
  window.localStorage.setItem('username', username.value)
}
</script>

<template>
  <div class="mb-1 lh-1">
    Username:
    <input class="ms-1" v-model="username" />
  </div>
  <div class="mb-2 lh-1">
    User Wallet: <span class="ms-1">{{ walletStore.currentAccount }}</span>
  </div>
  <button class="btn btn-primary btn-sm btn-round" @click="save">Save</button>
</template>

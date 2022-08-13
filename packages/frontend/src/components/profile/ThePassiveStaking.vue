<script lang="ts" setup>
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
</script>

<template>
  <div class="mb-1 lh-1">
    Playing Chips Balance:
    <span class="ms-1">{{ userStore.user?.playingChips }}</span>
  </div>
  <div class="mb-1 lh-1">
    Yield Every 4 Hours: <span class="ms-1">2 Playing Chips</span>
  </div>
  <div class="mb-2 lh-1">
    Unclaimed Chips:
    <span class="ms-1">{{ userStore.user?.unclaimedPlayingChips }}</span>
  </div>
  <div class="d-flex">
    <button class="btn btn-outline-light btn-sm me-2">Buy chips</button>
    <button
      class="btn btn-primary btn-sm"
      :disabled="userStore.user?.unclaimedPlayingChips === 0"
    >
      Claim
    </button>
  </div>
</template>

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
  <div class="fs-6 text mb-1">Buy more reels to yield more chips.</div>
  <div class="d-flex">
    <a class="btn btn-outline-light btn-sm btn-round me-1"> Buy on OS </a>
    <button
      class="btn btn-primary btn-sm btn-round"
      :disabled="userStore.user?.unclaimedPlayingChips === 0"
    >
      Claim
    </button>
  </div>
</template>

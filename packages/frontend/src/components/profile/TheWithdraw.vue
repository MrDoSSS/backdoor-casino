<script lang="ts" setup>
import { ref } from 'vue'

const amount = ref(0)
</script>

<template>
  <div class="mb-1 lh-1">
    Current Balance: <span class="ms-1">0.075 ETH</span>
  </div>
  <div class="mb-2 lh-1">
    Withdraw Amount:
    <input
      class="ms-1"
      type="number"
      step="0.01"
      min="0"
      v-model.number="amount"
    />
  </div>
  <button class="btn btn-primary btn-sm">Request Withdraw</button>
</template>

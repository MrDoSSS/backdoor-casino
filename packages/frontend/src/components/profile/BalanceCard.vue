<script lang="ts" setup>
import { computed } from 'vue'
import { web3 } from '@/web3'

interface Props {
  value?: string | number
  type?: 'eth' | 'number'
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  type: 'number',
})

const value = computed(() =>
  props.type === 'eth'
    ? web3.utils.fromWei(props.value.toString())
    : props.value
)
</script>

<template>
  <div class="balance-card">
    <div class="balance-card-value text-success lh-1">{{ value }}</div>
    <div class="balance-card-label lh-1">{{ props.label }}</div>
  </div>
</template>

<style lang="scss" scoped>
.balance-card {
  border: 0.1rem solid #fff;
  border-radius: 0.4rem;
  padding: 1.5rem 1.8rem;

  &-value {
    font-size: 4.8rem;
  }
}
</style>

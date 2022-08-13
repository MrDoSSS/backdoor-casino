<script lang="ts" setup>
interface Props {
  value: string | number
  label: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="balance-card">
    <div class="balance-card-value text-success lh-1">{{ props.value }}</div>
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

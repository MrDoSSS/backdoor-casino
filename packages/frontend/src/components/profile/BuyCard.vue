<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  type: 'small' | 'medium' | 'big'
  best?: boolean
}

const props = defineProps<Props>()

const amountMap = {
  small: 100,
  medium: 400,
  big: 1000,
}

const priceMap = {
  small: 0.02,
  medium: 0.05,
  big: 0.1,
}

const amount = computed(() => amountMap[props.type])
const price = computed(() => priceMap[props.type])
</script>

<template>
  <div class="buy-card">
    <div class="buy-card-best" v-if="props.best">BEST VALUE</div>
    <div class="buy-card-content">
      <img src="/profile/money.png" alt="" />
      <div class="buy-card-title text-success">{{ amount }}x Playing Chips</div>
      <div>Only {{ price }} ETH</div>
    </div>
    <button class="buy-card-btn d-block text-center">
      Buy <img src="/profile/cart.svg" alt="" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.buy-card {
  background-color: #000;
  border: 0.1rem solid #fff;
  border-radius: 0.4rem;
  overflow: hidden;
  position: relative;

  @include media-breakpoint-up(lg) {
    max-width: 20rem;
  }

  &-best {
    position: absolute;
    font-size: 1.2rem;
    top: 0.8rem;
    left: 0.8rem;
    border-bottom: 1px solid #fff;
  }

  &-content {
    padding: 2.5rem 1rem 2rem;
    text-align: center;

    img {
      width: 9rem;
      height: 9rem;
      margin: auto;
      margin-bottom: 1rem;
    }
  }

  &-title {
    font-weight: 600;
    line-height: 1;
  }

  &-btn {
    text-transform: uppercase;
    padding: 0.8rem 1rem 0.5rem;
    background-color: #fff;
    font-weight: 700;
    border: none;
    width: 100%;
    line-height: 1;

    img {
      display: inline;
      width: 1.5rem;
    }
  }
}
</style>

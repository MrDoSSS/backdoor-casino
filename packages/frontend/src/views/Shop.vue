<script lang="ts" setup>
import { useProductTierStore } from '@/store/product-tier'
import { useProductStore } from '@/store/product'
import sortBy from 'lodash/sortBy'
import { computed } from 'vue'
import ProductsSlider from '@/components/shop/ProductsSlider.vue'

const productTierStore = useProductTierStore()
const productStore = useProductStore()

await productTierStore.fetch()
await productStore.fetch()

const tiers = computed(() => sortBy(productTierStore.items, ['order']))
const icon = (order: number) => {
  switch (order) {
    case 1:
      return '/shop/crown-gold.svg'
    case 2:
      return '/shop/crown-silver.svg'
    case 3:
      return '/shop/crown-bronze.svg'
  }
}
</script>

<template>
  <div class="shop">
    <div class="container">
      <h3>Shop</h3>
      <p class="mb-4">
        Here you are able to exchange your Prize Tickets for the desired
        service, you just click on the reward you want and confirm the purchase.
        If you have enough Prize Tickets you will claim the reward by receiving
        the code to access or account details on the product.
      </p>

      <div class="tier" v-for="tier in tiers" :key="tier._id">
        <h3>{{ tier.name }} <img :src="icon(tier.order)" /></h3>
        <ProductsSlider :tier="tier" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.shop {
  padding: 8rem 0 15rem;

  h3 {
    position: relative;
    margin-bottom: 4rem;

    &:after {
      content: '';
      position: absolute;
      width: 4rem;
      height: 0.6rem;
      background-color: $primary;
      left: 0;
      bottom: -0.5rem;
    }

    img {
      display: inline-block;
      width: 3.2rem;
    }
  }

  p {
    max-width: 58rem;
    line-height: 1.13;
  }

  .tier {
    &:not(:last-child) {
      margin-bottom: 10rem;
    }
  }
}
</style>

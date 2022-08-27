<script lang="ts" setup>
import { useProductStore } from '@/store/product'
import { computed, inject } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Virtual } from 'swiper'
import ProductItem from './ProductItem.vue'

import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps<{ tier: BD.ProductTier }>()
const mq = inject('mq') as any

const productStore = useProductStore()

const products = computed(() => productStore.byTier(props.tier._id))
</script>

<template>
  <div
    class="products-slider d-flex align-items-center justify-content-center"
    v-if="products.length"
  >
    <div class="products-slider-nav products-slider-nav--prev">
      <i class="bi bi-caret-left-fill"></i>
    </div>
    <Swiper
      :slides-per-view="mq.lgPlus ? 5 : mq.smPlus ? 3 : 2"
      :space-between="mq.lgPlus ? 35 : 25"
      :modules="[Navigation, Virtual]"
      :navigation="{
        nextEl: '.products-slider-nav--next',
        prevEl: '.products-slider-nav--prev',
      }"
      loop
      :centered-slides="mq.smPlus"
    >
      <SwiperSlide v-for="product in products" :key="product._id">
        <ProductItem :product="product" :cost="tier.cost" />
      </SwiperSlide>
    </Swiper>

    <div class="products-slider-nav products-slider-nav--next">
      <i class="bi bi-caret-right-fill"></i>
    </div>
  </div>
</template>

<style lang="scss">
.products-slider {
  position: relative;

  .swiper {
  }

  &-nav {
    cursor: pointer;

    &--prev {
      left: 0;
      margin-right: 2rem;

      @include media-breakpoint-down(sm) {
        display: none;
      }
    }

    &--next {
      right: 0;
      margin-left: 2rem;

      @include media-breakpoint-down(sm) {
        margin-left: 1rem;
      }
    }
  }
}
</style>

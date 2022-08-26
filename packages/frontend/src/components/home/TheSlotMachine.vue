<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Virtual } from 'swiper'
import { inject, ref, onMounted, onUnmounted } from 'vue'

import 'swiper/css'
import 'swiper/css/navigation'

const mq = inject('mq') as any

const symbols = [
  {
    name: 'Oni | Rank #1',
    image: '/symbols/oni.png',
  },
  {
    name: 'Samurai | Rank #2',
    image: '/symbols/samurai.png',
  },
  {
    name: 'Gold Coin | Rank #3',
    image: '/symbols/gold-coin.png',
  },
  {
    name: 'Card | Rank #4',
    image: '/symbols/card.png',
  },
  {
    name: 'Girl on the Bridge | Rank #5',
    image: '/symbols/girl-bridge.png',
  },
  {
    name: 'Banzai Tree | Rank #6',
    image: '/symbols/banzai-tree.png',
  },
  {
    name: 'Couble Dice | Rank #7',
    image: '/symbols/couble-dice.png',
  },
  {
    name: 'Katana | Rank #8',
    image: '/symbols/katana.png',
  },
  {
    name: 'Clubs | Rank #9',
    image: '/symbols/clubs.png',
  },
  {
    name: 'Shuriken | Rank #10',
    image: '/symbols/shuriken.png',
  },
  {
    name: 'Heart | Rank #11',
    image: '/symbols/heart.png',
  },
  {
    name: 'Fish | Rank #12',
    image: '/symbols/fish.png',
  },
]
</script>

<template>
  <section class="slot-machine" id="slot-machine">
    <div class="container">
      <h2 class="mb-4">Triple ONI</h2>
      <div class="row justify-content-between mb-5 gx-lg-3">
        <div class="col-12 col-lg-6 order-2 order-lg-1">
          <video autoplay loop muted playsinline>
            <img src="/home/slot-machine.jpg" alt="Slot machine" />
            <source src="/home/triple-oni.mp4" />
          </video>
        </div>
        <div class="col-12 col-lg-6 mb-4 mb-lg-0 order-1 order-lg-2">
          <h4>About Slot Machine</h4>
          <p class="mb-3">
            Our Slot Machine pivots around the Japanese mythology since it's one
            that really emphasizes the lucky aspect of life. Our 2 main
            characters in the slot machine are “Oni” and “The Samurai”, Oni
            being the worst devil spirit there is in Japanese mythology and The
            Samurai being the challenger of the devil.
          </p>
          <p>
            Holders will be able to play for free by using the “Playing Chips”,
            the “Playing Chips” are earned passively by just holding the NFT.
            Another way is to buy them for Eth in the “Shop”.
          </p>
        </div>
      </div>
      <div class="row justify-content-end align-items-center gx-lg-4 mb-lg-0">
        <div class="col-12 col-lg-4 order-3 order-lg-1">
          <lottie-player
            class="slot-machine-cat"
            autoplay
            loop
            src="/home/cat.json"
          />
        </div>
        <div class="col-12 col-lg-4 order-1 order-lg-2">
          <h4 class="text-lg-end text-start">Paylines</h4>
          <p class="text-lg-end text-start">
            These are the winning combinations and patterns that will pay you
            out a reward depending on the symbol applied.
          </p>
        </div>
        <div class="col-12 col-lg-4 order-2 order-lg-3">
          <img
            src="/home/paylines.jpg"
            alt="Paylines"
            class="slot-machine-img"
          />
        </div>
      </div>
      <div>
        <h4>Symbols</h4>
        <p class="mb-4">
          These are the symbols in the Slot Machine. Slide left to see all
          symbols and rankings.
        </p>
        <div class="slot-machine-slider">
          <Swiper
            :slides-per-view="mq.lgPlus ? 5 : mq.smPlus ? 3 : 2"
            :space-between="18"
            :modules="[Navigation, Virtual]"
            :navigation="{
              nextEl: '.slot-machine-slider-nav--next',
              prevEl: '.slot-machine-slider-nav--prev',
            }"
            loop
            :centered-slides="mq.smPlus"
          >
            <SwiperSlide
              v-for="(symbol, index) in symbols"
              :key="symbol.name"
              :virtual-index="index"
            >
              <div class="slot-machine-slider-slide">
                <img :src="symbol.image" :alt="symbol.name" class="mb-2" />
                <span class="slot-machine-slider-slide-name">{{
                  symbol.name
                }}</span>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="slot-machine-slider-nav slot-machine-slider-nav--prev">
            <i class="bi bi-caret-left-fill"></i>
          </div>
          <div class="slot-machine-slider-nav slot-machine-slider-nav--next">
            <i class="bi bi-caret-right-fill"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.slot-machine {
  background: url('/backgrounds/bg-slot-machine.png') no-repeat;
  position: relative;

  @include media-breakpoint-down(lg) {
    background-image: url('/backgrounds/bg-slot-machine.png');
  }

  padding: 10rem 0 0rem;

  h4 {
    position: relative;
    margin-bottom: 2.5rem;

    &:after {
      content: '';
      position: absolute;
      width: 14rem;
      height: 0.2rem;
      background-color: #c2c2c2;
      left: 0;
      bottom: -0.5rem;
    }

    @include media-breakpoint-up(lg) {
      &.text-lg-end {
        &:after {
          left: unset;
          right: 0;
        }
      }
    }
  }

  &-slider {
    position: relative;

    @include media-breakpoint-down(sm) {
      max-width: calc(100% - 3rem);
      left: -1rem;
    }

    &-slide {
      background-color: #000;
      border: 0.3rem solid #ffffff;
      padding: 4rem 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      height: 23.5rem;
      transition: transform 0.2s;

      @include media-breakpoint-down(lg) {
        height: 18rem;
        padding: 3rem 1rem 2rem;
      }

      .swiper-slide-active & {
        transform: scale(1.2);
        position: relative;
        z-index: 10;

        @include media-breakpoint-down(sm) {
          left: 3rem;
        }
      }

      &-name {
        font-size: 1.2rem;
      }

      img {
        max-width: 14rem;
        max-height: 11rem;
        object-fit: contain;

        @include media-breakpoint-down(lg) {
          max-width: 9rem;
          max-height: 7rem;
        }
      }
    }

    &-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;

      &--prev {
        left: -4rem;

        @include media-breakpoint-down(sm) {
          display: none;
        }

        @include media-breakpoint-down(lg) {
          left: -3rem;
        }
      }

      &--next {
        right: -4rem;

        @include media-breakpoint-down(lg) {
          right: -3rem;
        }
      }
    }
  }

  &-img {
    @include media-breakpoint-down(lg) {
      max-width: 80%;
    }
  }

  &-cat {
    @include media-breakpoint-up(lg) {
      width: 52rem;
      top: -2rem;
      left: -12rem;
      position: relative;
    }
  }

  .swiper {
    height: 30rem;

    @include media-breakpoint-down(lg) {
      height: 23rem;
    }

    &-wrapper {
      align-items: center;
    }

    &-slide {
      height: 23.5rem;

      @include media-breakpoint-down(lg) {
        height: 18rem;
      }

      &-active {
        z-index: 10;
      }
    }
  }
}
</style>

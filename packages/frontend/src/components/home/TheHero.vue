<script lang="ts" setup>
import { inject } from 'vue'
const mq = inject('mq') as any

const props = defineProps<{
  countdown?: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
}>()
</script>

<template>
  <section class="hero">
    <div class="container position-relative">
      <div class="row align-items-end gx-lg-4">
        <div class="col-12 col-lg-7">
          <div class="hero-cta mb-3 mb-lg-0">
            <h3 class="hero-title">
              Test your
              <span class="hero-title-highlight">luck for free</span>
              on&nbsp;our&nbsp;exclusive slot machine and let destiny decide
            </h3>
            <!-- <template v-if="mq.lgPlus">
              <div v-if="countdown">
                <div class="text-success mb-1 mb-lg-0">
                  <strong>MINT OPEN IN</strong>
                </div>
                <div
                  class="d-flex hero-countdown justify-content-center justify-content-lg-start"
                >
                  <div>
                    <h3>{{ countdown.days }}</h3>
                    <span>days</span>
                  </div>
                  <h3 class="hero-countdown-separator">:</h3>
                  <div>
                    <h3>{{ countdown.hours }}</h3>
                    <span>hours</span>
                  </div>
                  <h3 class="hero-countdown-separator">:</h3>
                  <div>
                    <h3>{{ countdown.minutes }}</h3>
                    <span>minutes</span>
                  </div>
                  <h3 class="hero-countdown-separator">:</h3>
                  <div>
                    <h3>{{ countdown.seconds }}</h3>
                    <span>seconds</span>
                  </div>
                </div>
              </div>
              <a href="#mint" class="btn btn-primary btn-round btn-lg" v-else>
                Mint now
              </a>
            </template> -->
          </div>
        </div>
        <div class="col-12 col-lg-5 mb-3 mb-lg-0">
          <div class="position-relative">
            <img src="/home/hero.webp" class="hero-img" alt="" />
            <lottie-player
              autoplay
              class="hero-eth"
              loop
              src="/home/eth.json"
            />
            <lottie-player class="hero-helmet" loop src="/home/helmet.json" />
            <lottie-player
              autoplay
              class="hero-oni"
              loop
              src="/home/oni.json"
            />
          </div>
        </div>
        <div class="col-12" v-if="mq.lgMinus">
          <div v-if="countdown">
            <div class="text-success mb-1 mb-lg-0">
              <strong>MINT OPEN IN</strong>
            </div>
            <div
              class="d-flex hero-countdown justify-content-center justify-content-lg-start"
            >
              <div>
                <h3>{{ countdown.days }}</h3>
                <span>days</span>
              </div>
              <h3 class="hero-countdown-separator">:</h3>
              <div>
                <h3>{{ countdown.hours }}</h3>
                <span>hours</span>
              </div>
              <h3 class="hero-countdown-separator">:</h3>
              <div>
                <h3>{{ countdown.minutes }}</h3>
                <span>minutes</span>
              </div>
              <h3 class="hero-countdown-separator">:</h3>
              <div>
                <h3>{{ countdown.seconds }}</h3>
                <span>seconds</span>
              </div>
            </div>
          </div>
          <a href="#mint" class="btn btn-primary btn-round btn-lg" v-else>
            Mint now
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.hero {
  background: url('/backgrounds/bg-hero.jpg') no-repeat center top;
  overflow: hidden;
  @include media-breakpoint-down(lg) {
    background-image: url('/backgrounds/bg-hero-mobile.jpg');
    text-align: center;
    padding: 6rem 0 0;
  }

  &-cta {
    @include media-breakpoint-up(lg) {
      max-width: 56rem;
      padding: 9rem 0;
      position: relative;
      z-index: 11;
    }
  }

  &-countdown {
    h3 {
      margin-bottom: 0;
      line-height: 1;
    }

    &-separator {
      margin: 0 1rem;
    }
  }

  &-title {
    line-height: 1.1;

    &-highlight {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 1rem;
        left: 0;
        right: 0;
        height: 0.6rem;
        background-color: $primary;

        @include media-breakpoint-down(lg) {
          bottom: 0.4rem;
        }
      }
    }
  }

  &-img {
    max-width: 25rem;
    @include media-breakpoint-down(sm) {
      margin: auto;
      max-width: 20rem;
    }
  }

  &-eth,
  &-helmet,
  &-oni {
    position: absolute;
    width: 15rem;
    height: 15rem;

    @include media-breakpoint-down(sm) {
      width: 13rem;
      height: 13rem;
    }
  }

  &-eth {
    top: 0;
    left: -5rem;
    filter: blur(0.08rem);

    @include media-breakpoint-down(sm) {
      left: 2rem;
      top: 1rem;
      width: 12rem;
      height: 12rem;
    }
  }

  &-helmet {
    top: 2rem;
    right: 5rem;

    @include media-breakpoint-down(sm) {
      right: 1rem;
      top: 1rem;
    }
  }

  &-oni {
    top: 15rem;
    right: 0rem;
    transform: rotate(15deg);
    filter: blur(0.08rem);

    @include media-breakpoint-down(sm) {
      top: 10rem;
      right: -3rem;
    }
  }
}
</style>

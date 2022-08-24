<script lang="ts" setup>
import { emitter } from '@/event-bus'
import { useWalletStore } from '@/store/wallet'
import { useAuthStore } from '@/store/auth'
import { useTwitterCodeStore } from '@/store/twitter-code'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Virtual } from 'swiper'
import { inject, ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'

import '@lottiefiles/lottie-player'

import 'swiper/css'
import 'swiper/css/navigation'

const showConnectModal = () => emitter.emit('ConnectModal:show', false)
const walletStore = useWalletStore()
const authStore = useAuthStore()
const twitterCodeStore = useTwitterCodeStore()
const mq = inject('mq') as any
const mintAmount = ref(1)

const mintAmountInc = () => (mintAmount.value += 1)
const mintAmountDec = () =>
  (mintAmount.value = mintAmount.value > 1 ? mintAmount.value - 1 : 1)

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

const generateCode = async () => {
  await twitterCodeStore.create({ address: walletStore.currentAccount })
  await twitterCodeStore.find(walletStore.currentAccount)
}

const tweet = () => {
  const countdownDate = dayjs(Date.UTC(2022, 7, 28, 23, 0, 0))
  const hours = countdownDate.diff(dayjs(), 'h')

  const params =
    'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=600'
  const text = `♦️ Backdoor Casino Opening ♦️\n\nFirst ever NFT Slot Machine\n\nJoin VIP List: backdoorcasino.xyz\n\nBonus code: ${twitterCodeStore.code}\n\n🎰 Free Mint starts in ${hours} hrs.\n\n`
  const url = `https://twitter.com/intent/tweet?text=${encodeURI(
    text
  )}&hashtags=backdoorcasino&via=backdoorcasino`
  if (mq.lgPlus) {
    window.open(url, '', params)
  } else {
    window.location.href = url
  }
}

const countdown = ref<{
  days: string
  hours: string
  minutes: string
  seconds: string
}>()

const calculateCountdown = () => {
  const countdownDate = dayjs(Date.UTC(2022, 7, 28, 23, 0, 0))
  const days = Math.floor(countdownDate.diff(dayjs(), 'd', true))
  const hours = Math.floor(countdownDate.diff(dayjs(), 'h', true) - days * 24)
  const minutes = Math.floor(
    countdownDate.diff(dayjs(), 'm', true) - days * 1440 - hours * 60
  )
  const seconds = Math.ceil(
    countdownDate.diff(dayjs(), 's') -
      minutes * 60 -
      hours * 3600 -
      days * 86400
  )

  countdown.value = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }

  if ((days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) || days < 0) {
    clearInterval(countdownInterval)
    countdown.value = undefined
  }
}

let countdownInterval: NodeJS.Timeout

onMounted(() => {
  countdownInterval = setInterval(calculateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})

calculateCountdown()
</script>

<template>
  <div class="home">
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
              <template v-if="mq.lgPlus">
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
              </template>
            </div>
          </div>
          <div class="col-12 col-lg-5 mb-3 mb-lg-0">
            <div class="position-relative">
              <img src="/home/hero.webp" class="hero-img" alt="" />
              <lottie-player class="hero-eth" loop src="/home/eth.json" />
              <lottie-player class="hero-helmet" loop src="/home/helmet.json" />
              <lottie-player class="hero-oni" loop src="/home/oni.json" />
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
    <section class="mint" id="mint">
      <div class="container">
        <div class="row justify-content-between gx-lg-3">
          <div class="col-12 col-lg-8 mb-3 mb-lg-0">
            <h4 class="mint-title">What is Backdoor Casino?</h4>
            <p>
              First ever NFT Casino that enables holders to have the capacity to
              earn money as they win at the mighty Slot Machine. Backdoor Casino
              is not your average casino or slot machine, Backdoor Casino gives
              you the opportunity to get rewarded instantly and in Ethereum or
              “Prize Tickets” that are our tokens without economic value but are
              exchangeable in the “Shop” for interesting rewards.
            </p>
          </div>
          <div class="col-12 col-lg-3 mb-3 mb-lg-0">
            <h4 class="mint-title">Mint Details</h4>
            <div class="d-flex mb-2">
              <div class="mint-box me-2">
                <div class="mint-box-label">LAUNCH</div>
                <div class="mint-box-value">28/08</div>
              </div>
              <div class="mint-box">
                <div class="mint-box-label">SUPPLY</div>
                <div class="mint-box-value">3333</div>
              </div>
            </div>
            <ul class="mint-list">
              <li class="text-nowrap">
                WL: 2 FREE per wallet + 4 for 0.01 ETH
              </li>
              <li class="text-nowrap">
                Public: 1 FREE per wallet + 2 for 0.01 ETH
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-3" v-if="!countdown">
            <h4 class="mint-title mint-title-borderless">
              How many would you&nbsp;like&nbsp;to mint?
            </h4>
            <div class="mb-2">
              <div
                class="mint-input-box position-relative d-inline-flex align-items-stretch"
              >
                <input
                  type="number"
                  readonly
                  step="1"
                  class="mint-input"
                  v-model.number="mintAmount"
                />
                <div class="mint-input-buttons d-flex flex-column">
                  <button @click="mintAmountInc">
                    <i class="bi bi-caret-up-fill"></i>
                  </button>
                  <button @click="mintAmountDec">
                    <i class="bi bi-caret-down-fill"></i>
                  </button>
                </div>
              </div>
            </div>
            <button class="btn btn-primary btn-round btn-lg">
              Mint (SOON)
            </button>
          </div>
        </div>
      </div>
    </section>
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
              Our Slot Machine pivots around the Japanese mythology since it's
              one that really emphasizes the lucky aspect of life. Our 2 main
              characters in the slot machine are “Oni” and “The Samurai”, Oni
              being the worst devil spirit there is in Japanese mythology and
              The Samurai being the challenger of the devil.
            </p>
            <p>
              Holders will be able to play for free by using the “Playing
              Chips”, the “Playing Chips” are earned passively by just holding
              the NFT. Another way is to buy them for Eth in the “Shop”.
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
    <section class="bottom">
      <div class="container">
        <div class="row align-items-center gx-lg-4">
          <div class="col-12 col-lg-4 order-2 order-lg-1">
            <img
              src="/home/rewards.png"
              alt="Rewards"
              class="slot-machine-img"
            />
          </div>
          <div class="col-12 col-lg-5 order-1 order-lg-2 mb-4 mb-lg-0">
            <h4>Rewards</h4>
            <p>
              Players will be rewarded, all these by just using their free
              Playing Chips, both in Ethereum or by exchanging the “Prize
              Tickets” in the “Shop” to get rewards such as: Netflix, Spotify,
              Disney+, DAZN, and 20+&nbsp;other services to enjoy!
            </p>
          </div>
        </div>
        <div class="vip-pass" id="vip-pass">
          <h2 class="text-primary mb-1 lh-1">Claim VIP Pass</h2>
          <p class="mb-3">
            Claim our VIP Pass by generating your unique code and sharing this
            in your Twitter account. By becoming VIP you will benefit in various
            ways:
          </p>
          <ul class="mb-3">
            <li>You will earn WL to mint on Mint Day</li>
            <li>
              You will accumulate the bonus X amount of Playing for you to play
              for free on our Slot Machine
            </li>
          </ul>
          <template v-if="walletStore.connected && authStore.loggedIn">
            <div
              class="d-flex align-items-center"
              v-if="twitterCodeStore.exists"
            >
              <button
                class="btn btn-success btn-round btn-lg btn-bordered me-2"
                @click="tweet"
              >
                Tweet it!
              </button>
              <span>Code generated!</span>
              <span></span>
            </div>
            <button
              class="btn btn-primary btn-round btn-lg btn-bordered"
              v-else
              @click="generateCode"
            >
              Generate code
            </button>
          </template>
          <button
            class="btn btn-primary btn-round btn-lg btn-bordered"
            v-else
            @click="showConnectModal"
          >
            Redeem bonus
          </button>
        </div>
        <div class="row mb-lg-5">
          <div class="col-12 col-lg-6">
            <div class="faq" id="faq">
              <h2 class="text-primary">FAQ</h2>
              <details>
                <summary>What´s supply?</summary>
                <ul>
                  <li>3333 ERC-721 Tokens.</li>
                </ul>
              </details>
              <details>
                <summary>When is mint day?</summary>
                <ul>
                  <li>To be announced.</li>
                </ul>
              </details>
              <details>
                <summary>What will be the price?</summary>
                <ul>
                  <li>Free mint 2 tokens, and 2 tokens for X Eth.</li>
                </ul>
              </details>
              <details>
                <summary>Where can I buy?</summary>
                <ul>
                  <li>
                    You can mint it the day of mint, or buy in secondary market
                    like OpenSea once its launched.
                  </li>
                </ul>
              </details>
              <details>
                <summary>What is the utility?</summary>
                <ul>
                  <li>
                    Being able to play our Slot Machine for free and get
                    rewarded in Ethereum .
                  </li>
                </ul>
              </details>
              <details>
                <summary>How do I use the Prize Tickets?</summary>
                <ul>
                  <li>
                    Once accumulated enough you can access the shop and exchange
                    it for the desired reward.
                  </li>
                </ul>
              </details>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <lottie-player class="sun" autoplay loop src="/home/sun.json" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home {
  background-color: #000;
}
.hero {
  background: url('/home/bg-hero.jpg') no-repeat center top;
  overflow: hidden;
  @include media-breakpoint-down(lg) {
    background-image: url('/home/bg-hero-mobile.jpg');
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

    @include media-breakpoint-down(sm) {
      top: 10rem;
      right: -3rem;
    }
  }
}
.mint {
  padding: 10rem 0 15rem;

  background: url('/home/bg-mint-details.jpg') no-repeat;

  @include media-breakpoint-down(lg) {
    background-image: url('/home/bg-mint-details-mobile.jpg');
  }

  @include media-breakpoint-down(lg) {
    padding-top: 8rem;
    padding-bottom: 0;
  }

  &-title {
    position: relative;
    color: $primary;
    padding-bottom: 1rem;
    font-size: 3.2rem;
    margin-bottom: 3rem;
    font-weight: 600;
    padding-left: 2rem;

    @include media-breakpoint-down(lg) {
      font-size: 2.4rem;
      margin-bottom: 2rem;
    }

    &:not(&-borderless) {
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 10rem;
        height: 0.1rem;
        background-color: #fff;
      }
    }

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 1.2rem;
      background: url("data:image/svg+xml,%3Csvg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='6.36396' width='9' height='9' transform='rotate(45 6.36396 0)' fill='%23C04442'/%3E%3Crect x='6.36396' width='9' height='9' transform='rotate(45 6.36396 0)' stroke='black'/%3E%3C/svg%3E")
        no-repeat center / contain;
      width: 1rem;
      height: 1rem;
    }
  }

  &-list {
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
  }

  &-input {
    width: 9rem;
    outline: none;
    font-size: 2.7rem;
    padding: 0.36rem 0 0 3rem;
    line-height: 1;
    -moz-appearance: textfield;
    border: none;

    &-box {
      border: 0.1rem solid $primary;
      border-radius: 1rem;
      overflow: hidden;
    }

    &-buttons {
      font-size: 1rem;
      position: absolute;
      right: 0;

      button {
        background-color: #d8d8d8;
        border: none;
        width: 2.3rem;
        height: 2.1rem;
      }
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &-box {
    border: 0.1rem solid #fff;
    border-radius: 0.4rem;
    padding: 1rem;

    &-label {
      font-size: 2.4rem;
      line-height: 1;
    }

    &-value {
      font-size: 3.2rem;
      color: $success;
      line-height: 1;
    }
  }
}

.slot-machine {
  background: url('/home/bg-slot-machine.png') no-repeat;
  position: relative;

  @include media-breakpoint-down(lg) {
    background-image: url('/home/bg-slot-machine.png');
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
}

.bottom {
  padding-top: 13rem;
  background: url('/home/bg-bottom.png') no-repeat;

  @include media-breakpoint-down(lg) {
    background-image: url('/home/bg-bottom.png');
  }
}

.vip-pass {
  @include media-breakpoint-up(lg) {
    background: rgba(255, 255, 255, 0.1);
    border: 0.1rem solid #ffffff;
    border-radius: 1rem;
    padding: 5rem 10rem 5rem 7rem;
    margin: 9rem 0;
  }

  @include media-breakpoint-down(lg) {
    margin: 15rem 0;
  }
}

.faq {
  details {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    summary {
      position: relative;
      list-style: none;
      padding: 1rem 2rem;
      background-color: #f1f1f1;
      color: #000;

      @include media-breakpoint-up(lg) {
        max-width: 48rem;
      }

      &::-webkit-details-marker {
        display: none;
      }

      &:before {
        content: '';
        position: absolute;
        width: 0.4rem;
        top: 0;
        bottom: 0;
        left: -0.4rem;
        background-color: $primary;
      }

      &:after {
        content: '+';
        position: absolute;
        top: 55%;
        transform: translateY(-50%);
        right: 2rem;
        font-size: 3rem;
        line-height: 1;
      }
    }

    &[open] {
      summary {
        margin-bottom: 2rem;

        &:after {
          content: '-';
          font-size: 4rem;
        }
      }
    }

    ul {
      margin-left: 2rem;
    }
  }
}
</style>

<style lang="scss">
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
</style>

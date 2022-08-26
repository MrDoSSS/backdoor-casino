<script lang="ts" setup>
import { useWalletStore } from '@/store/wallet'
import { useAuthStore } from '@/store/auth'
import { useTwitterCodeStore } from '@/store/twitter-code'
import { inject } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { emitter } from '@/event-bus'

const mq = inject('mq') as any

const walletStore = useWalletStore()
const authStore = useAuthStore()
const twitterCodeStore = useTwitterCodeStore()

const generateCode = async () => {
  await twitterCodeStore.create({ address: walletStore.currentAccount })
  await twitterCodeStore.find(walletStore.currentAccount)
}

const showConnectModal = () => emitter.emit('ConnectModal:show', false)

const tweet = () => {
  const hours = props.countdownDate.diff(dayjs(), 'h')

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

const props = defineProps<{ countdownDate: Dayjs }>()
</script>

<template>
  <section class="bottom">
    <div class="container">
      <div class="row align-items-center gx-lg-4">
        <div class="col-12 col-lg-4 order-2 order-lg-1">
          <img src="/home/rewards.png" alt="Rewards" class="slot-machine-img" />
        </div>
        <div class="col-12 col-lg-5 order-1 order-lg-2 mb-4 mb-lg-0">
          <h4>Rewards</h4>
          <p>
            Players will be rewarded, all these by just using their free Playing
            Chips, both in Ethereum or by exchanging the “Prize Tickets” in the
            “Shop” to get rewards such as: Netflix, Spotify, Disney+, DAZN, and
            20+&nbsp;other services to enjoy!
          </p>
        </div>
      </div>
      <div class="vip-pass" id="vip-pass">
        <h2 class="text-primary mb-1 lh-1">Claim VIP Pass</h2>
        <p class="mb-3">
          Claim our VIP Pass by generating your unique code and sharing this in
          your Twitter account. By becoming VIP you will benefit in various
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
          <div class="d-flex align-items-center" v-if="twitterCodeStore.exists">
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
                <li>The mint will go live on 28th of August.</li>
              </ul>
            </details>
            <details>
              <summary>What will be the price?</summary>
              <ul>
                <li>VIP WL: 2 FREE per wallet + 4 for 0.01 ETH</li>
                <li>Public: 1 FREE per wallet + 2 for 0.01 ETH</li>
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
                  Being able to play our Slot Machine for free and get rewarded
                  in Ethereum .
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
</template>

<style lang="scss">
.bottom {
  padding-top: 13rem;
  background: url('/backgrounds/bg-bottom.png') no-repeat;

  @include media-breakpoint-down(lg) {
    background-image: unset;
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

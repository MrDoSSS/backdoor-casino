<script lang="ts" setup>
import { ref } from 'vue'
import { useWalletStore } from '@/store/wallet'
import { useWhitelistStore } from '@/store/whitelist'
import { useContractStore } from '@/store/contract'
import { collectionContract } from '@/web3'
import { estimateGas } from '@/utils'
import { emitter } from '@/event-bus'

const props = defineProps<{
  countdown?: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
}>()

const mintAmount = ref(1)
const walletStore = useWalletStore()
const whitelistStore = useWhitelistStore()
const contractStore = useContractStore()

const status = ref<
  'init' | 'error' | 'success' | 'presale-error' | 'amount-error'
>('init')
const loading = ref(false)

const mintAmountInc = () =>
  mintAmount.value >= 6 ? mintAmount.value : (mintAmount.value += 1)
const mintAmountDec = () =>
  (mintAmount.value = mintAmount.value > 1 ? mintAmount.value - 1 : 1)

const mint = async () => {
  if (!walletStore.connected) return emitter.emit('ConnectModal:show', false)
  try {
    if (loading.value) return

    loading.value = true
    status.value = 'init'

    const methodName =
      whitelistStore.exists && contractStore.presaled ? 'presaleMint' : 'mint'

    if (methodName === 'mint' && !contractStore.allowedPublic) {
      return (status.value = 'presale-error')
    }

    const signature = whitelistStore.signature

    const numberMinted = await collectionContract.methods
      .numberMinted(walletStore.currentAccount!)
      .call()
      .then(parseInt)

    if (
      (methodName === 'mint' && numberMinted + mintAmount.value > 3) ||
      mintAmount.value > 6
    ) {
      return (status.value = 'amount-error')
    }
  
    const method = collectionContract.methods[methodName](
      mintAmount.value,
      signature
    )
    const price =
      whitelistStore.exists && contractStore.presaled
        ? contractStore.presalePrice
        : contractStore.price

    let nonFreeAmount = 0

    if (methodName === 'mint') {
      nonFreeAmount =
        numberMinted === 2
          ? 1
          : numberMinted + mintAmount.value - 1 >= 0
          ? numberMinted + mintAmount.value - 1
          : 0
    } else {
      if (numberMinted == 0 && mintAmount.value > 1) {
        nonFreeAmount = mintAmount.value - 2
      } else if (numberMinted < 2 && mintAmount.value == 1) {
        nonFreeAmount = 0
      } else if (numberMinted > 1) {
        nonFreeAmount = mintAmount.value
      }
    }

    const value = price * nonFreeAmount
    const gas = await estimateGas(method, 80000 * mintAmount.value, { value })

    await method.send({
      gas,
      value,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null,
    })

    status.value = 'success'
  } catch (e) {
    console.error('mint error', e)
    status.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="mint" id="mint">
    <div class="container">
      <div class="row justify-content-between gx-lg-3">
        <div
          class="col-12 mb-3 mb-lg-0"
          :class="{ 'col-lg-8': countdown, 'col-lg-6': !countdown }"
        >
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
            <li class="text-nowrap">WL: 2 FREE per wallet + 4 for 0.01 ETH</li>
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
          <button class="btn btn-primary btn-round btn-lg mb-1" @click="mint">
            MINT NOW
          </button>
          <div class="text-warning" v-if="loading">Wait...</div>
          <div class="fs-6 text text-danger" v-else>
            <div v-if="status === 'presale-error'">
              Mint now available only for presale members!
            </div>
            <div v-else-if="status === 'amount-error'">
              Exceeds maximum tokens at address
            </div>
            <div v-else-if="status === 'error'">
              Something going wrong! Please, try again.
            </div>
            <div class="text-success" v-else-if="status === 'success'">
              You can view your tokens on Opensea&nbsp;Marketplace!
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.mint {
  padding: 10rem 0 15rem;

  background: url('/backgrounds/bg-mint-details.jpg') no-repeat;

  @include media-breakpoint-down(lg) {
    background-image: url('/backgrounds/bg-mint-details-mobile.jpg');
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
</style>

<script lang="ts" setup>
import { estimateGas } from '@/utils'
import { web3, paymentContract } from '@/web3'
import { ref } from 'vue'

interface Props {
  size: 'small' | 'medium' | 'big'
  best?: boolean
}

const props = defineProps<Props>()
const loading = ref(false)

const amount = await paymentContract.methods
  .amounts(props.size)
  .call()
  .then(parseInt)
  .catch(() => 0)
const price = await paymentContract.methods
  .prices(props.size)
  .call()
  .then(parseInt)
  .catch(() => 0)
const priceInEth = web3.utils.fromWei(price.toString(), 'ether')

const buy = async () => {
  try {
    loading.value = true
    const method = paymentContract.methods.purchaseChips(props.size)
    const gas = await estimateGas(method, 40000, { value: price })
    await method.send({
      value: price,
      gas,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null,
    })
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="buy-card">
    <div class="buy-card-best" v-if="props.best">BEST VALUE</div>
    <div class="buy-card-content">
      <img src="/profile/money.png" alt="" />
      <div class="buy-card-title text-success">{{ amount }}x Playing Chips</div>
      <div>Only {{ priceInEth }} ETH</div>
    </div>
    <button
      class="buy-card-btn d-block text-center"
      @click="buy"
      :disabled="loading"
    >
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

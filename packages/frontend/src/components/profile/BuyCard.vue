<script lang="ts" setup>
import { estimateGas } from '@/utils'
import { web3, paymentContract } from '@/web3'
import { ref } from 'vue'
import Modal from '@/components/Modal.vue'

const modalRef = ref()

const showModal = () => modalRef.value.show()

interface Props {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  discount?: number | string
}

const props = defineProps<Props>()
const loading = ref(false)
const success = ref(false)
const error = ref(false)

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
    success.value = true
  } catch (e) {
    error.value = true
    console.log(e)
  } finally {
    loading.value = false
  }
}

const reset = () => {
  success.value = false
  error.value = false
  loading.value = false
}
</script>

<template>
  <div class="buy-card h-100 d-flex flex-column justify-content-end">
    <div class="buy-card-discount lh-1" v-if="props.discount">
      <img class="d-inline me-1" src="/profile/percent.svg" />-{{
        props.discount
      }}% Discount
    </div>
    <img class="buy-card-img" :src="`/profile/${props.size}.png`" alt="" />
    <div>
      <div class="buy-card-title text-success">{{ amount }}x Playing Chips</div>
      <div class="mb-1">{{ priceInEth }} ETH</div>
      <button
        class="btn btn-light btn-sm btn-round text-nowrap"
        @click="showModal"
      >
        Buy <img class="d-inline" src="/profile/cart.svg" alt="" />
      </button>
    </div>
  </div>

  <Modal class="modal-sm" ref="modalRef" @hidden="reset">
    <template v-if="success">
      <h5 class="text-center">You just bought Playing Chips.</h5>
      <div class="d-flex align-items-center">
        <img class="modal-img" :src="`/profile/${props.size}.png`" alt="" />
        <div class="text-success">
          Playing Chips will be added to your balance shortly.
        </div>
      </div>
    </template>
    <template v-else-if="error">
      <h5 class="text-center fw-normal">Something went wrong.</h5>
      <div class="d-flex align-items-center">
        <img class="modal-img" :src="`/profile/${props.size}.png`" alt="" />
        <div class="text-danger">
          Your request did not go through. Please close and try again.
        </div>
      </div>
    </template>
    <template v-else>
      <h5 class="text-center">Please confirm your purchase</h5>
      <div class="d-flex align-items-center">
        <img class="modal-img" :src="`/profile/${props.size}.png`" alt="" />
        <div>
          <div class="buy-card-title text-success">
            {{ amount }}x Playing Chips
          </div>
          <div class="mb-1">x {{ priceInEth }} ETH</div>
          <div class="fs-6 text mb-1">This purchase is not refundable.</div>
          <button
            class="btn btn-primary btn-sm btn-round"
            @click="buy"
            :disabled="loading"
          >
            Confirm
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
.buy-card {
  position: relative;

  @include media-breakpoint-up(lg) {
    max-width: 20rem;
  }

  &-discount {
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &-img {
    width: 15rem;
    height: 15rem;
    object-fit: contain;
  }

  &-title {
    font-weight: 600;
    line-height: 1;
  }

  .btn {
    width: 10rem;
    img {
      width: 1.5rem;
    }
  }
}

.modal-img {
  width: 17rem;
  margin-right: 1.5rem;
}
</style>

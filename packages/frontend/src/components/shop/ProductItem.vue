<script lang="ts" setup>
import { shopService } from '@/services'
import { ref } from 'vue'
import Modal from '@/components/Modal.vue'
import capitalize from 'lodash/capitalize'

const props = defineProps<{ product: BD.Product; cost: number }>()

const loading = ref(false)
const success = ref(false)
const error = ref('')
const reward = ref<{ login?: string; password?: string; key?: string }>()

const modalRef = ref()

const showModal = () => modalRef.value.show()

const buy = async () => {
  try {
    loading.value = true
    reward.value = await shopService.create({
      productId: props.product._id,
      tierId: props.product.tier,
    })
    success.value = true
  } catch (e: Error) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const reset = () => {
  error.value = ''
  loading.value = false
  reward.value = undefined
}

const copyCredentials = () => {
  if (!reward.value) return

  navigator.clipboard.writeText(
    Object.entries(reward.value)
      .map(([key, value]) => `${capitalize(key)}: ${value}`)
      .join('\n')
  )
}
</script>

<template>
  <div class="product-item">
    <div
      class="product-item-icon d-flex align-items-center justify-content-center mb-1"
    >
      <img :src="product.icon" />
    </div>
    <div class="text-center">
      <div class="text-success">
        {{ product.subtitle }}
      </div>
      <div class="mb-1">{{ cost }} Prize Tickets</div>
      <button class="btn btn-light btn-round text-nowrap" @click="showModal">
        Buy <img class="d-inline" src="/profile/cart.svg" alt="" />
      </button>
    </div>
  </div>

  <Teleport to="body">
    <Modal class="modal-sm" ref="modalRef" @hidden="reset">
      <template v-if="reward">
        <h5 class="text-center">You successfully bought {{ product.name }}!</h5>
        <div class="d-flex align-items-center">
          <img class="modal-img-xl" src="/shop/cat.png" alt="" />
          <div>
            <div v-if="reward?.login">
              <span class="text-success">Login:</span> {{ reward.login }}
            </div>
            <div v-if="reward?.password">
              <span class="text-success">Password:</span> {{ reward.password }}
            </div>
            <div v-if="reward?.key">
              <span class="text-success">Key:</span> {{ reward.key }}
            </div>
            <button
              @click="copyCredentials"
              class="btn btn-primary btn-round btn-sm mt-1"
            >
              Copy Access
            </button>
          </div>
        </div>
      </template>
      <template v-else-if="error">
        <h5 class="text-center fw-normal">Something went wrong.</h5>
        <div class="d-flex align-items-center">
          <img class="modal-img-xl" src="/shop/cat.png" alt="" />
          <div class="text-danger">
            {{ error }}
          </div>
        </div>
      </template>
      <template v-else>
        <h5 class="text-center mb-3">Please confirm your purchase</h5>
        <div class="d-flex align-items-center">
          <img class="modal-img me-3" :src="product.icon" alt="" />
          <div>
            <div class="buy-card-title text-success lh-1">
              {{ product.name }}
            </div>
            <div class="mb-1 lh-1">x {{ cost }} Prize Tickets</div>
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
  </Teleport>
</template>

<style lang="scss">
.product-item {
  &-icon {
    background-color: #202020;
    border-radius: 2rem;
    border: 1px solid #fff;
    height: 16rem;

    @include media-breakpoint-down(lg) {
      height: 15.5rem;
    }

    img {
      max-width: 80%;
      max-height: 10rem;
      object-fit: contain;
    }
  }

  .btn {
    width: 10rem;
    text-transform: unset;
    font-weight: 400;
    img {
      width: 1.5rem;
    }
  }
}

.modal-img {
  max-width: 13rem;
  max-height: 10rem;
  object-fit: contain;

  &-xl {
    max-width: 18rem;
  }

  @include media-breakpoint-down(lg) {
    max-width: 10rem;
    &-xl {
      max-width: 13rem;
    }
  }
}
</style>

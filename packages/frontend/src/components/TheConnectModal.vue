<script lang="ts" setup>
import { emitter } from '@/event-bus'
import { ref, onMounted, onUnmounted } from 'vue'
import Modal from './Modal.vue'
import { setInbrowserProvider, setWalletLinkProvider } from '@/ethereum'
import { useWalletStore } from '@/store/wallet'
import { initWeb3 } from '@/web3'

const modalRef = ref()
const loading = ref(false)
const walletStore = useWalletStore()

const showModal = () => modalRef.value.show()
const hideModal = () => modalRef.value.hide()

onMounted(() => {
  emitter.on('ConnectModal:show', showModal)
  emitter.on('ConnectModal:hide', hideModal)
})

onUnmounted(() => {
  emitter.off('ConnectModal:show', showModal)
  emitter.off('ConnectModal:hide', hideModal)
})

const connectMetamask = () => {
  setInbrowserProvider()
  connect()
}

const connectCoinbase = () => {
  setWalletLinkProvider()
  connect()
}

const connect = async () => {
  try {
    loading.value = true
    initWeb3()
    await walletStore.connect()
    modalRef.value.hide()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Modal ref="modalRef">
    <div v-show="loading">
      <div class="d-flex align-items-center flex-column">
        <div class="text-center title">Connecting wallet...</div>
      </div>
    </div>
    <template v-if="!loading">
      <h3 class="text-center title">Choose wallet to connect:</h3>
      <div class="divider"></div>
      <div class="d-flex align-items-center justify-content-between mt-3">
        <div class="option me-4" @click="connectMetamask">
          <img src="/metamask.svg" alt="" />
        </div>
        <div class="option" @click="connectCoinbase">
          <img src="/coinbase.svg" alt="" />
        </div>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
.option {
  cursor: pointer;
  max-width: 12rem;
}

.title {
  font-size: 2.8rem;

  @include media-breakpoint-down(sm) {
    font-size: 2.4rem;
  }
}
</style>

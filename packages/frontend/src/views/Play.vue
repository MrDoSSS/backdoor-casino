<script lang="ts" setup>
import { initPhaserApp } from '@/phaser'
import { ref, onMounted, onUnmounted, inject, computed } from 'vue'
import { useWalletStore } from '@/store/wallet'
import { useUserStore } from '@/store/user'
import { useContractStore } from '@/store/contract'

let game: ReturnType<typeof initPhaserApp>

const slotMachine = ref<HTMLElement>()
const mq = inject('mq') as any

const walletStore = useWalletStore()
const userStore = useUserStore()
const contractStore = useContractStore()

const enoughTokens = computed(() => contractStore.tokens.length >= 0)

onMounted(() => {
  if (!enoughTokens) return

  if (mq.mdPlus) {
    const navbar = document.querySelector('#the-navbar')!
    const { height: navbarHeight } = navbar.getBoundingClientRect()
    slotMachine.value!.style.setProperty(
      'height',
      `calc(100vh - ${navbarHeight}px)`
    )
  }

  game = initPhaserApp(slotMachine.value!)
})

onUnmounted(() => {
  game?.destroy(false)
})
</script>

<template>
  <div class="slot-machine" :class="{ 'slot-machine-exists': enoughTokens }">
    <div class="mb-lg-5" v-if="enoughTokens" ref="slotMachine"></div>
    <div class="container">
      <h3>Your NFTs</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slot-machine {
  padding: 8rem 0 15rem;
  background: url('/backgrounds/bg-mint-details.jpg') no-repeat;
  min-height: 50vh;

  &-exists {
    padding-top: 0;
  }

  :deep(canvas) {
    margin-top: 0 !important;
  }

  h3 {
    position: relative;
    margin-bottom: 4rem;

    &:after {
      content: '';
      position: absolute;
      width: 4rem;
      height: 0.6rem;
      background-color: $primary;
      left: 0;
      bottom: -0.5rem;
    }
  }
}
</style>

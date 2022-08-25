<script lang="ts" setup>
import { initPhaserApp } from '@/phaser'
import { ref, onMounted, onUnmounted } from 'vue'
import { useWalletStore } from '@/store/wallet'
import { useUserStore } from '@/store/user'

let game: ReturnType<typeof initPhaserApp>

const slotMachine = ref<HTMLElement>()

const walletStore = useWalletStore()
const userStore = useUserStore()

onMounted(() => {
  const navbar = document.querySelector('#the-navbar')!
  const { height: navbarHeight } = navbar.getBoundingClientRect()
  slotMachine.value!.style.setProperty(
    'height',
    `calc(100vh - ${navbarHeight}px)`
  )
  game = initPhaserApp(slotMachine.value!)
})

onUnmounted(() => {
  game.destroy(false)
})
</script>

<template>
  <div class="slot-machine position-relative mb-5" ref="slotMachine"></div>
</template>

<style lang="scss" scoped>
.slot-machine {
  :deep(canvas) {
    margin-top: 0 !important;
  }
}
</style>

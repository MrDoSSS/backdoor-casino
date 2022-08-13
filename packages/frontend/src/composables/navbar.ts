import { ref, onMounted, onUnmounted, computed } from 'vue'
import { emitter } from '@/event-bus'
import { useWalletStore } from '@/store/wallet'
import { useAuthStore } from '@/store/auth'
import { inject } from 'vue'

export const useNavbar = () => {
  const navbarRef = ref<HTMLElement>()

  const showConnectModal = () => emitter.emit('ConnectModal:show', false)

  const walletStore = useWalletStore()
  const authStore = useAuthStore()
  const slisedWallet = computed(
    () =>
      `${walletStore.currentAccount.slice(
        0,
        4
      )}...${walletStore.currentAccount.slice(
        walletStore.currentAccount.length - 4
      )}`
  )

  return {
    walletStore,
    authStore,
    showConnectModal,
    navbarRef,
    slisedWallet,
  }
}

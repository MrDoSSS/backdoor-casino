<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ScrollSpy } from 'bootstrap'
import { emitter } from '@/event-bus'
import { useWalletStore } from '@/store/wallet'
import { useAuthStore } from '@/store/auth'
import { useWhitelistStore } from '@/store/whitelist'
import { inject } from 'vue'

const navbar = ref<HTMLElement>()

let scrollSpy: ScrollSpy
const showConnectModal = () => emitter.emit('ConnectModal:show', false)

const walletStore = useWalletStore()
const authStore = useAuthStore()
const whitelistStore = useWhitelistStore()
const mq = inject('mq') as any

const smoothScroll = (e: MouseEvent) => {
  const link = e.target as HTMLLinkElement
  const href = link.getAttribute('href')!
  const target = document.querySelector(href)!
  const { top: bodyTop } = document.body.getBoundingClientRect()
  const { top } = target.getBoundingClientRect()

  scroll({
    top: top - bodyTop - (mq.lgPlus ? 180 : 20),
    behavior: 'smooth',
  })
}

onMounted(async () => {
  const scrollSpyParams = {
    target: navbar.value!,
    rootMargin: '0px 0px -50%',
  }
  scrollSpy = new ScrollSpy(
    document.documentElement,
    scrollSpyParams as unknown as any
  )

  document.addEventListener('scroll', (e) => {
    if (document.documentElement.scrollTop > navbar.value!.clientHeight) {
      navbar.value!.classList.add('sticky-lg-top')
    } else {
      navbar.value!.classList.remove('sticky-lg-top')
    }
  })
})
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark" ref="navbar">
    <div class="container-xl flex-lg-row flex-column">
      <router-link
        :to="{ name: 'home' }"
        class="navbar-brand mb-2 mb-lg-0 me-0"
      >
        <img src="/logo.png" alt="BackDoor" />
      </router-link>
      <ul class="navbar-nav ms-lg-auto mb-1 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" @click.prevent="smoothScroll" href="#slot-machine"
            >Slot Machine</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="smoothScroll" href="#vip-pass"
            >VIP Pass</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="smoothScroll" href="#faq">FAQ</a>
        </li>
        <li class="nav-item d-lg-none">
          <a class="nav-link" href="https://twitter.com" target="_blank"
            ><i class="bi bi-twitter"></i>
          </a>
        </li>
      </ul>
      <ul class="navbar-nav mb-2 mb-lg-0">
        <li class="nav-item">
          <button
            class="btn btn-outline-light btn-round ms-0 ms-lg-1 me-1"
            @click.prevent="smoothScroll"
            href="#vip-pass"
          >
            Redeem bonus
          </button>
        </li>
        <template v-if="walletStore.connected && authStore.loggedIn">
          <li class="nav-item">
            <span class="nav-link text-success" v-if="whitelistStore.exists"
              >Whitelisted</span
            >
            <span class="nav-link text-danger" v-else>Not Whitelisted</span>
          </li>
          <li class="nav-item">
            <span class="nav-link text-success"
              >{{ walletStore.currentAccount.slice(0, 4) }}...{{
                walletStore.currentAccount.slice(
                  walletStore.currentAccount.length - 4
                )
              }}</span
            >
          </li>
        </template>
        <li class="nav-item" v-else>
          <button
            class="btn btn-primary btn-round ms-1 me-0 me-lg-2"
            @click="showConnectModal"
          >
            Connect wallet
          </button>
        </li>
        <li class="nav-item d-none d-lg-block">
          <a class="nav-link" href="https://twitter.com" target="_blank"
            ><i class="bi bi-twitter"></i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  border-bottom: 0.2rem solid #ffffff;

  &-brand {
    max-width: 17rem;

    img {
      max-width: inherit;
    }
  }

  .nav-link {
    line-height: 1.2;

    &.active {
      border-bottom: 0.2rem solid #fff;
    }
  }

  .btn {
    font-size: 1.8rem;
  }
}
</style>

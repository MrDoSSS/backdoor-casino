<script lang="ts" setup>
import { useWhitelistStore } from '@/store/whitelist'
import { useNavbar } from '@/composables/navbar'
import { ScrollSpy } from 'bootstrap'
import { onMounted, onUnmounted } from 'vue'
import { useSmoothScroll } from '@/composables/smooth-scroll'

const whitelistStore = useWhitelistStore()
const { walletStore, authStore, showConnectModal, navbarRef, slisedWallet } =
  useNavbar()
const smoothScroll = useSmoothScroll()

let scrollSpy: ScrollSpy

const scrollListener = () => {
  if (document.documentElement.scrollTop > navbarRef.value!.clientHeight) {
    navbarRef.value!.classList.add('sticky-lg-top')
  } else {
    navbarRef.value!.classList.remove('sticky-lg-top')
  }
}

onMounted(() => {
  const scrollSpyParams = {
    target: navbarRef.value!,
    rootMargin: '0px 0px -50%',
  }
  scrollSpy = new ScrollSpy(
    document.documentElement,
    scrollSpyParams as unknown as any
  )

  document.addEventListener('scroll', scrollListener)
})

onUnmounted(() => {
  document.removeEventListener('scroll', scrollListener)

  scrollSpy?.dispose()
})
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark" ref="navbarRef">
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
            <span class="nav-link text-success">{{ slisedWallet }}</span>
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

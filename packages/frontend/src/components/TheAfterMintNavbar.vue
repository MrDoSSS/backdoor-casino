<script lang="ts" setup>
import { useNavbar } from '@/composables/navbar'
import { useRouter } from 'vue-router'

const { walletStore, authStore, showConnectModal, navbarRef, slisedWallet } =
  useNavbar()
const router = useRouter()

const play = () => {
  if (walletStore.connected && authStore.loggedIn) {
    router.push({ name: 'play' })
  } else {
    showConnectModal()
  }
}
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
          <router-link class="nav-link" :to="{ name: 'home' }"
            >Home</router-link
          >
        </li>
        <template v-if="walletStore.connected && authStore.loggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'profile' }"
              >Profile</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'shop' }"
              >Shop</router-link
            >
          </li>
        </template>
        <li class="nav-item">
          <a class="nav-link" href="/#faq">FAQ</a>
        </li>
        <li class="nav-item d-lg-none">
          <a
            class="nav-link"
            href="https://twitter.com/backdoorcasino"
            target="_blank"
            ><i class="bi bi-twitter"></i>
          </a>
        </li>
      </ul>
      <ul class="navbar-nav mb-2 mb-lg-0">
        <template v-if="walletStore.connected && authStore.loggedIn">
          <li class="nav-item">
            <span class="nav-link text-success">{{ slisedWallet }}</span>
          </li>
        </template>
        <li class="nav-item" v-else>
          <button
            class="btn btn-outline-light btn-round ms-1 me-0 me-lg-1"
            @click="showConnectModal"
          >
            Connect wallet
          </button>
        </li>
        <li class="nav-item">
          <button
            class="btn btn-primary btn-round ms-1 me-0 me-lg-1"
            @click="play"
          >
            Play now
          </button>
        </li>
        <li class="nav-item d-none d-lg-block">
          <a
            class="nav-link"
            href="https://twitter.com/backdoorcasino"
            target="_blank"
            ><i class="bi bi-twitter"></i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

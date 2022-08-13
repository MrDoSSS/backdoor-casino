<script lang="ts" setup>
import TheMintNavbar from '@/components/TheMintNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheConnectModal from '@/components/TheConnectModal.vue'
</script>

<template>
  <div class="layout h-100 d-flex flex-column">
    <main class="flex-grow-1 d-flex flex-column">
      <TheMintNavbar />

      <RouterView />
    </main>
    <TheFooter />
  </div>
  <TheConnectModal />
</template>

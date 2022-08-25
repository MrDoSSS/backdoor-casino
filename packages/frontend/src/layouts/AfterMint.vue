<script lang="ts" setup>
import TheAfterMintNavbar from '@/components/TheAfterMintNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheConnectModal from '@/components/TheConnectModal.vue'
import Loader from '@/components/Loader.vue'
</script>

<template>
  <div class="layout h-100 d-flex flex-column">
    <main class="flex-grow-1 d-flex flex-column">
      <TheAfterMintNavbar />

      <Suspense>
        <RouterView />
        <template #fallback><Loader /></template>
      </Suspense>
    </main>
    <TheFooter />
  </div>
  <TheConnectModal />
</template>

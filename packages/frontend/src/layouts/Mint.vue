<script lang="ts" setup>
import TheMintNavbar from '@/components/TheMintNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheConnectModal from '@/components/TheConnectModal.vue'
</script>

<template>
  <div class="layout h-100 d-flex flex-column">
    <main class="flex-grow-1 d-flex flex-column">
      <TheMintNavbar />

      <Suspense>
        <RouterView />
        <template #fallback>Loading...</template>
      </Suspense>
    </main>
    <TheFooter />
  </div>
  <TheConnectModal />
</template>

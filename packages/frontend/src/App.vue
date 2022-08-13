<template>
  <Suspense>
    <RouterView />
    <template #fallback>Loading...</template>
  </Suspense>
</template>

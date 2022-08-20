import { createApp } from 'vue'
import { router } from './router'
import { pinia, initStore } from './store'
import { Vue3Mq } from 'vue3-mq'

import App from './App.vue'

import './assets/index.scss'
import 'bootstrap-icons/font/bootstrap-icons.scss'

const app = createApp(App)
  .use(pinia)
  .use(initStore)
  .use(Vue3Mq, { preset: 'bootstrap5' })

initStore.isReady().finally(() => {
  app.use(router)
  router.isReady().finally(() => {
    setTimeout(() => {
      document.querySelector('#loading-app')?.remove()
      app.mount('#app')
    }, 1000)
  })
})

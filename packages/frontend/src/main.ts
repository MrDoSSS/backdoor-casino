import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { pinia, initStore } from './store'
import { Vue3Mq } from 'vue3-mq'

import './assets/index.scss'
import 'bootstrap-icons/font/bootstrap-icons.scss'

createApp(App)
  .use(pinia)
  .use(initStore)
  .use(router)
  .use(Vue3Mq, { preset: 'bootstrap5' })
  .mount('#app')

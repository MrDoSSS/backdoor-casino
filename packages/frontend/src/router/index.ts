import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { guardPipeline } from './guard-pipeline'
import Home from '@/views/Home.vue'
import MintLayout from '@/layouts/Mint.vue'
import AfterMintLayout from '@/layouts/AfterMint.vue'
import { useAuthStore } from '@/store/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MintLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
    ],
  },
  {
    path: '/',
    component: AfterMintLayout,
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue'),
        meta: {
          guard: ['authorized'],
        },
      },
      {
        path: 'shop',
        name: 'shop',
        component: () => import('@/views/Shop.vue'),
        meta: {
          guard: ['authorized'],
        },
      },
      {
        path: 'play',
        name: 'play',
        component: () => import('@/views/Play.vue'),
        meta: {
          guard: ['authorized'],
        },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  guardPipeline({ to, from, next, store })()
})

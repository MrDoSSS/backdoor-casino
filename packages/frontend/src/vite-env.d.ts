/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'web3/dist/web3.min' {
  import * as Web3 from 'web3'
  export = Web3
}

interface ImportMetaEnv {
  VITE_CONTRACT_ADDRESS: string
  VITE_INFURA_PROJECT_ID: string
  VITE_API_URL: string
}

declare module 'vue3-mq' {
  export const Vue3Mq
}

declare module 'phaser3-rex-plugins/plugins/awaitloader-plugin.js' {
  
}
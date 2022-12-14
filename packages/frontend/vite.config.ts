import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            tag.startsWith('lottie') || tag.startsWith('Lottie'),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
      '~': resolve(__dirname),
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/global';`,
      },
    },
  },
})

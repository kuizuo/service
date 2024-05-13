// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-naiveui',
    'nuxt-module-eslint-config',
  ],
  tailwindcss: {
    exposeConfig: {
      write: true,
    },
  },

  build: {
    transpile: ['trpc-nuxt'],
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
})

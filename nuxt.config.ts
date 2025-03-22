// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
      '@nuxtjs/tailwindcss',
      '@nuxt/icon',
      '@vueuse/nuxt',
      '@nuxt/image',
      '@nuxt/eslint',
  ],

  components: [
      {
          path: '~/components',
          pathPrefix: false,
      },
  ],

  devtools: { enabled: true },
  css: ['~/assets/css/global.css'],

  icon: {
      mode: "svg",
      serverBundle: false,
      fallbackToApi: false
  },

  ssr: false,

  typescript: {
      typeCheck: true,
      strict: true,
  },

  compatibilityDate: '2025-03-22',
})
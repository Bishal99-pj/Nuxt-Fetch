// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  typescript: {
    strict: true,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@vueuse/nuxt",
    "@nuxt/image",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});

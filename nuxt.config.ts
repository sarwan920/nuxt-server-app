// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@hypernym/nuxt-gsap",
    "@vueuse/nuxt"
  ],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
  },
});

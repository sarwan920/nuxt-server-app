// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@hypernym/nuxt-gsap",
    "@vueuse/nuxt",
    "@nuxt/devtools",
    "@nuxtjs/color-mode",
    "@nuxt/ui",
    "@unlok-co/nuxt-stripe",
  ],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    resendApiKey:process.env.RESEND_API_KEY,
    baseUrl: process.env.BASE_URL,
  },
  stripe: {
    client: {
      key: "pk_test_51OO0v3JdsTCJqiwy3Wi7HUqNFYxpPHVmBK8k8czU4Lm5rIKPHDRLahJ8qWRXfSLk3eCBELgVFV4xZIRVug9L4TRT00toFtBxzs",
    },
  },

});

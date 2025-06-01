// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxt/eslint"],
  fonts: {
    families: [{ name: "Roboto", provider: "google" }],
  },
  app: {
    head: {
      title: "IT блог",
      //titleTemplate: '%s | IT блог', //
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:3001",
    },
  },
  typescript: {
    strict: true
  },
  vite: {
    vue: {
      script: {
        defineModel: true
      }
    }
  }
});

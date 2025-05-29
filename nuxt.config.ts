// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
   modules: ['@nuxt/fonts'],
   fonts: {
    families: [
      { name: 'Roboto', provider: 'google' }
    ]
  },
  app: {
    head: {
      title: 'IT блог'
      //titleTemplate: '%s | IT блог', //
    }}
});

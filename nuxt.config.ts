// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  app: {
    head: {
      title: 'Kalbe Donor Kalori Leaderboard',
      meta: [
        {
          name: 'description',
          content: 'Track the best performers from PT Agroveta Husada Dharma and Corporate Function.',
        },
        { name: 'theme-color', content: '#070A12' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap',
        },
      ],
      htmlAttrs: {
        lang: 'en',
        class: 'dark',
      },
    },
  },

  typescript: {
    strict: true,
  },

  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/Flip', 'countup.js', 'canvas-confetti'],
    },
  },
})

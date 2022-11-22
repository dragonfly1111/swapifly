import { IntlifyModuleOptions } from '@intlify/nuxt3'
import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    intlify?: IntlifyModuleOptions
  }
}
export default defineNuxtConfig({
  app:{
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  ssr: true,
  modules: [
    '@intlify/nuxt3',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  plugins: [
    '~/plugins/navbar.ts',
    '~/plugins/piniaPersist.ts',
    '~/plugins/arco.ts'
  ],
  css: [
    '~/assets/sass/app.scss',
  ],
  colorMode: {
    classSuffix: '',
  },
  // vueuse
  vueuse: {
    ssrHandlers: true,
  },
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      availableLocales: ['zh', 'en'],
    },
  },
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
    ],
  },
})

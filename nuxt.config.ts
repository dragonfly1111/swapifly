import {IntlifyModuleOptions} from '@intlify/nuxt3'
import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { loadEnv } from 'vite'
interface VITE_ENV_CONFIG {
  VITE_DOMAIN: string
  VITE_PUBLIC_URL: string
  VITE_API_BASE: string
  VITE_OSS_PREFIX: string
  VITE_FB_KEY: string
  VITE_GOOGLE_KEY: string
  VITE_GOOGLE_MAP_KEY: string
  VITE_INS_KEY: string
  VITE_UPLOAD: string
  VITE_FORBID_LINK: string
  VITE_SERVICE_LINK: string
  VITE_PRIVATE_LINK: string
  VITE_SERVICE_EMAIL: string
  VITE_INS_REDIRECT: string
}
const envScript = process.env.npm_lifecycle_script?.split(' ')
console.log('envScript')
console.log(envScript)
// @ts-ignore
const envName = envScript[envScript.length - 1] // 通过启动命令区分环境
console.log(envName)
const envData = loadEnv(envName, 'env') as unknown as VITE_ENV_CONFIG
console.log('envData')
console.log(envData)

declare module '@nuxt/schema' {
  interface NuxtConfig {
    intlify?: IntlifyModuleOptions
  }
}

export default defineNuxtConfig({
  app: {
    pageTransition: {name: 'page', mode: 'out-in'},
    baseURL: envData.VITE_PUBLIC_URL,
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: envData.VITE_PUBLIC_URL + 'favicon.ico' }],
      meta: [
        {charset: 'utf-8'},
        {name: 'format-detection', content: 'telephone=no'},
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'
        }
      ],
    },
  },
  ssr: true,
  publicRuntimeConfig: envData, // 把env放入这个里面，通过useRuntimeConfig获取
  modules: [
    '@intlify/nuxt3',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  plugins: [
    '~/plugins/navbar.ts',
    // '~/plugins/piniaPersist.ts',
    '~/plugins/arco.ts',
    '~/plugins/vuestic.ts',
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
});

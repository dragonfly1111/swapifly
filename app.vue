<script setup lang="ts">
import { AppSetup } from './utils/app'
AppSetup()
const locale = useState<string>('locale.setting')
const app = useAppConfig()
useHead({
  title: app.name,
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/swapifly-logo.png',
    },
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Nuxt 3 Awesome Starter',
    },
  ],
})
</script>

<template>
  <Html :lang="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>

</template>

<style lang="scss">
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>

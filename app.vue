<script setup lang="ts">
import { AppSetup } from './utils/app'
import { useResize } from '~/stores/resize'
const resize = useResize()
AppSetup()
const locale = useState<string>('locale.setting')
const area = useState<string>('area.setting')
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
onMounted(()=>{
  console.log('onMounted')
  // 设置全局缩放属性
  resize.setWidth(window.innerWidth)
  window.addEventListener('resize', handleResize)
})
function handleResize(){
  resize.setWidth(window.innerWidth)
}

// watch()
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

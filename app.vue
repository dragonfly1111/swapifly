<script setup lang="ts">
import { AppSetup } from './utils/app'
import { useResize } from '~/stores/resize'
import initSysData from '~/utils/sysInit'
import { useSysData } from '~/stores/sysData'
import { generateGender } from '~/model/staticDicts'
import { useI18n } from "vue-i18n";
import "@eonasdan/tempus-dominus/dist/css/tempus-dominus.min.css";
const {t} = useI18n();
const locale = useState<string>('locale.setting')
const area = useState<string>('area.setting')
const resize = useResize()
const sysData = useSysData()
AppSetup()

const app = useAppConfig()
useAsyncData(async ()=>{
  // 服务设置系统属性数据
  const sysDataRes = await initSysData()
  sysData.setSysDataServerSide(sysDataRes)
})
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
  // 客户端设置系统属性数据
  if(process.client){
    sysData.setSysDataClientSide({
      gender: generateGender(t),
      region: [],
      lang: [],
      goodsClass: [],
      goodsSort: [],
      goodsOan: []
    })
  }
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

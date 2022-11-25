<script setup lang="ts">
import { AppSetup } from './utils/app'
import { useResize } from '~/stores/resize'
import initSysData from '~/utils/sysInit'
import { useSysData } from '~/stores/sysData'
import { generateGender, generateEvaluationSort, generateEvaluationSource } from '~/model/res/staticDicts'
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
  // const areaSetting = useCookie('area')
  // const areaSetting = useCookie('locale')
  console.log('area')
  // const headers = useRequestHeaders(['cookie'])
  // console.log(headers)
  // console.log(area.value)
  // console.log(locale.value)
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
  // todo sdk 支持对语言
  script:[{
    'src': 'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v12.0&appId=489813939845259&autoLogAppEvents=1', async: true, defer: true
  }]
})
onMounted(()=>{
  console.log('onMounted')
  // 客户端设置系统属性数据
  if(process.client){
    sysData.setSysDataClientSide({
      gender: generateGender(t),
      evaluationSort: generateEvaluationSort(t),
      evaluationSource: generateEvaluationSource(t),
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

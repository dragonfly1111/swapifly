<script setup lang="ts">
import {AppSetup} from './utils/app'
import {useResize} from '~/stores/resize'
import initSysData from '~/utils/sysInit'
import {useSysData} from '~/stores/sysData'
import {getSearchHistory} from '~/api/goods'
import {
  generateGender,
  generateEvaluationSort,
  generateEvaluationSource,
  generateMsgType,
  generateDialogueOperationType,
  generateAuthenticationStatus
} from '~/model/res/staticDicts'
import {useI18n} from "vue-i18n";
import "@eonasdan/tempus-dominus/dist/css/tempus-dominus.min.css";

const {t} = useI18n();
const locale = useState<string>('locale.setting')
const area = useState<string>('area.setting')
const resize = useResize()
const sysData = useSysData()
AppSetup()
const app = useAppConfig()
useAsyncData(async () => {
  // const areaSetting = useCookie('area')
  // const areaSetting = useCookie('locale')
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
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {
      hid: 'description',
      name: 'description',
      content: 'Swapifly轉手快是一家創立於香港的分類在線交易平台,專注於限量版和奢侈品的轉售。無論身處香港本地或已移民海外, 均可輕鬆放隻或搜羅絕版心頭好，如: 各式名牌手袋手錶、潮流電子、傢俬、電器、二手車或物業等。立即登入Swapifly開始轉手快的體驗。',
    },
    {
      hid: 'keyword',
      name: 'keyword',
      content: 'swapifly,轉手,二手,轉售,絕版,名牌手袋,手錶,潮流電子,傢私,電器,二手車,物業',
    }
  ],
  // todo sdk 支持对语言
  script: [
    {
      'src': 'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v12.0&appId=489813939845259&autoLogAppEvents=1',
      async: true,
      defer: true
    },
    {
      'src': 'https://accounts.google.com/gsi/client', async: true, defer: true
    },
    {
      'src': 'https://cdn.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.min.js', async: true, defer: true
    },
  ]
})
// console.log("=====onMounted====", resize)
onMounted(() => {
  // reurl()
  // 客户端设置系统属性数据
  if (process.client) {
    sysData.setSysDataClientSide({
      gender: generateGender(t),
      evaluationSort: generateEvaluationSort(t),
      evaluationSource: generateEvaluationSource(t),
      msgType: generateMsgType(t),
      dialogueOperationType: generateDialogueOperationType(t),
      authenticationStatus: generateAuthenticationStatus(t),
      region: [],
      lang: [],
      goodsClass: [],
      goodsSort: [],
      goodsOan: []
    })
    getSearchHistory().then(res => {
      const searchLog = res.data.search_log
      const collectionList = res.data.scsearch_log
      sysData.setSearchHis({
        searchLog,
        collectionList
      })
    })
  }
  // 设置全局缩放属性
  // console.log("===window.innerWidth===", window.innerWidth)
  resize.setWidth(window.innerWidth)
  window.addEventListener('resize', handleResize)
})

function handleResize() {
  // console.log("===缩放====", window.innerWidth)
  resize.setWidth(window.innerWidth)
}

function reurl() { // 解决第一次进入不加载js文件
  if (location.href.indexOf('#reloaded') === -1) {
    location.href = location.href + '#reloaded'
    location.reload()
  }
}

// watch()
</script>

<template>
  <Html :lang="locale">
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
  </Html>

</template>

<style lang="scss">
@import "assets/sass/mediaCss.scss";

html, body, #__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.search-data-mobile {
  height: 60px;
  background-color: #fff;

  .arco-col-8 {
    .arco-select-view-single {
      background-color: #fff;
      color: #000;
    }
  }
}

html.dark {
  background: #222;
  color: white;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

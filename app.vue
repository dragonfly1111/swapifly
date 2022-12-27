<script setup>
import {AppSetup} from './utils/app'
import {useResize} from '~/stores/resize'
import initSysData from '~/utils/sysInit'
import {useSysData} from '~/stores/sysData'
import {useUserInfo} from '~/stores/userInfo'
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
import {getMsgDot} from '~/api/comon'

const {t} = useI18n();
const locale = useState('locale.setting')
const area = useState('area.setting')
const resize = useResize()
const sysData = useSysData()
const userInfo = useUserInfo()
AppSetup()
const app = useAppConfig()
const runtimeConfig = useRuntimeConfig()
console.log('app')
console.log(app)
// const route = useRoute()
// const router = useRouter()
useAsyncData(async (ctx) => {
  // const areaSetting = useCookie('area')
  // const areaSetting = useCookie('locale')
  // const headers = useRequestHeaders(['cookie'])
  // console.log(headers)
  // console.log(area.value)
  // console.log(locale.value)
  // 服务设置系统属性数据

})
useHead({
  title: app.name,
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'
    },
    {
      hid: 'description',
      name: 'description',
      content: 'Swapifly轉手快是一家創立於香港的分類在線交易平台,專注於限量版和奢侈品的轉售。無論身處香港本地或已移民海外, 均可輕鬆放隻或搜羅絕版心頭好，如: 各式名牌手袋手錶、潮流電子、傢俬、電器、二手車或物業等。立即登入Swapifly開始轉手快的體驗。',
    },
    {
      hid: 'keyword',
      name: 'keyword',
      content: 'swapifly,轉手,二手,轉售,絕版,名牌手袋,手錶,潮流電子,傢私,電器,二手車,物業',
    },
    {
      hid: "og:url",
      name: "og:url",
      content: `${runtimeConfig.VITE_DOMAIN}${runtimeConfig.VITE_PUBLIC_URL}`,
    },
    {
      hid: "og:type",
      name: "og:type",
      content: 'website',
    },
    {
      hid: "og:title",
      name: "og:title",
      content: app.name,
    },
    {
      hid: "og:description",
      name: "og:description",
      content: 'Swapifly轉手快是一家創立於香港的分類在線交易平台,專注於限量版和奢侈品的轉售。無論身處香港本地或已移民海外, 均可輕鬆放隻或搜羅絕版心頭好，如: 各式名牌手袋手錶、潮流電子、傢俬、電器、二手車或物業等。立即登入Swapifly開始轉手快的體驗。',
    },
    {
      hid: "og:image",
      name: "og:image",
      content: `https://oss.swapifly.com/swapifly/20221227/9b25b39895c7da3b970bbcfd1cc073e5826b8d64.jpg`,
    },
    {
      hid: "og:favicon",
      name: "og:favicon",
      content: `https://oss.swapifly.com/swapifly/20221227/9b25b39895c7da3b970bbcfd1cc073e5826b8d64.jpg`,
    },
    {
      hid: "og:image:width",
      name: "og:image:width",
      content: 200,
    },
    {
      hid: "og:image:height",
      name: "og:image:height",
      content: 200,
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: app.name,
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: `${runtimeConfig.VITE_DOMAIN}${runtimeConfig.VITE_PUBLIC_URL}`,
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: 'Swapifly轉手快是一家創立於香港的分類在線交易平台,專注於限量版和奢侈品的轉售。無論身處香港本地或已移民海外, 均可輕鬆放隻或搜羅絕版心頭好，如: 各式名牌手袋手錶、潮流電子、傢俬、電器、二手車或物業等。立即登入Swapifly開始轉手快的體驗。',
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: 'summary_large_image',
    },
    {
      hid: "twitter:site",
      name: "twitter:site",
      content: `${runtimeConfig.VITE_DOMAIN}${runtimeConfig.VITE_PUBLIC_URL}`,
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: `https://oss.swapifly.com/swapifly/20221227/9b25b39895c7da3b970bbcfd1cc073e5826b8d64.jpg`,
    },
    {
      hid: "twitter:image:width",
      name: "twitter:image:width",
      content: 200,
    },
    {
      hid: "twitter:image:height",
      name: "twitter:image:height",
      content: 200,
    },

  ],
  // todo sdk 支持对语言
  script: [
    {
      src: `https://connect.facebook.net/zh_HK/sdk.js#xfbml=1&version=v12.0&appId=${runtimeConfig.VITE_FB_KEY}&autoLogAppEvents=1`,
      async: true,
      defer: true
    },
    {
      src: `https://connect.facebook.net/zh_HK/sdk.js#xfbml=1&version=v3.0`,
      async: true,
      defer: true
    },
    {
      src: 'https://accounts.google.com/gsi/client', async: true, defer: true
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.min.js', async: true, defer: true
    },
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', async: true, defer: true
    }
  ]
})

// console.log("=====onMounted====", resize)
onMounted(async () => {
  console.log(process.client)
  resize.setWidth(window.innerWidth)
  // reurl()
  // 客户端设置系统属性数据
  if (process.client) {
    userInfo.initState()
    const sysDataRes = await initSysData()
    console.log('initSysData')
    sysData.setSysDataServerSide(sysDataRes)
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
  window.addEventListener('resize', handleResize)
})

function handleResize() {
  // console.log("===缩放====", window.innerWidth)
  resize.setWidth(window.innerWidth)
}


function getMsgRedDot() {
  getMsgDot({
    key: new Date().getTime()
  }).then(res => {
    if (res.code === 0) {
      userInfo.setMsg({
        newMessage: res.data.newmessage,
        newNotice: res.data.newnotice
      })
    } else {
      userInfo.setMsg({
        newMessage: 0,
        newNotice: 0
      })
    }
  })
}

setInterval(() => {
  if (!userInfo.token) return
  getMsgRedDot()
}, 2000)
let map;
let service;

function initMap() {
  const hk = new google.maps.LatLng(22.3193039, 114.1693611);
  map = new google.maps.Map(document.getElementById('map'), {center: hk, zoom: 15});
  console.log(map)
  const service = new google.maps.places.PlacesService(map);
  window.googleLocationService = service
}

</script>

<template>
  <Html :lang="locale">
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
  </Html>

</template>

<style lang="scss">
@import "assets/sass/var.scss";

html, body, #__nuxt {
  //height: 100vh;
  margin: 0;
  padding: 0;
}

// 页面切换样式
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

<template>
  <main :style="{
    padding: resize.screenType === 'MOBILE' ? '0 10px 10px 10px' : '0',
    overflowX: resize.screenType === 'MOBILE' ? 'hidden' : 'auto',
  }">
    <Header v-if="['common','dialogue','commonMobileAndPcPage'].includes(headType)"/>
    <HelpHeader v-else-if="headType === 'help'"/>
    <NewsHeader v-else-if="headType === 'news'"/>
    <slot/>
    <Footer v-if="headType === 'common'"/>
    <HelpFooter v-else-if="headType === 'help'"/>
  </main>
</template>
<script setup>
import {useResize} from '~/stores/resize'

const router = useRouter()
const resize = useResize()
const headType = ref('common')
const helpArr = [
  '/helpCenter',
  '/helpCenter/detail',
  '/helpCenter/search'
]
const newsArr = [
  '/newsCenter',
  '/newsCenter/detail',
  '/newsCenter/search'
]
//新增的移动端页面
const mobileArr = [
    '/login',
    '/register',
    '/mobileUserProfile',
    '/moreSearchFilter',
    '/settingProfile',
    '/mobileProfile',
    '/mobileEditPassword',
];
//共用的移动端页面，头部需要
const mobileAndPcArr = [
  '/like',
  '/userDetails',
  '/goodsDetails',
  '/saleEditGoods',
  '/saleEdit'
];
//共用的移动端页面，头尾都不要
const noHearderAndFooter = [
  '/Message',
]
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  console.log('watch', newValue);
  if (helpArr.indexOf(newValue) !== -1) {
    headType.value = 'help'
  } else if (newsArr.indexOf(newValue) !== -1) {
    headType.value = 'news'
  } else if (mobileAndPcArr.includes(newValue) && resize.screenType === 'MOBILE'){
    headType.value = 'commonMobileAndPcPage'
}  else if (noHearderAndFooter.includes(newValue) && resize.screenType === 'MOBILE'){
    headType.value = 'noHearderAndFooterPage'
  } else if(newValue === '/dialogue' && resize.screenType !== 'MOBILE'){
    headType.value = 'dialogue'
  } else if(newValue === '/dialogue' && resize.screenType === 'MOBILE'){
    headType.value = 'mobileDialoguePage'
  } else if (mobileArr.includes(newValue)) {
    headType.value = 'mobilePage'
  } else {
    headType.value = 'common'
  }
  console.log(headType.value)
}, {immediate: true})
</script>

<template>
  <main :style="{
    padding: resize.screenType === 'MOBILE' ? '10px' : '0',
    overflowX: resize.screenType === 'MOBILE' ? 'hidden' : 'auto',
  }">
    <Header v-if="headType === 'common' || headType === 'dialogue'"/>
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
const mobileArr = [
    '/login',
    '/register',
    '/mobileUserProfile',
    '/mobileLike'
];
console.log("====resize====",resize.screenType)
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  console.log('watch', newValue);
  if (helpArr.indexOf(newValue) !== -1) {
    headType.value = 'help'
  } else if (newsArr.indexOf(newValue) !== -1) {
    headType.value = 'news'
  } else if (newValue === '/notification' && resize.screenType === 'MOBILE'){
    headType.value = 'MobileNotificationPage'
  } else if (newValue === '/like' && resize.screenType === 'MOBILE'){
    headType.value = 'MobileLikePage'
  } else if(newValue === '/dialogue'){
    headType.value = 'dialogue'
  } else if (mobileArr.includes(newValue)) {
    headType.value = 'mobilePage'
  } else {
    headType.value = 'common'
  }
  console.log(headType.value)
}, {immediate: true})
</script>

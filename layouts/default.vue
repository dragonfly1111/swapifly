<template>
  <main class="main-pc-mobile">
    <Header :need-back="needBack" v-if="['common','dialogue'].includes(headType)"/>
    <HelpHeader v-else-if="headType === 'help'"/>
    <NewsHeader v-else-if="headType === 'news'"/>
    <slot/>
    <Footer v-if="headType === 'common' && needFoot"/>
    <HelpFooter v-else-if="headType === 'help' && needFoot"/>
  </main>
</template>
<script setup>
import {useResize} from '~/stores/resize'

const router = useRouter()
const resize = useResize()
const headType = ref('common')
const needFoot = ref(true)
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

const noFootArr = [
  '/dialogue/chatDetail'
]

watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  console.log('watch', newValue);
  if (helpArr.indexOf(newValue) !== -1) {
    headType.value = 'help'
  } else if (newsArr.indexOf(newValue) !== -1) {
    headType.value = 'news'
  } else if (newValue === '/dialogue') {
    headType.value = 'dialogue'
  } else {
    headType.value = 'common'
  }

  if(noFootArr.indexOf(newValue) !== -1){
    needFoot.value = false
  }
  console.log('needBack')
  console.log(resize.screenType)
  console.log(headType.value)
}, {immediate: true})
</script>

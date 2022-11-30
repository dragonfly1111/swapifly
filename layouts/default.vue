<template>
  <main :style="{padding: resize.screenType === 'MOBILE' ? '10px' : '0'}">
    <Header v-if="headType === 'common'"/>
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
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  console.log('watch', newValue);
  if (helpArr.indexOf(newValue) !== -1) {
    headType.value = 'help'
  } else if (newsArr.indexOf(newValue) !== -1) {
    headType.value = 'news'
  } else {
    headType.value = 'common'
  }
  console.log(headType.value)
}, {immediate: true})
</script>

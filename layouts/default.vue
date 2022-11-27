<template>
  <main>
    <Header v-if="headType === 'common'" />
    <HelpHeader v-else-if="headType === 'help'" />
    <NewsHeader v-else-if="headType === 'news'" />
    <slot />
    <Footer  v-if="headType === 'common'" />
    <Footer1 v-else-if="headType === 'help'" />
  </main>
</template>
<script setup>
import { useResize } from '~/stores/resize'
const router = useRouter()
const resize = useResize()
const headType = ref('common')
const head1Arr = [
    '/helpCenter',
    '/newsCenter'
]
watch(() =>router.currentRoute.value.path,(newValue,oldValue)=> {
  console.log('watch',newValue);
  if(newValue === '/helpCenter'){
    headType.value = 'help'
  } else if(newValue === '/newsCenter') {
    headType.value = 'news'
  } else {
    headType.value = 'common'
  }
  console.log(headType.value)
},{ immediate: true })
</script>

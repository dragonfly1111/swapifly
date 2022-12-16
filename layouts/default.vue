<template>
  <main class="main-pc-mobile">
    <Header v-if="headType === 'common'"/>
    <HelpHeader v-else-if="headType === 'help'"/>
    <NewsHeader v-else-if="headType === 'news'"/>
    <slot/>
    <Footer v-if="headType === 'common' && needFoot"/>
    <HelpFooter v-else-if="headType === 'help' && needFoot"/>
    <a-button v-if="userInfo.token" class="mobile-sell" type="primary" @click.stop="router.push('/saleEdit')">{{$t('head.sell')}}</a-button>

  </main>
</template>
<script setup>
import {useResize} from '~/stores/resize'
import {useUserInfo} from "~/stores/userInfo";

const router = useRouter()
const resize = useResize()
const headType = ref('common')
const needFoot = ref(true)
const userInfo = useUserInfo()
// 帮助中心路由 使用帮助的头(pc)
const helpArr = [
  '/helpCenter',
  '/helpCenter/detail',
  '/helpCenter/search'
]
// 新闻中心路由 使用新闻的头(pc)
const newsArr = [
  '/newsCenter',
  '/newsCenter/detail',
  '/newsCenter/search'
]
// 不需要foot的路由
const noFootArr = [
  '/dialogue/chatDetail',
  '/dialogue',
  '/dialogue/mobile'
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

  if(noFootArr.indexOf(newValue) !== -1){
    needFoot.value = false
  }
  console.log('needFoot')
  console.log(needFoot.value)
  console.log(resize.screenType)
  console.log(headType.value)
}, {immediate: true})
</script>
<style lang="scss">
@import "assets/sass/var";
@media screen and(min-width:1000px) {
  .mobile-sell{
    display: none;
  }
}

// 移动端
@media screen and(max-width:1000px) {
  // 移动端出售悬浮按钮
  .mobile-sell{
    display: block ;
    position: fixed;
    bottom: 60px;
    right: 4%;
    background-color: $main-pink !important;
    color: #fff;
    z-index: 99;
    height: 35px;
    width: 82px;
  }
}
</style>

<template>
  <main>
    <Header v-if="headType === 'common'"/>
    <HelpHeader v-else-if="headType === 'help'"/>
    <NewsHeader v-else-if="headType === 'news'"/>
    <slot/>
    <Footer v-if="headType === 'common' && needFoot"/>
    <HelpFooter v-else-if="headType === 'help' && needFoot"/>
    <div style="height: 50px;" v-if="needPb"></div>
    <a-button v-if="userInfo.token && needSell" class="mobile-sell" type="primary" @click.stop="router.push('/saleEdit')">
<!--    <a-button class="mobile-sell" type="primary" @click.stop="router.push('/saleEdit')">-->
      {{ $t('head.sell') }}
    </a-button>

    <div v-if="needHome" class="float-home" @click.stop="router.push('/')">
      <img src="@/assets/images/icon/go-home.svg" alt="">
    </div>
  </main>
</template>
<script setup>
import {useUserInfo} from "~/stores/userInfo";

const router = useRouter()
const headType = ref('common')
const needHome = ref(false)
const needFoot = ref(true)
const needSell = ref(true)
const needPb = ref(false)
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
  '/dialogue/mobile',
  '/userProfile'
]
// 不需要'出售'按钮的路由
const noSellButArr = [
  '/saleEditGoods',
  '/saleEdit',
  '/newsCenter',
  '/newsCenter/detail',
  '/helpCenter',
  '/helpCenter/detail',
  '/helpCenter/search',
  '/dialogue/mobile',
  '/dialogue/chatDetail',
  '/userProfile',
]
// 底部需要加高一点的路由
const needPaddingBRoute = [
  '/goodsDetails',
]


watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  if(newValue === '/'){
    needHome.value = false
  } else {
    needHome.value = true
  }
  if (helpArr.indexOf(newValue) !== -1) {
    headType.value = 'help'
  } else if (newsArr.indexOf(newValue) !== -1) {
    headType.value = 'news'
  } else {
    headType.value = 'common'
  }

  if (noFootArr.indexOf(newValue) !== -1) {
    needFoot.value = false
  } else {
    needFoot.value = true
  }
  if (noSellButArr.indexOf(newValue) !== -1) {
    needSell.value = false
  } else {
    needSell.value = true
  }
  if (needPaddingBRoute.indexOf(newValue) !== -1) {
    needPb.value = true
  } else {
    needPb.value = false
  }
  if(process.client){
    console.log('needFoot')
    console.log(needFoot.value)
    console.log('needSell')
    console.log(needSell.value)
    console.log(headType.value)
  }
}, {immediate: true})
</script>
<style lang="scss">
@import "assets/sass/var";

@media screen and(min-width: 1000px) {
  .mobile-sell {
    display: none;
  }
  .float-home{
    display: none;
  }
}

// 移动端
@media screen and(max-width: 1000px) {
  // 移动端出售悬浮按钮
  .mobile-sell {
    display: block;
    position: fixed;
    bottom: 60px;
    right: 4%;
    background-color: $main-pink !important;
    color: $main-white;
    z-index: 99;
    height: 35px;
    width: 82px;
  }
  .float-home{
    display: block;
    position: fixed;
    width: 38px;
    height: 38px;
    right: 4%;
    bottom: 120px;
    img{
      width: 38px;
      height: 38px;
    }
  }
}
</style>

<template>
  <div class="global-foot1">
    <div class="common-row">
      <div>
        <img class="logo" src="@/assets/images/logo-long.png" alt="">
      </div>
      <div class="link-wrap">
        <span @click="$router.push('/')">{{ $t('foot.home') }}</span>
        <span @click="$router.push('/newsCenter')">{{ $t('foot.news') }}</span>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import { useResize } from '~/stores/resize'
const resize = useResize()
const router = useRouter()

const toHelp = () =>{
  router.push('/helpCenter')
}
</script>
<style scoped lang="scss">
@import "assets/sass/var";
.global-foot1{
  //position: fixed;
  background: #f0f1f1;
  bottom: 0;
  width: 100%;
}
.common-row{
  padding: 30px 0;
  img{
    width: 96px;
  }
  .link-wrap{
    margin-top: 21px;
    span{
      font-size: 16px;
      color: $main-grey;
      cursor: pointer;
      &:hover{
        color: $main-blue;
      }
    }
    span + span{
      margin-left: 60px;
    }
  }
}
</style>

<template>
  <div class="global-foot">
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
const router = useRouter()

const toHelp = () =>{
  router.push('/helpCenter')
}
</script>
<style lang="scss" scoped>
@import "assets/sass/var";
.global-foot{
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
<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .global-foot{
    padding: 15px;
    width: calc(100% - 30px);
    .common-row{
      padding: 0;
      span{
        display: block;
        font-size: 14px;
      }
      span + span {
        margin-left: 0;
        margin-top: 12px;
      }
    }
  }
}
</style>

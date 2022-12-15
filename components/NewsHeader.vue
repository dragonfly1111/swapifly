<template>
  <div class="global-head1">
    <div class="common-row">
      <div class="left">
        <img @click="$router.push('/')" class="logo" src="@/assets/images/swapifly-logo.png" alt="">
        <span class="view-home" @click="$router.push('/')">{{ $t('head.viewHome') }}</span>
      </div>
      <div class="right">
        <LanguageSwitcher />
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";
.global-head1 {
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 998;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E5E5;
}
.common-row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 14px 0;
  .left{
    display: flex;
    align-items: center;
    cursor: pointer;
    .logo{
      width: 24px;
      height: 24px;
    }
    span{
      font-size: 14px;
      margin-left: 17px;
    }
  }
  .right{
    display: flex;
    align-items: center;
    .view-home{
      cursor: pointer;
      font-size: 16px;
      margin-right: 26px;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

@media screen and (max-width: 1000px) {
  .global-head1{
    padding: 0 15px;
    width: calc(100% - 30px);
  }
}
</style>

<template>
  <div class="global-foot">
    <div class="common-row">
      <div class="left">
        <img class="logo" src="@/assets/images/swapifly-logo.png" alt="">
        <span class="info">©2022 Swapifly</span>
        <div class="other">
          <span>{{$t('foot.helpCenter')}}</span>
          <span>{{$t('foot.media')}}</span>
        </div>
      </div>
      <div class="right">
        <AreaSwitcher />
        <div class="size-box"></div>
        <LanguageSwitcher />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useResize } from '~/stores/resize'
const resize = useResize()
</script>
<style scoped lang="scss">
@import "assets/sass/var";
.global-foot{
  //position: fixed;
  bottom: 0;
  width: 100%;
}
.common-row{
  border-top: 1px solid #E5E5E5;
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  justify-content: space-between;
  .left{
    display: flex;
    align-items: center;
    .logo{
      width: 24px;
      height: 24px;
    }
    .info{
      font-size: 10px;
      color: #383838;
      margin-left: 7px;
    }
    .other{
      margin-left: 43px;
      span{
        font-size: 10px;
        color: #383838;
        cursor: pointer;
        &:hover{
          color: $main-blue;
        }
      }
      span + span{
        margin-left: 27px;
      }
    }
  }
  .right{
    display: flex;
    .size-box{
      width: 40px;
    }
  }

}
</style>

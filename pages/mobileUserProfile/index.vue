<template>
  <div class="mobile-user-profile">
    <div class="login-title">
      <icon-left  class="back-index" @click="handleIndex"/>
      {{ $t("mobile.user_center") }}
    </div>
    <div class="setting-list">
      <p class="setting-list-one" @click="toPath('/like')">
        <icon-heart class="icon-mobile"></icon-heart>
        <span>{{$t('pages.like_title')}}</span>
      </p>
      <p class="setting-list-one" @click="toPath('/Message')">
        <icon-Message class="icon-mobile"></icon-Message>
        <span>{{$t('pages.mobile_notice')}}</span>
      </p>
      <p class="setting-list-one" @click="toPath(`/userDetails?userId=${userInfo.id}`)">
        <icon-user class="icon-mobile"></icon-user>
        <span>{{$t('profile.edit_profile')}}</span>
      </p>
      <p class="setting-list-one" @click="toPath(`/settingProfile`)">
        <icon-settings class="icon-mobile"></icon-settings>
        <span>{{$t('profile.mobile_setting')}}</span>
      </p>
      <p class="setting-list-one" @click="toPath(`/logout`)">
        <icon-export class="icon-mobile"></icon-export>
        <span>{{$t('head.logout')}}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {limitObj} from '~/model/payload/mobile'
import {useUserInfo} from "~/stores/userInfo";
import {ref,reactive} from "vue";
const router = useRouter();
const userInfo = useUserInfo()
const handleIndex = () => {
  router.push("/")
};
const toPath = (data:string) =>{
  if (data === '/logout'){
    userInfo.logout();
    router.replace('/')
  }else {
    router.push(data)
  }
}
</script>

<style lang="scss" scoped>
.mobile-user-profile{
  .login-title {
    border-bottom: 1px solid #ccc;
    text-align: center;
    position: relative;
    font-size: 18px;
    font-weight: bold;
    height: 45px;
    line-height: 45px;
    .back-index{
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      font-size: 25px;
      font-weight: bold;
      transform: translateY(-50%);
    }
    img {
      width: 152px;
      height: 36px;
      display: inline-block;
    }
  }
  .setting-list{
    .setting-list-one{
      margin: 0;
      height: 40px;
      line-height: 40px;
      padding: 8px 5px;
      position: relative;
      text-indent: 25px;
      >.icon-mobile{
        font-size: 20px;
        display: block;
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>

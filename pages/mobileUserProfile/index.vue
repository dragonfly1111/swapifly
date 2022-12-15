<template>
  <div class="mobile-user-profile common-row global-content">
    <div class="setting-list">
      <p class="setting-list-one" @click="toPath('/like')">
        <icon-heart class="icon-mobile"></icon-heart>
        <span>{{$t('pages.like_title')}}</span>
      </p>
      <p class="setting-list-one" @click="toPath('/notification')">
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

<script setup>
import {useUserInfo} from "~/stores/userInfo";
const router = useRouter();
const userInfo = useUserInfo()
const handleIndex = () => {
  router.push("/")
};
const toPath = (data) =>{
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
  height: calc(100vh - 112px - 66px - 66px);
}
</style>

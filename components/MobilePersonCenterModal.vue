<template>
  <a-modal v-model:visible="visible" title-align="start" modal-class="mobile-person-dialog" :footer="false" @close="handleCancel">
    <template #title>
      <div class="login-title">
        <img src="@/assets/images/logo-long.png" alt=""/>
      </div>
    </template>
    <div class="mobile-user-profile">
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
  </a-modal>
</template>

<script setup>
import {useUserInfo} from "~/stores/userInfo";
const visible = ref(false)
const router = useRouter();
const userInfo = useUserInfo()
const toPath = (data) =>{
  visible.value = false
  if (data === '/logout'){
    userInfo.logout();
    router.replace('/')
  } else {
    router.push(data)
  }
}
const openDialog = () => {
  visible.value = true;
}
defineExpose({
  openDialog,
})
</script>

<style lang="scss">
@import "assets/sass/var";
.mobile-person-dialog {
  padding: 20px 27px;
  top: 0;
  border-radius: 0;
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  .arco-modal-header {
    padding: 0;
    height: unset;
    align-items: start;
    border-bottom: unset;
    .login-title {
      text-align: left;
      img {
        width: 152px;
        height: 36px;
      }
    }
  }

  .arco-modal-body {
    padding: 12px 0 0 0;
    .mobile-user-profile{
      .setting-list{
        .setting-list-one{
          margin: 0;
          height: 40px;
          line-height: 40px;
          padding: 8px 5px;
          display: flex;
          align-items: center;
          .icon-mobile{
            font-size: 20px;
            margin-right: 12px;
          }
        }
      }
    }

  }
}
</style>


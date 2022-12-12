<template>
  <div class="setting-profile">
    <div class="login-title">
      <icon-left  class="back-index" @click="router.back()"/>
      {{ $t("profile.mobile_setting") }}
    </div>
    <div class="content-setting-profile">
      <div class="line-one" @click="handlePage('/mobileProfile')">
        {{ $t("profile.edit_profile")}}
        <img src="@/assets/images/icon/right-icon.png" class="go-setting-page" alt="">
      </div>
      <div class="line-one" @click="handlePage('/mobileEditPassword')">
        {{ $t("profile.edit_password")}}
        <img src="@/assets/images/icon/right-icon.png" class="go-setting-page" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const handlePage = (data:string) => {
  router.push(data)
};
</script>

<style scoped lang="scss">
@import "assets/sass/var.scss";
.setting-profile{
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
  .content-setting-profile{
    padding-top: 10px;
    .line-one{
      position: relative;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      .go-setting-page{
        width: 16px;
        display: block;
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 30px;
        font-weight: 400;
      }
    }
  }
}
</style>
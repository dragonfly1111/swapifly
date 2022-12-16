<template>
  <div class="global-content common-row setting-profile">
    <div class="content-setting-profile">
      <div class="line-one" @click="handlePage('profile')">
        {{ $t("profile.edit_profile")}}
        <img src="@/assets/images/icon/right-icon.png" class="go-setting-page" alt="">
      </div>
      <div class="line-one" @click="handlePage('password')">
        {{ $t("profile.edit_password")}}
        <img src="@/assets/images/icon/right-icon.png" class="go-setting-page" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const handlePage = (e) => {
  router.push(`/userProfile?type=${e}`)
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
    .line-one{
      position: relative;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .go-setting-page{
        width: 14px;
      }
    }
  }
}
</style>

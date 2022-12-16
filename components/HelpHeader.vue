<template>
  <div class="global-head1">
    <div class="common-row">
      <div class="left">
        <nuxt-link href="/">
          <img class="logo mobile-help-center-logo" src="@/assets/images/logo-long.png" alt="">
        </nuxt-link>
        <span class="mobile-help-center" @click="$router.push('/helpCenter')">{{ $t('helpCenter.helpCenter') }}</span>
      </div>
      <div class="right">
        <span class="view-home mobile-display-none" @click="$router.push('/')">{{ $t('head.viewHome') }}</span>
        <LanguageSwitcher/>
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
}

.common-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;
    padding: 18px 0;

    .logo {
      width: 156px;
      height: 36px;
    }

    span {
      cursor: pointer;
      font-size: 24px;
      margin-left: 25px;
      font-weight: 600;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .view-home {
      font-weight: 500;
      cursor: pointer;
      font-size: 16px;
      margin-right: 26px;
    }
  }
}
</style>
<style lang="scss" scoped>
@media screen and(max-width: 1000px) {
  .common-row {
    .left {
      display: flex;
      align-items: center;
      padding: 18px 0;

      .logo {
        width: 120px;
        height: unset;
      }

      span {
        cursor: pointer;
        font-size: 20px;
        margin-left: 12px;
        font-weight: 600;
      }
    }
  }
}
</style>

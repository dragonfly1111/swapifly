<template>
  <div class="global-foot">
    <div class="common-row">
      <div class="left">
        <img class="logo" src="@/assets/images/swapifly-logo.png" alt="">
        <span class="info">©2022 Swapifly Limited 轉手快科技有限公司</span>
        <div class="other">
          <a-link @click="$router.push('/helpCenter')">{{$t('foot.helpCenter')}}</a-link>
          <a-link @click="$router.push('/newsCenter')">{{$t('foot.media')}}</a-link>
        </div>
      </div>
      <div class="right">
        <AreaSwitcher />
        <div class="size-box"></div>
        <LanguageSwitcher />
      </div>
    </div>
    <div class="common-row-mobile">
      <div class="one-row">
        <img class="logo" src="@/assets/images/swapifly-logo.png" alt="">
        <span class="info">©2022 Swapifly Limited 轉手快科技有限公司</span>
      </div>
      <div class="two-row">
        <span @click="$router.push('/helpCenter')">{{$t('foot.helpCenter')}}</span>
        <span @click="$router.push('/newsCenter')">{{$t('foot.media')}}</span>
      </div>
      <div class="one-row">
        <AreaSwitcher />
        <div style="width: 40px;"></div>
        <LanguageSwitcher />
      </div>
    </div>
    <div class="tec-sup" @click="toHL">
      <img src="~@/assets/images/HL-logo.png" alt="">
      <div class="info">{{ $t("foot.sup") }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter()
const toHL = () => {
  window.open('https://honglanshuzi.com/', '_blank')
}
</script>
<style scoped lang="scss">
@import "assets/sass/var";
.global-foot{
  //position: fixed;
  bottom: 0;
  width: 100%;
}
.common-row{
  border-top: 1px solid $main-grey-border;
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
      color: $main-grey;
      margin-left: 7px;
    }
    .other{
      margin-left: 43px;
      a{
        font-size: 10px;
        color: $main-grey;
      }
      a + a{
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
.common-row-mobile{
  display: none;
}
.tec-sup{
  text-align: center;
  padding-top: 12px;
  padding-bottom: 32px;
  font-size: 10px;
  color: #999999;
  img{
    height: 20px;
    margin-bottom: 8px;
  }
}
</style>
<style lang="scss" scoped>
@import "assets/sass/var";

@media screen and(max-width: 1000px) {
  .common-row-mobile{
    padding-bottom: 25px;
    display: block;
    .two-row{
      padding: 20px 0;
      text-align: center;
      span{
        display: inline-block;
      }
      >span:last-child{
        margin-left: 10px;
      }
    }
    .one-row{
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      margin: auto;
      img{
        display: inline-block;
        width: 24px;
        height: 24px;
      }
    }
  }
  .common-row{
    display: none;
  }
  .tec-sup{
    margin-top: 0;
    margin-bottom: 20px;
    img{
      margin-bottom: 4px;
    }
  }
}
</style>

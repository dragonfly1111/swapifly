<template>
  <a-modal v-model:visible="visible" title-align="start" modal-class="login-dialog" :footer="false" @ok="handleOk"
           @cancel="handleCancel">
    <template #title>
      <div class="login-title">
        <img src="@/assets/images/logo-long.png" alt=""/>
      </div>
    </template>
    <div class="title">{{ $t('loginDialog.title') }}</div>
    <div class="login-type-wrap">
      <img src="@/assets/images/icon/icon_facebook.png" alt="">
      <img src="@/assets/images/icon/icon_ins.png" alt="">
      <img src="@/assets/images/icon/icon_gmail.png" alt="">
    </div>
    <div class="or-wrap">{{ $t('loginDialog.or') }}</div>
    <a-input class="input-warp" :placeholder="$t('loginDialog.acc') ">
      <template #append>
        {{ $t('loginDialog.verification') }}
      </template>
    </a-input>
    <div class="input-tip">{{ $t('loginDialog.accTip') }}</div>

    <a-input type="password" class="input-warp input-warp1" :placeholder="$t('loginDialog.verfiPlaceHolder') "></a-input>
    <a-input type="password" class="input-warp input-warp2" :placeholder="$t('loginDialog.pwsPlaceHolder') "></a-input>
    <a-button class="confirm"> {{ $t('loginDialog.confirmRegi') }}</a-button>
    <div class="register">
      {{ $t('loginDialog.haveAcc') }}
      <span @click="handleLogin">{{ $t('loginDialog.directLogin') }}</span>
    </div>
    <div class="policy-wrap">
      {{ $t('loginDialog.policyTip') }}<span>{{ $t('loginDialog.termsOfService') }}</span>&<span>{{ $t('loginDialog.privacyPolicy') }}</span>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
const visible = ref(false);
const toLogin = defineEmits(['toLogin'])

const handleLogin = () => {
  toLogin('toLogin')
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
}
const openDialog = () => {
  visible.value = true;
}
defineExpose({
  openDialog,
  handleCancel
})
</script>
<style lang="scss" scoped>
.login-title {
  text-align: left;

  img {
    width: 152px;
    height: 36px;
  }
}

</style>
<style lang="scss">
@import "assets/sass/var";
.login-dialog {
  padding: 20px 27px;
  width: 446px;

  .arco-modal-header {
    padding: 0;
    height: unset;
    align-items: start;
    border-bottom: unset;
  }

  .arco-modal-body {
    padding: 0;
    color: #AAAAAA;

    .title {
      margin-top: 26px;
      text-align: center;
      font-size: 16px;
      user-select: none;
    }

    .login-type-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 24px;

      img {
        width: 50px;
        height: 50px;
        -webkit-user-drag: none;
        cursor: pointer;
      }

      img + img {
        margin-left: 27px;
      }
    }

    .or-wrap {
      font-size: 16px;
      margin-top: 24px;
      text-align: center;
      user-select: none;
    }

    .input-warp {
      height: 46px;
      margin-top: 26px;
      .arco-input-append{
        color: #FFFFFF;
        background: $main-pink;
        padding: 0 36px;
      }
    }
    .input-tip{
      margin-top: 11px;
      line-height: 21px;
      vertical-align: baseline;
    }

    .input-warp1 {
      margin-top: 35px;
    }
    .input-warp2 {
      margin-top: 22px;
    }
    .confirm{
      margin-top: 22px;
      width: 100%;
      background: $main-grey;
      height: 46px;
      color: #FFFFFF;
    }
    .register{
      margin-top: 30px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      span{
        color: $main-pink;
      }
    }
    .policy-wrap{
      text-align: center;
      margin-top: 22px;
      font-size: 14px;
      user-select: none;
      span{
        cursor: pointer;
        &:hover{
          color: $main-blue;
        }
      }
    }
  }
}
</style>

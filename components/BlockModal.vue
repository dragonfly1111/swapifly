<template>
  <a-modal v-model:visible="visible"
           :closable="false"
           :mask-closable="false" title-align="start" modal-class="block-dialog" :footer="false"
           @close="handleCancel">
    <template #title>
      <div class="login-title">
        <img src="@/assets/images/logo-long.png" alt=""/>
      </div>
    </template>
    <div class="title">{{ $t('block.tip') }}</div>
    <div class="big-title">{{ blockType === 1 ? $t('block.user') : (selfType === 1 ? $t('block.product') : $t('block.product1')) }}</div>
    <div v-if="selfType !== 2">
      <div class="title">{{ $t('block.feedback') }}</div>
      <div class="title">service@gmail.com</div>
    </div>

    <a-button class="confirm" @click="handleOk">我知道了</a-button>
  </a-modal>
</template>

<script setup>
import {useUserInfo} from "~/stores/userInfo";
import {useI18n} from "vue-i18n";
import {Notification} from "@arco-design/web-vue";
const userInfo = useUserInfo()
const router = useRouter()
const {t} = useI18n();
const visible = ref(false);
const blockType = ref(1) // 1 用户 2 商品 关闭后不做跳转 3 关闭后跳转到首页
const selfType = ref(1) // 1 自己的 2 别人的
const handleCancel = () => {
  visible.value = false;
}
const openDialog = (blockT = 1, selfT = 2) => {
  blockType.value = blockT
  selfType.value = selfT
  visible.value = true;
}

const handleOk = () => {
  if(blockType.value === 1){
    handleCancel()
    if(userInfo.token){
      userInfo.logout(()=>{
        userInfo.closeBlockDialog()
        router.replace('/')
        userInfo.openDialog()
      })
    } else {
      userInfo.closeBlockDialog()
      router.replace('/')
      userInfo.openDialog()
    }

  } else if(blockType.value === 2) {
    handleCancel()
  } else if(blockType.value === 3) {
    handleCancel()
    router.replace('/')
  }
}
defineExpose({
  openDialog,
  handleCancel
})
</script>

<style lang="scss">
@import "assets/sass/var";

.block-dialog {
  padding: 20px 27px;
  width: 446px;

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
    padding: 38px 0 0 0;
    color: $grey-font-label;

    .title {
      text-align: center;
    }

    .big-title {
      text-align: center;
      color: #333333;
      font-size: 24px;
      margin: 21px 0 35px;
      font-weight: 500;
    }

    .confirm {
      background: #383838;
      color: #FFFFFF;
      width: 100%;
      margin-top: 45px;
      height: 46px;
    }
  }
}
</style>

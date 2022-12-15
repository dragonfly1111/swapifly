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
    <div class="title hover" v-if="blockType !== 4" @click="$router.push(`/helpCenter/detail?id=2`)">{{ $t('block.tip') }}</div>
    <div class="big-title" v-if="blockType === 1">{{ $t('block.user') }}</div>
    <div class="big-title" v-else-if="blockType === 2 || blockType === 3">{{ selfType === 1 ? $t('block.product') : $t('block.product1') }}</div>
    <div class="big-title" v-else-if="blockType === 4">{{ $t('block.product2') }}</div>
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
import {Message} from "@arco-design/web-vue";
import { useResize } from "~/stores/resize";
const resize = useResize();
const userInfo = useUserInfo()
const router = useRouter()
const {t} = useI18n();
const visible = ref(false);
const blockType = ref(1) // 1 用户 2 商品封禁 关闭后不做跳转 3 商品封禁 关闭后跳转到首页 4 商品 非上架状态
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
  } else if(blockType.value === 4) {
    handleCancel()
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
    .hover{
      cursor: pointer;
      &:hover{
        color: $main-blue;
      }
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

@media screen and (max-width: 1000px) {
  .block-dialog{
    width: 80%;
  }
}
</style>

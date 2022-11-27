<template>
  <a-modal v-model:visible="visible" title-align="start" modal-class="login-dialog" :footer="false" @close="handleCancel">
    <template #title>
      <div class="login-title">
        <img src="@/assets/images/logo-long.png" alt=""/>
      </div>
    </template>
    <div class="title">{{ $t('loginDialog.title') }}</div>
    <ThirdLoginWrap></ThirdLoginWrap>
    <div class="or-wrap">{{ $t('loginDialog.or') }}</div>
    <a-form ref="formRef" :model="formData" :rules="rules">
      <a-form-item :hide-label="true" field="email" :validate-trigger="['change','input']">
        <a-input class="input-warp" v-model="formData.email" :placeholder="$t('loginDialog.acc') "></a-input>
      </a-form-item>
      <a-form-item :hide-label="true" field="pwd" :validate-trigger="['change','input']">
        <a-input type="password" v-model="formData.pwd" class="input-warp input-warp1" :placeholder="$t('loginDialog.pwd') "></a-input>
      </a-form-item>
    </a-form>
    <div class="forget">
      <span>{{ $t('loginDialog.forget') }}</span>
    </div>
    <a-button :loading="saveLoading" class="confirm" @click="doLogin"> {{ $t('head.login') }}</a-button>
    <div class="register">
      {{ $t('loginDialog.noAcc') }}
      <span @click="handleReg">{{ $t('loginDialog.toRegister') }}</span>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {useUserInfo} from "~/stores/userInfo";
import {ILoginForm} from "~/model/payload/loginAndRegister";
import {useI18n} from "vue-i18n";
import {emailLogin} from "~/api/loginAndRegister";
import {Message} from "@arco-design/web-vue";
import {IUserInfo} from "~/model/res/userInfo";
const formRef = ref(null);
const saveLoading = ref(false);
const {t} = useI18n();
const userInfo = useUserInfo();
const visible = ref(false);
const toRegister = defineEmits(['toRegister'])
const formData = reactive<ILoginForm>({
  // email: '',
  // pwd: '',
  email: '634401502@qq.com',
  pwd: '12345678'
})
const rules = reactive({
  email: [
    {required: true, message: ref<string>(t('loginDialog.formValidate.email'))},
  ],
  pwd: [
    {required: true, message: ref<string>(t('loginDialog.formValidate.emailCode'))},
  ],
})
const handleReg = () => {
  toRegister('toRegister')
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
  // 延迟清空 避免出现先清空了表单 对话框再消失视觉问题
  setTimeout(() => {
    resetForm()
  }, 100)
}

const resetForm = () => {
  formRef.value.resetFields()
}
const openDialog = () => {
  visible.value = true;
}

const doLogin = () => {
  formRef.value.validate().then(validate =>{
    if(validate) return
    saveLoading.value = true
    emailLogin(formData).then(res=>{
      if(res.code === 0){
        Message.success(t('loginDialog.loginSuc'))
        const user:IUserInfo = res.data
        userInfo.setUserInfo(user)
        visible.value = false;
      } else {
        Message.error(res.message)
      }
      saveLoading.value = false
    })
  })
}
defineExpose({
  openDialog,
  handleCancel
})
</script>

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
    .login-title {
      text-align: left;

      img {
        width: 152px;
        height: 36px;
      }
    }

  }

  .arco-modal-body {
    padding: 0;
    color: $grey-font-label;

    .title {
      margin-top: 26px;
      text-align: center;
      font-size: 16px;
      user-select: none;
    }

    .or-wrap {
      font-size: 16px;
      margin-top: 24px;
      text-align: center;
      user-select: none;
      margin-bottom: 26px;
    }
    .arco-form-item{
      margin-bottom: 26px;
    }
    .input-warp {
      height: 46px;
    }

    .input-warp1 {
    }

    .forget {
      padding-left: 11px;

      span {
        cursor: pointer;
        user-select: none;
      }
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
  }
}
</style>

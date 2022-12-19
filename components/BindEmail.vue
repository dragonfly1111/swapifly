<template>
  <a-modal v-model:visible="visible" :title="$t('profile.bindEmail')" :ok-text="$t('profile.bindEmailOk')" :cancel-text="$t('profile.bindEmailCancel')" title-align="center"
           modal-class="bind-email-dialog"
           :on-before-ok="onBeforeOk"
           :ok-loading="okLoading"
           @ok="handleOk"
           @cancel="handleCancel">
    <div class="login-title">
      <img src="@/assets/images/logo-long.png" alt=""/>
    </div>
    <div class="tip">{{ $t('profile.bindEmailTip') }}</div>
    <a-form ref="formRef" :model="formData" :rules="rules">
      <a-form-item :hide-label="true" field="email" :validate-trigger="['change','input']">
        <a-input class="input-warp" v-model="formData.email" :placeholder="$t('loginDialog.acc') ">
          <template #append>
            <div @click="sendVerfi">
              <a-spin :loading="sendLoading">
                {{ isSend ? $t('loginDialog.reSend') : $t('loginDialog.verification') }}
              </a-spin>
            </div>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item :hide-label="true" field="code">
        <a-input v-model="formData.code" class="input-warp input-warp1"
                 :placeholder="$t('loginDialog.verfiPlaceHolder') "></a-input>
      </a-form-item>
    </a-form>

  </a-modal>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { getBindEmailCode, bindEmail } from "~/api/user";
import {Message} from "@arco-design/web-vue";
const {t} = useI18n();
const emits = defineEmits(['binSuc'])
const visible = ref(false);
const okLoading = ref(false);
const sendLoading = ref(false);
const saveLoading = ref(false);
const isSend = ref(false);
const formRef = ref(null);
const formData = reactive({
  email: '',
  code: '',
  key: ''
})
const rules = reactive({
  email: [
    {required: true, message: ref<string>(t('loginDialog.formValidate.email'))},
    {type: 'email', message: ref<string>(t('loginDialog.formValidate.emailErr'))}
  ],
  code: [
    {required: true, message: ref<string>(t('loginDialog.formValidate.emailCode'))},
  ]
})

const sendVerfi = () => {
  formRef.value.validateField('email').then(validate => {
    if (validate && validate.email) {
      return
    }
    sendLoading.value = true
    getBindEmailCode({
      email: formData.email
    }).then(res => {
      if(res.code === 0){
        Message.success(res.message)
        formData.key = res.data
        isSend.value = true
      } else {
        Message.error(res.message)
      }
      sendLoading.value = false
    })
  })

  // visible.value = false;
  // emits('toPreference')
}
const onBeforeOk = (done) => {
  // return true
  console.log('onBeforeOk')
  formRef.value.validate().then(validate => {
    if(validate) {
      done(false)
      return
    }
    bindEmail(formData).then(res=>{
      if(res.code === 0){
        Message.success(t('profile.bindSuc'))
        done(true)
      } else {
        Message.error(res.message)
        done(false)
      }
    })
  })
}
const handleOk = () => {
  emits('binSuc', formData.email)
}
const openDialog = (value) => {
  if(value){
    formData.email = value
  }
  visible.value = true;
}
const handleCancel = () => {
  visible.value = false;
}
defineExpose({
  openDialog,
  handleCancel
})

</script>

<style lang="scss">
@import "assets/sass/var";
.bind-email-dialog{
  .login-title{
    text-align: center;
    img{
      width: 152px;
      height: 36px;
      margin: 0 auto;
    }
  }
  .arco-modal-body{
    padding: 40px 36px;
  }
  .tip{
    margin-top: 40px;
    text-align: center;
    color: $grey-font-label;
    margin-bottom: 20px;
  }
  .input-warp {
    height: 46px;
    .arco-input-append {
      color: $main-white;
      background: $main-pink;
      user-select: none;
      cursor: pointer;
      padding: 0;
      border: unset;
      div {
        width: 100px;
        text-align: center;
        height: 100%;
        line-height: 46px;
      }
    }
  }
  .input-warp1 {
  }
  .arco-modal-footer{
    .arco-btn{
      width: 70px;
      height: 32px;
    }
  }
}
</style>

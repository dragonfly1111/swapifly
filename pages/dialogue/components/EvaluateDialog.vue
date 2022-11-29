<template>
  <a-modal v-model:visible="visible" :title="$t('dialogue.evaluate')" :ok-text="$t('dialogue.confirm')" :cancel-text="$t('dialogue.cancel')" title-align="start"
           modal-class="eva-dialog"
           :render-to-body="false"
           :on-before-ok="onBeforeOk"
           :ok-loading="okLoading"
           @ok="handleOk"
           @cancel="handleCancel">
    <a-form ref="formRef" :model="formData" :rules="rules">
      <a-form-item :hide-label="true" field="email" :validate-trigger="['change','input']">
        <span style="margin-right: 4px">{{ $t('dialogue.rate') }}</span><Rate></Rate>
      </a-form-item>
      <div style="margin-bottom: 5px">{{ $t('dialogue.evaluateContenTip') }}</div>
      <a-form-item :hide-label="true" field="code">
        <a-textarea v-model="formData.msg" :auto-size="{ minRows: 5, maxRows: 10 }"
                    :placeholder="$t('dialogue.evaluateContent') "></a-textarea>
      </a-form-item>
      <div class="tip">{{ $t('dialogue.evaluateTip') }}</div>
    </a-form>

  </a-modal>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { getBindEmailCode, bindEmail } from "~/api/user";
import {Message} from "@arco-design/web-vue";
const {t} = useI18n();
const emits = defineEmits(['binSuc'])
const visible = ref(true);
const okLoading = ref(false);
const sendLoading = ref(false);
const saveLoading = ref(false);
const isSend = ref(false);
const formRef = ref(null);
const formData = reactive({
  formData: 3,
  msg: '',
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
        Message.success(res.message)
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
.eva-dialog{
  .arco-modal-body{
    padding: 40px 36px;
  }
  .arco-modal-footer{
    .arco-btn{
      width: 70px;
      height: 32px;
    }
  }
  .tip{
    color: $grey-font-label;
    font-size: 14px;
  }
}
</style>

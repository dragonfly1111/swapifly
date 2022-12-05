<template>
  <a-modal v-model:visible="visible" :title="$t('dialogue.evaluate')" :ok-text="$t('dialogue.confirm')" :cancel-text="$t('dialogue.cancel')" title-align="start"
           modal-class="eva-dialog"
           :render-to-body="false"
           :on-before-ok="onBeforeOk"
           :ok-loading="okLoading"
           @ok="handleOk"
           @cancel="handleCancel">
    <a-form ref="formRef" :model="formData" :rules="rules">
      <a-form-item :hide-label="true" field="num" :validate-trigger="['change','input']">
        <span style="margin-right: 4px">{{ $t('dialogue.rate') }}</span><Rate ref="rateComp" @changeVal="changeRateVal"></Rate>
      </a-form-item>
      <div style="margin-bottom: 5px">{{ $t('dialogue.evaluateContenTip') }}</div>
      <a-form-item :hide-label="true" field="content">
        <a-textarea v-model="formData.content" :auto-size="{ minRows: 5, maxRows: 10 }"
                    :placeholder="$t('dialogue.evaluateContent') "></a-textarea>
      </a-form-item>
      <div class="tip">{{ $t('dialogue.evaluateTip') }}</div>
    </a-form>

  </a-modal>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { addEvaluation } from "~/api/dialogue";
import { Notification } from '@arco-design/web-vue';
const { t } = useI18n();
const emits = defineEmits(['binSuc'])
const visible = ref(false);
const okLoading = ref(false);
const sendLoading = ref(false);
const saveLoading = ref(false);
const isSend = ref(false);
const rateComp = ref(null);
const formRef = ref(null);
const formData = reactive({
  id: null,
  num: 5,
  content: '',
})
const rules = reactive({
  num: [
    {required: true, message: ref<string>(t('dialogue.inputRate'))},
  ],
  content: [
    {required: true, message: ref<string>(t('dialogue.evaluateContent'))},
  ]
})

const onBeforeOk = (done) => {
  // return true
  console.log('onBeforeOk')
  console.log(value)
  formRef.value.validate().then(validate => {
    if(validate) {
      done(false)
      return
    }
    addEvaluation(formData).then(res=>{
      if(res.code === 0){
        Notification.success(t('dialogue.evaluateSuc'))
        done(true)
      } else {
        Notification.error(res.message)
        done(false)
      }
    })
  })
}
const handleOk = () => {

}
const changeRateVal = (e) => {
  console.log(e)
  formData.num = e
}
const openDialog = (value) => {
  console.log(value)
  formData.id = value
  rateComp.value.setValue(formData.num)
  visible.value = true;
}
const handleCancel = () => {
  visible.value = false;
  setTimeout(() => {
    formData.content = ''
    formData.id = null
  }, 100);
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
    padding: 20px 30px;
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

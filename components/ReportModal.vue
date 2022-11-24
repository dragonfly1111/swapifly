<!---->
<template>
  <a-modal
    v-model:visible="visible"
    :title="reportTitle"
    :on-before-cancel="handleCancel"
    @before-ok="handleBeforeOk"
    :okText="$t('pages.submit')"
    unmount-on-close
    title-align="start"
  >
    <a-form :model="form" auto-label-width size="large" ref="formRef">
      <a-form-item field="contact" label="">
        <a-input
          v-model="form.contact"
          :placeholder="$t('components.report.leaveYourContact')"
          maxLength="100"
        />
      </a-form-item>
      <a-form-item field="why" label="">
        <a-textarea
          v-model="form.why"
          :placeholder="$t('components.report.writeDownReporting')"
          allow-clear
          :auto-size="{ minRows: 10, maxRows: 12 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
import {useI18n} from "vue-i18n";
import { Message } from "@arco-design/web-vue";
const {t} = useI18n();

const visible = ref(false);
const formRef = ref();
const form = reactive({
  contact: "",
  why: "",
});
const reportType = ref('goods') // goods商品 user用户
const resetForm = () => {
  formRef.value.resetFields();
};
const reportTitle = computed(()=>{
    let mapTitle = {
        'goods':t('components.report.reportTheGoods'),
        'user':t('components.report.reportTheUser')
    }
    return mapTitle[reportType.value]
})
const openDialog = (type) => {
  visible.value = true;
  reportType.value = type ? type : 'goods'
};
const handleCancel = () => {
  visible.value = false;
  // 延迟清空 避免出现先清空了表单 对话框再消失视觉问题
  setTimeout(() => {
    resetForm();
  }, 100);
};
const handleBeforeOk = (done) => {
  console.log(form);
  window.setTimeout(() => {
    done();
  }, 3000);
};
defineExpose({
  openDialog,
  handleCancel,
});
</script>
<style lang="scss" scoped></style>

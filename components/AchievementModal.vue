<!---->
<template>
    <a-modal
      v-model:visible="visible"
      :title="$t('achievementModal.goodsReport')"
      :on-before-cancel="handleCancel"
      @before-ok="handleBeforeOk"
      unmount-on-close
      title-align="start"
    >
      <div></div>
    </a-modal>
  </template>
  <script setup>
  import { useI18n } from "vue-i18n";
  import { Message } from "@arco-design/web-vue";
  const { t } = useI18n();
  const visible = ref(true);
  const formRef = ref();
  const form = reactive({
    contact: "",
    why: "",
  });
  const resetForm = () => {
    formRef.value.resetFields();
  };
  const openDialog = (type) => {
    visible.value = true;
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
  
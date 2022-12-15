<!---->
<template>
  <a-modal
      modal-class="report-dialog"
      v-model:visible="visible"
      :title="reportTitle"
      @close="handleCancel"
      @before-ok="handleBeforeOk"
      :okText="$t('pages.submit')"
      :cancelText="$t('pages.cancel')"
      unmount-on-close
      title-align="start"
      :okLoading="saveLoading"
      @before-close="handleCancel"
  >
    <a-form :model="form" :rules="rules" auto-label-width size="large" ref="formRef">
      <a-form-item field="contact" label="" hide-asterisk>
        <a-input
            v-model="form.contact"
            :placeholder="$t('components.report.leaveYourContact')"
            :maxLength="100"
        />
      </a-form-item>
      <a-form-item field="why" label="" hide-asterisk>
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
import {reportUser} from "~/api/shop";
import {reportProduct} from "~/api/goods";
import {useI18n} from "vue-i18n";
import {Message} from "@arco-design/web-vue";

const {t} = useI18n();
const visible = ref(false);
const saveLoading = ref(false);
const formRef = ref(null);
const dataInfo = ref({id: null});
const reportType = ref("goods"); // goods商品 user用户
const form = ref({
  contact: "",
  why: "",
});
const rules = {
  contact: [{required: true, message: t("components.report.leaveYourContact")}],
  why: [{required: true, message: t("components.report.writeDownReporting")}],
};

// 举报标题
const reportTitle = computed(() => {
  let mapTitle = {
    goods: t("components.report.reportTheGoods"),
    user: t("components.report.reportTheUser"),
  };
  return mapTitle[reportType.value];
});
const openDialog = (info, type) => {
  dataInfo.value = info
  visible.value = true;
  reportType.value = type ? type : "goods";
};

const handleCancel = () => {
  // 延迟清空 避免出现先清空了表单 对话框再消失视觉问题
  visible.value = false;
  form.value.contact = ''
  form.value.why = ''
};
const handleBeforeOk = (done) => {
  formRef.value.validate().then((validate) => {
    if (validate) {
      done(false);
      return;
    }
    let reqUrl = reportType.value == "goods" ? reportProduct : reportUser;
    let id = reportType.value == "goods" ? (dataInfo.value.pid || dataInfo.value.id) : dataInfo.value.id
    reqUrl({
      ...form.value,
      id,
    })
        .then((res) => {
          if (res.code === 0) {
            Message.success(t("business.authApplyForm.applySuc"));
            handleCancel();
            done(true);
          } else {
            Message.error(res.message);
            done(false);
          }
        })
        .finally(() => {
          done(false);
        });
  });
};
defineExpose({
  openDialog,
  handleCancel,
});
</script>
<style lang="scss">
@media screen and (max-width: 1000px) {
  .report-dialog{
    width: 80%;
  }
}
</style>

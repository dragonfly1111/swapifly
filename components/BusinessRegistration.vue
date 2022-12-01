<template>
  <a-modal
    v-model:visible="visible"
    title-align="start"
    modal-class="business-dialog"
    :footer="false"
    @close="handleCancel"
  >
    <template #title>
      <div class="login-title">
        <img src="@/assets/images/logo-long.png" alt="" />
      </div>
    </template>
    <div class="title">{{ $t("business.authApplyForm.applyTitle") }}</div>

    <a-form ref="formRef" :model="formData" :rules="rules" layout="vertical" size="large">
      <a-form-item
        hide-asterisk
        :hide-label="true"
        field="title"
        :validate-trigger="['change', 'input']"
      >
        <a-input
          class="input-warp"
          v-model="formData.title"
          allow-clear
          :placeholder="$t('business.businessTitle')"
        ></a-input>
      </a-form-item>
      <a-form-item
        hide-asterisk
        :hide-label="true"
        field="address"
        :validate-trigger="['change', 'input']"
      >
        <a-input
          v-model="formData.address"
          class="input-warp input-warp1"
          allow-clear
          maxlength="100"
          :placeholder="$t('business.businessAddress')"
        ></a-input>
      </a-form-item>
      <a-form-item
        hide-asterisk
        :hide-label="true"
        field="contact"
        maxlength="100"
        :validate-trigger="['change', 'input']"
      >
        <a-input
          v-model="formData.contact"
          class="input-warp input-warp1"
          :placeholder="$t('business.businessContact')"
          allow-clear
          maxlength="100"
        ></a-input>
      </a-form-item>
      <a-form-item field="image">
        <template #label>
          {{ $t("business.businessCertificate") }}({{
            $t("business.authApplyForm.businessCertificateTip")
          }}
        </template>
        <a-upload
          list-type="picture-card"
          :default-file-list="fileList"
          image-preview
          :limit="1"
          :action="uploadUrl"
          ref="uploadRef"
          v-if="visible"
          :on-before-upload="beforeUpload"
          :on-button-click="uploadClick"
          @success="uploadSuccess"
          @error="uploadError"
          accept="image/*,.png"
          :headers="headers"
        />
      </a-form-item>
    </a-form>
    <a-button
      v-if="!formData.id"
      :loading="saveLoading"
      class="confirm black-btn"
      @click="handleSubmit"
    >
      {{ $t("business.authApplyForm.applyBtn") }}</a-button
    >
    <a-button
      :loading="saveLoading"
      class="confirm black-btn"
      @click="handleSubmit"
      v-if="formData.id"
    >
      {{ $t("business.authApplyForm.reApplyBtn") }}</a-button
    >
    <a-button
      :loading="saveLoading"
      type="outline"
      class="undo black-outline-btn"
      @click="handleUndo"
      v-if="formData.id"
    >
      {{ $t("business.authApplyForm.undoApply") }}</a-button
    >
  </a-modal>
</template>

<script setup>
import { uploadUrl, baseImgPrefix } from "~/config/baseUrl";
import { useI18n } from "vue-i18n";
import { addBusiness, reApplyBusiness, undoApplyBusiness } from "~/api/business";
import { Message } from "@arco-design/web-vue";
import { Modal, Button } from "@arco-design/web-vue";
import { useUserInfo } from "~/stores/userInfo";
const formRef = ref(null);
const uploadRef = ref(null);
const saveLoading = ref(false);
const uploadLoading = ref(false);
const { t } = useI18n();
const visible = ref(false);
let headers = reactive({
  "X-Utoken": null,
  "X-Userid": null,
});
if (process.client) {
  const userInfo = useUserInfo();
  headers["X-Utoken"] = userInfo.token;
  headers["X-Userid"] = userInfo.id;
}

const beforeUpload = (e) => {
  uploadLoading.value = true;
  return true;
};
const uploadClick = () => {
  console.log("uploadClick");
  if (uploadLoading.value) return new Promise(() => {});
};
// 上传成功
const uploadSuccess = (e) => {
  formData.image = e.response.data;
  uploadLoading.value = false;
};
const uploadError = (e) => {
  uploadLoading.value = false;
};
const emits = defineEmits(["change"]);
const formData = ref({
  title: "",
  address: "",
  contact: "",
  image: "",
});
const rules = reactive({
  title: [{ required: true, message: t("business.formValidate.businessTitle") }],
  address: [{ required: true, message: t("business.formValidate.businessAddress") }],
  contact: [{ required: true, message: t("business.formValidate.businessContact") }],
  image: [{ required: true, message: t("business.authApplyForm.businessCertificateTip") }],
});
const fileList = ref([]);
const updatePage = () => {
  emits("change");
};
const handleCancel = () => {
  visible.value = false;
  fileList.value = [];
  // 延迟清空 避免出现先清空了表单 对话框再消失视觉问题
  setTimeout(() => {
    resetForm();
  }, 100);
};

const resetForm = () => {
  formRef.value.resetFields();
};
const openDialog = (form) => {
  visible.value = true;
  if (form) {
    formData.value = { ...form };
    if (form.image) {
      fileList.value = [
        {
          uid: "-1",
          name: form.image,
          url: baseImgPrefix + form.image,
        },
      ];
    }
  }
};

// 撤销申请
const handleUndo = () => {
  Modal.info({
    content: t("business.authApplyForm.undoApplyTip"),
    closable: true,
    hideCancel: false,
    cancelText: t("pages.cancel"),
    okText: t("pages.confirm"),
    onBeforeOk: () => {
      undoApplyBusiness({ id: formData.value.id })
        .then((res) => {
          if (res.code === 0) {
            Message.success(t("business.authApplyForm.undoSuc"));
            handleCancel();
            updatePage();
          } else {
            Message.error(res.message);
          }
        })
        .finally(() => {
          saveLoading.value = false;
        });
    },
  });
};

const handleSubmit = () => {
  formRef.value.validate().then((validate) => {
    if (validate) return;
    saveLoading.value = true;
    let reqUrl = formData.id ? reApplyBusiness : addBusiness;
    reqUrl(formData)
      .then((res) => {
        if (res.code === 0) {
          Message.success(t("business.authApplyForm.applySuc"));
          handleCancel();
          updatePage();
        } else {
          Message.error(res.message);
        }
      })
      .finally(() => {
        saveLoading.value = false;
      });
  });
};
defineExpose({
  openDialog,
  handleCancel,
});
</script>

<style lang="scss">
@import "assets/sass/var";
.business-dialog {
  padding: 20px 27px;
  width: 446px;

  .arco-modal-header {
    padding: 0;
    height: unset;
    align-items: start;
    border-bottom: none;
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
    .title {
      margin: 20px 0 10px;
      text-align: center;
      font-size: 18px;
      user-select: none;
    }

    .arco-form-item {
      margin-bottom: 22px;
    }
    .input-warp {
      height: 46px;
    }

    .confirm {
      margin-top: 22px;
      width: 100%;
      height: 46px;
    }
    .undo {
      margin-top: 22px;
      width: 100%;
      height: 46px;
    }
  }
}
</style>

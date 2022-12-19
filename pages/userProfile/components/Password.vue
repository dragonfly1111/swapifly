<template>
  <div class="password-box">
    <div class="pwd-title">
      <h1>{{ $t("profile.edit_password") }}</h1>
    </div>
    <a-form :model="form" ref="formRef" layout="vertical" size="large" :rules="rules">
      <a-form-item field="opwd" label="" :content-flex="false" hide-asterisk>
        <a-input-password v-model="form.opwd" placeholder="" allow-clear>
          <template #prefix>
            <span class="input-prefix">{{ $t("profile.opwd") }}</span>
          </template>
        </a-input-password>
        <template #extra>
          <a-link class="forget" @click="toForget">{{ $t("loginDialog.forget") }}</a-link>
        </template>
      </a-form-item>
      <a-form-item field="pwd" label="" hide-asterisk>
        <a-input-password v-model="form.pwd" placeholder="" allow-clear>
          <template #prefix>
            <span class="input-prefix">{{ $t("profile.pwd") }}</span>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item field="cpwd" label="" hide-asterisk>
        <a-input-password v-model="form.cpwd" placeholder="" allow-clear>
          <template #prefix>
            <span class="input-prefix">{{ $t("profile.cpwd") }}</span>
          </template>
        </a-input-password>
      </a-form-item>
      <div class="save-btn">
        <a-button size="large" type="primary" :loading="saveLoading" @click="handleSave">{{
            $t("profile.save")
          }}
        </a-button>
      </div>
    </a-form>

    <a-skeleton :loading="pageLoading">
      <a-space direction="vertical" :style="{ width: '100%' }" size="large">
        <a-skeleton-line :rows="3"/>
      </a-space>
    </a-skeleton>

    <ResetPwd ref="resetPwdModal" @toLogin="toLogin"></ResetPwd>
  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {Message} from "@arco-design/web-vue";
import {updatePassword} from '~/api/user'
import {useUserInfo} from "~/stores/userInfo";

const userInfo = useUserInfo()
const router = useRouter()
const {t} = useI18n();
const pageLoading = ref(false);
const saveLoading = ref(false);
const formRef = ref(null);
const resetPwdModal = ref(null)
const form = reactive({
  opwd: null,
  pwd: null,
  cpwd: null,
});
const rules = reactive({
  pwd: [
    {required: true, message: ref(t("loginDialog.formValidate.password"))},
    {
      maxLength: 20,
      minLength: 8,
      message: ref(t("loginDialog.formValidate.passwordErr")),
    },
  ],
  opwd: [
    {required: true, message: ref(t("profile.formValidate.opwd"))},
  ],
  cpwd: [
    {required: true, message: ref(t("profile.formValidate.cpwd"))},
  ],
});
const handleSave = () => {
  formRef.value.validate().then(validate => {
    if (validate) return
    saveLoading.value = true
    updatePassword(form).then(res => {
      if (res.code === 0) {
        Message.success(t("profile.changeSuc"))
        userInfo.logout()
        userInfo.openDialog();
        router.replace('/')
      } else {
        Message.error(res.message)
      }
      saveLoading.value = false
    })
  })
}
const toForget = () => {
  resetPwdModal.value.openDialog(userInfo.email)
};
</script>

<style lang="scss" scoped>
@import "assets/sass/var";

.password-box {
  border: 1px solid $grey-font-label;
  padding: 10px 30px 40px;
  border-radius: 10px;
  width: 665px;
  .pwd-title {
    display: block;
  }
  h1 {
    font-size: 30px;
  }

  .input-prefix {
    min-width: 65px;
  }

  .input-box {
    background-color: $main-white;
    border: 1px solid $main-grey-border;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 2px;
  }

  :deep(.arco-input-wrapper) {
    @extend .input-box;
  }

  :deep(.arco-link) {
    color: $grey-font-label;
  }

  .save-btn {
    text-align: right;
    margin-top: 60px;

    :deep(.arco-btn-primary) {
      background-color: $main-grey;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

@media screen and (max-width: 1000px) {
  .password-box{
    width: 100%;
    border: unset;
    padding: 0;
    .pwd-title {
      display: none;
    }
    .save-btn {
      .arco-btn{
        width: 100%;
      }
    }
  }

}
</style>

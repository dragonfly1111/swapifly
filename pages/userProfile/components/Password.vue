<template>
  <div class="password-box">
    <div class="login-title" v-if="resize.screenType === 'MOBILE'">
      <icon-left class="back-index" @click="router.back()"/>
      {{ $t("profile.edit_password") }}
    </div>
    <div v-else>
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
import {useResize} from '~/stores/resize'

const userInfo = useUserInfo()
const router = useRouter()
const resize = useResize()
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
  //border: 1px solid $grey-font-label;
  //padding: 10px 30px 40px;
  //border-radius: 10px;
  //width: 665px;
  .login-title {
    border-bottom: 1px solid #ccc;
    text-align: center;
    position: relative;
    font-size: 18px;
    font-weight: bold;
    height: 45px;
    line-height: 45px;
    margin-bottom: 30px;
    .back-index {
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      font-size: 25px;
      font-weight: bold;
      transform: translateY(-50%);
    }

    img {
      width: 152px;
      height: 36px;
      display: inline-block;
    }
  }

  h1 {
    font-size: 30px;
  }

  .input-prefix {
    min-width: 65px;
  }

  .input-box {
    background-color: #fff;
    border: 1px solid #e5e5e5;
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
    //mediaCss haved
    //text-align: right;
    //margin-top: 60px;

    :deep(.arco-btn-primary) {
      background-color: $main-grey;
    }
  }
}
</style>

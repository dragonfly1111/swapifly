<template>
  <a-modal v-model:visible="visible"
           :ok-text="curStep === 1 ? $t('profile.resetPwdNext') : $t('profile.resetPwdSave')"
           :cancel-text="$t('profile.resetPwdCancel')"
           title-align="center" modal-class="reset-pws-dialog" :on-before-ok="handleOk"
           :ok-loading="okLoading"
           :mask-closable="false"
           @cancel="handleCancel">
    <template #title>
      <div class="login-title">
        <div class="pc-title">
          {{curStep === 1 ? $t('profile.resetPwdTitle') : $t('profile.resetPwdTitle1')}}
        </div>
        <div class="m-title">
          <img src="@/assets/images/logo-long.png" alt=""/>
        </div>
      </div>
    </template>
    <div class="login-title1">
      <div class="pc-title">
        <img src="@/assets/images/logo-long.png" alt=""/>
      </div>
      <div class="m-title">
        {{curStep === 1 ? $t('profile.resetPwdTitle') : $t('profile.resetPwdTitle1')}}
      </div>
    </div>
    <div class="tip">{{ curStep === 1 ? $t('profile.confirmEmail') : '' }}</div>
    <a-form ref="formRef" :model="formData" :rules="rules">
      <div v-if="curStep === 1">
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
      </div>
      <div v-else>
        <a-form-item :hide-label="true" field="password">
          <a-input type="password" v-model="formData.password" class="input-warp input-warp1"
                   :placeholder="$t('profile.newPwd') "></a-input>
        </a-form-item>
        <a-form-item :hide-label="true" field="checkpassword">
          <a-input type="password" v-model="formData.checkpassword" class="input-warp input-warp1"
                   :placeholder="$t('profile.newPwd1') "></a-input>
        </a-form-item>
      </div>


    </a-form>

  </a-modal>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {resetPwdEmailCode, resetPwd} from "~/api/loginAndRegister";
import {Message} from "@arco-design/web-vue";
import {useUserInfo} from "~/stores/userInfo";

const {t} = useI18n();
const emits = defineEmits(['toLogin'])

const visible = ref(false);
const sendLoading = ref(false);
const curStep = ref(1);
const isSend = ref(false);
const okLoading = ref(false);
const formRef = ref(null);
const userInfo = useUserInfo();
const formData = reactive({
  email: '',
  code: '',
  key: '',
  password: '',
  checkpassword: '',
})
const rules = reactive({
  email: [
    {required: true, message: ref(t('loginDialog.formValidate.email'))},
    {type: 'email', message: ref(t('loginDialog.formValidate.emailErr'))}
  ],
  code: [
    {required: true, message: ref(t('loginDialog.formValidate.emailCode'))},
  ],
  password: [
    {required: true, message: ref(t('loginDialog.formValidate.passwordNew'))},
  ],
  checkpassword: [
    {required: true, message: ref(t('loginDialog.formValidate.passwordNew1'))},
  ]
})
const sendVerfi = () => {
  formRef.value.validateField('email').then(validate => {
    if (validate && validate.email) {
      return
    }
    sendLoading.value = true
    resetPwdEmailCode({
      email: formData.email
    }).then(res => {
      if (res.code === 0) {
        Message.success(res.message)
        formData.key = res.data
        sendLoading.value = false
        isSend.value = true
      } else {
        Message.error(res.message)
      }
    })
  })

  // visible.value = false;
  // emits('toPreference')
};
const handleOk = async () => {
  console.log(curStep.value)
  // curStep.value = 2
  if (curStep.value === 1) {
    // 验证邮箱验证码必填
    formRef.value.validateField(['email', 'code']).then(validate => {
      if (validate && (validate.email || validate.code)) {
      } else {
        curStep.value = 2
      }
    })
    return false
  } else {
    const validate = await formRef.value.validate()
    console.log(validate)
    if(validate){
      return false
    }
    okLoading.value = true
    const res = await resetPwd(formData)
    okLoading.value = false
    if (res.code === 0) {
      Message.success(t("profile.changeSuc"))
      userInfo.logout()
      userInfo.openDialog()
      const router = useRouter()
      router.replace('/')
      return true
    } else {
      Message.error(res.message)
      return false
    }
  }
};
const handleCancel = () => {
  setTimeout(()=>{
    curStep.value = 1
    formRef.email = ''
    formRef.code = ''
    formRef.key = ''
    formRef.password = ''
    formRef.checkpassword = ''
    formRef.value.clearValidate()
  }, 200)
};

const openDialog = (val) => {
  formData.email = val
  visible.value = true;
}

defineExpose({
  openDialog,
  handleCancel
})

</script>

<style lang="scss">
@import "assets/sass/var";

.reset-pws-dialog {
  .pc-title{
    display: flex;
  }
  .m-title{
    display: none;
  }
  .login-title {
    text-align: center;

    img {
      width: 152px;
      height: 36px;
      margin: 0 auto;
    }
  }

  .login-title1{
    text-align: center;
    img {
      width: 152px;
      height: 36px;
      margin: 0 auto;
    }
  }

  .arco-modal-body {
    padding: 40px 36px;
  }

  .tip {
    margin-top: 40px;
    text-align: center;
    color: $grey-font-label;
    margin-bottom: 20px;
    height: 21px;
    line-height: 21px;
  }

  .input-warp {
    height: 46px;

    .arco-input-append {
      color: #FFFFFF;
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

  .arco-modal-footer {
    .arco-btn {
      width: 70px;
      height: 32px;
    }
  }
}
</style>
<style lang="scss" >
@import "assets/sass/var";
@media screen and(max-width:1000px) {
  .reset-pws-dialog {
    top: 0;
    border-radius: 0;
    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    .login-title1{
      text-align: center;
      .m-title{
        text-align: center;
        font-size: 24px;
        font-weight: 500;
      }
    }
    .pc-title{
      display: none;
    }
    .m-title{
      display: block;
    }
    .arco-modal-header {
      padding: 20px 27px;
      height: unset;
      align-items: center;
      border-bottom: unset;
      .arco-modal-title-align-center{
        justify-content: flex-start;
      }
    }
    .arco-modal-body{
      padding: 0 27px;
      .tip{
        margin: 12px 0 24px 0;
      }
    }
    .arco-modal-footer{
      border-top: unset;
      padding: 0 27px;
      .arco-btn-secondary{
        display: none;
      }
      .arco-btn-primary{
        width: 100%;
        margin-left: 0;
        height: 42px;
      }
    }
  }
}
</style>

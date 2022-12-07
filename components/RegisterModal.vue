<template>
  <a-modal v-model:visible="visible" title-align="start" modal-class="reg-dialog" :footer="false"
           @cancel="handleCancel">
    <template #title>
      <div class="login-title">
        <img src="@/assets/images/logo-long.png" alt=""/>
      </div>
    </template>
    <div class="title">{{ $t('loginDialog.title') }}</div>
    <ThirdLoginWrap @closeDialog="handleCancel"></ThirdLoginWrap>
    <div class="or-wrap">{{ $t('loginDialog.or') }}</div>
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
      <div class="input-tip">{{ $t('loginDialog.accTip') }}</div>
      <a-form-item :hide-label="true" field="code">
        <a-input v-model="formData.code" class="input-warp input-warp1"
                 :placeholder="$t('loginDialog.verfiPlaceHolder') "></a-input>
      </a-form-item>
      <a-form-item :hide-label="true" field="password">
        <a-input type="password" v-model="formData.password" class="input-warp input-warp2"
                 :placeholder="$t('loginDialog.pwsPlaceHolder') "></a-input>
      </a-form-item>
    </a-form>


    <a-button :loading="saveLoading" class="confirm" @click="confirm"> {{ $t('loginDialog.confirmRegi') }}</a-button>
    <div class="register">
      {{ $t('loginDialog.haveAcc') }}
      <span @click="handleLogin">{{ $t('loginDialog.directLogin') }}</span>
    </div>
    <div class="policy-wrap">
      {{ $t('loginDialog.policyTip') }}<span>{{
        $t('loginDialog.termsOfService')
      }}</span>&<span>{{ $t('loginDialog.privacyPolicy') }}</span>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {getEmailCode, register, facebookLogin, instagramLogin, googleLogin} from '~/api/loginAndRegister'
import {Notification} from '@arco-design/web-vue';
import {IRegisterForm} from "~/model/payload/loginAndRegister";
import {IUserInfo} from "~/model/res/userInfo";
import {useUserInfo} from "~/stores/userInfo";
const userInfo = useUserInfo();
const {t} = useI18n();
const visible = ref(false);
const sendLoading = ref(false);
const saveLoading = ref(false);
const isSend = ref(false);
const formRef = ref(null);
const emits = defineEmits(['toLogin', 'toPreference'])
const formData = reactive<IRegisterForm>({
  email: '',
  code: '',
  password: '',
  key: ''
})
const rules = reactive({
  email: [
    {required: true, message: ref<string>(t('loginDialog.formValidate.email'))},
    {type: 'email', message: ref<string>(t('loginDialog.formValidate.emailErr'))}
  ],
  code: [
    {required: true, message: ref<string>(t('loginDialog.formValidate.emailCode'))},
  ],
  password: [
    {required: true, message: ref<string>(t('loginDialog.formValidate.password'))},
    {maxLength: 20, minLength: 8, message: ref<string>(t('loginDialog.formValidate.passwordErr'))},
  ]
})
const handleLogin = () => {
  emits('toLogin')
};
const confirm = () => {

  // const user: IUserInfo = {
  //   "id": 20,
  //   "token": "MjAxNjY5MTIyMTM1",
  //   "nickname": "63440150216691016775",
  //   "avatar": "swapifly/avatar.png",
  //   "email": "634401502@qq.com",
  //   "type": 1
  // }
  // userInfo.setUserInfo(user)

  formRef.value.validate().then(validate =>{
    if(validate) return
    saveLoading.value = true
    register(formData).then(res=>{
      if(res.code === 0){
        Notification.success(t('loginDialog.regSuc'))
        const user:IUserInfo = res.data
        userInfo.setUserInfo(user)
        emits('toPreference')
        visible.value = false;
      } else {
        Notification.error(res.message)
      }
      saveLoading.value = false
    })
  })
  // emits('toPreference')
}

const resetForm = () => {
  formRef.value.resetFields()
}
const sendVerfi = () => {
  formRef.value.validateField('email').then(validate => {
    if (validate && validate.email) {
      return
    }
    sendLoading.value = true
    getEmailCode({
      email: formData.email
    }).then(res => {
      if (res.code === 0) {
        Notification.success(res.message)
        formData.key = res.data
        isSend.value = true
      } else {
        Notification.error(res.message)
      }
      sendLoading.value = false
    })
  })

  // visible.value = false;
}

const handleCancel = () => {
  visible.value = false;
  // 延迟清空 避免出现先清空了表单 对话框再消失视觉问题
  setTimeout(() => {
    resetForm()
  }, 100)
}


const openDialog = () => {
  visible.value = true;
}
defineExpose({
  openDialog,
  handleCancel
})
</script>
<style lang="scss">
@import "assets/sass/var";

.reg-dialog {
  padding: 20px 27px;
  width: 446px;

  .arco-modal-header {
    padding: 0;
    height: unset;
    align-items: start;
    border-bottom: unset;

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
    color: $grey-font-label;

    .title {
      margin-top: 26px;
      text-align: center;
      font-size: 16px;
      user-select: none;
    }


    .or-wrap {
      font-size: 16px;
      margin-top: 24px;
      text-align: center;
      user-select: none;
    }

    .input-warp {
      height: 46px;
      margin-top: 26px;

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

    .input-tip {
      margin-top: 11px;
      line-height: 21px;
      vertical-align: baseline;
    }

    .input-warp1 {
      margin-top: 35px;
    }

    .input-warp2 {
      margin-top: 22px;
    }

    .confirm {
      margin-top: 22px;
      width: 100%;
      background: $main-grey;
      height: 46px;
      color: #FFFFFF;
    }

    .register {
      margin-top: 30px;
      text-align: center;
      cursor: pointer;
      user-select: none;

      span {
        color: $main-pink;
      }
    }

    .policy-wrap {
      text-align: center;
      margin-top: 22px;
      font-size: 14px;
      user-select: none;

      span {
        cursor: pointer;

        &:hover {
          color: $main-blue;
        }
      }
    }
  }
}
</style>

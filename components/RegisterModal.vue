<template>
  <a-modal v-model:visible="visible" title-align="start" modal-class="reg-dialog" :footer="false"
           @cancel="handleCancel">
    <template #title>
      <div class="login-title">
        <img src="@/assets/images/logo-long.png" alt=""/>
      </div>
    </template>
    <div class="title">{{ $t('loginDialog.title') }}</div>
    <div class="login-type-wrap">
      <img @click="loginThird(1)" src="@/assets/images/icon/icon_facebook.png" alt="">
      <img @click="loginThird(2)" src="@/assets/images/icon/icon_ins.png" alt="">
      <img @click="loginThird(3)" src="@/assets/images/icon/icon_gmail.png" alt="">
    </div>
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
import {Message} from '@arco-design/web-vue';
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
        Message.success(t('loginDialog.regSuc'))
        const user:IUserInfo = res.data
        userInfo.setUserInfo(user)
        emits('toPreference')
        visible.value = false;
      } else {
        Message.error(res.message)
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
}

const handleCancel = () => {
  visible.value = false;
  // 延迟清空 避免出现先清空了表单 对话框再消失视觉问题
  setTimeout(() => {
    resetForm()
  }, 100)
}

const loginThird = (type: number) =>{
  switch (type) {
    case 1:
      FB.login((response)=>{
        console.log('facebook res');
        console.log(response);
        if(response.status === "connected") {
          facebookLogin({
            accessToken: response.authResponse.accessToken
          }).then(res=>{
            console.log('face_login res')
            console.log(res)
            if(res.code === 0){
              Message.success(t('loginDialog.loginSuc'))
              const user:IUserInfo = res.data
              userInfo.setUserInfo(user)
              handleCancel()
            } else {
              Message.error(res.message)
            }
          })
        }
      },{scope: 'email'});
      break
    case 2:
      // const insUrl = 'https://api.instagram.com/oauth/authorize?client_id=490995173091962&redirect_uri=https://swapiflyapi.honglanshuzi.com/swapifly/&scope=user_profile,user_media&response_type=code'
      // const insUrl = 'https://api.instagram.com/oauth/authorize?client_id=1259749124876910&redirect_uri=https://swapiflyapi.honglanshuzi.com/swapifly/&scope=user_profile,user_media&response_type=code'
      const insUrl = 'https://api.instagram.com/oauth/authorize?client_id=490995173091962&redirect_uri=https://swapiflyapi.honglanshuzi.com/swapifly/insAuth&scope=user_profile,user_media&response_type=code'
      // const iWidth=500;                         //弹出窗口的宽度;
      // const iHeight=570;                        //弹出窗口的高度;
      // const iTop = (window.screen.height-30-iHeight)/2;       //获得窗口的垂直位置;
      // const iLeft = (window.screen.width-10-iWidth)/2;
      window.open(insUrl,'_blank');
      break
    case 3:
      // const googleUrl = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&redirect_uri=https://swapiflyapi.honglanshuzi.com/swapifly/googleAuth&client_id=937590701446-11ocgsktalnalr813c14mjm1ih6o18sm.apps.googleusercontent.com'
      // window.open(googleUrl,'_blank');
      google.accounts.id.initialize({
        client_id: '937590701446-11ocgsktalnalr813c14mjm1ih6o18sm.apps.googleusercontent.com',
        callback: (e:any) =>{
          const strings = e.credential.split("."); //截取token，获取载体
          const userInfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/"))))); //解析，需要吧‘_’,'-'进行转换否则会无法解析
          console.log(userInfo)
          googleLogin(userInfo).then(res=>{
            console.log('google_login res')
            console.log(res)
            if(res.code === 0){
              Message.success(t('loginDialog.loginSuc'))
              const user:IUserInfo = res.data
              userInfo.setUserInfo(user)
              handleCancel()
            } else {
              Message.error(res.message)
            }
          })
        }
      });
      google.accounts.id.prompt();
      break
  }
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

    .login-type-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 24px;

      img {
        width: 50px;
        height: 50px;
        -webkit-user-drag: none;
        cursor: pointer;
      }

      img + img {
        margin-left: 27px;
      }
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

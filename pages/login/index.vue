<template>
  <div class="login-page common-row global-content">
    <div class="title">{{ $t('loginDialog.title') }}</div>
    <ThirdLoginWrap></ThirdLoginWrap>
    <div class="or-wrap">{{ $t('loginDialog.or') }}</div>
    <a-form ref="formRef" :model="formData" :rules="rules">
      <a-form-item :hide-label="true" field="email" :validate-trigger="['change','input']">
        <a-input class="input-warp" v-model="formData.email" :placeholder="$t('loginDialog.acc') "></a-input>
      </a-form-item>
      <a-form-item :hide-label="true" field="pwd" :validate-trigger="['change','input']">
        <a-input-password v-model="formData.pwd" class="input-warp input-warp1" :placeholder="$t('loginDialog.pwd') "></a-input-password>
      </a-form-item>
    </a-form>
    <div class="forget">
      <span>{{ $t('loginDialog.forget') }}</span>
    </div>
    <a-button :loading="saveLoading" class="confirm" @click="doLogin"> {{ $t('head.login') }}</a-button>
    <div class="register">
      {{ $t('loginDialog.noAcc') }}
      <span @click="handleReg">{{ $t('loginDialog.toRegister') }}</span>
    </div>

    <div style="margin-top: 15px">
      <div class="forget" style="margin-bottom: 10px">
        <span>快捷切换账号（测试用 上线移除）</span>
      </div>
      <a-radio-group @change="changeAcc">
        <a-radio :value="1">flf测试账号</a-radio>
        <a-radio :value="2">ljn测试账号</a-radio>
        <a-radio :value="3">测试账号001</a-radio>
        <a-radio :value="4">测试账号002</a-radio>
        <a-radio :value="5">测试账号003</a-radio>
        <a-radio :value="6">测试账号004</a-radio>
        <a-radio :value="7">测试账号005</a-radio>
      </a-radio-group>
    </div>

  </div>
</template>

<script setup>
import {useUserInfo} from "~/stores/userInfo";
import {useI18n} from "vue-i18n";
import {emailLogin} from "~/api/loginAndRegister";
import {Message} from "@arco-design/web-vue";
const formRef = ref(null);
const saveLoading = ref(false);
const {t} = useI18n();
const userInfo = useUserInfo();
const visible = ref(false);
const router = useRouter()
const toRegister = defineEmits(['toRegister'])
const changeAcc = (e) =>{
  console.log(e)
  switch (e) {
    case 1:
      formData.email = '634401502@qq.com'
      formData.pwd = '12345678'
      break
    case 2:
      formData.email = '598348433@qq.com'
      formData.pwd = 'Soin.3344'
      break
    case 3:
      formData.email = 'swapifly001@gmail.com'
      formData.pwd = '12345'
      break
    case 4:
      formData.email = 'swapifly002@gmail.com'
      formData.pwd = '12345'
      break
    case 5:
      formData.email = 'swapifly003@gmail.com'
      formData.pwd = '12345'
      break
    case 6:
      formData.email = 'swapifly004@gmail.com'
      formData.pwd = '12345'
      break
    case 7:
      formData.email = 'swapifly005@gmail.com'
      formData.pwd = '12345'
      break
  }
}

const formData = reactive({
  // email: '',
  // pwd: '',
  email: 'swapifly001@gmail.com',
  pwd: '12345'
})
const rules = reactive({
  email: [
    {required: true, message: ref(t('loginDialog.formValidate.email'))},
  ],
  pwd: [
    {required: true, message: ref(t('loginDialog.formValidate.emailCode'))},
  ],
})
const handleReg = () => {
  console.log("===注册===")
  router.push('/register')
};

const resetForm = () => {
  formRef.value.resetFields()
}

const handToIndex=()=>{
  router.push('/')
}

const doLogin = () => {
  formRef.value.validate().then(validate =>{
    if(validate) return
    saveLoading.value = true
    emailLogin(formData).then(res=>{
      if(res.code === 0){
        Message.success(t('loginDialog.loginSuc'))
        const user = res.data
        userInfo.setUserInfo(user)
        router.push('/')
      } else {
        Message.error(res.message)
      }
      saveLoading.value = false
    })
  })
}
</script>

<style lang="scss" scoped>
@import "assets/sass/var";
.login-page {
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
    margin-bottom: 26px;
  }
  .arco-form-item{
    margin-bottom: 26px;
  }
  .input-warp {
    height: 46px;
  }

  .input-warp1 {
  }

  .forget {
    padding-left: 11px;

    span {
      cursor: pointer;
      user-select: none;
    }
  }
  .confirm{
    margin-top: 22px;
    width: 100%;
    background: $main-grey;
    height: 46px;
    color: #FFFFFF;
  }
  .register{
    margin-top: 30px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    span{
      color: $main-pink;
    }
  }
  .login-title {
    border-bottom: 1px solid #ccc;
    text-align: center;
    position: relative;
    padding-bottom: 10px;
    .back-index{
      display: block;
      position: absolute;
      left: 0;
      font-size: 30px;
      font-weight: bold;
    }
    img {
      width: 152px;
      height: 36px;
      display: inline-block;
    }
  }
}
</style>

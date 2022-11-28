<template>
  <div class="common-row global-content">
    <div class="auth-redirect">
      <img src="@/assets/images/login-loading.png" alt="">
      <div class="title">{{ $t('loginDialog.loginLoadingTitle') }}</div>
      <div class="msg">{{ $t('loginDialog.loginLoadingMsg') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {instagramLogin} from '~/api/loginAndRegister'
import {Message} from "@arco-design/web-vue";
import {IUserInfo} from "~/model/res/userInfo";
import {useUserInfo} from "~/stores/userInfo";
const userInfo = useUserInfo();
const {t} = useI18n();
onMounted(()=>{
  if(process.client) {
    const $route = useRoute();
    const $router = useRouter();
    console.log('$route')
    console.log($route.query.code)
    instagramLogin({
      accessToken: $route.query.code
    }).then(res=>{
      console.log('ins_login res')
      console.log(res)
      if(res.code === 0){
        Message.success(t('loginDialog.loginSuc'))
        const user:IUserInfo = res.data
        userInfo.setUserInfo(user)
        console.log('跳转到首页')
        $router.push('/')
      } else {
        Message.error(res.message)
      }
    })
  }

})
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";
.global-content{
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-redirect{
  text-align: center;
  img{
    width: 95px;
  }
  .title{
    color: #333333;
    margin-top: 20px;
  }
  .msg{
    color: $grey-font-label;
    margin-top: 10px;
  }
}
</style>

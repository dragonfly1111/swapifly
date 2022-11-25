<template>
  <div class="common-row global-content">
    <div class="auth-redirect">
      google授权回调页面
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {googleLogin} from '~/api/loginAndRegister'
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
    console.log($route.fullPath)
    const callbackStr = $route.fullPath.split('#')[1]
    const accParams = callbackStr.split('&')[0]
    console.log('accParams')
    console.log(accParams)
    const token = accParams.split('=')[1]
    console.log('token')
    console.log(token)
    googleLogin({
      accessToken: token
    }).then(res=>{
      console.log('google_login res')
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
.auth-redirect{
  font-size: 42px;
  text-align: center;
  margin-top: 300px;
  margin-bottom: 300px;
}
</style>

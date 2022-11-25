<template>
  <div class="common-row global-content">
    <div class="auth-redirect">
      ins授权回调页面
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
.auth-redirect{
  font-size: 42px;
  text-align: center;
  margin-top: 300px;
  margin-bottom: 300px;
}
</style>

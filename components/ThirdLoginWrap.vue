<template>
  <div class="login-type-wrap">
    <div class="fb-login" @click="loginThird(1)">
      <img src="@/assets/images/icon/facebook-fill.png" alt="">
      <div>{{ $t('loginDialog.facebook') }}</div>
    </div>
    <!-- <img @click="loginThird(1)" src="@/assets/images/icon/icon_facebook.png" alt=""> -->
    <!-- <img @click="loginThird(2)" src="@/assets/images/icon/icon_ins.png" alt=""> -->
    <!-- <img @click="loginThird(3)" src="@/assets/images/icon/icon_gmail.png" alt=""> -->
  </div>
</template>

<script setup lang="ts">
import { facebookLogin, googleLogin } from "~/api/loginAndRegister";
import { Message } from "@arco-design/web-vue";
import { IUserInfo } from "~/model/res/userInfo";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useUserInfo } from "~/stores/userInfo";
const userInfo = useUserInfo()
const emits = defineEmits(['closeDialog'])
const runtimeConfig = useRuntimeConfig()

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
              emits('closeDialog')
            } else {
              Message.error(res.message)
            }
          })
        }
      },{scope: 'email'});
      break
    case 2:
      const insUrl = `https://api.instagram.com/oauth/authorize?client_id=${runtimeConfig.VITE_INS_KEY}&redirect_uri=${runtimeConfig.VITE_INS_REDIRECT}&scope=user_profile,user_media&response_type=code`
      // const iWidth=500;                         //弹出窗口的宽度;
      // const iHeight=570;                        //弹出窗口的高度;
      // const iTop = (window.screen.height-30-iHeight)/2;       //获得窗口的垂直位置;
      // const iLeft = (window.screen.width-10-iWidth)/2;
      window.open(insUrl,'_blank');
      break
    case 3:
      // const googleUrl = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&redirect_uri=https://swapiflyapi.honglanshuzi.com/swapifly/googleAuth&client_id=937590701446-11ocgsktalnalr813c14mjm1ih6o18sm.apps.googleusercontent.com'
      // window.open(googleUrl,'_blank');
      // google.accounts.id.prompt();
      console.log(runtimeConfig.VITE_GOOGLE_KEY)
      console.log(google.accounts)
      google.accounts.id.initialize({
        client_id: runtimeConfig.VITE_GOOGLE_KEY,
        callback: (e:any) =>{
          console.log('googleUserInfo')
          console.log(e)
          const strings = e.credential.split("."); //截取token，获取载体
          const googleUserInfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/"))))); //解析，需要吧‘_’,'-'进行转换否则会无法解析
          console.log(googleUserInfo)
          googleLogin(googleUserInfo).then(res=>{
            console.log('google_login res')
            console.log(res)
            if(res.code === 0){
              Message.success(t('loginDialog.loginSuc'))
              const user:IUserInfo = res.data
              userInfo.setUserInfo(user)
              emits('closeDialog')
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

</script>
<style lang="scss">
@import "assets/sass/var";
.login-type-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  /**
  img {
    width: 50px;
    height: 50px;
    -webkit-user-drag: none;
    cursor: pointer;
  }

  img + img {
    margin-left: 27px;
  }
  **/
  .fb-login{
    background-color: $main-blue-d;
    color: $main-white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 7px 0;
    img{
      width: 35px;
      object-fit: contain;
      flex-shrink: 0;
      margin-right: 10px;
    }
  }
}

</style>

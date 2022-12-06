<template>
  <div class="mobile-user-profile">
    <div class="login-title">
      <icon-left  class="back-index" @click="handleIndex"/>
      {{ $t("mobile.user_center") }}
    </div>
    <div class="setting-list">
      <p v-for="list in list.data" :index="list" class="setting-list-one" @click="toPath(list.path)">
        <img :src="list.img" alt="">
        <span>{{$t(list.name)}}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {limitObj} from '~/model/payload/mobile'
import {useUserInfo} from "~/stores/userInfo";
import {ref,reactive} from "vue";
const router = useRouter();
const userInfo = useUserInfo()
const list = reactive<limitObj>({
  data: [{
    img: '/swapifly/_nuxt/assets/images/no-data-box.png',
    name:"pages.like_title",
    path:'/like',
  },{
    img: '/swapifly/_nuxt/assets/images/no-data-box.png',
    name:"pages.mobile_notice",
    path:'/notification',
  },{
    img: '/swapifly/_nuxt/assets/images/no-data-box.png',
    name:'profile.edit_profile',
    path:`/userDetails?userId=${userInfo.id}`,
  },{
    img: '/swapifly/_nuxt/assets/images/no-data-box.png',
    name:'profile.mobile_setting',
    path:'/settingProfile',
  },{
    img: '/swapifly/_nuxt/assets/images/no-data-box.png',
    name:'head.logout',
    path:'/logout',
  }],
});
const handleIndex = () => {
  router.push("/")
};
const toPath = (data:string) =>{
  if (data === '/logout'){
    userInfo.logout();
    router.replace('/')
  }else {
    router.push(data)
  }
}
</script>

<style lang="scss" scoped>
.mobile-user-profile{
  .login-title {
    border-bottom: 1px solid #ccc;
    text-align: center;
    position: relative;
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    .back-index{
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
  .setting-list{
    .setting-list-one{
      margin: 0;
      height: 40px;
      line-height: 40px;
      padding: 8px 5px;
      position: relative;
      text-indent: 35px;
      >img{
        display: block;
        width: 25px;
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>

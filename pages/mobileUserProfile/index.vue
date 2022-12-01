<template>
  <div class="mobile-user-profile">
    <div class="login-title">
      <icon-left  class="back-index" @click="handleIndex"/>
      {{ $t("mobile.user_center") }}
    </div>
    <div class="setting-list">
      <p v-for="list in list.data" :index="list" class="setting-list-one" @click="toPath(list.path)">
        <img :src="list.img" alt="">
        <span>{{list.name}}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {limitObj} from '~/model/payload/mobile'
import {ref,reactive} from "vue";
const router = useRouter();
const list = reactive<limitObj>({
  data: [{
    img: '/swapifly/_nuxt/assets/images/no-data-box.png',
    name:'like记录',
    path:'/mobileLike',
  },{
    img: '/swapifly/_nuxt/assets/images/no-data-box.png',
    name:'通知消息',
    path:'/mobileLike',
  },{
    img: '/swapifly/_nuxt/assets/images/no-data-box.png',
    name:'个人档案',
    path:'/like',
  },{
    img: '/swapifly/_nuxt/assets/images/no-data-box.png',
    name:'设置',
    path:'/like',
  },{
    img: '/swapifly/_nuxt/assets/images/no-data-box.png',
    name:'登出',
    path:'/like',
  }],
});
const handleIndex = () => {
  router.push("/")
};
const toPath = (data) =>{
  router.push(data)
}
</script>

<style lang="scss" scoped>
.mobile-user-profile{
  .login-title {
    border-bottom: 1px solid #ccc;
    text-align: center;
    position: relative;
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: 400;
    .back-index{
      display: block;
      position: absolute;
      left: 0;
      font-size: 25px;
      font-weight: bold;
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
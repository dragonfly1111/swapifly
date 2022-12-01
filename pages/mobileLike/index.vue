<template>
  <div class="mobile-like-profile">
    <div class="login-title">
      <icon-left  class="back-index" @click="handleIndex"/>
      {{ $t("pages.like_title") }}
    </div>
    <div class="mobile-like-content">
      <ProductCard :cardWidth="'48%'"></ProductCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive} from "vue";
const router = useRouter();
const handleIndex = () => {
  router.push("/mobileUserProfile")
};
</script>

<style lang="scss" scoped>
.mobile-like-profile{
  .mobile-like-content{
    padding-top: 30px;
  }
  .login-title {
    border-bottom: 1px solid #ccc;
    text-align: center;
    position: fixed;
    width: 100%;
    padding: 10px 0px;
    font-size: 18px;
    font-weight: 400;
    background-color: #fff;
    z-index: 2;
    top: 0;
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
}
</style>
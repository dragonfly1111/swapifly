<template>
  <div class="common-row global-content">
    <div  v-if="resize.screenType === 'MOBILE'" class="page-header-mobile">
      <icon-left  class="back-index" @click="handleIndex"/>
      <h2>{{ $t("pages.like_title") }}</h2>
    </div>
    <div class="null-height" v-if="resize.screenType === 'MOBILE'"></div>
    <div v-else class="page-header" >
      <h2>{{ $t("pages.like_title") }}</h2>
    </div>
    <section class="section-wrapper goods-wrapper">
      <div class="section-content">
        <ProductCard></ProductCard>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useResize } from '~/stores/resize';
const router = useRouter();
const resize = useResize();
const handleQuery = (data) => {
  console.log("form", data);
};
const handleIndex = () => {
  router.push("/mobileUserProfile")
};
</script>

<style lang="scss" scoped>
.page-header {
  margin: 25px 10px;
  h2 {
    font-size: 25px;
  }
}
.null-height{
  height: 40px;
  width: 100%;
}
.page-header-mobile{
  position: fixed;
  width: 100%;
  z-index: 2;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  text-align: center;
  top: 0;
  .back-index{
    display: block;
    position: absolute;
    left: 0;
    font-size: 28px;
    font-weight: bold;
    top: 50%;
    transform: translateY(-50%);
  }
}
.goods-wrapper {
}
</style>

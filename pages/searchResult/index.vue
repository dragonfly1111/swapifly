<template>
  <div class="common-row global-content">
    <AD :hasTitle="false"></AD>

    <section class="section-wrapper goods-wrapper">
      <div class="list-header">
        <div>
          <h2>有10,000+個搜尋結果</h2>
        </div>
        <div class="select-wrapper">
          <GoodsFilterSelect @change="handleQuery"></GoodsFilterSelect>
        </div>
      </div>
      <div class="section-content goods-content">
        <ProductCard></ProductCard>
      </div>
    </section>

    <div class="see-more">
      <a-button type="outline">{{ $t("pages.seeMore") }}</a-button>
    </div>

    <AD></AD>

    <PageFooterLink></PageFooterLink>
  </div>
</template>

<script setup>
import { productSearch } from '~/api/goods'
import {useSearchKey} from "../../stores/search";
const route = useRoute()
const searchKey = useSearchKey()

const testImg =
    "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
];

const handleQuery = (data) => {
  console.log("form", data);
  getSearchData(data)
};

const getSearchData = (data) => {
  productSearch({
    title: searchKey.searchKey,
    ...data
  }).then(res=>{
    console.log(res)
  })
}

getSearchData()

</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";

.banner-wrapper {
  margin-top: 16px;
  .arco-carousel {
    height: 260px;
    border-radius: 5px;
    overflow: hidden;
    .carousel-img {
      width: 100%;
      height: 100%;
    }
  }
}

.section-wrapper {
  margin: 40px 0 40px;
  .section-header {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .brands-content {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    width: 100%;
    position: relative;
    .brands-item {
      text-align: center;
      width: 120px;
      flex-shrink: 0;
      margin-right: 5px;
      margin-bottom: 20px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 5px;
        cursor: pointer;
      }
    }
  }
}

.goods-wrapper {
  margin-top: 30px;
}


.see-more {
  text-align: center;
  margin: 30px auto;
  .arco-btn {
    border-color: rgba(56, 56, 56, 1);
    color: rgba(56, 56, 56, 1);
    padding: 0 20px;
    height: 38px;
  }
}

.list-header {
  margin: 10px 0;
  .arco-breadcrumb {
    color: $grey-font-label;
  }
}
</style>

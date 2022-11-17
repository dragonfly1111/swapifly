<template>
  <div class="global-content">
    <div class="banner-wrapper">
      <a-carousel :auto-play="true" indicator-type="dot" show-arrow="hover">
        <a-carousel-item v-for="image in images">
          <img :src="image" class="carousel-img" />
        </a-carousel-item>
      </a-carousel>
    </div>

    <section class="section-wrapper">
      <h3 class="section-header">{{ $t("pages.hotBrands") }}</h3>
      <div class="section-content brands-content">
        <div v-for="item in 8" class="brands-item">
          <img :src="testImg" alt="" />
          <div>耐克/nike</div>
        </div>
        <div class="arrow-rgiht">
          <img src="@/assets/images/icon/arrow-right-bg-b.png" alt="" />
        </div>
      </div>
    </section>

    <section class="section-wrapper recommend-wrapper">
      <h3 class="section-header">{{ $t("pages.recommendTitle") }}</h3>
      <div class="section-content recommend-content">
        <ProductCard v-for="(item, index) in 8"></ProductCard>
      </div>
    </section>

    <section class="ad-wrapper">
      <div class="ad-title">{{ $t("footer.AD") }}</div>
      <div class="ad-content"></div>
    </section>

    <div class="see-more">
      <a-button type="outline">{{ $t("pages.seeMore") }}</a-button>
    </div>

    <PageFooterLink></PageFooterLink>
  </div>
</template>

<script>
import { ref } from "vue";
import IconEdit from "@arco-design/web-vue/es/icon/icon-edit";
import IconPlus from "@arco-design/web-vue/es/icon/icon-plus";
import ProductCard from "@/components/ProductCard";
import PageFooterLink from "@/components/PageFooterLink";
export default {
  components: { IconPlus, IconEdit, ProductCard, PageFooterLink },

  setup() {
    const testImg =
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
    const images = [
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
    ];
    const value = ref();
    const data = [
      {
        value: "beijing",
        label: "Beijing",
        other: "extra",
      },
      {
        value: "shanghai",
        label: "Shanghai",
        other: "extra",
      },
      {
        value: "guangzhou",
        label: "Guangzhou",
        other: "extra",
      },
      {
        value: "chengdu",
        label: "Chengdu",
        other: "extra",
      },
    ];

    return {
      value,
      data,
      images,
      testImg,
    };
  },
};
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
    font-size: 14px;
    width: 100%;
    overflow: hidden;
    position: relative;
    .arrow-rgiht {
      position: absolute;
      width: 32px;
      height: 32px;
      right: 0;
      top: 20px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .brands-item {
      text-align: center;
      width: 120px;
      flex-shrink: 0;
      margin-right: 5px;
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

.recommend-wrapper {
  margin-top: 60px;
}

.recommend-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.ad-wrapper {
  width: 80%;
  max-width: 1000px;
  margin: auto;
  text-align: center;
  .ad-content {
    width: 100%;
    height: 120px;
    border: 1px solid;
    margin: 10px 0;
  }
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
</style>

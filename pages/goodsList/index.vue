<template>
  <div class="common-row global-content">
    <div class="banner-wrapper">
      <a-carousel :auto-play="true" indicator-type="dot" show-arrow="hover">
        <a-carousel-item v-for="image in images">
          <img :src="image" class="carousel-img" />
        </a-carousel-item>
      </a-carousel>
    </div>

    <section class="section-wrapper">
      <div class="section-content brands-content">
        <div v-for="item in 8" class="brands-item">
          <img :src="testImg" alt="" />
          <div>耐克/nike</div>
        </div>
      </div>
    </section>

    <section class="section-wrapper">
      <h3 class="section-header">{{ $t("pages.hotBrands") }}</h3>
      <div class="section-content brands-content">
        <div v-for="item in 8" class="brands-item">
          <img :src="testImg" alt="" />
          <div>耐克/nike</div>
        </div>
      </div>
    </section>

    <section class="section-wrapper goods-wrapper">
      <div class="list-header">
        <a-space direction="vertical">
          <a-breadcrumb>
            <a-breadcrumb-item>一级分类标题</a-breadcrumb-item>
          </a-breadcrumb>
        </a-space>
        <div class="select-wrapper">
          <a-form :modal="form" auto-label-width layout="inline" ref="formRef">
            <a-form-item field="rid">
              <a-select :placeholder="$t('pages.classification')" v-model="form.rid">
                <a-option>Beijing</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="sort">
              <a-select :placeholder="$t('pages.sort')" v-model="form.sort">
                <template #label="{ data }">
                  <span>排序：</span>
                </template>
                <a-option v-for="item in sortOptions" :key="item.value">{{ item.label }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="nid">
              <a-select :placeholder="$t('pages.old_new')" v-model="form.nid">
                <a-option>Beijing</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="price">
              <a-select :placeholder="$t('pages.price_degree')" v-model="form.nid">
                <a-option>Beijing</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="offline" style="margin-right:10px">
              <a-checkbox value="offline">{{ $t("pages.hand_deliver") }}</a-checkbox>
            </a-form-item>
            <a-form-item field="mail">
              <a-checkbox value="mail">{{ $t("pages.post_and_courier") }}</a-checkbox>
            </a-form-item>
            <a-form-item>
              <a-divider direction="vertical" />
              <a-button type="text" @click="resetForm">{{ $t("pages.reset") }}</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="section-content goods-content">
        <ProductCard v-for="(item, index) in 8"></ProductCard>
      </div>
    </section>

    <AD></AD>

    <div class="see-more">
      <a-button type="outline">{{ $t("pages.seeMore") }}</a-button>
    </div>

    <PageFooterLink></PageFooterLink>

  </div>
</template>

<script>
import { ref, reactive } from "vue";
import IconEdit from "@arco-design/web-vue/es/icon/icon-edit";
import IconPlus from "@arco-design/web-vue/es/icon/icon-plus";
import ProductCard from "@/components/ProductCard";
import PageFooterLink from "@/components/PageFooterLink";
import AD from "@/components/AD";
export default {
  name: "GoodsList",
  components: { IconPlus, IconEdit, ProductCard, PageFooterLink, AD },

  setup() {
    const testImg =
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
    const images = [
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
    ];
    const formRef = ref(null);
    const sortOptions = reactive([{ value: 2, label: "价钱高至低" }]);

    const form = reactive({
      sort: "",
      nid: "",
      rid: "",
    });

    const resetForm = () => {
      formRef.value.resetFields();
      console.log(form)
    };


    return {
      images,
      testImg,
      form,
      formRef,
      sortOptions,
      resetForm,
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
  margin-top: 60px;
}

.goods-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
    color: #aaaaaa;
  }
  .select-wrapper {
    margin: 10px 5px;
    :deep(.arco-select-view-single) {
      background-color: #fff;
      border-radius: 50px;
      border: 1px solid #aaaaaa;
      color: #383838;
      padding-left: 15px;
      padding-right: 15px;
      width: 140px;
    }
    :deep(.arco-form-item-layout-inline) {
      margin-right: 0;
    }
    :deep(.arco-form-item-label-col) {
      padding-right: 8px;
    }
    :deep(.arco-checkbox-checked .arco-checkbox-icon) {
      background-color: #333;
    }
  }
}
</style>

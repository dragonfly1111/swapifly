<template>
  <div class="common-row global-content">
    <div class="page-header">
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
import ProductCard from "@/components/ProductCard";

const handleQuery = (data) => {
  console.log("form", data);
};
</script>

<style lang="scss" scoped>
.page-header {
  margin: 25px 10px;
  h2 {
    font-size: 25px;
  }
}
.goods-wrapper {
}
</style>

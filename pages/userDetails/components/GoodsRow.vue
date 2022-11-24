<template>
  <div class="goods-box">
    <a-row justify="space-between" align="center" class="box-header">
      <a-col flex="100px" class="title"> 商品 </a-col>
      <a-col flex="200px">
        <a-input-search :style="{ width: '200px' }" :placeholder="$t('pages.searchGoods')" />
      </a-col>
    </a-row>
    <div class="goods-box-body">
      <ProductCard :show-user="false" showStatus></ProductCard>
    </div>
  </div>
</template>
<script setup>
const handleQuery = () =>{

}

// 加载更多
const loadMore = () =>{

}
defineExpose({
    handleQuery,
});</script>
<style lang="scss" scoped>
.goods-box {
  .box-header {
    padding: 20px 30px 10px;
    .title {
      font-size: 24px;
    }
    :deep(.arco-input-wrapper) {
      background-color: #fff;
      border: 1px solid #e5e5e5;
    }
  }
  .goods-box-body {
    padding: 0 20px 30px;
  }
}
</style>

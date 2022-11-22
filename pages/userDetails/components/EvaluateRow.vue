<template>
  <div class="evaluate-box">
    <a-row justify="space-between" align="center" class="box-header">
      <a-col flex="100px" class="title"> {{ $t("pages.evaluate") }} </a-col>
      <a-col flex="200px">
        <a-select v-model="queryForm.s_type">
          <a-option>Beijing</a-option>
          <a-option>Shanghai</a-option>
          <a-option>Guangzhou</a-option>
        </a-select>
      </a-col>
    </a-row>
    <div class="evaluate-box-body"></div>
  </div>
</template>
<script setup>
const queryForm = reactive({
  s_type: "",
});
</script>
<style lang="scss" scoped>
.evaluate-box {
  .box-header {
    padding: 20px 30px 10px;
    .title {
      font-size: 24px;
    }
    :deep(.arco-select) {
      background-color: #fff;
      border: 1px solid #e5e5e5;
    }
  }
  .evaluate-box-body {
    padding: 0 20px 30px;
  }
}
</style>

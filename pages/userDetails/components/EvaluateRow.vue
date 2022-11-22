<template>
  <div class="evaluate-box">
    <div class="box-header">
      <a-row justify="space-between" align="center">
        <a-col flex="100px" class="title"> {{ $t("pages.evaluate") }} </a-col>
        <a-col flex="200px">
          <a-select v-model="queryForm.s_type">
            <a-option>Beijing</a-option>
            <a-option>Shanghai</a-option>
            <a-option>Guangzhou</a-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row justify="start" align="center" class="evaluate-info">
        <a-col class="evaluate-total">
          <div>
            <span class="total">586</span>
            <span><icon-star-fill :size="18" /></span>
          </div>
          <div>（99{{$t('pages.evaluate')}}）</div>
        </a-col>
        <a-col></a-col>
      </a-row>
    </div>

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
    .evaluate-info{
        .evaluate-total{

        }
    }
  }
}
</style>

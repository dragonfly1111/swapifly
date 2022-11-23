<template>
  <div class="evaluate-box">
    <div class="box-header">
      <a-row justify="space-between" align="center" class="header-select">
        <a-col flex="100px" class="title"> {{ $t("pages.evaluate") }} </a-col>
        <a-col flex="200px">
          <a-select v-model="queryForm.s_type" @change="handleQuery">
            <a-option
              v-for="item in evaluationSort"
              :value="item.value"
              :key="item.value"
              :label="item.key"
            >
            </a-option>
          </a-select>
        </a-col>
      </a-row>
      <section class="evaluate-info">
        <div class="evaluate-total">
          <div class="star-number">
            <div>
              <span class="total">586</span>
              <span><icon-star-fill :size="18" /></span>
            </div>
            <div>（99{{ $t("pages.evaluate") }}）</div>
          </div>
          <a-space class="evaluate-info-btn">
            <div>{{ $t("evaluate.sourceEvaluation.all") }}</div>
            <div v-for="item in evaluationSource" :key="item.value">{{ item.key }}</div>
          </a-space>
        </div>
      </section>
    </div>

    <div class="evaluate-box-body">
      <EvaluateList></EvaluateList>
      <div class="see-more">
        <a-button type="outline" @click="loadMore">{{ $t("pages.seeMore") }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import EvaluateList from "./EvaluateList.vue";
import { useSysData } from "~/stores/sysData";
const sysData = useSysData();
const evaluationSort = ref([]);
const evaluationSource = ref([]);

const queryForm = reactive({
  s_type: 1,
});
const testImg =
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
onMounted(() => {
  evaluationSort.value = sysData.evaluationSort;
  evaluationSource.value = sysData.evaluationSource;
});

const handleQuery = () =>{

}

// 加载更多
const loadMore = () =>{

}
</script>
<style lang="scss" scoped>
@import "assets/sass/var";

.evaluate-box {
  .box-header {
    .header-select {
      padding: 20px 30px 15px;
      border-bottom: 1px solid #e5e5e5;
    }
    .title {
      font-size: 24px;
    }
    :deep(.arco-select) {
      background-color: #fff;
      border: 1px solid #e5e5e5;
    }
  }
  .evaluate-info {
    padding: 20px 30px;
    .evaluate-total {
      display: flex;
      align-items: center;
      .star-number {
        flex-shrink: 0;
        padding: 10px 16px 10px 0;
        border-right: 1px solid #cccccc;
        text-align: center;
        .arco-icon-star-fill {
          color: #ffb400;
        }
        .total {
          font-size: 30px;
          margin-right: 5px;
          margin-bottom: 5px;
          display: inline-block;
        }
      }
      .evaluate-info-btn {
        display: flex;
        margin-left: 25px;
        font-size: 15px;
        div {
          background: #f0f1f1;
          border: 1px solid $grey-font-label;
          border-radius: 50px;
          margin-right: 10px;
          padding: 8px 18px;
          cursor: pointer;
          &:hover,
          &.active {
            background-color: #e5e6eb;
          }
        }
      }
    }
  }
  .evaluate-box-body {
    padding: 0 30px 30px;
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

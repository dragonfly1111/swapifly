<template>
  <div class="evaluate-box">
    <div class="box-header">
      <a-row justify="space-between" align="center" class="header-select">
        <a-col :flex="resize.screenType !== 'MOBILE'?'100px':'1'" class="title"> {{ $t("pages.evaluate") }} </a-col>
        <a-col :flex="resize.screenType !== 'MOBILE'?'200px':'2'">
          <a-select v-model="queryParams.s_type" @change="initData">
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
              <span class="total">{{props.userData.stars || 0}}</span>
              <span><icon-star-fill :size="18" /></span>
            </div>
            <div>({{ total }}{{ $t("pages.evaluate") }})</div>
          </div>
          <a-space class="evaluate-info-btn">
            <div :class="{ active: queryParams.type == null }" @click="changeType(null)">
              {{ $t("evaluate.sourceEvaluation.all") }}
            </div>
            <div
              v-for="item in evaluationSource"
              :key="item.value"
              @click="changeType(item.value)"
              :class="{ active: queryParams.type == item.value }"
            >
              {{ item.key }}
            </div>
          </a-space>
        </div>
      </section>
    </div>

    <div class="evaluate-box-body">
      <EvaluateList :page-loading="pageLoading" :list="evaluationList"></EvaluateList>
      <div class="see-more" v-if="total > evaluationList">
        <a-button type="outline" @click="loadMore">{{ $t("pages.seeMore") }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import EvaluateList from "./EvaluateList.vue";
import { useSysData } from "~/stores/sysData";
import { getEvaluationList } from "~/api/shop";
import { useResize } from '~/stores/resize'
const resize = useResize();
const sysData = useSysData();
const evaluationSort = ref([]); // 评论排序
const evaluationSource = ref([]); // 评论来源
const evaluationList = ref([]); // 评论列表
const pageLoading = ref(true);
const router = useRouter();
const total = ref(0);

const props = defineProps({
  userData: {
    type: Object,
    default: () => {
      stars: 0;
    },
  },
});
const queryParams = ref({
  s_type: 1,
  type: null,
  id: router.currentRoute.value.query.userId,
  page: 1,
  limit: 10,
});

onMounted(() => {
  evaluationSort.value = sysData.evaluationSort;
  evaluationSource.value = sysData.evaluationSource;
});

const handleQuery = () => {
  queryParams.value.id = router.currentRoute.value.query.userId
  getEvaluationList(queryParams.value)
    .then((res) => {
      if (res.code == 0) {
        evaluationList.value = evaluationList.value.concat(res.data.data);
        total.value = res.data.total;
      }
    })
    .finally(() => {
      pageLoading.value = false;
    });
};

const initData = () => {
  pageLoading.value = true;
  queryParams.value.page = 1;
  evaluationList.value = [];
  handleQuery();
};

// 加载更多
const loadMore = () => {
  queryParams.value.page++;
  handleQuery();
};
// 改变状态
const changeType = (e) => {
  queryParams.value.type = e;
  initData();
};
defineExpose({
  handleQuery,
  initData,
});
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

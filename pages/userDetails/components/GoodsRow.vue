<template>
  <div class="goods-box">
    <a-row justify="space-between" align="center" class="box-header">
      <a-col flex="100px" class="title"> {{ $t("pages.goods") }} </a-col>
      <a-col flex="200px">
        <a-input-search
          v-model="queryParams.title"
          :style="{ width: '200px' }"
          :placeholder="$t('pages.searchGoods')"
          @search="handleSearch"
          @clear="initData"
          allow-clear
        />
      </a-col>
    </a-row>
    <div class="goods-box-body">
      <ProductCard
        :pageLoading="pageLoading"
        :list="productList"
        :isMySelf="isMySelf"
        :show-user="false"
        showStatus
        @change="refreshPage"
      ></ProductCard>
    </div>
    <div class="see-more" @click="loadMore" v-if="productList.length < total">
      <a-button type="outline" :loading="btnLoading">{{ $t("pages.seeMore") }}</a-button>
    </div>
  </div>
</template>
<script setup>
import { useUserInfo } from "~/stores/userInfo";
import { userProduct } from "~/api/shop";
const pageLoading = ref(true);
const btnLoading = ref(false);
const total = ref(0);
const productList = ref([]);
const userInfo = useUserInfo();
const router = useRouter();
const isMySelf = computed(() => {
  return userInfo.id == router.currentRoute.value.query.userId;
});
const queryParams = ref({
  page: 1,
  limit: 10,
  id: router.currentRoute.value.query.userId,
  title: null,
});
const handleQuery = () => {
  btnLoading.value = true;
  userProduct(queryParams.value)
    .then((res) => {
      if (res.code == 0) {
        total.value = res.data.lists.total;
        productList.value = arrUnique(productList.value.concat(res.data.lists.data));
      }
    })
    .finally(() => {
      pageLoading.value = false;
      btnLoading.value = false;
    });
};

const arrUnique = (list) => {
  let obj = {};
  return list.reduce((cur, next) => {
    obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
    return cur;
  }, []);
};

const refreshPage = () => {
  initData(true);
};

const initData = (isSearch) => {
  productList.value = [];
  pageLoading.value = true;
  queryParams.value.page = 1;
  if (!isSearch) queryParams.value.title = null;
  handleQuery();
};

const handleSearch = (val) => {
  queryParams.value.title = val;
  initData(true);
};

// 加载更多
const loadMore = () => {
  queryParams.value.page++;
  handleQuery();
};
defineExpose({
  handleQuery,
  initData,
});
</script>
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

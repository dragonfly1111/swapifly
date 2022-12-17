<template>
  <div class="common-row global-content">
    <div class="page-header">
      <h2>{{ $t("pages.like_title") }}</h2>
    </div>
    <section class="section-wrapper goods-wrapper">
      <div class="section-content">
        <ProductCard
          showStatus
          :list="likeList"
          hasLikeConfirm
          :pageLoading="pageLoading"
          @change="changeLike"
        ></ProductCard>
      </div>
    </section>
    <div class="see-more" v-if="page < lastPage && !pageLoading">
      <a-button type="outline" @click="loadMore" :loading="butLoading">{{
        $t("pages.seeMore")
      }}</a-button>
    </div>
  </div>
</template>

<script setup>
import { getLikeLog } from "~/api/user";
import { Message } from "@arco-design/web-vue";

const router = useRouter();
const lastPage = ref(999);
const page = ref(1);
const pageLoading = ref(true);
const butLoading = ref(false);
const likeList = ref([]);
const handleQuery = (data) => {
  console.log("form", data);
};

// 加载更多
const loadMore = () => {
  page.value++;
  butLoading.value = true;
  getList();
};

const getList = () => {
  // pageLoading.value = true
  getLikeLog({
    page: page.value,
    limit: 4,
  }).then((res) => {
    if (res.code === 0) {
      pageLoading.value = false;
      butLoading.value = false;
      lastPage.value = res.data.last_page;
      likeList.value = [...likeList.value, ...res.data.data].map((i) => {
        return { ...i, islike: 1 };
      });
    } else {
      Message.error(res.message);
    }
  });
};
const changeLike = (item, index) => {
  likeList.value.splice(index, 1);
};
getList();
</script>

<style lang="scss" scoped>
.page-header {
  margin: 40px 10px 20px;
  h2 {
    font-size: 36px;
  }
}
.null-height {
  height: 40px;
  width: 100%;
}
.page-header-mobile {
  position: fixed;
  width: 100%;
  z-index: 2;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  text-align: center;
  top: 0;
  .back-index {
    display: block;
    position: absolute;
    left: 0;
    font-size: 28px;
    font-weight: bold;
    top: 50%;
    transform: translateY(-50%);
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

@media screen and (max-width: 1000px) {
  .page-header {
    margin: 20px 0;
    h2 {
      font-size: 28px;
      margin: 0;
    }
  }
}
</style>

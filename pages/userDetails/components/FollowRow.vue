<template>
  <div class="follow-box">
    <a-row justify="space-between" align="center" class="box-header">
      <a-col flex="100px" class="title"> {{ title }}</a-col>
    </a-row>
    <div class="follow-box-body">
      <div :gutter="24" class="skeleton-col-2">
        <a-skeleton animation :loading="pageLoading">
          <a-row :gutter="10">
            <a-col :span="12" v-for="item in 4">
              <a-skeleton-shape
                style="width: 100%; height: 200px; display: inline-block; margin-bottom: 10px"
              />
            </a-col>
          </a-row>
        </a-skeleton>
      </div>
      <a-skeleton :loading="pageLoading" animation class="skeleton-col-4">
        <a-space :style="{ width: '100%' }" size="large" wrap>
          <a-skeleton-line :widths="[200]" :line-height="250" />
          <a-skeleton-line :widths="[200]" :line-height="250" />
          <a-skeleton-line :widths="[200]" :line-height="250" />
          <a-skeleton-line :widths="[200]" :line-height="250" />
        </a-space>
        <div style="margin-top: 20px">
          <a-space :style="{ width: '100%' }" size="large" wrap>
            <a-skeleton-line :widths="[200]" :line-height="250" />
            <a-skeleton-line :widths="[200]" :line-height="250" />
            <a-skeleton-line :widths="[200]" :line-height="250" />
            <a-skeleton-line :widths="[200]" :line-height="250" />
          </a-space>
        </div>
      </a-skeleton>

      <div v-if="!pageLoading">
        <div class="follow-list">
          <follow-card
            v-for="(item, index) in dataList"
            :item="item"
            @change="changeFollow"
          ></follow-card>
        </div>

        <a-empty class="empty-box" v-if="!dataList.length">
          <template #image>
            <img src="@/assets/images/no-follow.png" alt="" />
          </template>
          <a-space direction="vertical" fill size="medium">
            <div class="empty-tip">{{ $t("pages.emptyContent") }}</div>
            <div>{{ $t("pages.emptyContentSub") }}</div>
          </a-space>
        </a-empty>
      </div>

      <div class="see-more" v-if="dataList.length < total">
        <a-button type="outline" @click="loadMore">{{ $t("pages.seeMore") }}</a-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getFollowers, getFollowList, followUser } from "~/api/shop";
import { useI18n } from "vue-i18n";
import { Message } from "@arco-design/web-vue";
import FollowCard from "~/pages/userDetails/components/FollowCard";
const { t } = useI18n();
const appConfig = useAppConfig();
const baseImgPrefix = appConfig.baseImgPrefix;
const router = useRouter();
const emits = defineEmits(["change"]);
const title = ref(t("pages.followIn"));
const pageLoading = ref(true);
const type = ref(null);
const total = ref(0);
const dataList = ref([]);
const queryParams = ref({
  page: 1,
  limit: 10,
  id: router.currentRoute.value.query.userId,
});

const handleQuery = (type) => {
  pageLoading.value = true;
  console.log(type)
  if (type == 1) {
    handleQueryFollowList();
  } else {
    handleQueryFollowersList();
  }
};

const resetQuery = (e) => {
  console.log(e)
  dataList.value = [];
  queryParams.value.page = 1;
  title.value = e == 1 ? t("pages.followIn") : t("pages.followers");
  type.value = e;
  if (type.value == 1) {
    handleQueryFollowList();
  } else {
    handleQueryFollowersList();
  }
};

const handleQueryFollowersList = () => {
  queryParams.value.id = router.currentRoute.value.query.userId;
  getFollowers(queryParams.value)
    .then((res) => {
      dataList.value = dataList.value.concat(res.data.data);
      total.value = res.data.total;
    })
    .finally(() => {
      pageLoading.value = false;
    });
};

const handleQueryFollowList = () => {
  queryParams.value.id = router.currentRoute.value.query.userId;
  getFollowList(queryParams.value)
    .then((res) => {
      if (res.code == 0) {
        dataList.value = dataList.value.concat(res.data.data);
        total.value = res.data.total;
      }
    })
    .finally(() => {
      pageLoading.value = false;
    });
};

const changeFollow = () => {
  emits("change");
};

// 加载更多
const loadMore = () => {
  queryParams.value.page++;
  handleQuery(type.value);
};
defineExpose({
  handleQuery,
  resetQuery,
});
</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";
.follow-box {
  .box-header {
    padding: 20px 30px 10px;
    .title {
      font-size: 24px;
    }
    :deep(.arco-input-wrapper) {
      background-color: #fff;
      border: 1px solid $main-grey-border;
    }
  }
  .follow-box-body {
    padding: 0 30px 30px;
  }
}

.follow-list {
  display: flex;
  flex-wrap: wrap;
  &-item {
    text-align: center;
    border: 1px solid $main-grey-border;
    padding: 15px 10px 10px;
    width: 150px;
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: 20px;
    margin-right: 30px;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    div {
      width: 100%;
      margin-top: 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }
    .fs10 {
      font-size: 10px;
    }
    .fs12 {
      font-size: 12px;
      word-break: break-all;
    }
    :deep(.arco-btn) {
      width: 90%;
      margin: 10px auto;
    }
  }
}
.see-more {
  text-align: center;
  margin: 30px auto 10px;
  .arco-btn {
    border-color: $main-grey-rbg;
    color: $main-grey-rbg;
    padding: 0 20px;
    height: 38px;
  }
}

.empty-box {
  color: $grey-font-label;
  font-size: 12px;
  margin-top: 10%;
  img {
    width: 100px;
    object-fit: contain;
  }
  .empty-tip {
    color: $main-grey;
    font-size: 18px;
  }
}

.skeleton-col-2 {
  display: none;
}

@media screen and (min-width: 0px) and (max-width: 1000px) {
  .follow-box {
    padding: 20px 10px;
    .follow-box-body {
      padding: 0 !important;

      .arco-space-wrap {
        flex-wrap: nowrap !important;
        overflow-x: hidden !important;
      }
    }

    .box-header {
      padding: 0;
    }

    .arco-space-item {
      margin-right: 0px !important;
    }
  }

  .skeleton-col-2 {
    display: block;
  }
  .skeleton-col-4 {
    display: none;
  }

  .follow-list {
    display: flex;
    flex-wrap: wrap;
    grid-template-columns: repeat(auto-fill, 48%);
    grid-gap: 10px;
    :deep(.follow-list-item) {
      width: 48%;
      margin-right: 0;
    }
  }
}
</style>

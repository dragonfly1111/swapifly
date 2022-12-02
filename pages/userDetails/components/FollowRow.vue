<template>
  <div class="follow-box">
    <a-row justify="space-between" align="center" class="box-header">
      <a-col flex="100px" class="title"> {{ title }} </a-col>
    </a-row>
    <div class="follow-box-body">
      <div class="follow-list">
        <div class="follow-list-item" v-for="item in dataList">
          <img :src="baseImgPrefix + item.avatar" alt="" />
          <div class="fs12">{{item.nickname}}</div>
          <div class="fs10">@{{item.realname}}</div>
          <div class="fs10">{{item.b_follow}} Followers</div>
          <div>
            <a-button type="outline" class="black-outline-btn" v-if="item.type == 0">{{$t("pages.follow")}}</a-button>
            <a-button class="black-btn" v-if="item.type == 1">{{$t("pages.followIn")}}</a-button>
          </div>
        </div>
      </div>

      <div class="see-more" v-if="total < dataList.length">
        <a-button type="outline" @click="loadMore">{{ $t("pages.seeMore") }}</a-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getFollowers, getFollowList } from "~/api/shop";
import { useI18n } from "vue-i18n";
import { baseImgPrefix } from "~/config/baseUrl";
const { t } = useI18n();
const router = useRouter();

const title = ref(t("pages.followIn"));
const testImg =
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
const pageLoading = ref(true);
const type = ref(null);
const total = ref(0);
const dataList = ref([]);
const queryParams = ref({
  page: 1,
  limit: 10,
  id:router.currentRoute.value.query.userId
});

const handleQuery = (type) => {
  pageLoading.value = true;
  if (type.value == 1) {
    handleQueryFollowList();
  } else {
    handleQueryFollowersList();
  }
};

const resetQuery = (e) => {
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
.follow-box {
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
  .follow-box-body {
    padding: 0 30px 30px;
  }
}

.follow-list {
  display: flex;
  flex-wrap: wrap;
  &-item {
    text-align: center;
    border: 1px solid #e5e5e5;
    padding: 15px 10px 10px;
    width: 150px;
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: 20px;
    margin-right: 30px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    div {
      margin-top: 8px;
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
    border-color: rgba(56, 56, 56, 1);
    color: rgba(56, 56, 56, 1);
    padding: 0 20px;
    height: 38px;
  }
}
</style>

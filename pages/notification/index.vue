<template>
  <div class="common-row global-content">
    <div  v-if="resize.screenType === 'MOBILE'" class="page-header-notification">
      <icon-left  class="back-index" @click="handleIndex"/>
      {{ $t("pages.mobile_notice") }}
    </div>
    <div class="null-height" v-if="resize.screenType === 'MOBILE'"></div>
    <div class="notice-list">
      <a-skeleton :animation="true" :loading="pageLoading" line-height="50">
        <a-space direction="vertical" :style="{ width: '100%' }" size="large">
          <a-skeleton-line :rows="3" :lineHeight="200" line-spacing="30"/>
        </a-space>
      </a-skeleton>

      <div v-if="!pageLoading">
        <div class="notice-item" v-for="item in noticeList" :key="item.id">
          <div class="item-header">
            <img class="long-logo" src="@/assets/images/logo-long.png" alt="" />
            <span>{{ parseTime(item.create_time, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
          </div>
          <div class="item-body">
            <div class="title">{{ item.title }}</div>
            <div>{{ item.content }}</div>
          </div>
        </div>
        <a-spin class="loading" v-if="moreLoading" />
      </div>

      <div class="no-notice" v-if="!noticeList.length && !pageLoading">
        <a-empty>
          <template #image>
            <img src="@/assets/images/icon/no_notice_grey.png" alt="" srcset="" />
          </template>
          <h5>{{ $t("pages.no_notice") }}</h5>
          <p>{{ $t("pages.no_notice_tip") }}</p>
        </a-empty>
      </div>
    </div>
  </div>
</template>
<script setup>
import { noticelist } from "~/api/notice";
import { parseTime } from "~/utils/time";
import { useResize } from '~/stores/resize';
const router = useRouter();
const resize = useResize();
const pageLoading = ref(true);
const moreLoading = ref(false);
const noticeList = ref([]);
const queryParams = reactive({
  page: 1,
  limit: 10,
});
const total = ref(0);
const handleQuery = () => {
  noticelist(queryParams)
    .then((res) => {
      if (res.code === 0) {
        noticeList.value = noticeList.value.concat(res.data.data);
        total.value = res.data.total;
      }
    })
    .finally(() => {
      if (queryParams.page == 1) {
        pageLoading.value = false;
      }
      moreLoading.value = false;
    });
};
const handleIndex = () => {
  router.push("/mobileUserProfile")
};
const loadMore = () => {
  if(noticeList.value.length < total.value && !moreLoading.value){
    queryParams.page++
    moreLoading.value = true
    handleQuery()
  }
};

const pageScroll = () => {
  // 获取滚动的距离
  let scrollTop = document.documentElement.scrollTop;
  // 获取滚动的高度（获取整个html的高度）
  let scrollHeight = document.documentElement.scrollHeight;
  // 获取屏幕(浏览器)高度
  let clienHeight = document.documentElement.clientHeight;
  // 滚动的距离 + 屏幕高度 - 内容高度 >= 0 表示滚动到底部了      (下拉加载判断条件)
  if (scrollTop + clienHeight - scrollHeight >= 0) {
    console.log("我到底了");
    loadMore()
  }
};
onMounted(async () => {
  handleQuery();
  window.onscroll = pageScroll;
});
</script>
<style lang="scss" scoped>
.null-height{
  height: 40px;
  width: 100%;
}
.page-header-notification {
  border-bottom: 1px solid #ccc;
  text-align: center;
  position: relative;
  font-size: 18px;
  font-weight: bold;
  height: 45px;
  line-height: 45px;
  .back-index{
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    font-size: 25px;
    font-weight: bold;
    transform: translateY(-50%);
  }
  img {
    width: 152px;
    height: 36px;
    display: inline-block;
  }
}

.notice-list {
  // width: 90%;
  margin: auto;
  max-width: 700px;
  padding: 30px 5%;
  .notice-item {
    border: 1px solid #aaaaaa44;
    font-size: 14px;
    margin-bottom: 25px;
    min-height: 200px;
    .item-header {
      padding: 20px 25px;
      border-bottom: 1px solid #aaaaaa44;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #383838;
      .long-logo {
        height: 30px;
        object-fit: contain;
      }
    }
    .item-body {
      padding: 10px 25px;
      .title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 15px;
      }
    }
  }
}

.loading {
  text-align: center;
  display: flex;
  justify-content: center;
}

.no-notice {
  padding: 15vh 0;
  img {
    width: 90px;
    object-fit: contain;
  }
}
</style>

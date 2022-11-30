<template>
  <div class="common-row global-content">
    <div class="notice-list">
      <a-skeleton :animation="true" :loading="pageLoading" line-height="50">
        <a-space direction="vertical" :style="{ width: '100%' }" size="large">
          <a-skeleton-line :rows="5" />
        </a-space>
      </a-skeleton>

      <div v-if="!pageLoading">
        <div class="notice-item" v-for="item in noticeList">
          <div class="item-header">
            <img class="long-logo" src="@/assets/images/logo-long.png" alt="" />
            <span>2022-09-29 16:24:58</span>
          </div>
          <div class="item-body">
            <div class="title">通知標題</div>
            <div>通知文本內容通知文本內容通知文本內容</div>
          </div>
        </div>
      </div>

      <div class="no-notice" v-if="!noticeList.length && !pageLoading">
        <a-empty>
          <template #image>
            <img src="@/assets/images/icon/no_notice_grey.png" alt="" srcset="" />
          </template>
          <h5>{{ $t('pages.no_notice') }}</h5>
          <p>{{ $t('pages.no_notice_tip') }}</p>
        </a-empty>
      </div>
    </div>
  </div>
</template>
<script setup>
import { noticelist } from "~/api/notice";
const pageLoading = ref(true);
const noticeList = ref([]);
const queryParams = reactive({
  page: 1,
});
const total = ref(0);
const handleQuery = () => {
  noticelist(queryParams)
    .then((res) => {
      if (res.code == 1) {
        noticeList.value = res.data.data;
        total.value = res.data.total;
      }
    })
    .finally(() => {
      if (queryParams.page == 1) {
        pageLoading.value = false;
      }
    });
};
onMounted(async () => {
  handleQuery();
});
</script>
<style lang="scss" scoped>
.notice-list {
  width: 90%;
  margin: auto;
  max-width: 700px;
  padding: 30px 0;
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

.no-notice {
  padding: 15vh 0;
  img {
    width: 90px;
  }
}
</style>

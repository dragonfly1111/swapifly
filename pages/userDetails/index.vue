<template>
  <div class="common-row global-content">
    <div class="user-banner">
      <img :src="testImg" alt="" srcset="" />
    </div>

    <div class="user-details">
      <a-tabs :active-key="activeTab" @change="handleTabChange">
        <template #extra>
          <a-space class="extra-btn">
            <a-button type="outline">{{ $t("profile.edit_profile") }}</a-button>
            <a-button type="outline">{{ $t("pages.follow") }}</a-button>
            <a-button type="outline">{{ $t("pages.report") }}</a-button>
          </a-space>
        </template>
        <a-tab-pane key="goods" :title="$t('pages.goods')"></a-tab-pane>
        <a-tab-pane key="evaluate" :title="$t('pages.evaluate')"></a-tab-pane>
        <a-tab-pane key="businessInformation" :title="$t('pages.businessInformation')">
        </a-tab-pane>
      </a-tabs>

      <div class="tab-content">
        <div class="left-content">
          <UserCard></UserCard>
        </div>
        <div class="right-content">
          <GoodsRow v-show="activeTab == 'goods'"></GoodsRow>
          <EvaluateRow v-show="activeTab == 'evaluate'"></EvaluateRow>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import UserCard from "./components/UserCard";
import GoodsRow from "./components/GoodsRow";
import EvaluateRow from "./components/EvaluateRow";
const testImg =
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
const activeTab = ref("goods");

const handleTabChange = (e) => {
  activeTab.value = e;
};
</script>
<style lang="scss" scoped>
@import "assets/sass/var";

.user-banner {
  width: 100%;
  height: 130px;
  img {
    width: 100%;
    height: 100%;
  }
}

.user-details {
  margin-bottom: 40px;
  :deep(.arco-tabs-nav-tab) {
    padding-left: 320px;
    padding-top: 15px;
  }
  :deep(.arco-tabs-tab) {
    color: $grey-font-label;
    font-size: 16px;
  }
  :deep(.arco-tabs-nav-ink) {
    background-color: $main-pink;
  }
  :deep(.arco-tabs-tab-active, .arco-tabs-tab-active:hover) {
    color: $main-grey;
  }
  .extra-btn {
    :deep(.arco-btn) {
      width: 90px;
      border: 1px solid $main-grey;
      color: $main-grey;
    }
  }
}

.tab-content {
  display: flex;
  justify-content: space-between;
  .left-content {
    width: 300px;
    flex-shrink: 0;
    margin-right: 30px;
  }
  .right-content {
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    width: calc(100% - 340px);
    flex: auto;
    margin-top: 10px;
  }
}
</style>

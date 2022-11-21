<template>
  <div class="common-row global-content">
    <div class="user-banner">
      <img :src="testImg" alt="" srcset="" />
    </div>

    <div class="user-details">
      <a-tabs :active-key="activeTab" @change="handleTabChange">
        <a-tab-pane key="goods" :title="$t('pages.goods')"></a-tab-pane>
        <a-tab-pane key="evaluate" :title="$t('pages.evaluate')"></a-tab-pane>
        <a-tab-pane key="businessInformation" :title="$t('pages.businessInformation')">
        </a-tab-pane>
      </a-tabs>

      <a-row justify="end">
        <a-col flex="300px">
          <UserCard></UserCard>
        </a-col>
        <a-col flex="auto">
          <div class="right-content">
            <GoodsRow v-show="activeTab == 'goods'"></GoodsRow>
            <EvaluateRow v-show="activeTab == 'evaluate'"></EvaluateRow>
          </div>
        </a-col>
      </a-row>
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
  height: 180px;
  img {
    width: 100%;
    height: 100%;
  }
}

.user-details {
  :deep(.arco-tabs-nav-tab) {
    padding-left: 320px;
  }
  :deep(.arco-tabs-tab) {
    color: $grey-font-label;
  }
  :deep(.arco-tabs-nav-ink) {
    background-color: $main-pink;
  }
  :deep(.arco-tabs-tab-active, .arco-tabs-tab-active:hover) {
    color: $main-grey;
  }
}
</style>

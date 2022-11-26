<!---->
<template>
  <a-modal
    v-model:visible="visible"
    :title="$t('dataStatistics.dataStatisticsName')"
    :on-before-cancel="handleCancel"
    @before-ok="handleBeforeOk"
    unmount-on-close
    title-align="start"
    modal-class="click-rate-dialog"
    :footer="false"
  >
    <a-tabs v-model="activeTab">
      <a-tab-pane key="visitTimes" :title="$t('dataStatistics.visitTimes')">
        <div>
          {{ $t("dataStatistics.visitTimesTip") }}
        </div>
      </a-tab-pane>
      <a-tab-pane key="onlineShopData" :title="$t('dataStatistics.onlineShopData')">
        <div>

        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const visible = ref(false);
const activeTab = ref("visitTimes");
const openDialog = (type) => {
  visible.value = true;
};
const handleCancel = () => {
  visible.value = false;
};

defineExpose({
  openDialog,
  handleCancel,
});
</script>
<style lang="scss">
@import "assets/sass/var.scss";
.click-rate-dialog {
  width: 600px;
  .arco-modal-body {
    padding: 15px 25px;
  }
  .arco-modal-title {
    // font-size: 18px;
  }
  .arco-tabs-nav-tab-list {
    margin: auto;
  }
  .arco-tabs-tab-active {
    color: $main-pink;
  }
  .arco-tabs-nav-ink {
    background-color: $main-pink;
  }
  .arco-tabs-content {
    text-align: center;
  }
}
</style>

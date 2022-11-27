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
    <a-tabs v-model="activeTab" @change="changeTab">
      <a-tab-pane key="visitTimes" :title="$t('dataStatistics.visitTimes')">
        <div style="margin-top: 20px;">
          {{ $t("dataStatistics.visitTimesTip") }}
        </div>
      </a-tab-pane>
      <a-tab-pane key="onlineShopData" :title="$t('dataStatistics.onlineShopData')">
        <a-tabs type="rounded" class="sub-tab" v-model="activeOnlineTab" @change="changeOnline">
          <a-tab-pane key="exposure" :title="$t('dataStatistics.exposureName')">
            <div>
              {{ $t("dataStatistics.exposureSub") }}
            </div>
          </a-tab-pane>
          <a-tab-pane key="clickNumber" :title="$t('dataStatistics.clickNumber')">
            <div>
              {{ $t("dataStatistics.clickNumberSub") }}
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
    </a-tabs>
    <div class="chart-warp">
      <div id="echartBox" style="width: 100%; height: 300px"></div>
    </div>
  </a-modal>
</template>
<script setup>
const visible = ref(false);
const activeTab = ref("visitTimes");
const activeOnlineTab = ref("exposure");
const openDialog = (type) => {
  visible.value = true;
  nextTick(()=>{
    initEchart();
  })
};

// 重置
const handleCancel = () => {
  visible.value = false;
  activeTab.value = 'visitTimes'
  activeOnlineTab.value = 'exposure'
};

const changeTab = (e) => {
  activeTab.value = e;
};
const changeOnline = (e) => {
  activeOnlineTab.value = e;
};

const initEchart = () => {
  const chart = echarts.init(document.getElementById("echartBox"));
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "60%",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };
  chart.setOption(option);
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
  .sub-tab {
    .arco-tabs-tab-active {
      color: $main-grey;
    }
  }
}

.chart-warp{
    margin-top: -20px;
}
</style>

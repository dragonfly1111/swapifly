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
        <div style="margin-top: 20px">
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
import { getUserClicRate } from "~/api/shop";
const visible = ref(false);
const chart = ref(null);
const pageLoading = ref(true);
const activeTab = ref("visitTimes");
const activeOnlineTab = ref("exposure");
const router = useRouter();
const shoptotalList = ref([]);
const bgtotalList = ref([]);
const djbgtotalList = ref([]);
const openDialog = () => {
  visible.value = true;
  handleQuery();
};

const handleQuery = () => {
  pageLoading.value = true;
  getUserClicRate()
    .then((res) => {
      if (res.code == 0) {
        console.log("res", res.data);
        shoptotalList.value = res.data.shoptotal; // 訪問次數
        bgtotalList.value = res.data.product.bgtotal; // 曝光量
        djbgtotalList.value = res.data.product.djbgtotal; // 點擊次數
        nextTick(() => {
          initEchart(shoptotalList.value);
        });
      }
    })
    .finally(() => {
      pageLoading.value = false;
    });
};

// 重置
const handleCancel = () => {
  chart.value.dispose() // 销毁实例
  visible.value = false;
  activeTab.value = "visitTimes";
  activeOnlineTab.value = "exposure";
};

// 改变table
const changeTab = (e) => {
  activeTab.value = e;
  activeOnlineTab.value = "exposure";
  if(e == 'visitTimes'){
    initEchart(shoptotalList.value);
  }else{
    initEchart(bgtotalList.value);
  }
};
const changeOnline = (e) => {
  activeOnlineTab.value = e;
  if(e == "exposure"){
    initEchart(bgtotalList.value);
  }else{
    initEchart(djbgtotalList.value);
  }
};

useHead({
  // todo sdk 支持对语言
  script: [
    {
      'src': 'https://cdn.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.min.js', async: true, defer: true
    },
    {
      'src': 'https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js', async: true, defer: true
    },
  ]
})

const initEchart = (list) => {
  chart.value = echarts.init(document.getElementById("echartBox"));
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
        data: list.map((i) => i.date),
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
        type: "bar",
        barWidth: "60%",
        data: list.map((i) => i.total),
      },
    ],
  };
  chart.value.setOption(option);
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

.chart-warp {
  margin-top: -20px;
}
</style>

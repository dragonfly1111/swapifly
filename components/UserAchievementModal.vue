<template>
  <a-modal
    v-model:visible="visible"
    :title="$t('achievementModal.goodsReport')"
    :on-before-cancel="handleCancel"
    @before-ok="handleBeforeOk"
    unmount-on-close
    title-align="start"
    modal-class="achievement-dialog"
    :footer="false"
  >
    <a-skeleton :loading="pageLoading" animation>
      <a-row :gutter="20" class="my-row">
        <a-col :span="12">
          <a-skeleton-shape class="mb10" />
          <a-skeleton-line :rows="3" :line-height="20" />
        </a-col>
        <a-col :span="12">
          <a-skeleton-line :rows="2" :line-height="20" />
          <a-skeleton-line :line-height="300" />
        </a-col>
      </a-row>
    </a-skeleton>

    <a-row v-if="productInfo.product && !pageLoading" class="my-row">
      <a-col :span="12" class="left-box">
        <div class="goods-box">
          <a-image
            :src="baseImgPrefix + productInfo.product.image"
            show-loader
          ></a-image>
          <div class="goods-desc">
            <div>{{ productInfo.product.title }}</div>
            <div>
              HK${{ productInfo.product.price }} - {{ $t("achievementModal.publishAt") }} {{
                parseTime(productInfo.product.create_time, "{y}-{m}-{d}")
              }}
            </div>
          </div>
        </div>
        <div class="statistics-box">
          <div class="box-title">{{ $t("achievementModal.sevenDayReport") }}</div>
          <div class="statistics-content">
            <div class="statistics-item">
              <div>{{ productInfo.product.exposure_num }}</div>
              <div>{{ $t("achievementModal.exposuresNumber") }}</div>
            </div>
            <icon-left class="left-icon" />
            <div class="statistics-item">
              <div>{{ productInfo.product.click_num }}</div>
              <div>{{ $t("achievementModal.click") }}</div>
            </div>
            <icon-left class="left-icon" />
            <div class="statistics-item">
              <div>{{ productInfo.product.private_num }}</div>
              <div>{{ $t("achievementModal.whisper") }}</div>
            </div>
          </div>
        </div>
        <div class="refund-btn-pc">
          <a-button class="black-btn" @click="comfirmVisible = true">{{
            $t("achievementModal.exposureRefund")
          }}</a-button>
        </div>
      </a-col>
      <a-col :span="12">
        <a-tabs type="capsule" class="right-box" v-model="activeTab" @change="changeTab">
          <a-tab-pane key="1" :title="$t('achievementModal.exposuresNumber')">
            <div class="tab-title">
              {{ $t("achievementModal.exposureTip") }}
            </div>
            <div>
              <div id="exposureEchart" style="width: 100%; height: 260px"></div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" :title="$t('achievementModal.click')">
            <div class="tab-title">
              {{ $t("achievementModal.clickNumberTip") }}
            </div>
            <div>
              <div id="echartBox" style="width: 100%; height: 260px"></div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" :title="$t('achievementModal.whisper')">
            <div class="tab-title">
              {{ $t("achievementModal.whisperTip") }}
            </div>
            <div>
              <div id="whisperEchart" style="width: 100%; height: 260px"></div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
    <div class="refund-btn-m">
      <a-button class="black-btn" @click="comfirmVisible = true">{{
          $t("achievementModal.exposureRefund")
        }}</a-button>
    </div>
    <a-modal
      v-model:visible="comfirmVisible"
      title=""
      unmount-on-close
      title-align="center"
      modal-class="refund-comfirm-dialog"
      :footer="false"
    >
      <div class="dialog-title">
        <img src="@/assets/images/logo-long.png" alt="" />
      </div>
      <div class="dialog-content">
        <div class="title">{{ $t("achievementModal.refundTip") }}</div>
        <div class="sub">{{ $t("achievementModal.refundEmailTip") }}service@gmail.com</div>
        <a-button class="black-btn" @click="comfirmVisible = false">{{
          $t("pages.know")
        }}</a-button>
      </div>
    </a-modal>
  </a-modal>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { Message } from "@arco-design/web-vue";
import { getUserProductReport } from "~/api/shop";
import { parseTime } from "~/utils/time";

const { t } = useI18n();
const visible = ref(false);
const comfirmVisible = ref(false);
const pageLoading = ref(true);
const activeTab = ref("1");
const form = ref({});
const productInfo = ref({});
const appConfig = useAppConfig();
const baseImgPrefix = appConfig.baseImgPrefix;
const openDialog = (info) => {
  visible.value = true;
  form.value = info;
  handleQuery();
};
const handleQuery = () => {
  pageLoading.value = true;
  getUserProductReport(form.value.id)
    .then((res) => {
      productInfo.value = res.data;
      nextTick(() => {
        setTimeout(() => {
          // 解决dom未渲染
          initExposureChart();
        }, 200);
      });
    })
    .finally(() => {
      pageLoading.value = false;
    });
};
const handleCancel = () => {
  visible.value = false;
};

const changeTab = (e) => {
  switch (e) {
    case "1":
      initExposureChart();
      break;
    case "2":
      initClickEchart();
      break;
    case "3":
      initwhisperEchart();
      break;
  }
};

const initExposureChart = () => {
  const chart = echarts.init(document.getElementById("exposureEchart"));
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: [t("achievementModal.payExposure"), t("achievementModal.natureExposure")],
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
        data: productInfo.value.exposure.ffexposure.map((i) => i.date),
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
        name: t("achievementModal.payExposure"),
        type: "bar",
        data: productInfo.value.exposure.ffexposure.map((i) => i.total),
      },
      {
        name: t("achievementModal.natureExposure"),
        type: "bar",
        data: productInfo.value.exposure.zrexposure.map((i) => i.total),
      },
    ],
  };
  chart.setOption(option);
};

const initClickEchart = () => {
  barCharts(
    productInfo.value.click.map((i) => i.date),
    productInfo.value.click.map((i) => i.total),
    "echartBox"
  );
};
const initwhisperEchart = () => {
  barCharts(
    productInfo.value.private.map((i) => i.date),
    productInfo.value.private.map((i) => i.total),
    "whisperEchart"
  );
};

const barCharts = (x, y, dom) => {
  const chart = echarts.init(document.getElementById(dom));
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
        data: x,
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
        data: y,
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
.achievement-dialog {
  width: 750px;
  .mb10{
    margin-bottom: 10px;
  }
  .arco-modal-title {
    font-size: 20px;
    font-weight: 700;
  }
  .left-box {
    position: relative;
    padding: 10px;
    .goods-box {
      display: flex;
      padding-bottom: 20px;
      border-bottom: 1px solid $main-grey-border;
      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        margin-right: 10px;
      }
      .goods-desc {
        width: calc(100% - 60px);
        div:last-child {
          margin-top: 10px;
          font-size: 12px;
        }
      }
    }
    .statistics-box {
      .box-title {
        margin: 20px 0;
        font-size: 16px;
      }

      .statistics-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .statistics-item {
          text-align: center;
          width: 100px;

          div:first-child {
            font-size: 25px;
          }
        }
      }
      .left-icon {
        transform: rotate(180deg);
        margin: 5px 0;
      }
    }
  }
  .right-box {
    .arco-tabs-nav-tab-list {
      margin: auto;
      padding: 0;
      border: 1px solid $main-grey-border;
      .arco-tabs-tab {
        background-color: $main-white;
        padding: 4px 25px;
        &.arco-tabs-tab-active {
          background-color: $main-grey;
          color: $main-white;
        }
      }
    }
    .tab-title {
      text-align: center;
      margin: 10px auto 20px;
    }
  }
  .refund-btn-pc {
    margin-top: 100px;
    .black-btn {
      height: 36px;
    }
  }
  .refund-btn-m{
    display: none;
  }
}

.refund-comfirm-dialog {
  width: 400px;
  text-align: center;

  .arco-modal-header {
    border-bottom: none;
    display: none;
  }
  .dialog-title {
    img {
      width: 150px;
      margin: auto;
    }
  }
  .dialog-content {
    .title {
      font-size: 22px;
      margin: 20px auto;
    }
  }
  .black-btn {
    width: 70%;
    height: 40px;
    margin-top: 30px;
  }
}
</style>
<style lang="scss" >
@media screen and(max-width:1000px) {
  .achievement-dialog {
    top: 0;
    border-radius: 0;
    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    .right-box {
      .tab-title {
        margin: 24px auto 12px;
      }
    }
    .my-row{
      display: block;
      .arco-col-12{
        width: 100%;
      }
    }
    .refund-btn-pc {
      display: none;
    }
    .refund-btn-m{
      display: block;
      margin-top: 24px;
      .black-btn{
        width: 100%;
      }
    }
  }
}
</style>

<!---->
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
    <a-row>
      <a-col :span="12" class="left-box">
        <div class="goods-box">
          <img src="@/assets/images/logo-long.png" alt="" />
          <div class="goods-desc">
            <div>商品名称</div>
            <div>hk999 - 发布于2020-9-29</div>
          </div>
        </div>
        <div class="statistics-box">
          <div class="box-title">{{ $t("achievementModal.sevenDayReport") }}</div>
          <div class="statistics-content">
            <div class="statistics-item">
              <div>123</div>
              <div>{{ $t("achievementModal.exposuresNumber") }}</div>
            </div>
            <icon-left class="left-icon" />
            <div class="statistics-item">
              <div>123</div>
              <div>{{ $t("achievementModal.click") }}</div>
            </div>
            <icon-left class="left-icon" />
            <div class="statistics-item">
              <div>123</div>
              <div>{{ $t("achievementModal.whisper") }}</div>
            </div>
          </div>
        </div>
        <div class="refund-btn">
          <a-button class="black-btn" @click="comfirmVisible = true">{{
            $t("achievementModal.exposureRefund")
          }}</a-button>
        </div>
      </a-col>
      <a-col :span="12">
        <a-tabs type="capsule" class="right-box" v-model="activeTab">
          <a-tab-pane key="1" :title="$t('achievementModal.exposuresNumber')">
            <div class="tab-title">
              {{ $t("achievementModal.exposureTip") }}
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" :title="$t('achievementModal.click')">
            <div class="tab-title">
              {{ $t("achievementModal.clickNumerTip") }}
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" :title="$t('achievementModal.whisper')">
            <div class="tab-title">
              {{ $t("achievementModal.whisperTip") }}
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>

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
const { t } = useI18n();
const visible = ref(false);
const comfirmVisible = ref(false);
const activeTab = ref("1");
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
.achievement-dialog {
  width: 700px;
  .left-box {
    position: relative;
    padding: 10px;
    .goods-box {
      display: flex;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e5e5;
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
    .refund-btn {
      margin-top: 100px;
      .black-btn {
        height: 36px;
      }
    }
  }
  .right-box {
    .arco-tabs-nav-tab-list {
      margin: auto;
      padding: 0;
      border: 1px solid #e5e5e5;
      .arco-tabs-tab {
        background-color: #fff;
        padding: 4px 25px;
        &.arco-tabs-tab-active {
          background-color: $main-grey;
          color: #fff;
        }
      }
    }
    .tab-title {
      text-align: center;
      margin: 10px auto;
    }
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
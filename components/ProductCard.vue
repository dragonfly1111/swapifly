<template>
  <div>
    <a-skeleton :animation="true" :loading="pageLoading" line-height="50">
      <a-row justify="space-between">
        <a-col :span="5" v-for="item in 4" style="padding: 10px">
          <a-row align="center" :gutter="10">
            <a-col :span="6">
              <a-skeleton-shape shape="circle" size="small" />
            </a-col>
            <a-col :span="10">
              <a-skeleton-line :widths="100" />
            </a-col>
          </a-row>
          <div style="margin-top: 10px">
            <a-skeleton-line :lineHeight="200" />
          </div>
        </a-col>
      </a-row>
    </a-skeleton>

    <div class="goods-list" v-if="!isEmpty">
      <div class="recommend-item" v-for="(item, index) in 7" :style="{ width: props.cardWidth }">
        <div class="user-box" v-if="showUser">
          <img :src="testImg" alt="" />
          <div class="user-desc">
            <div>用户名称</div>
            <div class="time">一天前</div>
          </div>
        </div>
        <div class="product-img">
          <div class="img-box">
            <img :src="testImg" alt="" />
            <div class="status-box" v-if="showStatus">{{ $t("pages.soldOut") }}</div>
          </div>
          <div class="product-tag" v-if="index < 4">{{ $t("pages.recommendTag") }}</div>
        </div>
        <div class="product-desc">
          <div>商品名称</div>
          <div class="price">HK$999</div>
          <div class="desc">全新</div>
        </div>
        <div class="product-handle">
          <div>
            <icon-heart :strokeWidth="3" size="16" />
            <span>999</span>
          </div>
          <a-dropdown :popup-max-height="false">
            <a-button type="text"><icon-more-vertical :strokeWidth="6" size="18" /> </a-button>
            <template #content>
              <template v-if="!isMySelf">
                <a-doption @click="handleReport">{{ $t("pages.reportProduct") }}</a-doption>
              </template>
              <template v-if="isMySelf">
                <a-doption @click="handlRemove">{{ $t("pages.editGoods") }}</a-doption>
                <a-doption @click="openExposure">{{ $t("pages.exposureGoods") }}</a-doption>
                <a-doption @click="openAchievement">{{ $t("pages.viewtheResults") }}</a-doption>
                <a-doption @click="handlRemove">{{ $t("pages.removeGoods") }}</a-doption>
                <a-doption @click="handlRemove">{{ $t("pages.markSold") }}</a-doption>
                <a-doption @click="handlRemove">{{ $t("pages.delGoods") }}</a-doption>
              </template>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>

    <a-empty class="empty-box" v-if="isEmpty">
      <template #image>
        <img src="@/assets/images/icon/empty-goods.png" alt="" />
      </template>
      <a-space direction="vertical" fill size="medium">
        <div class="empty-tip">{{ $t("pages.goodsEmpty") }}</div>
        <div>{{ $t("pages.goodsEmptyTip") }}</div>
      </a-space>
    </a-empty>

    <ReportModal ref="reportModal"></ReportModal>

    <div v-if="isMySelf">
      <ExposurePayModal ref="exposurePayModal"></ExposurePayModal>
      <UserAchievementModal ref="userAchievementModal"></UserAchievementModal>
    </div>


  </div>
</template>
<script setup>
const props = defineProps({
  // card宽度
  cardWidth: {
    type: String,
    default: "24%",
  },
  // 是否展示用户头像
  showUser: {
    type: Boolean,
    default: true,
  },
  // 是否展示当前状态
  showStatus: {
    type: Boolean,
    default: false,
  },
  // 是否个人主页
  isMySelf: {
    type: Boolean,
    default: false,
  },
  // 是否空
  isEmpty: {
    type: Boolean,
    default: false,
  },
});
const testImg =
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
const reportModal = ref(null);
const exposurePayModal = ref(null);
const userAchievementModal = ref(null);
const pageLoading = ref(false);

// 举报
const handleReport = () => {
  reportModal.value.openDialog();
};
// 购买曝光率
const openExposure = () => {
  exposurePayModal.value.openDialog();
};
// 下架
const handlRemove = () => {};

const openAchievement = () =>{
  userAchievementModal.value.openDialog()
}
</script>
<style scoped lang="scss">
@import "assets/sass/var.scss";
.goods-list {
  display: flex;
  flex-wrap: wrap;
  //   grid-template-columns: repeat(auto-fill, 24%);
  grid-gap: 10px;
}
.recommend-item + .recommend-item {
}
.recommend-item {
  width: 24%;
  min-width: 180px;
  max-width: 310px;
  background: #fff;
  padding: 15px 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  color: #333333;
  cursor: pointer;
  &:last-child {
    margin-right: auto;
  }
  &:hover {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .user-box {
    display: flex;
    font-size: 12px;
    margin-bottom: 10px;
    img {
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 5px;
    }
    .user-desc {
      .time {
        margin-top: 2px;
        transform: scale(0.9);
      }
    }
  }
  .product-img {
    position: relative;
    margin-bottom: 10px;
    .img-box {
      width: 100%;
      // height: 40vw;
      // max-height: 280px;
      // min-height: 180px;
      border-radius: 2px;
      height: 0;
      padding-bottom: 100%;
      overflow: hidden;
      position: relative;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        position: absolute;
      }
      .status-box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #333333bc;
        color: #fff;
        padding: 8px 15px;
      }
    }

    .product-tag {
      background-color: $main-pink;
      color: #fff;
      padding: 5px 10px;
      border-radius: 2px;
      display: inline-block;
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 12px;
    }
  }
  .product-desc {
    div {
      margin-bottom: 5px;
    }
    .price {
      font-size: 18px;
    }
  }
  .product-handle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin-left: 3px;
    }
    .arco-btn {
      color: #333333;
      height: 20px;
      padding: 0;
    }
  }
}

.empty-box {
  color: $grey-font-label;
  font-size: 12px;
  margin-top: 10%;
  img {
    width: 100px;
    object-fit: contain;
  }
  .empty-tip {
    color: $main-grey;
    font-size: 18px;
  }
}

// 移动端
@media screen and(max-width:1000px) {
  .recommend-item {
    width: 48%;
    min-width: 150px;
  }
}
</style>

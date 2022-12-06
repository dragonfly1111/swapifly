<template>
  <div>
    <a-skeleton :animation="true" :loading="pageLoading" line-height="50">
      <a-row justify="space-between">
        <a-col :span="5" v-for="item in 8" style="padding: 10px">
          <a-row align="center" :gutter="20">
            <a-col :span="6">
              <a-skeleton-shape shape="circle" size="small" />
            </a-col>
            <a-col :span="13">
              <a-skeleton-line :widths="[120]" />
            </a-col>
          </a-row>
          <div style="margin-top: 10px">
            <a-skeleton-line :lineHeight="150" />
          </div>
        </a-col>
      </a-row>
    </a-skeleton>

    <div class="goods-list" v-if="list.length > 0">
      <div
        class="recommend-item"
        v-for="(item, index) in list"
        @click="$router.push('/goodsDetails?id=' + item.pid)"
      >
        <div class="user-box" v-if="showUser">
          <a-image :src="baseImgPrefix + item.image" fit="cover" show-loader>
            <template #loader>
              <div class="loader-animate" />
            </template>
          </a-image>
          <div class="user-desc">
            <div>用户名称</div>
            <div class="time">一天前</div>
          </div>
        </div>
        <div class="product-img">
          <div class="img-box">
            <img :src="baseImgPrefix + item.image" alt="" />
            <div class="status-box" v-if="showStatus && item.state > 1">
              {{ getStateLabel(item) }}
            </div>
          </div>
          <div class="product-tag" v-if="item.t_type == 1">{{ $t("pages.recommendTag") }}</div>
        </div>
        <div class="product-desc">
          <div>{{ item.title }}</div>
          <div class="price">HK${{ item.price }}</div>
          <div class="desc">{{ item.newold }}</div>
        </div>
        <div class="product-handle">
          <div>
            <icon-heart @click="likeProduct(item)" v-if="item.islike === 0" :strokeWidth="3" size="16" />
            <icon-heart-fill @click="likeProduct(item)" v-else style="color: #D43030" :strokeWidth="3" size="16" />
            <span>{{ item.like }}</span>
          </div>
          <a-dropdown :popup-max-height="false" @click.stop>
            <a-button type="text"><icon-more-vertical :strokeWidth="6" size="18" /> </a-button>
            <template #content>
              <template v-if="!isMySelf">
                <a-doption @click.stop="handleReport(item)">{{
                  $t("pages.reportProduct")
                }}</a-doption>
              </template>
              <template v-if="isMySelf">
                <a-doption @click.stop="handleEdit(item)">{{ $t("pages.editGoods") }}</a-doption>
                <a-doption @click.stop="openExposure(item)">{{
                  $t("pages.exposureGoods")
                }}</a-doption>
                <a-doption @click.stop="openAchievement(item)">{{
                  $t("pages.viewtheResults")
                }}</a-doption>
                <a-doption @click.stop="handleRemove(item)" v-if="item.state != 2">{{
                  item.state == 3 ? $t("pages.putawayGoods") : $t("pages.removeGoods")
                }}</a-doption>
                <a-doption @click.stop="handleMark(item)" v-if="item.state != 2">{{
                  $t("pages.markSold")
                }}</a-doption>
                <a-doption @click.stop="handleDelete(item)">{{ $t("pages.delGoods") }}</a-doption>
              </template>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>

    <a-empty class="empty-box" v-if="!pageLoading && !list.length">
      <template #image>
        <img src="@/assets/images/icon/empty-goods.png" alt="" />
      </template>
      <a-space direction="vertical" fill size="medium">
        <div class="empty-tip">{{ $t("pages.goodsEmpty") }}</div>
        <div>{{ $t("pages.goodsEmptyTip") }}</div>
      </a-space>
    </a-empty>

    <!-- 举报 -->
    <ReportModal ref="reportModal"></ReportModal>

    <div v-if="isMySelf">
      <ExposurePayModal ref="exposurePayModal"></ExposurePayModal>
      <UserAchievementModal ref="userAchievementModal"></UserAchievementModal>
    </div>
  </div>
</template>
<script setup>
import { baseImgPrefix } from "~/config/baseUrl";
import { Modal, Button, Message } from "@arco-design/web-vue";
import { deleteProduct, upanddownProduct } from "~/api/goods";
import { setSoldOut } from "~/api/dialogue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
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
  // 骨架屏
  pageLoading: {
    type: Boolean,
    default: true,
  },
});
const reportModal = ref(null);
const exposurePayModal = ref(null);
const userAchievementModal = ref(null);
const router = useRouter();
const emits = defineEmits(["change"]);
// 商品状态
const getStateLabel = (item) => {
  let stateOptions = {
    1: t("pages.onOffer"),
    2: t("pages.soldOut"),
    3: t("pages.isRemoveGoods"),
  };
  return stateOptions[item.state] || "";
};

// 举报
const handleReport = (item) => {
  reportModal.value.openDialog(item);
};
// 购买曝光率
const openExposure = (item) => {
  exposurePayModal.value.openDialog(32);
};
// 下架 //商品狀態，1.出售中，2.已售出，3已下架
const handleRemove = (item) => {
  let content = item.state == 3 ? t("pages.putawayGoodsTip") : t("pages.removeGoodsTip");
  Modal.info({
    content: content,
    closable: true,
    hideCancel: false,
    cancelText: t("pages.cancel"),
    okText: t("pages.confirm"),
    onBeforeOk: (done) => {
      upanddownProduct({ id: item.id, state: item.state == 3 ? 1 : 2 })
        .then((res) => {
          if (res.code === 0) {
            Message.success(res.message);
            emits("change");
          } else {
            Message.error(res.message);
          }
        })
        .finally(() => {
          done(true);
        });
    },
  });
};
// 删除
const handleDelete = (item) => {
  Modal.info({
    content: t("pages.delGoodsTip"),
    closable: true,
    hideCancel: false,
    cancelText: t("pages.cancel"),
    okText: t("pages.confirm"),
    onBeforeOk: (done) => {
      deleteProduct({ id: item.id })
        .then((res) => {
          if (res.code === 0) {
            Message.success(res.message);
            emits("change");
          } else {
            Message.error(res.message);
          }
        })
        .finally(() => {
          done(true);
        });
    },
  });
};
// 标记已售出
const handleMark = (item) => {
  Modal.info({
    content: t("pages.markSoldTip"),
    closable: true,
    hideCancel: false,
    cancelText: t("pages.cancel"),
    okText: t("pages.confirm"),
    onBeforeOk: (done) => {
      setSoldOut({ id: item.id })
        .then((res) => {
          if (res.code === 0) {
            Message.success(res.message);
            emits("change");
          } else {
            Message.error(res.message);
          }
        })
        .finally(() => {
          done(true);
        });
    },
  });
};

// 编辑商品
const handleEdit = (item) => {
  router.push("/saleEditGoods?id=" + item.id);
};
// like商品
const likeProduct = () => {
  if (!isMySelf) {
  }
};

const openAchievement = (item) => {
  userAchievementModal.value.openDialog(item);
};
onMounted(() => {
  // exposurePayModal.value.openDialog(32);
});
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
    :deep(.arco-image) {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 5px;
      img {
        height: 100%;
        width: 100%;
      }
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
    .arco-icon {
      cursor: pointer;
    }
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
</style>

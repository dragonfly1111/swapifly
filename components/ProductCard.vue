<template>
  <div>
    <a-skeleton :animation="true" :loading="pageLoading" line-height="50">
      <a-row justify="space-between">
        <a-col :span="resize.screenType === 'MOBILE' ? 12 : 5" v-for="item in (resize.screenType === 'MOBILE' ? 4 : 8)" style="padding: 10px">
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
        @click="toGoodsDetail(item.pid || item.id)"
      >
        <div class="user-box" v-if="showUser" @click.stop="toUserDetails(item)">
          <a-image :src="baseImgPrefix + item.avatar" fit="cover" show-loader :preview="false">
            <template #loader>
              <div class="loader-animate" />
            </template>
          </a-image>
          <div class="user-desc">
            <div>{{ item.nickname }}</div>
            <div class="time">{{ item.create_time }}</div>
          </div>
        </div>
        <div class="product-img">
          <div class="img-box">
            <img :src="baseImgPrefix + item.image" alt="" />
            <div class="status-box" v-if="(showStatus && item.state > 1 && (!item.delete_time || (item.delete_time && item.delete_time == 0)))">
              {{ getStateLabel(item) }}
            </div>
            <div class="status-box" v-if="(showStatus && item.delete_time > 0)">
              {{ $t('pages.deleted') }}
            </div>
          </div>
          <div class="product-tag" v-if="item.t_type == 1 || item.type == 1">{{ $t("pages.recommendTag") }}</div>
        </div>
        <div class="product-desc">
          <div>{{ item.title }}</div>
          <div class="price">HK${{ item.price }}</div>
          <div class="desc">{{ item.newold }}</div>
        </div>
        <div class="product-handle">
          <div class="like-box" @click.stop="likeProduct(item, index)">
            <icon-heart v-show="!item.islike" :strokeWidth="3" size="20" />
            <icon-heart-fill
              v-show="item.islike === 1"
              style="color: #d43030"
              :strokeWidth="3"
              size="20"
            />
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
                <a-doption @click.stop="handleRemove(item,index)" v-if="item.state != 2">{{
                  item.state == 3 ? $t("pages.putawayGoods") : $t("pages.removeGoods")
                }}</a-doption>
                <a-doption @click.stop="handleMark(item, index)" v-if="item.state != 2">{{
                  $t("pages.markSold")
                }}</a-doption>
                <a-doption @click.stop="handleDelete(item, index)">{{
                  $t("pages.delGoods")
                }}</a-doption>
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
    <!-- 商品封禁 -->
    <BlockModal ref="blockModal"></BlockModal>
    <div v-if="isMySelf">
      <ExposurePayModal ref="exposurePayModal"></ExposurePayModal>
      <UserAchievementModal ref="userAchievementModal"></UserAchievementModal>
    </div>
  </div>
</template>
<script setup>
import { Modal, Button, Message } from "@arco-design/web-vue";
import { deleteProduct, upanddownProduct, collectionProduct, getProductFj } from "~/api/goods";
import { setSoldOut } from "~/api/dialogue";
import { useUserInfo } from "~/stores/userInfo";
import { useResize } from '~/stores/resize'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const userInfo = useUserInfo();
const appConfig = useAppConfig();
const baseImgPrefix = appConfig.baseImgPrefix;
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
  // like是否需要确认框
  hasLikeConfirm: {
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
const blockModal = ref(null);
const exposurePayModal = ref(null);
const userAchievementModal = ref(null);
const router = useRouter();
const emits = defineEmits(["change", "update:list"]);
// 商品状态
const getStateLabel = (item) => {
  let stateOptions = {
    1: t("pages.onOffer"),
    2: t("pages.soldOut"),
    3: t("pages.isRemoveGoods"),
  };
  return stateOptions[item.state] || "";
};
const resize = useResize();
// 举报
const handleReport = (item) => {
  userInfo.checkLogin()
  reportModal.value.openDialog(item);
};
// 购买曝光率
const openExposure = (item) => {
  userInfo.checkLogin()
  exposurePayModal.value.openDialog(item.id);
};
// 下架 //商品狀態，1.出售中，2.已售出，3已下架
const handleRemove = (item,index) => {
  userInfo.checkLogin()
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
            let arr = [...props.list];
            arr[index].state = item.state == 3 ? 1 : 3
            emits("update:list", arr);
            // emits("change");
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
const handleDelete = (item, index) => {

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
const handleMark = (item,index) => {
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
            let arr = [...props.list];
            arr[index].state = 2 // 已售出
            emits("update:list", arr);
            // emits("change");
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

// 用户详情
const toUserDetails = (item) => {
  console.log(item)
  router.push("/userDetails?userId=" + item.uid);
};

// 编辑商品
const handleEdit = (item) => {
  router.push("/saleEditGoods?id=" + item.id);
};
// like商品
const likeProduct = (item, index) => {
  userInfo.checkLogin()
  if (props.hasLikeConfirm) {
    Modal.info({
      content: t("pages.likeConfirm"),
      closable: true,
      hideCancel: false,
      cancelText: t("pages.cancel"),
      okText: t("pages.confirm"),
      onBeforeOk: (done) => {
        handleLike(item, index);
        done(true);
      },
    });
  } else {
    handleLike(item, index);
  }
};

// 喜欢
const handleLike = (item, index) => {
  if (!userInfo.token) {
    userInfo.openDialog();
    // router.replace("/");
    return;
  }
  let reqParams = {
    id: item.pid || item.id,
    state: item.islike == 1 ? 2 : 1,
  };
  collectionProduct(reqParams).then((res) => {
    if (res.code === 0) {
      // Message.success(res.message);
      let arr = [...props.list];
      arr[index].islike = item.islike == 1 ? 0 : 1;
      arr[index].like = reqParams.state == 2 ? item.like - 1 : item.like + 1;
      emits("update:list", arr);
      emits("change", item, index);
    } else {
      Message.error(res.message);
    }
  });
};

// 商品详情
const toGoodsDetail = (id) => {
  // 判断封禁状态
  getProductFj(id).then((res) => {
    // type 1.自己，2他人
    // state 商品狀態，1.出售中，2.交易完成，3已下架
    if (res.code === 0) {
      if (res.data.status === 2) {
        // 打开封禁封禁弹窗
        blockModal.value.openDialog(2, res.data.type);
      } else if ((res.data.state === 2 || res.data.state === 3) && res.data.type === 2) {
        // 如果不是自己的商品 并且不是上架状态 打开非上架状态弹窗
        blockModal.value.openDialog(4);
      } else if(res.data.state === 4){
        // 如果数据已被删除 无乱是不是自己的 打开非上架弹窗
        blockModal.value.openDialog(4);
      } else if (res.data.status === 1) {
        router.push("/goodsDetails?id=" + id);
      }
    } else {
      Message.error(res.message);
    }
  });

};

const openAchievement = (item) => {
  userAchievementModal.value.openDialog(item);
};
onMounted(() => {
  // exposurePayModal.value.openDialog(32);
});
</script>

<style lang="scss">
div.arco-typography,
p.arco-typography {
  word-break: break-all;
}
</style>

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
  position: relative;
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
      width: 100%;
      div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 84%;
      }
      .time {
        margin-top: 2px;
        font-size: 12px;
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
    .like-box {
      padding-right: 10px;
      display: flex;
      align-items: center;
      span{
        padding-top: 1px;
      }
      &:hover {
        :deep(.arco-icon-heart) {
          display: none !important;
        }
        :deep(.arco-icon-heart-fill) {
          display: inline-block !important;
        }
      }
      &.active {
        &:hover {
          :deep(.arco-icon-heart) {
            display: inline-block !important;
          }
          :deep(.arco-icon-heart-fill) {
            display: none !important;
          }
        }
      }
    }
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
<style lang="scss" scoped>
@media screen and (max-width:1000px){
  .recommend-item {
    padding: 12px 4px;
  }

}
</style>

<template>
  <div class="common-row global-content">
    <AD v-if="resize.screenType !== 'MOBILE'" height="160px"></AD>

    <section class="section-wrapper goods-wrapper">
      <a-breadcrumb v-if="resize.screenType !== 'MOBILE'">
        <a-breadcrumb-item v-for="item in productInfo.rid">{{ item.title }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="section-content">
        <div class="goods-swiper">
          <!-- Swiper -->
          <div class="swiper mySwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in productInfo.images">
                <a-image width="100%" :src="baseImgPrefix + item" />
                <div
                  class="goods-tags"
                  v-if="productInfo.images.length < 3 && index == productInfo.images.length - 1"
                >
                  <a-space class="handle-header">
                    <a-button class="black-btn" @click="handleShare">分享</a-button>
                    <a-button class="black-btn">
                      <icon-heart-fill class="heart" v-if="productInfo.islike == 1" />
                      <icon-heart class="heart" v-if="productInfo.islike == 0" />
                      {{ productInfo.like }} like
                    </a-button>
                    <a-button class="black-btn" @click="handleReport">举报</a-button>
                  </a-space>
                  <div class="handle-bottom">
                    <a-button class="black-btn">{{ productInfo.images.length }} image</a-button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="productInfo.images.length >= 3" class="goods-tags">
              <a-space class="handle-header">
                <a-button class="black-btn" @click="handleShare">分享</a-button>
                <a-button class="black-btn">
                  <icon-heart-fill class="heart" v-if="productInfo.islike == 1" />
                  <icon-heart class="heart" v-if="productInfo.islike == 0" />
                  {{ productInfo.like }} like
                </a-button>
                <a-button class="black-btn" @click="handleReport">举报</a-button>
              </a-space>
              <div class="handle-bottom">
                <a-button class="black-btn">{{ productInfo.images.length }} image</a-button>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div>
            <div class="swiper-button-next swiper-button-next-self"></div>
            <div class="swiper-button-prev swiper-button-prev-self"></div>
          </div>
        </div>
        <a-breadcrumb v-if="resize.screenType === 'MOBILE'">
          <a-breadcrumb-item v-for="item in productInfo.rid">{{ item.title }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="goods-info">
          <div class="goods-info-body">
            <div class="goods-content">
              <div class="goods-name">{{ productInfo.title }}</div>
              <a-row justify="space-between" class="goods-desc">
                <a-col :span="resize.screenType === 'MOBILE'? 24 : 8" class="mobile-goods-detail">
                  <icon-common />
                  <span>{{ productInfo.newold }}</span>
                  <icon-info-circle />
                </a-col>
                <a-col :span="resize.screenType === 'MOBILE'? 24 : 8" class="mobile-goods-detail">
                  <icon-user-group />
                  <span v-if="productInfo.offline == 1" class="mr5">{{
                    $t("pages.handDeliver")
                  }}</span>
                  <span v-if="productInfo.mail == 1">{{ $t("pages.postAndCourier") }}</span>
                </a-col>
                <a-col :span="resize.screenType === 'MOBILE'? 24 : 8" class="mobile-goods-detail">
                  <icon-location />
                  <span>{{ productInfo.region }}</span>
                </a-col>
              </a-row>
              <a-typography>
                <a-typography-paragraph
                  :ellipsis="{
                    rows: 6,
                    expandable: true,
                  }"
                >
                  {{ productInfo.describe }}
                  <template #expand-node="{ expanded }">
                    {{ expanded ? $t("pages.expanded") : $t("pages.unfoldMore") }}
                  </template>
                </a-typography-paragraph>

                <a-typography-title :heading="4" class="mt30">{{
                  $t("pages.handDeliver")
                }}</a-typography-title>
                <a-typography-paragraph>
                  <div class="trade-type-item" v-for="item in productInfo.offline_address">
                    <a-space align="start" :strokeWidth="2">
                      <icon-location :size="18" />
                      <div>
                        <div>{{ item.title }}</div>
                        <div class="grey">{{ item.address }}</div>
                      </div>
                    </a-space>
                  </div>
                </a-typography-paragraph>
                <a-typography-title :heading="4" class="mt30" v-if="productInfo.mail == 1">{{
                  $t("pages.postAndCourier")
                }}</a-typography-title>
                <a-typography-paragraph class="grey" v-if="productInfo.mail_note">
                  {{ productInfo.mail_note }}
                </a-typography-paragraph>
              </a-typography>
              <div class="module-box">
                <a-divider orientation="left" class="module-header">{{
                  $t("pages.viewSeller")
                }}</a-divider>
                <a-row justify="space-between" :gutter="20">
                  <a-col flex="250px" class="seller-box">
                    <a-avatar :size="100">
                      <img alt="avatar" :src="baseImgPrefix + sellerInfo.avatar" />
                    </a-avatar>
                    <div class="seller-info">
                      <div class="seller-name">{{ sellerInfo.nickname }}</div>
                      <div class="grey">@{{ sellerInfo.realname }}</div>
                      <div class="fs12">
                        <span>joined</span>
                        <span>{{ sellerInfo.create_time }}</span>
                      </div>
                      <div class="fs12">{{ getRStateLabel() }}</div>
                      <div class="fs12" v-if="sellerInfo.email">
                        <img class="email-icon" src="@/assets/images/icon/email_black.png" />
                        <span>已验证</span>
                      </div>
                    </div>
                  </a-col>
                  <a-col flex="auto" class="comment-box">
                    <a-space class="comment-header">
                      <span>{{ sellerInfo.nickname }}</span>
                      <span>获得的评价</span>
                      <span class="fs12">{{ sellerInfo.stars }}</span>
                      <span><icon-star-fill /></span>
                      <span class="fs12">（{{ sellerInfo.e_num }}review）</span>
                    </a-space>
                    <EvaluateList
                      :list="eltlist"
                      :page-loading="pageLoading"
                      :showSource="false"
                      :showLine="false"
                    ></EvaluateList>
                    <a-link class="see-more-comment" @click="seeMoreComment" v-if="eltlist.length">
                      {{ $t("pages.viewAllComment") }}
                      <icon-left />
                    </a-link>
                  </a-col>
                </a-row>
              </div>
            </div>

            <!-- 用户信息 -->
            <div class="right-box" v-if="resize.screenType !== 'MOBILE'">
              <div class="user-card">
                <a-comment
                  :author="sellerInfo.nickname"
                  :datetime="'@' + sellerInfo.realname"
                  class="user-info"
                >
                  <template #content>
                    <span>{{ sellerInfo.stars }}</span>
                    <icon-star-fill :size="16" />
                    <span>（{{ sellerInfo.e_num }}review）</span>
                  </template>
                  <template #avatar>
                    <a-image
                      :width="50"
                      :height="50"
                      :src="baseImgPrefix + sellerInfo.avatar"
                      fit="cover"
                      show-loader
                      style="border-radius: 50%"
                    >
                      <template #loader>
                        <div class="loader-animate" />
                      </template>
                    </a-image>
                  </template>
                </a-comment>
                <a-button class="to-talk">{{ $t("pages.viewConversations") }}</a-button>
                <div class="center" v-if="!userInfo">
                  {{ $t("pages.shouldLoginTip") }}
                </div>
                <a-input-search
                  placeholder="HK$ "
                  :button-text="$t('pages.bid')"
                  search-button
                  class="bid-input"
                  v-if="userInfo && p_type == 1"
                />
                <!-- //商品狀態，1.出售中，2.已售出，3已下架 -->
                <div class="self-handle" v-if="userInfo && p_type == 2">
                  <a-space @click="handleEdit">
                    <icon-pen />
                    <span>{{ $t("pages.editGoods") }}</span>
                  </a-space>
                  <a-space v-if="productInfo.state == 1">
                    <label class="minus-icon">-</label>
                    <span>{{ $t("pages.removeGoods") }}</span>
                  </a-space>
                  <a-space v-if="productInfo.state == 3">
                    <icon-upload />
                    <span>{{ $t("pages.putawayGoods") }}</span>
                  </a-space>
                  <a-space class="pink">
                    <icon-delete />
                    <span>{{ $t("pages.delGoods") }}</span>
                  </a-space>
                </div>
              </div>
              <div class="achievement-card">
                <div>你的商品在過去7天被瀏覽了{{ productInfo.qday }}次</div>
                <a-button class="pink-btn" @click="openAchievement">{{
                  $t("pages.viewtheResults")
                }}</a-button>
              </div>
              <AD width="86%" height="560px"></AD>
            </div>
          </div>

          <div class="module-box">
            <a-divider orientation="left" class="module-header">{{
              $t("pages.similarGoods")
            }}</a-divider>
            <ProductCard :page-loading="pageLoading"></ProductCard>
          </div>

          <div class="see-more">
            <a-button type="outline">{{ $t("pages.seeMore") }}</a-button>
          </div>
        </div>
      </div>
    </section>

    <div class="mobile-footer-goods" v-if="resize.screenType === 'MOBILE'">
      <span class="icon-like-mobile">
        <icon-heart class="heart" v-if="productInfo.islike == 0" />
      {{ productInfo.like }} like
      </span>
      <a-button type="outline" @click="router.push('/dialogue')">{{$t('pages.viewConversations')}}</a-button>
      <a-button type="primary" style="margin:0px 20px;background-color: rgb(51, 51, 51)">{{$t('pages.bid')}}</a-button>
    </div>
    <!-- 举报 -->
    <ReportModal ref="reportModal"></ReportModal>

    <UserAchievementModal ref="userAchievementModal"></UserAchievementModal>

    <PageFooterLink></PageFooterLink>
  </div>
</template>

<script setup>
import { baseImgPrefix } from "~/config/baseUrl";
import EvaluateList from "@/pages/userDetails/components/EvaluateList.vue";
import { useUserInfo } from "~/stores/userInfo";
import { useResize } from "~/stores/resize";
import { getProductDetails, getSimilarlist } from "~/api/goods";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const resize = useResize();
const userInfo = computed(() => {
  // 传递函数
  return useUserInfo();
});
// 回复频率
const getRStateLabel = () => {
  let rStateOptions = {
    1: t("rState.efficient"),
    2: t("rState.goodEfficiency"),
    3: t("rState.notReplying"),
  };
  return rStateOptions[productInfo.value.r_state] || "";
};
const swiper = ref(null);
const pageLoading = ref(true);
const userAchievementModal = ref(null);
const reportModal = ref(null);
const p_type = ref(null);
const productInfo = ref({
  // 商品信息
  id: null,
  images: [],
});
const sellerInfo = ref({
  // 卖家信息
  id: null,
});
const eltlist = ref([]); // 评论
const images = [];

// 商品详情
const handleQuery = (id) => {
  pageLoading.value = true;
  getProductDetails(id)
    .then((res) => {
      if (res.code == 0) {
        p_type.value = res.data.p_type;
        productInfo.value = res.data.product;
        sellerInfo.value = res.data.seller;
        eltlist.value = res.data.eltlist;
        pageLoading.value = false;
      }
    })
    .finally(() => {});
};

// 举报
const handleReport = () => {
  reportModal.value.openDialog(productInfo.value.id);
};

// 编辑商品
const handleEdit = () => {
  router.push("/saleEditGoods?id=" + productInfo.value.id);
};

// 分享
const handleShare = () => {};
// 检视成果
const openAchievement = () => {
  userAchievementModal.value.openDialog(productInfo.value);
};

// 查看所有评价
const seeMoreComment = () => {
  router.push(`/userDetails?userId=${sellerInfo.value.id}&tab=evaluateRow`);
};
const initSwiper = () => {
  swiper.value = new Swiper(".mySwiper", {
    slidesPerView: resize.screenType === "MOBILE" ? 1 : 3,
    spaceBetween: 6,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-self",
      prevEl: ".swiper-button-prev-self",
    },
  });
};

onMounted(async () => {
  await nextTick();
  productInfo.value.id = router.currentRoute.value.query.id;
  handleQuery(router.currentRoute.value.query.id);
  setTimeout(() => {
    initSwiper();
  }, 500);
  window.onresize = function () {
    initSwiper();
  };
});
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";
@import "assets/sass/swiper.scss";

.grey {
  color: $grey-font-label;
}
.mt30 {
  margin-top: 30px;
}
.mobile-footer-goods{
  height: 32px;
  line-height: 40px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  border-top: 1px solid #ccc;
  background-color: #fff;
  text-align: right;
  padding: 10px 0;
  .icon-like-mobile{
    position: absolute;
    left: 0px;
  }
}
.section-wrapper {
  margin: 30px auto;
  :deep(.arco-breadcrumb-item) {
    color: $grey-font-label;
    cursor: pointer;
    &:hover {
      color: $main-grey;
    }
  }
  .section-content {
    .mySwiper {
      position: relative;
    }
    .goods-swiper {
      // height: 300px;
      position: relative;
      .swiper-slide {
        position: relative;
        .goods-tag {
          position: absolute;
          right: 10px;
          top: 0;
        }
      }
      .arco-image {
        height: 0;
        padding-bottom: 100%;
        cursor: pointer;
        background-color: #333;
        :deep(.arco-image-img) {
          object-fit: contain;
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
        }
      }
      .swiper-button-next-self,
      .swiper-button-prev-self {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        height: 50px;
        width: 50px;
        border-radius: 50%;
        font-weight: bold;
        background-color: #f2f2f2;
        z-index: 33;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          background-color: $main-grey;
          color: #fff;
        }
      }
      .swiper-button-prev-self {
        left: -10px;
      }
      .swiper-button-next-self {
        right: -10px;
      }
      .handle-header {
        position: absolute;
        top: 10px;
        right: 0;
        z-index: 33;
        :deep(.arco-space-item) {
          margin-right: 15px !important;
        }
      }
      .handle-bottom {
        position: absolute;
        bottom: 20px;
        right: 15px;
        z-index: 33;
      }
    }
  }
  .goods-content {
    width: calc(100% - 340px);
    :deep(.arco-typography-operation-expand) {
      display: block;
      margin: 10px 0;
    }
    .trade-type-item {
      margin-bottom: 18px;
    }
  }
  .goods-info {
    margin-top: 25px;
    .goods-info-body {
      display: flex;
      justify-content: space-between;
      .goods-content {
        flex: auto;
        margin-right: 40px;
      }
      .right-box {
        width: 340px
        ;
      }
    }
    .goods-name {
      font-size: 20px;
      height: 80px;
      margin-bottom: 10px;
    }
    .goods-desc {
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 20px;
      margin-bottom: 30px;
      .arco-col {
        display: flex;
        align-items: center;
        .arco-icon {
          font-size: 17px;
          flex-shrink: 0;
        }
        span {
          margin: 0 8px;
        }
      }
    }
    .module-box {
      margin-top: 60px;
      .module-header {
        margin: 40px 0;
      }
      :deep(.arco-divider-text-left) {
        left: 0;
        font-size: 24px;
      }
      .seller-box {
        display: flex;
        .arco-avatar {
          margin-right: 20px;
        }
        .seller-info {
          .seller-name{
            word-break: break-all;
          }
          div {
            margin-bottom: 11px;
            &:first-child,
            &:nth-child(2) {
              font-size: 16px;
            }
          }
          .email-icon {
            width: 18px;
            height: 18px;
            vertical-align: middle;
            margin-right: 3px;
          }
        }
      }
      .comment-box {
        .comment-header {
          margin-bottom: 20px;
        }
        .see-more-comment {
          .arco-icon {
            transform: rotate(180deg);
            color: #2a82e4;
          }
        }
      }
    }
  }

  .right-box {
    .user-card {
      border: 1px solid #e5e5e5;
      padding: 20px;
      border-radius: 2px;
      margin-bottom: 35px;
      .user-info {
        span {
          margin-right: 5px;
        }
      }

      .arco-icon-star-fill {
        color: #ffb400;
      }
      :deep(.arco-comment-title-align-left){
        // display: flex;
        // flex-wrap: wrap;
      }
      :deep(.arco-comment-author){
        font-size: 16px;
        display: inline-block;
      }
      :deep(.arco-comment-avatar) {
        margin-right: 8px;
      }
      .to-talk {
        color: #fff;
        width: 100%;
        background-color: $main-pink;
        height: 38px;
        margin: 15px 0 26px;
        &:hover {
          background-color: #f53991;
        }
      }
      .center {
        text-align: center;
        color: #2a82e4;
        cursor: pointer;
        font-size: 14px;
        &:hover {
          color: #0d4e99;
        }
      }
      .bid-input {
        margin-top: 20px;
        height: 44px;
        :deep(.arco-input-search-btn) {
          height: 44px;
          width: 80px;
          background-color: $main-pink;
          &:hover {
            background-color: #f53991;
          }
        }
      }
      .self-handle {
        .arco-space {
          display: flex;
          margin-bottom: 15px;
          cursor: pointer;
          &:last-child {
            margin-bottom: 0;
          }
          &:hover {
            color: $main-blue;
          }
          span {
            margin-left: 10px;
          }
        }
        .minus-icon {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pink {
          color: $main-pink;
        }
      }
    }
    .achievement-card {
      border: 1px solid #e5e5e5;
      border-radius: 2px;
      padding: 25px 20px 20px;
      margin-top: -10px;
      .pink-btn {
        width: 100%;
        background-color: $main-pink;
        color: #fff;
        height: 38px;
        margin-top: 22px;
        &:hover {
          background-color: #f53991;
        }
      }
    }
  }
}
</style>

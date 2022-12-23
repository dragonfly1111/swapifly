<template>
  <div class="goods-detail-root-class">
    <div class="common-row global-content">
      <!-- 手机端操作 -->
      <div class="mobile-extra-box" @click="drawerVisible = true" v-if="userInfo && p_type == 2"></div>

      <AD class="head-ad" height="160px" :advert="googleAd.content"></AD>

      <template v-if="pageLoading">
        <div>
          <a-skeleton :animation="true" :loading="pageLoading" class="skeleton">
            <div style="width: 100%">
              <a-skeleton-line :line-height="200" :line-spacing="10" />
            </div>
            <div style="height: 20px"></div>
            <div style="width: 60%; margin-right: 10%; display: inline-block">
              <a-skeleton-line :line-height="22" :rows="6" :line-spacing="10" />
            </div>
            <div style="width: 30%; display: inline-block">
              <a-skeleton-line :line-height="200" :line-spacing="10" />
            </div>
            <div style="height: 36px"></div>
            <div style="width: 70%">
              <a-skeleton-line :line-height="30" :rows="2" :line-spacing="10" />
            </div>
            <div style="height: 36px"></div>
            <div style="width: 70%; margin-bottom: 30px">
              <a-skeleton-line :line-height="22" :rows="2" :line-spacing="10" />
            </div>
          </a-skeleton>
        </div>
      </template>

      <template v-else>
        <section class="section-wrapper goods-wrapper">
          <a-breadcrumb class="pc-breadcrumb">
            <template #separator>
              <img src="@/assets/images/icon/breadcrumb-separator.png" alt="" />
            </template>
            <a-breadcrumb-item
                v-for="(item, index) in productInfo.rid"
                @click="toTypePage(item, index)"
            >{{ item.title }}</a-breadcrumb-item
            >
          </a-breadcrumb>
          <div class="section-content">
            <div class="goods-swiper">
              <swiper
                  :slidesPerView="resize.screenType === 'MOBILE' ? 1 : 3"
                  :spaceBetween="6"
                  :loop="false"
                  :navigation="false"
                  :modules="modules"
                  class="mySwiper swiper"
                  ref="swiperRef"
                  :class="(productInfo.images.length < 3 && (resize.screenType === 'PC')) ? 'less-3-swiper' : ''"
              >
                <swiper-slide
                    class="swiper-slide"
                    v-for="(item, index) in productInfo.images"
                    :key="index"
                >
                  <a-image height="350px" fit="cover" :src="baseImgPrefix + item" />
                </swiper-slide>
                <div class="goods-tags">
                  <a-space class="handle-header">
                    <a-button class="black-btn" @click="handleShare">{{
                        $t("pages.share")
                      }}</a-button>
                    <a-button class="black-btn" @click="handleLike">
                      <icon-heart-fill class="heart" v-if="productInfo.islike == 1" />
                      <icon-heart class="heart" v-if="productInfo.islike == 0" />
                      &nbsp{{ productInfo.like }} like
                    </a-button>
                    <a-button class="black-btn" @click="handleReport">{{
                        $t("pages.report")
                      }}</a-button>
                  </a-space>
                  <div class="handle-bottom">
                    <a-button class="black-btn" @click="previewAll"
                    >{{ productInfo.images.length }} image
                    </a-button>
                  </div>
                </div>
              </swiper>
              <!-- 分页 -->
              <div v-show="productInfo.images.length > 3 || (resize.screenType === 'MOBILE' && productInfo.images.length >= 2)">
                <div
                    class="swiper-button-next swiper-button-next-self"
                    @click="swiperRef.$el.swiper.slideNext()"
                ></div>
                <div
                    class="swiper-button-prev swiper-button-prev-self"
                    @click="swiperRef.$el.swiper.slidePrev()"
                ></div>
              </div>
            </div>
            <div class="page-body-content">
              <a-breadcrumb class="mobile-breadcrumb">
                <a-breadcrumb-item
                    v-for="(item, index) in productInfo.rid"
                    @click="toTypePage(item, index)"
                >{{ item.title }}</a-breadcrumb-item
                >
              </a-breadcrumb>
              <div class="goods-info">
                <div class="goods-info-body">
                  <div class="goods-content">
                    <div class="goods-name">
                      <div>{{ productInfo.title }}</div>
                      <h2>HK${{ productInfo.price }}</h2>
                    </div>
                    <a-row justify="space-between" class="goods-desc">
                      <a-col
                          :span="resize.screenType === 'MOBILE' ? 24 : 8"
                          class="mobile-goods-detail"
                      >
                        <icon-common />
                        <span>{{ productInfo.newold }}</span>
                        <icon-info-circle
                            style="cursor: pointer"
                            @click="newAndOldModal.openDialog()"
                        />
                      </a-col>
                      <a-col
                          :span="resize.screenType === 'MOBILE' ? 24 : 8"
                          class="mobile-goods-detail"
                      >
                        <icon-user-group />
                        <span v-if="productInfo.offline == 1" class="mr5">{{
                            $t("pages.handDeliver")
                          }}</span>
                        <span v-if="productInfo.mail == 1">{{ $t("pages.postAndCourier") }}</span>
                      </a-col>
                      <a-col
                          :span="resize.screenType === 'MOBILE' ? 24 : 8"
                          class="mobile-goods-detail"
                      >
                        <icon-location />
                        <span>{{ productInfo.region }}</span>
                      </a-col>
                    </a-row>
                    <a-typography>
                      <a-typography-paragraph
                          :ellipsis="{
                        rows: resize.screenType === 'MOBILE' ? 4 : 6,
                        expandable: true,
                      }"
                      >
                        {{ productInfo.describe }}
                        <template #expand-node="{ expanded }">
                          {{ expanded ? $t("pages.expanded") : $t("pages.unfoldMore") }}
                        </template>
                      </a-typography-paragraph>
                      <a-typography-title :heading="4" class="mt30"
                      >{{ $t("pages.handDeliver") }}
                      </a-typography-title>
                      <template v-if="productInfo.offline">
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
                      </template>
                      <template v-else>
                        <a-typography-paragraph class="grey">
                          {{ $t("pages.noHandDeliver") }}
                        </a-typography-paragraph>
                      </template>
                      <a-typography-title :heading="4" class="mt30"
                      >{{ $t("pages.postAndCourier") }}
                      </a-typography-title>
                      <template v-if="productInfo.mail == 1">
                        <a-typography-paragraph class="grey">
                          {{ productInfo.mail_note || $t("pages.noPostTip") }}
                        </a-typography-paragraph>
                      </template>
                      <template v-else>
                        <a-typography-paragraph class="grey">
                          {{ $t("pages.noPostAndCourier") }}
                        </a-typography-paragraph>
                      </template>
                    </a-typography>
                    <div class="module-box">
                      <a-divider orientation="left" class="module-header"
                      >{{ $t("pages.viewSeller") }}
                      </a-divider>
                      <a-row justify="space-between" :gutter="20">
                        <a-col flex="250px" class="seller-box">
                          <a-avatar :size="100">
                            <img
                                alt="avatar"
                                @click="toUserDetails(sellerInfo)"
                                :src="baseImgPrefix + sellerInfo.avatar"
                            />
                          </a-avatar>
                          <div class="seller-info">
                            <div class="seller-name" @click="toUserDetails(sellerInfo)">
                              {{ sellerInfo.nickname }}
                            </div>
                            <div class="grey">@{{ sellerInfo.realname }}</div>
                            <div class="fs12">
                              <span>joined</span>
                              <span>{{ sellerInfo.create_time }}</span>
                            </div>
                            <div class="fs12">{{ getRStateLabel() }}</div>
                            <div v-if="sellerInfo.email">
                              <a-space size="mini">
                                <img class="email-icon" src="@/assets/images/icon/email_black.png" />
                                <span class="fs12">{{ $t("pages.verified") }}</span>
                              </a-space>
                            </div>
                          </div>
                        </a-col>
                        <a-col flex="auto" class="comment-box">
                          <a-space class="comment-header">
                            <span>{{ sellerInfo.nickname }}</span>
                            <span>{{ $t("pages.reviews") }}</span>
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
                          <a-link
                              class="see-more-comment"
                              @click="seeMoreComment"
                              v-if="eltlist.length"
                          >
                            {{ $t("pages.viewAllComment") }}
                            <icon-left />
                          </a-link>
                        </a-col>
                      </a-row>
                    </div>
                  </div>
                  <!-- 用户信息 -->
                  <div class="right-box">
                    <div class="user-card">
                      <a-comment
                          :author="sellerInfo.nickname"
                          :datetime="'@' + sellerInfo.realname"
                          class="user-info"
                          @click="toUserDetails(sellerInfo)"
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
                              :preview="false"
                              style="border-radius: 50%"
                          >
                            <template #loader>
                              <div class="loader-animate" />
                            </template>
                          </a-image>
                        </template>
                      </a-comment>
                      <a-button class="to-talk" @click="handleDialogue">
                        {{ p_type == 2 ? $t("pages.viewConversations") : $t("pages.conversations") }}
                      </a-button>
                      <div class="center" v-if="!userInfo || !userInfo.id">
                        {{ $t("pages.shouldLoginTip") }}
                      </div>
                      <a-input-number
                          class="bid-input"
                          v-if="userInfo && p_type == 1"
                          v-model="price"
                          @press-enter="handleOfferchat"
                          :disabled="!userInfo || !userInfo.id"
                          :precision="2"
                      >
                        <template #prepend>
                          HK$
                        </template>
                        <template #append>
                          <a-button class="append" @click="handleOfferchat">{{ $t('pages.bid') }}</a-button>
                        </template>
                      </a-input-number>
                      <!-- //商品狀態，1.出售中，2.已售出，3已下架 -->
                      <div class="self-handle" v-if="userInfo && p_type == 2">
                        <a-space @click="handleEdit">
                          <icon-pen />
                          <span>{{ $t("pages.editGoods") }}</span>
                        </a-space>
                        <a-space v-if="productInfo.state == 1" @click="handleRemove">
                          <label class="minus-icon">-</label>
                          <span>{{ $t("pages.removeGoods") }}</span>
                        </a-space>
                        <a-space v-if="productInfo.state == 3" @click="handleRemove">
                          <icon-upload />
                          <span>{{ $t("pages.putawayGoods") }}</span>
                        </a-space>
                        <a-space class="pink" @click="handleDelete">
                          <icon-delete />
                          <span>{{ $t("pages.delGoods") }}</span>
                        </a-space>
                      </div>
                    </div>
                    <div class="achievement-card" v-if="userInfo && p_type == 2">
                      <div>
                        {{ $t("pages.last7days") }}{{ productInfo.qday }}{{ $t("pages.days") }}
                      </div>
                      <a-button class="pink-btn" @click="openAchievement"
                      >{{ $t("pages.viewtheResults") }}
                      </a-button>
                    </div>
                    <AD width="86%" height="560px" :advert="googleAd.content"></AD>
                  </div>
                </div>
                <!-- 相似商品 -->
                <div class="module-box">
                  <a-divider orientation="left" class="module-header"
                  >{{ $t("pages.similarGoods") }}
                  </a-divider>
                  <ProductCard :list="similar.list" :page-loading="pageLoading"></ProductCard>
                </div>
                <div class="see-more" v-if="similar.total > similar.list.length">
                  <a-button :loading="btnLoading" type="outline" @click="loadMoreSimilar"
                  >{{ $t("pages.seeMore") }}
                  </a-button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>

      <div class="mobile-footer">
        <div class="left">
          <a-space @click="handleLike" size="small">
            <icon-heart class="heart" v-if="productInfo.islike == 0" :size="18" />
            <icon-heart-fill class="heart" v-if="productInfo.islike == 1" :size="18" />
            <span>{{ productInfo.like }} like</span>
          </a-space>
        </div>
        <div class="right">
          <a-button type="primary" v-if="!openEditOffer" @click="handleDialogue">
            {{ p_type == 2 ? $t("pages.viewConversations") : $t("pages.conversations") }}
          </a-button>
          <a-input-number class="price-input" v-model="price" v-if="openEditOffer" :precision="2">
            <template #prepend>
              HK$
            </template>
          </a-input-number>
          <a-button type="primary" v-if="p_type == 1" @click="openOffer">{{
              $t("pages.bid")
            }}</a-button>
          <a-button type="primary" class="cancel-but" v-if="openEditOffer" @click="handleOfferClose"
          >{{ $t("dialogue.cancel") }}
          </a-button>
        </div>
      </div>

      <PageFooterLink />

      <!-- 举报 -->
      <ReportModal ref="reportModal"></ReportModal>

      <UserAchievementModal ref="userAchievementModal"></UserAchievementModal>

      <NewAndOldModal ref="newAndOldModal"></NewAndOldModal>

      <ShareModal ref="shareModal"></ShareModal>
      <!-- 商品封禁 -->
      <BlockModal ref="blockModal"></BlockModal>
      <!-- 预览所有图片 -->
      <client-only>
        <a-image-preview-group v-model:visible="previewVisible" infinite :srcList="allImages">
        </a-image-preview-group>
      </client-only>

      <!-- 移动端事件 -->
      <a-drawer
          width="100%"
          height="auto"
          :visible="drawerVisible"
          placement="bottom"
          unmountOnClose
          :header="false"
          class="drawer-box"
      >
        <div>
          <div class="drawer-item" @click="handleEdit">
            <icon-pen />
            <span>{{ $t("pages.editGoods") }}</span>
          </div>
          <div class="drawer-item" v-if="productInfo.state == 1" @click="handleRemove">
            <label class="minus-icon">-</label>
            <span>{{ $t("pages.removeGoods") }}</span>
          </div>
          <div class="drawer-item" v-if="productInfo.state == 3" @click="handleRemove">
            <icon-upload />
            <span>{{ $t("pages.putawayGoods") }}</span>
          </div>
          <div class="drawer-item pink" @click="handleDelete">
            <icon-delete />
            <span>{{ $t("pages.delGoods") }}</span>
          </div>
        </div>
        <template #footer>
          <a-button type="text" @click="drawerVisible = false">{{ $t("pages.cancel") }}</a-button>
        </template>
      </a-drawer>
    </div>
  </div>
</template>

<script setup>
import EvaluateList from "@/pages/userDetails/components/EvaluateList.vue";
import { useUserInfo } from "~/stores/userInfo";
import { useResize } from "~/stores/resize";
import {
  getProductDetails,
  getSimilarlist,
  deleteProduct,
  upanddownProduct,
  collectionProduct,
  offerchat,
  detailAD,
} from "~/api/goods";
import { toDialogue } from "~/api/dialogue";
import { useI18n } from "vue-i18n";
import { Modal, Message } from "@arco-design/web-vue";
// import Swiper, {Autoplay, Navigation} from 'swiper';
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
// import SwiperCore, { Autoplay, Navigation, Pagination, A11y } from "swiper";
const modules = [];

const { t } = useI18n();
const appConfig = useAppConfig();
const baseImgPrefix = appConfig.baseImgPrefix;
const router = useRouter();
const resize = useResize();
const userInfo = useUserInfo();
// 回复频率
const getRStateLabel = () => {
  let rStateOptions = {
    1: t("rState.efficient"),
    2: t("rState.goodEfficiency"),
    3: t("rState.notReplying"),
  };
  return rStateOptions[sellerInfo.value.r_state] || "";
};
const swiperRef = ref(null);
const newAndOldModal = ref(null);
const shareModal = ref(null);
const blockModal = ref(null);
const pageLoading = ref(true);
const btnLoading = ref(false);
const drawerVisible = ref(false);
const previewVisible = ref(false);
const openEditOffer = ref(false);
const allImages = ref([]);
const userAchievementModal = ref(null);
const googleAd = ref({});
const reportModal = ref(null);
const p_type = ref(null);
const price = ref(0); // 出价
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
const similar = ref({
  // 相似商品
  list: [],
  total: 0,
  params: {
    page: 1,
    limit: 8,
  },
});

// 服务端获取商品数据 设置分享属性
const product = await useAsyncData('product', () => getProductDetails(router.currentRoute.value.query.id))
const productRef = product.data.value.data.product
useHead({
  meta: [
    {
      hid: "og:url",
      name: "og:url",
      content: `${appConfig.domain}/swapifly/goodsDetails?id=${router.currentRoute.value.query.id}`,
    },
    {
      hid: "og:type",
      name: "og:type",
      content: 'website',
    },
    {
      hid: "og:title",
      name: "og:title",
      content: productRef.title,
    },
    {
      hid: "og:description",
      name: "og:description",
      content: productRef.describe,
    },
    {
      hid: "og:image",
      name: "og:image",
      content: 'https://swapifly.oss-cn-hongkong.aliyuncs.com/swapifly/20221214/33ace334be00e0cc59f31d471bcbef0f902387b4.jpg',
    },
    {
      hid: "og:image",
      name: "og:image",
      content: `${appConfig.baseImgPrefix}${productRef.images[0]}`,
    },
    {
      hid: "og:image:width",
      name: "og:image:width",
      content: 200,
    },
    {
      hid: "og:image:height",
      name: "og:image:height",
      content: 200,
    },
  ],
});

// 商品详情
const handleQuery = () => {
  getProductDetails(productInfo.value.id)
    .then((res) => {
      if (res.code == 0) {
        p_type.value = res.data.p_type;
        productInfo.value = res.data.product;
        sellerInfo.value = res.data.seller;
        eltlist.value = res.data.eltlist;
        const appConfig = useAppConfig();
        const arr = [];
        res.data.product.images.forEach((item) => {
          arr.push(baseImgPrefix + item);
        });
        allImages.value = arr;
        swiperRef.value && swiperRef.value.$el.swiper.update();
      } else if (res.code === 997) {
        blockModal.value.openDialog(3, 2);
      } else {
        Message.error(res.message);
      }
    })
    .finally(() => {
      setTimeout(() => {
        pageLoading.value = false;
      }, 200);
    });
};
// 广告
const getAD = () => {
  detailAD().then((res) => {
    googleAd.value = res.data;
  });
};
// 跳转分类
const toTypePage = (e, index) => {
  // router.push({
  //   path: '/goodsList',
  //   query: {
  //     id: e.id,
  //     level: index +1
  //   }
  // })
};
// 相似商品
const querySimilarlist = (flag = true) => {
  var reqParams = {
    id: productInfo.value.id,
    ...similar.value.params,
  };
  btnLoading.value = true;
  getSimilarlist(reqParams)
    .then((res) => {
      if (res.code == 0) {
        if(flag){
          similar.value.list = similar.value.list.concat(res.data.data);
        } else {
          similar.value.list = res.data.data;
        }
        similar.value.total = res.data.total;
      }
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

// 加载更多
const loadMoreSimilar = () => {
  similar.value.params.page++;
  querySimilarlist();
};

// 查看对话
const handleDialogue = () => {
  if (!userInfo.checkLogin()) return;
  if(p_type.value == 2){
    // 如果是自己的 直接跳到对话列表
    if (resize.screenType === "MOBILE") {
      router.push(`/dialogue/mobile`);
    } else {
      router.push("/dialogue");
    }
  } else {
    toDialogue(productInfo.value.id).then((res) => {
      if (res.code === 0) {
        if (resize.screenType === "MOBILE") {
          router.push(`/dialogue/chatDetail?id=${res.data.id}`);
        } else {
          router.push("/dialogue");
        }
      }
    });
  }

};

// 出价
const handleOfferchat = () => {
  console.log(1231)
  if (!userInfo.checkLogin()) return;
  offerchat({
    id: productInfo.value.id,
    price: price.value,
  }).then((res) => {
    if (res.code == 0) {
      router.push("/dialogue");
    } else {
      Message.error(res.message);
    }
  });
};

// 举报
const handleReport = () => {
  if (!userInfo.checkLogin()) return;
  reportModal.value.openDialog(productInfo.value);
};

// 查看所有图片
const previewAll = () => {
  previewVisible.value = true;
};

// 编辑商品
const handleEdit = () => {
  router.push("/saleEditGoods?id=" + productInfo.value.id);
};

// 删除
const handleDelete = () => {
  Modal.info({
    content: t("pages.delGoodsTip"),
    closable: true,
    hideCancel: false,
    cancelText: t("pages.cancel"),
    okText: t("pages.confirm"),
    onBeforeOk: (done) => {
      deleteProduct({ id: productInfo.value.id })
        .then((res) => {
          if (res.code === 0) {
            Message.success(res.message);
            router.push("/userDetails?userId=" + sellerInfo.value.id);
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

// 下架 //商品狀態，1.出售中，2.已售出，3已下架
const handleRemove = () => {
  let item = productInfo.value;
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
            handleQuery();
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

// 喜欢
const handleLike = () => {
  if (!userInfo.checkLogin()) return;
  let reqParams = {
    id: productInfo.value.id,
    state: productInfo.value.islike == 1 ? 2 : 1,
  };
  collectionProduct(reqParams).then((res) => {
    if (res.code === 0) {
      Message.success(res.message);
      let { like } = productInfo.value;
      productInfo.value.like = productInfo.value.islike == 1 ? like - 1 : like + 1;
      productInfo.value.islike = productInfo.value.islike == 1 ? 0 : 1;
      // handleQuery()
    } else {
      Message.error(res.message);
    }
  });
};

// 分享
const handleShare = () => {
  shareModal.value.openDialog(productInfo.value);
};

// 检视成果
const openAchievement = () => {
  userAchievementModal.value.openDialog(productInfo.value);
};

// 查看所有评价
const seeMoreComment = () => {
  router.push(`/userDetails?userId=${sellerInfo.value.id}&tab=evaluateRow`);
};

// 用户详情
const toUserDetails = (item) => {
  router.push("/userDetails?userId=" + item.id);
};

// 移动端出价
const openOffer = () => {
  if (!userInfo.checkLogin()) return;
  if (!openEditOffer.value) {
    openEditOffer.value = true;
  } else {
    offerchat({
      id: productInfo.value.id,
      price: price.value,
    }).then((res) => {
      if (res.code == 0) {
        router.push(`/dialogue/chatDetail?id=${res.data.id}`);
      } else {
        Message.error(res.message);
      }
    });
  }
};

// 移动端取消出价
const handleOfferClose = () => {
  openEditOffer.value = false;
  price.value = 0;
};

const initSwiper = () => {
  swiperRef.value = new Swiper(".mySwiper", {
    slidesPerView: resize.screenType === "MOBILE" ? 1 : 3,
    spaceBetween: 6,
    observeParents: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

const initData = () => {
  productInfo.value.id = router.currentRoute.value.query.id;
  similar.value.params.page = 1;
  pageLoading.value = true;
  handleQuery();
  getAD();
  querySimilarlist(false);
};

watch(
  () => router.currentRoute.value.query.id,
  (newValue, oldValue) => {
    if (router.currentRoute.value.path == "/goodsDetails" && newValue !== oldValue) {
      initData();
      window.scrollTo(0, 0);
    }
  }
);

onMounted(async () => {
  await nextTick();
  initData();
});
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";
//@import "assets/sass/swiper.scss";
.goods-detail-root-class{
  .global-content{
    .grey {
      color: $grey-font-label;
    }
    .mt30 {
      margin-top: 30px;
    }
    .head-ad {
      display: block;
    }
    .section-wrapper {
      margin: 30px auto;

      :deep(.arco-breadcrumb-item) {
        color: $grey-font-label;
      }

      .section-content {
        .mySwiper {
          position: relative;
        }

        .goods-swiper {
          height: 350px;
          position: relative;

          .swiper-wrapper {
            height: 350px;
          }

          .less-3-swiper {
            background: #cccccc7f;
            display: flex;
            justify-content: center;

            :deep(.swiper-wrapper) {
              justify-content: center;
            }
          }

          .swiper-button-next,
          .swiper-button-prev {
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

            &::after {
              font-size: 14px;
              color: $main-grey;
            }

            &:hover {
              background-color: $main-grey;
              color: $main-white;

              &::after {
                font-size: 14px;
                color: $main-white;
              }
            }
          }

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
            //padding-bottom: 100%;
            cursor: pointer;
            //background-color: #333;
            width: 100%;

            :deep(.arco-image-img) {
              position: absolute;
              //height: 100%;
              width: 100%;
              top: 0;
              left: 0;
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

            :deep(.arco-icon-heart-fill) {
              color: $main-pink;
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
            width: 340px;
          }
        }

        .goods-name {
          font-size: 20px;
          height: 80px;
          margin-bottom: 10px;

          h2 {
            margin: 8px 0;
          }
        }

        .goods-desc {
          border-bottom: 1px solid $main-grey-border;
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
            padding-left: 0;
          }

          .seller-box {
            display: flex;

            .arco-avatar {
              margin-right: 20px;
              cursor: pointer;
              flex-shrink: 0;
            }

            .seller-info {
              .seller-name {
                cursor: pointer;
                word-break: break-all;
                max-width: 10vw;
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
              }
            }
          }

          .comment-box {
            display: block;
            .comment-header {
              margin-bottom: 20px;
            }

            .see-more-comment {
              .arco-icon {
                transform: rotate(180deg);
                color: $main-blue;
              }
            }
          }
        }
      }

      .right-box {
        .user-card {
          border: 1px solid $main-grey-border;
          padding: 20px;
          border-radius: 2px;
          margin-bottom: 35px;

          .user-info {
            cursor: pointer;

            span {
              margin-right: 5px;
            }
          }

          .arco-icon-star-fill {
            color: #ffb400;
          }

          :deep(.arco-comment-author) {
            font-size: 16px;
            display: inline-block;
          }

          :deep(.arco-comment-avatar) {
            margin-right: 8px;
          }

          .to-talk {
            color: $main-white;
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
            color: $main-blue;
            cursor: pointer;
            font-size: 14px;

            &:hover {
              color: #0d4e99;
            }
          }

          .bid-input {
            margin-top: 20px;
            height: 44px;
            .append{
              cursor: pointer;
              height: 44px;
              width: 80px;
              color: $main-white;
              background-color: $main-pink;
              border-radius: 0;
              &:hover {
                background-color: #f53991;
              }
            }
            :deep(.arco-input-append) {
              padding: 0;
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
          border: 1px solid $main-grey-border;
          border-radius: 2px;
          padding: 25px 20px 20px;
          margin-top: -10px;

          .pink-btn {
            width: 100%;
            background-color: $main-pink;
            color: $main-white;
            height: 38px;
            margin-top: 22px;

            &:hover {
              background-color: #f53991;
            }
          }
        }
      }
    }
    .pc-breadcrumb {
    }
    .mobile-breadcrumb {
      display: none;
    }
  }
}


</style>
<style lang="scss">
@import "assets/sass/var.scss";
//@import "assets/sass/swiper.scss";
@media screen and (min-width:1001px) {
  .mobile-footer {
    display: none;
  }
}
@media screen and (max-width: 1000px) {
  .goods-detail-root-class{
    .global-content{
      .mobile-extra-box {
        position: fixed;
        top: 10px;
        right: 0;
        width: 40px;
        height: 40px;
        z-index: 999;
      }
      .head-ad {
        display: none !important;
      }
      .section-wrapper {
        margin: 0 !important;
        :deep(.swiper-wrapper) {
          justify-content: start !important;
        }
        .goods-info {
          .module-box {
            width: 100%;
            .seller-box {
              :deep(.arco-avatar) {
                width: 80px !important;
                height: 80px !important;
                flex-shrink: 0;
              }
              .seller-info {
                .seller-name {
                  max-width: 100% !important;
                }
              }
            }
            .comment-box {
              display: none !important;
            }
          }
          .goods-name {
            height: auto !important;
            margin-bottom: 20px !important;
            h2 {
              font-size: 22px !important;
            }
          }
          .goods-info-body {
            display: block !important;
          }
          .goods-content {
            width: 100% !important;
          }
        }
        .right-box {
          display: none !important;
        }
        .section-content {
          .goods-swiper {
            .swiper-button-prev-self {
              left: 10px !important;
              &:hover{
                background: #f2f2f2 !important;
                &:after{
                  color: $main-grey !important;
                }
              }
            }

            .swiper-button-next-self {
              right: 10px !important;
              &:hover{
                background: #f2f2f2 !important;
                &:after{
                  color: $main-grey !important;
                }
              }
            }
          }
        }

      }
      .skeleton {
        padding: 0 20px !important;
      }
      .pc-breadcrumb {
        display: none !important;
      }
      .mobile-breadcrumb {
        display: block !important;
      }
      .page-body-content {
        margin: 20px !important;
      }
      .mobile-footer {
        display: flex !important;
        justify-content: space-between;
        align-items: center;
        height: 36px;
        line-height: 36px;
        width: calc(100vw - 30px);
        position: fixed;
        bottom: 0;
        z-index: 3;
        border-top: 1px solid #ccc;
        background-color: $main-white;
        padding: 10px 15px;
        left: 0;
        .arco-icon-heart-fill {
              color: $main-pink;
        }

        .arco-btn {
          background: $main-pink;
          //padding: 0 25px;
        }

        .arco-btn + .arco-btn {
          margin-left: 12px;
        }

        :deep(.arco-icon-heart-fill) {
          color: $main-pink;
        }
        .cancel-but {
          background: $main-grey;
          color: $main-white;
        }
        .left {
          flex-shrink: 0;
        }
        .right {
          margin-left: 24px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .price-input{
            height: 32px;
            margin-right: 12px;
            .arco-input-prepend{
              padding: 0 5px;
            }
          }
        }
      }
      .page-footer-link {
        padding: 20px !important;
      }
      .mobile-goods-detail {
        padding: 10px 0 !important;
      }
    }
    .common-row {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }

}
</style>
<style lang="scss">
@import "assets/sass/var.scss";
.drawer-box {
  .arco-drawer-body {
    padding: 0;
  }
  .drawer-item {
    width: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 20px 30px;
    box-sizing: border-box;
    border-bottom: 1px solid $main-grey-border;
    .arco-icon {
      font-size: 20px;
      flex-shrink: 0;
      margin-right: 10px;
    }
    .minus-icon {
      font-size: 22px;
      margin-right: 18px;
    }
  }
  .pink {
    color: $main-pink;
  }
  .arco-drawer-footer {
    text-align: center;
    .arco-btn {
      font-size: 16px;
      width: 100%;
      color: $main-grey;
    }
  }
}
</style>

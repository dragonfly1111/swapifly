<template>
  <div class="common-row global-content">
    <div class="banner-wrapper">
      <template v-if="bannerLoading">
        <div>
          <a-skeleton :animation="true">
            <a-skeleton-line :rows="1" :line-height="260" />
          </a-skeleton>
        </div>
      </template>
      <template v-if="!bannerLoading">
        <div class="swiper-box">
          <swiper
            :slidesPerView="1"
            :loop="true"
            :navigation="false"
            :autoplay="{
              delay: 4000,
            }"
            :modules="[Autoplay]"
            class="my-swiper swiper"
            ref="swiperRef"
          >
            <swiper-slide class="swiper-slide" v-for="(item, index) in bannerList" :key="index">
              <a-image
                show-loader
                fit="cover"
                @click.native="openLink(item)"
                height="100%"
                width="100%"
                :preview="false"
                :src="baseImgPrefix + (resize.screenType === 'MOBILE' ? item.img_m : item.img)"
                class="carousel-img"
              >
                <template #loader>
                  <div class="loader-animate" />
                </template>
              </a-image>
            </swiper-slide>
          </swiper>
          <div v-show="bannerList.length > 2 && resize.screenType !== 'MOBILE'">
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
        <!--
        <a-carousel :auto-play="true" indicator-type="dot" :animation-name="resize.screenType === 'PC' ? 'fade' : 'slide'">
          <a-carousel-item v-for="item in bannerList">
            <a-image show-loader fit="cover" @click.native="openLink(item)" height="100%" width="100%" :preview="false"
                     :src="baseImgPrefix + (resize.screenType === 'MOBILE' ? item.img_m : item.img)" class="carousel-img">
              <template #loader>
                <div class="loader-animate"/>
              </template>
            </a-image>
          </a-carousel-item>
        </a-carousel> -->
      </template>
    </div>
    <section class="section-wrapper">
      <h3 class="section-header">{{ $t("pages.hotBrands") }}</h3>
      <div class="section-content section-content-pc">
        <template v-if="bradLoading">
          <div class="brands-content">
            <div v-for="item in 12" class="brands-item">
              <a-skeleton :animation="true">
                <a-skeleton-shape shape="circle"/>
                <div style="height: 5px"></div>
                <a-skeleton-line :rows="1" :widths="[80]" :line-height="21"/>
              </a-skeleton>
            </div>
          </div>
        </template>
        <template v-else>
          <div v-if="curBradPage > 0" class="arrow arrow-left" @click="bradChangePage('pre')">
            <img src="@/assets/images/icon/arrow-right-bg-b.png" alt=""/>
          </div>
          <div class="brands-content">
            <div v-for="item in hotBradList" @click="toSearch(item)" class="brands-item">
              <a-image class="pc-img" :preview="false" :width="80" :height="80" :src="baseImgPrefix + item.img" alt="" show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <div class="brands-title">{{ item.title }}</div>
            </div>
          </div>
          <div v-if="bradNextShow" class="arrow arrow-right" @click="bradChangePage('next')">
            <img src="@/assets/images/icon/arrow-right-bg-b.png" alt=""/>
          </div>
        </template>
      </div>
      <div class="section-content section-content-m">
        <template v-if="bradLoading">
          <div>
            <div class="brands-content">
              <div v-for="item in 12" class="brands-item">
                <a-skeleton :animation="true">
                  <a-skeleton-shape shape="circle"/>
                  <div style="height: 5px"></div>
                  <a-skeleton-line :rows="1" :widths="[55]" :line-height="21"/>
                </a-skeleton>
              </div>
            </div>
            <div style="height: 12px;"></div>
            <div class="brands-content">
              <div v-for="item in 12" class="brands-item">
                <a-skeleton :animation="true">
                  <a-skeleton-shape shape="circle"/>
                  <div style="height: 5px"></div>
                  <a-skeleton-line :rows="1" :widths="[55]" :line-height="21"/>
                </a-skeleton>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="brands-content">
            <div v-for="(item, index) in hotBradListTop" @click="toSearch(item)" class="brands-item">
              <a-image class="m-image" :preview="false" :width="55" :height="55" :src="baseImgPrefix + item.img" alt="" show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <div class="brands-title">{{ item.title }}</div>
            </div>
          </div>
          <div style="height: 12px;"></div>
          <div class="brands-content">
            <div v-for="(item, index) in hotBradListBottom" @click="toSearch(item)" class="brands-item">
              <a-image class="m-image" :preview="false" :width="55" :height="55" :src="baseImgPrefix + item.img" alt="" show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <div class="brands-title">{{ item.title }}</div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <section class="section-wrapper recommend-wrapper">
      <h3 class="section-header1">{{ $t("pages.recommendTitle") }}</h3>
      <div class="section-content">
        <ProductCard :list="productList" :pageLoading="productLoading"></ProductCard>
      </div>
    </section>

    <AD :advert="googleAd.content"></AD>
    <div class="see-more" v-if="page < lastPage && productList.length > 0">
      <a-button type="outline" @click="loadMore" :loading="butLoading">{{
        $t("pages.seeMore")
      }}</a-button>
    </div>

    <PageFooterLink></PageFooterLink>
    <!--    <LoginModal ref="loginModal" @toRegister="toRegister" @toForget="toForget"></LoginModal>-->
    <!--    <RegisterModal ref="registerModal" @toLogin="toLogin" @toPreference="toPreference"></RegisterModal>-->
    <!--    <ChoosePreference ref="choosePreference" @confirmPreference="confirmPreference"></ChoosePreference>-->
    <!--    <ResetPwd ref="resetPwdModal" @toLogin="toLogin"></ResetPwd>-->
  </div>
</template>

<script setup>
import { getHotBrad, getProductList } from "~/api/goods";
import { getHomeAdvert } from "~/api/ad";
import { useUserInfo } from "~/stores/userInfo";
import { Message } from "@arco-design/web-vue";
import { watch } from "vue";
import { useResize } from "~/stores/resize";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, Navigation, Pagination, A11y } from "swiper";

const router = useRouter()
const route = useRoute()
const runtimeConfig = useRuntimeConfig();
const app = useAppConfig()
const baseImgPrefix =  runtimeConfig.VITE_OSS_PREFIX
const resize = useResize()

// const loginModal = ref(null)
// const registerModal = ref(null)
// const choosePreference = ref(null)
// const resetPwdModal = ref(null)

const bannerLoading = ref(true);
const bradLoading = ref(true);
const productLoading = ref(true);
const butLoading = ref(false);

const swiperRef = ref(null);
const googleAd = ref({});
const bannerList = ref([]);
const productList = ref([]);
const hotBradList = ref([]);

const bradNextShow = ref(true);
const curBradPage = ref(0);
const page = ref(1);
const lastPage = ref(999);

const userInfo = useUserInfo();
const openLink = (e) => {
  console.log(e);
  if (!e.link) return;
  window.open(e.link, "_blank");
};
// const toRegister = () => {
//   loginModal.value.handleCancel()
//   registerModal.value.openDialog()
// }
// const toForget = (e) => {
//   loginModal.value.handleCancel()
//   console.log(e)
//   resetPwdModal.value.openDialog(e)
// }
// const toLogin = () => {
//   registerModal.value.handleCancel()
//   loginModal.value.openDialog()
// }
// const toPreference = () => {
//   choosePreference.value.openDialog()
// }
const toSearch = (item) => {
  router.push({
    path: "/searchResult",
    query: {
      keyword: item.title,
    },
  });
};

const bradChangePage = (type) => {
  const ele = document.getElementsByClassName("brands-content")[0];
  console.log(ele, type);
  if (type === "next") {
    curBradPage.value++;
  } else {
    curBradPage.value--;
  }
  console.log(curBradPage.value);
  const toLeft = ele.clientWidth * curBradPage.value;
  ele.scrollTo({
    left: toLeft,
    behavior: "smooth",
  });
  if (toLeft + ele.clientWidth >= ele.scrollWidth) {
    bradNextShow.value = false;
  } else {
    bradNextShow.value = true;
  }
};

// 获取banner和谷歌广告
const getBanner = () => {
  bannerLoading.value = true;
  getHomeAdvert().then((res) => {
    bannerLoading.value = false;
    if (res.code === 0) {
      nextTick(() => {
        bannerList.value = res.data.home_advert;
        googleAd.value = res.data.google_advert;
        swiperRef.value && swiperRef.value.$el.swiper.update();
      });
    } else {
      Message.error(res.message)
    }
  })
}
// 获取热门品牌
const getBrad = () => {
  bradLoading.value = true
  getHotBrad().then(res => {
    bradLoading.value = false
    if (res.code === 0) {
      hotBradList.value = res.data
      if (process.client) {
        nextTick(() => {
          // 判断是否需要出现下一页
          const ele = document.getElementsByClassName("brands-content")[0];
          const toLeft = ele.clientWidth * curBradPage.value;
          if (toLeft + ele.clientWidth >= ele.scrollWidth) {
            bradNextShow.value = false;
          } else {
            bradNextShow.value = true;
          }
        });
      }
    } else {
      Message.error(res.message);
    }
  });
};
// 获取商品列表
const getProduct = () => {
  productLoading.value = true;
  getProductList({
    limit: 8,
    page: page.value,
  }).then((res) => {
    productLoading.value = false;
    butLoading.value = false;
    if (res.code === 0) {
      lastPage.value = res.data.last_page;
      nextTick(() => {
        productList.value = [...productList.value, ...res.data.data];
      });
    } else {
      Message.error(res.message);
    }
  });
};
// 加载更多
const loadMore = () => {
  page.value++;
  butLoading.value = true;
  getProduct();
};

// 页面初始化
const initPageData = () => {
  getBanner();
  getBrad();
  getProduct();
};

initPageData();

useAsyncData(async (ctx) => {
  const lang = ctx.payload.state["$slocale.setting"];
  const area = ctx.payload.state["$sarea.setting"];
  const localeSetting = useState("locale.setting");

  console.log(localeSetting.value);
  // console.log(payload.pinia)
  console.log(area);
  // getProductList({
  //   limit: 8,
  //   page: page.value
  // }).then(res => {
  //   console.log(res.data.data)
  // })
});

const hotBradListTop = computed(() => {
  const center = Math.ceil(hotBradList.value.length / 2)
  return hotBradList.value.slice(0, center);
});

const hotBradListBottom = computed(() => {
  const center = Math.ceil(hotBradList.value.length / 2)
  return hotBradList.value.slice(center);
});

useHead({
  title: app.name,
  meta: [
    {
      hid: "og:url",
      property: "og:url",
      content: `${runtimeConfig.VITE_DOMAIN}${runtimeConfig.VITE_PUBLIC_URL}`,
    },
    {
      hid: "og:type",
      property: "og:type",
      content: 'website',
    },
    {
      hid: "og:title",
      property: "og:title",
      content: app.name,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: 'Swapifly轉手快是一家創立於香港的分類在線交易平台,專注於限量版和奢侈品的轉售。無論身處香港本地或已移民海外, 均可輕鬆放隻或搜羅絕版心頭好，如: 各式名牌手袋手錶、潮流電子、傢俬、電器、二手車或物業等。立即登入Swapifly開始轉手快的體驗。',
    },
    {
      hid: "og:image",
      property: "og:image",
      content: `https://oss.swapifly.com/swapifly/20221231/5151f74b9575be05211fc0e47a8345c49fe01375.jpg`,
    },
    {
      hid: "og:favicon",
      property: "og:favicon",
      content: `https://oss.swapifly.com/swapifly/20221231/5151f74b9575be05211fc0e47a8345c49fe01375.jpg`,
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: app.name,
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: `${runtimeConfig.VITE_DOMAIN}${runtimeConfig.VITE_PUBLIC_URL}`,
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: 'Swapifly轉手快是一家創立於香港的分類在線交易平台,專注於限量版和奢侈品的轉售。無論身處香港本地或已移民海外, 均可輕鬆放隻或搜羅絕版心頭好，如: 各式名牌手袋手錶、潮流電子、傢俬、電器、二手車或物業等。立即登入Swapifly開始轉手快的體驗。',
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: 'product',
    },
    {
      hid: "twitter:site",
      name: "twitter:site",
      content: `${runtimeConfig.VITE_DOMAIN}${runtimeConfig.VITE_PUBLIC_URL}`,
    },
    {
      hid: "twitter:image:src",
      name: "twitter:image:src",
      content: `https://oss.swapifly.com/swapifly/20221231/5151f74b9575be05211fc0e47a8345c49fe01375.jpg`,
    },
    {
      hid: "twitter:image:width",
      name: "twitter:image:width",
      content: 300,
    },
    {
      hid: "twitter:image:height",
      name: "twitter:image:height",
      content: 200,
    },

  ],
  // todo sdk 支持对语言
  script: [
    {
      src: `https://connect.facebook.net/zh_HK/sdk.js#xfbml=1&version=v12.0&appId=${runtimeConfig.VITE_FB_KEY}&autoLogAppEvents=1`,
      async: true,
      defer: true
    },
    {
      src: `https://connect.facebook.net/zh_HK/sdk.js#xfbml=1&version=v3.0`,
      async: true,
      defer: true
    },
    {
      src: 'https://accounts.google.com/gsi/client', async: true, defer: true
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/echarts@5.4.0/dist/echarts.min.js', async: true, defer: true
    }
  ]
})

onMounted(()=>{
  (adsbygoogle = window.adsbygoogle || []).push({})
})

</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";

.banner-wrapper {
  margin-top: 16px;

  .arco-carousel {
    height: 260px;
    border-radius: 5px;

    .carousel-img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    :deep(.arco-carousel-arrow) {
      .arco-icon {
        font-size: 24px;
        color: rgb(87, 88, 90);
      }
      & > div {
        box-shadow: 0 8px 12px 0 rgb(44 44 45 / 27%), 0 0 0 1px rgb(44 44 45 / 7%);
        background: $main-white;
        opacity: 0.8;
        width: 50px;
        height: 50px;
      }
      .arco-carousel-arrow-left {
        left: -25px;
      }
      .arco-carousel-arrow-right {
        right: -25px;
      }
    }
  }
  .swiper-box {
    position: relative;
    .my-swiper {
      height: 260px;
    }

    .carousel-img {
      width: 100%;
      height: 100%;
      cursor: pointer;
      border-radius: 5px;
    }
    .swiper-button-next,
    .swiper-button-prev {
      position: absolute;
      top: 58%;
      transform: translateY(-50%);
      height: 38px;
      width: 38px;
      border-radius: 50%;
      font-weight: bold;
      z-index: 33;
      cursor: pointer;
      background-color: $main-grey;
      opacity: 0.4;
      &::after {
        font-size: 12px;
        color: $main-white;
      }

      &:hover {
        background-color: #f2f2f2;
        color: $main-grey;
        &::after {
          font-size: 12px;
          color: $main-grey;
        }
      }
    }
  }
}

.section-wrapper {
  margin: 40px 0 40px;
  overflow: hidden;

  .section-header {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 36px;
    margin-top: 0;
  }

  .section-header1 {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 22px;
    margin-top: 0;
  }

  .brands-content {
    display: flex;
    font-size: 14px;
    //width: 100%;
    overflow: hidden;

    .brands-item {
      text-align: center;
      width: 117px;
      flex-shrink: 0;
      //margin-right: 53px;
      cursor: pointer;

      * {
        user-select: none;
      }

      img {
        -webkit-user-drag: none;
      }

      .arco-image {
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 5px;
      }

      :deep(.arco-image-error) {
        border-radius: 50%;

        .arco-image-error-icon {
          width: 40px;
          height: 40px;
        }

        .arco-image-error-alt {
          display: none;
        }
      }

      .arco-skeleton-shape-circle {
        width: 80px;
        height: 80px;
        margin: 0 auto;
      }

      :deep(.arco-skeleton-line-row) {
        margin: 0 auto;
      }
      .brands-title{
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:hover {
        .brands-title {
          color: $main-blue;
        }
      }
    }
    :deep(.arco-image){
      margin: 0 auto;
    }
  }

  .section-content {
    position: relative;

    .arrow {
      position: absolute;
      width: 32px;
      height: 32px;
      top: 20px;
      cursor: pointer;
      z-index: 1;
      opacity: 0.8;
      box-shadow: 0 8px 12px 0 rgb(44 44 45 / 27%), 0 0 0 1px rgb(44 44 45 / 7%);
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .arrow-right {
      right: 5px;
    }

    .arrow-left {
      left: 5px;
      transform: rotateY(180deg);
    }
  }

  .section-content-pc{
    display: block;
  }
  .section-content-m{
    display: none;
  }
}

.recommend-wrapper {
  margin-top: 46px;
  .section-content {
    padding: 0 2px;
  }
}

.see-more {
  text-align: center;
  margin: 30px auto;

  .arco-btn {
    border-color: $main-grey-rbg;
    color: $main-grey-rbg;
    padding: 0 20px;
    height: 38px;
  }
}
.pc-img {
  display: block;
}
.m-image {
  display: none;
}
</style>

<style lang="scss" scoped>
@import "assets/sass/var.scss";
@media screen and (max-width: 1000px) {
  .banner-wrapper {
    margin-top: 0;
    .swiper-box {
      .my-swiper {
        height: 150px;
      }
    }

    .arco-carousel {
      height: 150px;
      :deep(.arco-carousel-arrow) {
        .arco-icon {
          font-size: 20px;
        }
        & > div {
          box-shadow: 0 8px 12px 0 rgb(44 44 45 / 27%), 0 0 0 1px rgb(44 44 45 / 7%);
          background: $main-white;
          opacity: 0.8;
          width: 35px;
          height: 35px;
        }
        .arco-carousel-arrow-left {
          left: 5px;
        }
        .arco-carousel-arrow-right {
          right: 5px;
        }
      }
    }
    :deep(.arco-skeleton-line-row) {
      height: 150px !important;
    }
  }
  .recommend-wrapper {
    margin-top: 25px;
  }
  .section-wrapper {
    margin: 12px 0 12px;
    .section-header {
      margin-top: 24px;
      margin-bottom: 14px;
    }
    .section-header1 {
      margin-bottom: 15px;
      margin-top: 15px;
    }
    .brands-content {
      .brands-item {
        width: 90px;
      }
    }
    .section-content-pc{
      display: none;
    }
    .section-content-m{
      display: block;
      overflow-x: scroll;
      :deep(.arco-skeleton-shape){
        width: 55px !important;
        height: 55px !important;
        margin: 0 auto;
      }
      .brands-content{
        overflow: unset;
        display: inline-flex;
      }
      &::-webkit-scrollbar{
        display: none;
      }
    }
  }

  .pc-img{
    display: none;
  }
  .m-image {
    display: block;
  }
}
</style>

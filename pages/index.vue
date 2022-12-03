<template>
  <div class="common-row global-content">
    <div class="banner-wrapper">
      <template v-if="bannerLoading">
        <a-skeleton :animation="true">
          <a-skeleton-line :rows="1" :line-height="260"/>
        </a-skeleton>
      </template>
      <tenplate v-else>
        <a-carousel :auto-play="true" indicator-type="dot" show-arrow="hover" animation-name="fade">
          <a-carousel-item v-for="item in bannerList">
            <a-image show-loader fit="cover" @click.native="openLink(item)" height="100%" width="100%" :preview="false" :src="baseImgPrefix + item.img" class="carousel-img">
              <template #loader>
                <div class="loader-animate"/>
              </template>
            </a-image>
          </a-carousel-item>
        </a-carousel>
      </tenplate>

    </div>
    <section class="section-wrapper">
      <h3 class="section-header">{{ $t("pages.hotBrands") }}</h3>
      <div class="section-content">
        <template v-if="bradLoading">
          <div class="brands-content">
            <div v-for="item in 10" class="brands-item">
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
            <div v-for="item in hotBradList" class="brands-item">
              <a-image :preview="false" :width="80" :height="80" :src="baseImgPrefix + item.img" alt="" show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <div>{{ item.title }}</div>
            </div>
          </div>
          <div v-if="bradNextShow" class="arrow arrow-rgiht" @click="bradChangePage('next')">
            <img src="@/assets/images/icon/arrow-right-bg-b.png" alt=""/>
          </div>
        </template>
      </div>
    </section>

    <section class="section-wrapper recommend-wrapper">
      <h3 class="section-header section-header1">{{ $t("pages.recommendTitle") }}</h3>
      <div class="section-content">
        <ProductCard :list="productList" :pageLoading="productLoading"
                     :cardWidth="isMobileRef ? '48%' : '24%'"></ProductCard>
      </div>
    </section>

    <AD></AD>

    <div class="see-more">
      <a-button type="outline">{{ $t("pages.seeMore") }}</a-button>
    </div>

    <PageFooterLink></PageFooterLink>
    <LoginModal ref="loginModal" @toRegister="toRegister"></LoginModal>
    <RegisterModal ref="registerModal" @toLogin="toLogin" @toPreference="toPreference"></RegisterModal>
    <ChoosePreference ref="choosePreference" @confirmPreference="confirmPreference"></ChoosePreference>
  </div>
</template>

<script setup>
// import IconEdit from "@arco-design/web-vue/es/icon/icon-edit";
// import IconPlus from "@arco-design/web-vue/es/icon/icon-plus";
import {baseImgPrefix} from "~/config/baseUrl";
import {getHotBrad, getProductlist} from '~/api/goods'
import {getHomeAdvert} from '~/api/ad'
import {useResize} from '~/stores/resize'
import {useUserInfo} from "../stores/userInfo";
import {Message} from "@arco-design/web-vue";

const route = useRoute()
const loginModal = ref(null)
const registerModal = ref(null)
const choosePreference = ref(null)

const bannerLoading = ref(true)
const bradLoading = ref(true)
const productLoading = ref(true)

const googleAd = ref({})
const bannerList = ref([])
const productList = ref([])
const hotBradList = ref([])
const bradNextShow = ref(true)
const curBradPage = ref(0)
const resize = useResize();
let isMobile = resize.screenType === 'MOBILE'
let isMobileRef = ref(isMobile)
console.log("====isMobileRef==", isMobileRef)
const value = ref();
const data = [
  {
    value: "beijing",
    label: "Beijing",
    other: "extra",
  },
  {
    value: "shanghai",
    label: "Shanghai",
    other: "extra",
  },
  {
    value: "guangzhou",
    label: "Guangzhou",
    other: "extra",
  },
  {
    value: "chengdu",
    label: "Chengdu",
    other: "extra",
  },
];
onMounted(() => {
  const userInfo = useUserInfo()
  if (userInfo.openLogin) {
    loginModal.value.openDialog()
    userInfo.closeDialog()
  }
})
const openLink = (e) => {
  console.log(e)
  if(!e.link) return
  window.open(e.link, '_blank')
}
const toRegister = () => {
  loginModal.value.handleCancel()
  registerModal.value.openDialog()
}
const toLogin = () => {
  registerModal.value.handleCancel()
  loginModal.value.openDialog()
}
const toPreference = () => {
  choosePreference.value.openDialog()
}
const bradChangePage = (type) => {
  const ele = document.getElementsByClassName('brands-content')[0]
  console.log(ele, type)
  if (type === 'next') {
    curBradPage.value++
  } else {
    curBradPage.value--
  }
  console.log(curBradPage.value)
  const toLeft = ele.clientWidth * curBradPage.value
  ele.scrollTo({
    left: toLeft,
    behavior: 'smooth'
  })
  if (toLeft + ele.clientWidth >= ele.scrollWidth) {
    bradNextShow.value = false
  } else {
    bradNextShow.value = true
  }
}

// 获取banner和谷歌广告
const getBanner = () => {
  bannerLoading.value = true
  getHomeAdvert().then(res => {
    bannerLoading.value = false
    if (res.code === 0) {
      bannerList.value = res.data.home_advert
      googleAd.value = res.data.google_advert
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
    } else {
      Message.error(res.message)
    }
  })
}

// 获取商品列表
const getProduct = () => {
  productLoading.value = true
  getProductlist({
    limit: 8,
    page: 1
  }).then(res => {
    productLoading.value = false
    if (res.code === 0) {
      productList.value = res.data.data
    } else {
      Message.error(res.message)
    }
  })
}
// 页面初始化
const initPageData = () => {
  getBanner()
  getBrad()
  getProduct()
}

initPageData()
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";

.banner-wrapper {
  margin-top: 16px;

  .arco-carousel {
    height: 260px;
    border-radius: 5px;
    overflow: hidden;

    .carousel-img {
      width: 100%;
      height: 100%;
      cursor: pointer;
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
    margin-top: 45px;
  }

  .section-header1 {
    margin-bottom: 22px;
  }

  .brands-content {
    display: flex;
    font-size: 14px;
    //width: 100%;
    overflow: hidden;

    .brands-item {
      text-align: center;
      width: 80px;
      flex-shrink: 0;
      margin-right: 53px;
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

      img {
        width: 100%;
        height: 100%;
      }
    }

    .arrow-rgiht {
      right: 0;
    }

    .arrow-left {
      left: 0;
      transform: rotateY(180deg);
    }
  }
}

.recommend-wrapper {
  margin-top: 86px;
}

.see-more {
  text-align: center;
  margin: 30px auto;

  .arco-btn {
    border-color: rgba(56, 56, 56, 1);
    color: rgba(56, 56, 56, 1);
    padding: 0 20px;
    height: 38px;
  }
}
</style>

<template>
  <div class="common-row global-content">
    <div class="banner-wrapper">
      <template v-if="bannerLoading">
        <div>
          <a-skeleton :animation="true">
            <a-skeleton-line :rows="1" :line-height="260"/>
          </a-skeleton>
        </div>
      </template>
      <template v-if="!bannerLoading">
        <div class="swiper-box">
          <swiper
            :slidesPerView="1"
            :loop="false"
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
        </div>
        <!-- <a-carousel :auto-play="true" indicator-type="dot" show-arrow="hover" animation-name="fade">
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

    <section class="section-wrapper" v-if="curLevel <= 2">
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
          <div id="brandsContent" class="brands-content">
            <div v-for="item in subClassList" @click="toClassDetail(item)" class="brands-item brands-item-hover">
              <a-image class="pc-img" :preview="false" :width="80" :height="80" :src="baseImgPrefix + (item.background || item.img)"  alt="" show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <a-image class="m-image" :preview="false" :width="55" :height="55" :src="baseImgPrefix + (item.background || item.img)"  alt="" show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <div class="brands-label">{{ item.title }}</div>
            </div>
          </div>
          <div v-if="bradNextShow" class="arrow arrow-right" @click="bradChangePage('next')">
            <img src="@/assets/images/icon/arrow-right-bg-b.png" alt=""/>
          </div>
        </template>
      </div>
      <div class="section-content section-content-m">
        <template v-if="bradLoading">
          <div class="brands-content">
            <div v-for="item in 12" class="brands-item">
              <a-skeleton :animation="true">
                <a-skeleton-shape shape="circle"/>
                <div style="height: 5px"></div>
                <a-skeleton-line :rows="1" :widths="[55]" :line-height="21"/>
              </a-skeleton>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="brands-content">
            <div v-for="item in subClassList" @click="toClassDetail(item)" class="brands-item brands-item-hover">
              <a-image class="m-image" :preview="false" :width="55" :height="55" :src="baseImgPrefix + (item.background || item.img)"  alt="" show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <div class="brands-label">{{ item.title }}</div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <section class="section-wrapper" v-if="curLevel === 1">
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
          <div v-if="curBradPage1 > 0" class="arrow arrow-left" @click="bradChangePage1('pre')">
            <img src="@/assets/images/icon/arrow-right-bg-b.png" alt=""/>
          </div>
          <div id="brandsContent1" class="brands-content">
            <div v-for="item in hotBradList" @click="toSearch(item)" class="brands-item">
              <a-image class="pc-img" :preview="false" :width="80" :height="80" :src="baseImgPrefix + (item.background || item.img)"  alt="" show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <a-image class="m-image" :preview="false" :width="55" :height="55" :src="baseImgPrefix + (item.background || item.img)"  alt="" show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <div class="brands-label">{{ item.title }}</div>
            </div>
          </div>
          <div v-if="bradNextShow1" class="arrow arrow-right" @click="bradChangePage1('next')">
            <img src="@/assets/images/icon/arrow-right-bg-b.png" alt=""/>
          </div>
        </template>
      </div>
      <div class="section-content section-content-m">
        <template v-if="bradLoading">
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
        </template>
        <template v-else>
          <div class="brands-content">
            <div v-for="item in hotBradListTop" @click="toSearch(item)" class="brands-item">
              <a-image class="m-image" :preview="false" :width="55" :height="55" :src="baseImgPrefix + (item.background || item.img)"  alt="" show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <div class="brands-label">{{ item.title }}</div>
            </div>
          </div>
          <div style="height: 12px;"></div>
          <div class="brands-content">
            <div v-for="item in hotBradListBottom" @click="toSearch(item)" class="brands-item">
              <a-image class="m-image" :preview="false" :width="55" :height="55" :src="baseImgPrefix + (item.background || item.img)"  alt="" show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <div class="brands-label">{{ item.title }}</div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <section class="section-wrapper goods-wrapper">
      <div class="list-header">
        <a-space direction="vertical">
          <a-breadcrumb>
            <template #separator>
              <img src="@/assets/images/icon/breadcrumb-separator.png" alt="">
            </template>
            <a-breadcrumb-item v-for="item in classPath">{{ item }}</a-breadcrumb-item>
          </a-breadcrumb>
        </a-space>
        <div class="select-wrapper">
          <MobileGoodsFilterSelect class="mobile-select" ref="mobileGoodsFilterSelect" @change="handleQuery" :cur-level="curLevel" :cur-rid="rId"></MobileGoodsFilterSelect>
          <GoodsFilterSelect class="pc-class" @change="handleQuery" ref="goodsFilterSelect" :cur-level="curLevel" :cur-rid="rId"></GoodsFilterSelect>
        </div>
      </div>
      <div class="section-content">
        <ProductCard :list="productList" :pageLoading="productLoading"></ProductCard>
      </div>
    </section>

    <AD :advert="googleAd.content"></AD>

    <div class="see-more" v-if="page < lastPage && productList.length > 0">
      <a-button type="outline" @click="loadMore" :loading="butLoading">{{ $t("pages.seeMore") }}</a-button>
    </div>

    <PageFooterLink></PageFooterLink>
  </div>
</template>

<script setup>
import { getCategoryAdvert } from '~/api/ad'
import { categoryHotBrand, getCategoryProductList } from '~/api/goods'
import { Message } from '@arco-design/web-vue';
import { useResize } from "~/stores/resize";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, Navigation, Pagination, A11y } from "swiper";
const runtimeConfig = useRuntimeConfig();
const baseImgPrefix =  runtimeConfig.VITE_OSS_PREFIX
const bannerLoading = ref(true)
const bradLoading = ref(true)
const productLoading = ref(true)
const butLoading = ref(false)
const swiperRef = ref(null);
const resize = useResize()
const bannerList = ref([])
const productList = ref([])
const hotBradList = ref([])
const subClassList = ref([])
const route = useRoute()
const router = useRouter()
const curBradPage = ref(0)
const curBradPage1 = ref(0)
const bradNextShow = ref(true)
const bradNextShow1 = ref(true)
const curLevel = ref(0)
const rId = ref(null)
const goodsFilterSelect = ref(null)
const mobileGoodsFilterSelect = ref(null)
const classPath = ref([])
const hotBradListTop = computed(() => {
  const center = Math.ceil(hotBradList.value.length / 2)
  return hotBradList.value.slice(0, center);
});
const hotBradListBottom = computed(() => {
  const center = Math.ceil(hotBradList.value.length / 2)
  return hotBradList.value.slice(center);
});

curLevel.value = parseInt(route.query.level)
rId.value = parseInt(route.query.id)
const curFilter = ref({
  mail: 0,
  max: '',
  min: '',
  nid: '',
  offline: 0,
  rid: parseInt(route.query.id),
  sort: '',
})
const page = ref(1)
const lastPage = ref(999)
const googleAd = ref({})

// 获取banner和谷歌广告
const getBanner = () => {
  bannerLoading.value = true
  getCategoryAdvert({
    rid: rId.value
  }).then(res => {
    bannerLoading.value = false
    if (res.code === 0) {
      bannerList.value = res.data.home_advert
      googleAd.value = res.data.google_advert
      swiperRef.value && swiperRef.value.$el.swiper.update();
    } else {
      Message.error(res.message)
    }
  })
}
// 获取热门品牌
const getBrad = () => {
  bradLoading.value = true
  categoryHotBrand({
    rid: rId.value
  }).then(res => {
    bradLoading.value = false
    if (res.code === 0) {
      hotBradList.value = res.data.hot_brand
      subClassList.value = res.data.c_rule
      classPath.value = res.data.p_rule
      nextTick(()=>{
        // 判断是否需要出现下一页
        if(process.client && curLevel.value <= 2){
          const ele = document.getElementById('brandsContent')
          const toLeft = ele.clientWidth * curBradPage.value
          if (toLeft + ele.clientWidth >= ele.scrollWidth) {
            bradNextShow.value = false
          } else {
            bradNextShow.value = true
          }
        }
        if(process.client && curLevel.value === 1){
          const ele1 = document.getElementById('brandsContent1')
          const toLeft1 = ele1.clientWidth * curBradPage1.value
          if (toLeft1 + ele1.clientWidth >= ele1.scrollWidth) {
            bradNextShow1.value = false
          } else {
            bradNextShow1.value = true
          }
        }
      })
    } else {
      Message.error(res.message)
    }
  })
}
// 加载更多
const loadMore = () => {
  page.value ++
  butLoading.value = true
  getProduct()
}
const bradChangePage = (type) => {
  const ele = document.getElementById('brandsContent')
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
const bradChangePage1 = (type) => {
  const ele = document.getElementById('brandsContent1')
  console.log(ele, type)
  if (type === 'next') {
    curBradPage1.value++
  } else {
    curBradPage1.value--
  }
  const toLeft = ele.clientWidth * curBradPage1.value
  ele.scrollTo({
    left: toLeft,
    behavior: 'smooth'
  })
  if (toLeft + ele.clientWidth >= ele.scrollWidth) {
    bradNextShow1.value = false
  } else {
    bradNextShow1.value = true
  }
}
// 获取商品列表
const getProduct = () => {
  productLoading.value = true
  console.log(rId.value)
  getCategoryProductList({
    limit: 8,
    page: page.value,
    ...curFilter.value
  }).then(res => {
    productLoading.value = false
    butLoading.value = false
    if (res.code === 0) {
      lastPage.value = res.data.last_page
      nextTick(() => {
        productList.value = [...productList.value, ...res.data.data]
      })
    } else {
      Message.error(res.message)
    }
  })
}
const handleQuery = (data) => {
  page.value = 1
  productList.value = []
  // 如果重制了没有分类id 取url上的id
  if(!data.rid){
    data.rid = parseInt(route.query.id)
  }
  curFilter.value = data
  getProduct()
};
const openLink = (e) => {
  console.log(e)
  if (!e.link) return
  window.open(e.link, '_blank')
}
const toSearch = (item) => {
  router.push({
    path: '/searchResult',
    query: {
      keyword: item.title
    }
  })
}
const toClassDetail = (e) => {
  console.log(e)
  router.push({
    path: '/goodsList',
    query: {
      id: e.id,
      level: curLevel.value + 1
    }
  })
}
// 页面初始化
const initPageData = () => {
  getBanner()
  getProduct()
}
initPageData()
// 监听路由参数 如果分类改变 重新获取页面数据
watch(() => route.query, (newValue, oldValue) => {
  console.log(newValue)
  curLevel.value = parseInt(newValue.level)
  rId.value = parseInt(newValue.id)
  curFilter.value.rid = parseInt(newValue.id)
  bannerLoading.value = true
  bradLoading.value = true
  productLoading.value = true
  bannerList.value = []
  productList.value = []
  hotBradList.value = []
  subClassList.value = []

  goodsFilterSelect.value && goodsFilterSelect.value.resetForm && goodsFilterSelect.value.resetForm()
  mobileGoodsFilterSelect.value && mobileGoodsFilterSelect.value.resetForm && mobileGoodsFilterSelect.value.resetForm()
  // initPageData()
  getBanner()
  getBrad()
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
onMounted(()=>{
  getBrad()
  // goodsFilterSelect.value && goodsFilterSelect.value.resetTree && goodsFilterSelect.value.resetTree(rId.value, curLevel.value)
})
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";

.banner-wrapper {
  margin-top: 16px;
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
  }
  .arco-carousel {
    height: 260px;
    border-radius: 5px;
    overflow: hidden;
    .carousel-img {
      width: 100%;
      height: 100%;
    }
  }
}

.section-wrapper {
  margin: 40px 0 40px;
  .section-header {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
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

      :deep(img) {
        -webkit-user-drag: none;
        transform: translateY(0px);
        transition: all .3s ease-out;
      }

      .arco-image {
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 5px;
      }
      .brands-label{
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    .brands-item-hover{
      &:hover {
        transition: box-shadow .3s ease-out;
        .arco-image{
          background: rgba(44,44,45,.07);
          transition: background .3s ease-out;
          :deep(img){
            transform: translateY(-4px);
          }
        }

      }
    }
    .pc-img{
      display: block;
    }
    .m-image{
      display: none;
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

.goods-wrapper {
  margin-top: 60px;
}

.goods-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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

.list-header {
  margin: 10px 0;
  .arco-breadcrumb {
    color: $grey-font-label;
  }
}

:deep(.arco-breadcrumb) {
  color: $grey-font-label !important;
  font-size: 16px;

  .arco-breadcrumb-item {
    color: $grey-font-label !important;
    font-weight: 400;
  }
}

.mobile-select{
  display: none;
}
.pc-class{
  display: flex;
}
</style>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

@media screen and (max-width: 1000px) {
  .mobile-select{
    display: block;
  }
  .pc-class{
    display: none;
  }
  .banner-wrapper {
    margin-top: 0;
    .swiper-box {
      .my-swiper {
        height: 150px;
      }
    }
    .arco-carousel {
      height: 150px;
      border-radius: 5px;
      overflow: hidden;
      .carousel-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .section-wrapper{
    margin-top: 24px;
    margin-bottom: 24px;
    .section-header{
      font-size: 20px;
      margin: 12px 0;
    }
    .brands-content {
      .brands-item {
        width: 80px;
        margin-right: 15px;
      }
      .arco-image{
        margin: 0 auto;
      }
      .pc-img{
        display: none;
      }
      .m-image{
        display: block;
      }
    }
    .list-header{
      margin-top: 10px;
      .select-wrapper{
        margin-top: 12px;
      }
    }
    .section-content-pc{
      display: none;
    }
    .section-content-m{
      display: block;
      overflow-x: auto;
      :deep(.arco-skeleton-shape){
        width: 55px !important;
        height: 55px !important;
        margin: 0 auto;
      }
      .brands-content{
        display: inline-flex;
      }
      &::-webkit-scrollbar{
        display: none;
      }

    }
  }
  .goods-wrapper{
    margin-top: 0;
  }
}
</style>

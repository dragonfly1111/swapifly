<template>
  <div class="common-row global-content">
    <div class="banner-wrapper">
      <a-carousel :auto-play="true" indicator-type="dot" show-arrow="hover">
        <a-carousel-item v-for="image in images">
          <img :src="image" class="carousel-img" />
        </a-carousel-item>
      </a-carousel>
    </div>
    <section class="section-wrapper">
      <h3 class="section-header">{{ $t("pages.hotBrands") }}</h3>
      <div class="section-content brands-content">
        <div v-for="item in 8" class="brands-item">
          <img :src="testImg" alt="" />
          <div>耐克/nike</div>
        </div>
        <div class="arrow-rgiht">
          <img src="@/assets/images/icon/arrow-right-bg-b.png" alt="" />
        </div>
      </div>
    </section>

    <section class="section-wrapper recommend-wrapper">
      <h3 class="section-header">{{ $t("pages.recommendTitle") }}</h3>
      <div class="section-content">
        <ProductCard :cardWidth="isMobileRef ? '48%' : '24%'"></ProductCard>
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
import { getHomeAdvert } from '~/api/ad'
import { useResize } from '~/stores/resize'
import {useUserInfo} from "../stores/userInfo";
const route = useRoute()
const loginModal = ref(null)
const registerModal = ref(null)
const choosePreference = ref(null)
const testImg =
    "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
];
const resize = useResize();
let isMobile = resize.screenType === 'MOBILE'
let isMobileRef = ref(isMobile)
console.log("====isMobileRef==",isMobileRef)
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
getHomeAdvert().then(res=>{
  console.log(res)
})
onMounted(()=>{
  const userInfo = useUserInfo()
  if(userInfo.openLogin){
    loginModal.value.openDialog()
    userInfo.closeDialog()
  }
  // const chart= echarts.init(document.getElementById("main"));
  // const option = {
  //   title: {
  //     text: '2000-2016年中国汽车销量及增长率'
  //   },
  //   tooltip: {
  //     trigger: 'axis'
  //   },
  //   legend: {
  //     data: ['增速','销量']
  //   },
  //   xAxis: [{
  //     type: 'category',
  //     data: ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016']
  //   }],
  //   yAxis: [{
  //     type: 'value',
  //     name: '增速',
  //     min: 0,
  //     max: 50,
  //     position: 'right',
  //     axisLabel: {
  //       formatter: '{value} %'
  //     }
  //   }, {
  //     type: 'value',
  //     name: '销量',
  //     min: 0,
  //     max: 3000,
  //     position: 'left'
  //   }],
  //   series: [{
  //     name: '增速',
  //     type: 'line',
  //     stack: '总量',
  //     label: {
  //       normal: {
  //         show: true,
  //         position: 'top',
  //       }
  //     },
  //     lineStyle: {
  //       normal: {
  //         width: 3,
  //         shadowColor: 'rgba(0,0,0,0.4)',
  //         shadowBlur: 10,
  //         shadowOffsetY: 10
  //       }
  //     },
  //     data: [1,13,37,35,15,13,25,21,6,45,32,2,4,13,6,4,11]
  //   }, {
  //     name: '销量',
  //     type: 'bar',
  //     yAxisIndex: 1,
  //     stack: '总量',
  //     label: {
  //       normal: {
  //         show: true,
  //         position: 'top'
  //       }
  //     },
  //     data: [209,236,325,439,507,576,722,879,938,1364,1806,1851,1931,2198,2349,2460,2735]
  //   }]
  // };
  // chart.setOption(option);
})
function toRegister() {
  loginModal.value.handleCancel()
  registerModal.value.openDialog()
}
function toLogin() {
  registerModal.value.handleCancel()
  loginModal.value.openDialog()
}
function toPreference() {
  choosePreference.value.openDialog()
}

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
    width: 100%;
    overflow: hidden;
    position: relative;
    .arrow-rgiht {
      position: absolute;
      width: 32px;
      height: 32px;
      right: 0;
      top: 20px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .brands-item {
      text-align: center;
      width: 120px;
      flex-shrink: 0;
      margin-right: 5px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 5px;
        cursor: pointer;
      }
    }
  }
}

.recommend-wrapper {
  margin-top: 60px;
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

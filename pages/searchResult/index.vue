<template>
  <div class="common-row global-content">
    <AD :hasTitle="false"></AD>

    <section class="section-wrapper goods-wrapper">
      <div class="list-header">
        <div>
          <h2>有{{ productTotal }}個搜尋結果</h2>
        </div>
        <div class="select-wrapper">
          <GoodsFilterSelect @change="handleQuery"></GoodsFilterSelect>
        </div>
      </div>
      <div class="section-content goods-content">
        <ProductCard :list="productList" :pageLoading="pageLoading"></ProductCard>
      </div>
    </section>

    <div class="see-more" v-if="page < lastPage">
      <a-button type="outline" @click="loadMore" :loading="butLoading">{{ $t("pages.seeMore") }}</a-button>
    </div>

    <AD></AD>

    <PageFooterLink></PageFooterLink>
  </div>
</template>

<script setup>
import { productSearch } from '~/api/goods'
import {useSearchKey} from "../../stores/search";
import {Message} from "@arco-design/web-vue";
const route = useRoute()
const searchKey = useSearchKey()
const page = ref(1)
const limit = ref(8)
const lastPage = ref(999)
const productTotal = ref('')
const productList = ref([])
const pageLoading = ref(true)
const butLoading = ref(false)
let queryParams = {}
watch(() => route.query, (newValue, oldValue) => {
  handleQuery()
})
const handleQuery = (data) => {
  console.log("form", data);
  page.value = 1
  productList.value = []
  getSearchData(data)
};

const getSearchData = (data) => {
  pageLoading.value = true
  let tmp = null
  if(data){
    tmp = JSON.parse(JSON.stringify(data))
    if(tmp.offline){
      tmp.offline = 1
    } else {
      tmp.offline = 0
    }
    if(tmp.mail){
      tmp.mail = 1
    } else {
      tmp.mail = 0
    }
  } else {
    tmp = {}
  }
  productSearch({
    title: searchKey.searchKey,
    page: page.value,
    limit: limit.value,
    ...tmp
  }).then(res=>{
    pageLoading.value = false
    butLoading.value = false
    if(res.code === 0){
      productList.value = [...productList.value, ...res.data.data]
      const num = res.data.total
      lastPage.value = res.data.last_page
      if(num <= 10){
        productTotal.value = num
      } else if(num > 10 && num <= 100){
        productTotal.value = '10+'
      } else if(num > 100 && num <= 1000){
        productTotal.value = '100+'
      } else if(num > 1000 && num <= 10000){
        productTotal.value = '1000+'
      } else if(num > 10000){
        productTotal.value = '10000+'
      }
    } else {
      Message.error(res.message)
    }

  })
}

const loadMore = () =>{
  page.value ++
  butLoading.value = true
  getSearchData(queryParams)
}

getSearchData()

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
    flex-wrap: wrap;
    font-size: 14px;
    width: 100%;
    position: relative;
    .brands-item {
      text-align: center;
      width: 120px;
      flex-shrink: 0;
      margin-right: 5px;
      margin-bottom: 20px;
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

.goods-wrapper {
  margin-top: 30px;
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

.list-header {
  margin: 10px 0;
  .arco-breadcrumb {
    color: $grey-font-label;
  }
}
</style>

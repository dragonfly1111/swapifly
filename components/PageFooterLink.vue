<template>
  <div class="page-footer-link">
    <section class="search-box">
      <div class="content-title">{{ $t("foot.recentTopSearches") }}</div>
      <div class="hot-search">
        <template v-if="hotSearchLoading">
          <a-skeleton :animation="true" style="width: 100%;">
            <a-skeleton-line :rows="2" :line-height="15" :line-spacing="7"/>
          </a-skeleton>
        </template>
        <template v-else>
          <div class="hot-search-item" v-for="item in hotSearchList">
            <a-link @click="toSearch(item)">{{ item.title }}</a-link>
            <a-divider direction="vertical" />
          </div>
        </template>

      </div>
    </section>

    <section class="footer-link-box" v-for="firstType in classList">
      <div class="content-title bold">{{ firstType.title }}</div>
      <div class="content">
        <div class="recommendation-item" v-for="secType in firstType.children">
          <a-link @click="toGoodsList(item)">{{ secType.title }}</a-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import {useSysData} from '~/stores/sysData'
import {getHotSearch} from '~/api/goods'
import {Message} from "@arco-design/web-vue";
const router = useRouter()
const sysData = useSysData()
const classList = sysData.goodsClass
const hotSearchLoading = ref(true)
const hotSearchList = ref([])


const props = defineProps({
  // hotSearchList: {
  //   type: Array,
  //   default: () => [],
  // },
  // // 骨架屏
  // searchLoading: {
  //   type: Boolean,
  //   default: true,
  // },
});

const toSearch = (item) => {
  router.push({
    path: '/searchResult',
    query: {
      keyword: item.title
    }
  })
}

const toGoodsList = (item) => {
  router.push({
    path: '/goodsList',
    query: {
      id: item.id
    }
  })
}

const getHotSearchList = () => {
  hotSearchLoading.value = true
  getHotSearch({
    limit: 40,
    page: 1
  }).then(res => {
    hotSearchLoading.value = false
    if (res.code === 0) {
      nextTick(()=>{
        hotSearchList.value = res.data
      })
    } else {
      Message.error(res.message)
    }
  })
}

getHotSearchList()
</script>

<style scoped lang="scss">
.page-footer-link{
    padding: 20px 30px;
    border-top: 1px solid rgba(229, 229, 229, 1);
}

.content-title{
    margin: 10px 0;
    &.bold{
    font-weight: bold;
}
}

.search-box{
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    margin-bottom: 50px;
    .hot-search{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        padding: 10px;
        &-item{
            flex-shrink: 0;
            margin-bottom: 10px;
            .arco-link{
                color: rgba(42, 130, 228, 1);

            }
        }
    }
}

.footer-link-box{
    margin-bottom: 30px;
    .content{
        display: flex;
        flex-wrap: wrap;
        .arco-link{
            padding: 0;
            color: rgba(56, 56, 56, 1);
            margin-right: 20px;
        }
    }
}

</style>

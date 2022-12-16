<template>
  <div class="page-footer-link">

    <div v-if="hotSearchLoading">
      <a-skeleton animation :loading="hotSearchLoading">
        <a-skeleton-line :rows="3" :widths="[200]"/>
        <div style="height:30px"></div>
        <a-skeleton-line :rows="3"/>
        <div style="height:50px"></div>
        <a-skeleton-line :rows="3" :widths="[200]"/>
        <div style="height:30px"></div>
        <a-skeleton-line :rows="3"/>
      </a-skeleton>
    </div>

    <div v-if="!hotSearchLoading">
      <div class="search-box">
        <div class="content-title">{{ $t("foot.recentTopSearches") }}</div>
        <div class="hot-search">
          <template v-if="hotSearchLoading">
            <div style="width: 100%;">
              <a-skeleton :animation="true">
                <a-skeleton-line :rows="2" :line-height="15" :line-spacing="7"/>
              </a-skeleton>
            </div>

          </template>
          <template v-else>
            <div class="hot-search-item" v-for="item in hotSearchList">
              <a-link @click="toSearch(item)">{{ item.title }}</a-link>
              <a-divider direction="vertical"/>
            </div>
          </template>
        </div>
      </div>
      <div class="footer-pc-coll">
        <section class="footer-link-box" v-for="firstType in sysData.goodsClass">
          <div class="content-title bold" @click="toGoodsList(firstType)">{{ firstType.title }}</div>
          <div class="content">
            <div class="recommendation-item" v-for="secType in firstType.children">
              <a-link @click="toGoodsList(secType)">{{ secType.title }}</a-link>
            </div>
          </div>
        </section>
      </div>
      <div class="footer-mobile-coll">
        <a-collapse
            :show-expand-icon="true"
            expand-icon-position="right"
            :bordered="false"
            :accordion="true"
            :active-key="activeCol"
        >
          <a-collapse-item
              v-for="(firstType,index) in sysData.goodsClass"
              :disabled="true"
              :key="index">
            <template #header>
              <div class="title" @click="toGoodsList(firstType)">
                {{ firstType.title }}
              </div>
            </template>
            <template #expand-icon="{ active }">
              <div style="width: 50px; text-align: right" @click="changeCol(index)">
                <icon-down v-if="active"/>
                <icon-left style="transform: rotate(180deg)" v-else/>
              </div>

            </template>
            <div class="content">
              <div class="recommendation-item" v-for="secType in firstType.children">
                <a-link @click="toGoodsList(secType)">{{ secType.title }}</a-link>
              </div>
            </div>
          </a-collapse-item>
        </a-collapse>
      </div>
    </div>

  </div>
</template>
<script setup>
import {useSysData} from '~/stores/sysData'
import {getHotSearch} from '~/api/goods'
import {Message} from "@arco-design/web-vue";
import {useResize} from '~/stores/resize'

const router = useRouter()
const resize = useResize();
const sysData = useSysData()
const hotSearchLoading = ref(true)
const hotSearchList = ref([])
const activeCol = ref([])
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
      id: item.id,
      level: item.level
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
      nextTick(() => {
        hotSearchList.value = res.data
      })
    } else {
      Message.error(res.message)
    }
  })
}

const changeCol = (e) =>{
  const index = activeCol.value.findIndex((item)=>{
    return item === e
  })
  console.log(index)
  if(index === -1){
    activeCol.value.push(e)
  } else {
    activeCol.value.splice(index, 1)
  }
}

onMounted(() => {
  getHotSearchList()

})

</script>

<style scoped lang="scss">
.page-footer-link {
  padding: 20px 30px;
  border-top: 1px solid rgba(229, 229, 229, 1);
}

.footer-pc-coll{
  display: block;
}

.footer-mobile-coll{
  display: none;
}

.content-title {
  margin: 10px 0;
  cursor: pointer;

  &.bold {
    font-weight: bold;
  }
}

.search-box {
  border-bottom: 1px solid rgba(229, 229, 229, 1);
  margin-bottom: 50px;

  .hot-search {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 10px;

    &-item {
      flex-shrink: 0;
      margin-bottom: 10px;

      .arco-link {
        color: rgba(42, 130, 228, 1);

      }
    }
  }
}

.footer-link-box {
  margin-bottom: 30px;

  .content {
    display: flex;
    flex-wrap: wrap;

    .arco-link {
      padding: 0;
      color: rgba(56, 56, 56, 1);
      margin-right: 20px;
    }
  }
}

</style>
<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .page-footer-link {
    padding: 20px 0;

    .search-box {
      margin-bottom: 16px;
    }
  }
  .footer-mobile-coll {
    display: block;
    .content {
      display: flex;
      flex-wrap: wrap;
      padding: 0 12px;
      .arco-link {
        padding: 0;
        color: rgba(56, 56, 56, 1);
        margin-right: 20px;
      }
    }
  }
  .footer-pc-coll{
    display: none;
  }
  :deep(.arco-divider-vertical){
    margin: 0 6px;
  }
  :deep(.arco-collapse-item-header-disabled){
    color: unset;
  }
}
</style>

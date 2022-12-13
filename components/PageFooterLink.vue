<template>
  <div class="page-footer-link">

   <div v-if="hotSearchLoading">
    <a-skeleton animation :loading="hotSearchLoading">
      <a-skeleton-line :rows="3" :widths="[200]" />
      <div style="height:30px"></div>
      <a-skeleton-line :rows="3" />
      <div style="height:50px"></div>
      <a-skeleton-line :rows="3" :widths="[200]" />
      <div style="height:30px"></div>
      <a-skeleton-line :rows="3" />
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
    <div v-if="resize.screenType !== 'MOBILE'">
      <section class="footer-link-box" v-for="firstType in classList">
        <div class="content-title bold" @click="toGoodsList(firstType)">{{ firstType.title }}</div>
        <div class="content">
          <div class="recommendation-item" v-for="secType in firstType.children">
            <a-link @click="toGoodsList(secType)">{{ secType.title }}</a-link>
          </div>
        </div>
      </section>
    </div>
    <div class="footer-mobile-coll" v-if="resize.screenType === 'MOBILE'">
      <a-collapse
        :show-expand-icon="false"
        :bordered="false"
      >
        <a-collapse-item
          v-for="(firstType,index) in classList"
          :header="firstType.title"
          :key="index">
          <template #extra>
            <icon-down />
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
import { useResize } from '~/stores/resize'
const router = useRouter()
const resize = useResize();
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

onMounted(()=>{
  getHotSearchList()

})

</script>

<style scoped lang="scss">
.page-footer-link {
  padding: 20px 30px;
  border-top: 1px solid rgba(229, 229, 229, 1);
}
.footer-mobile-coll{
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

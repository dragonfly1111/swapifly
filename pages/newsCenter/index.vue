<template>
  <div class="global-content">
    <div class="news-head common-row">
      <div class="left">{{ $t('newsCenter.title') }}</div>
      <div class="right">
        <a-input-search class="search-input" @press-enter="searchHandle" v-model="searchKey" @search="searchHandle"
                        :placeholder="$t('newsCenter.search')" search-button/>
      </div>
    </div>
    <div class="news-content common-row">
      <div class="left">
        <template v-if="dataLoading">
          <div v-for="item in 3">
            <div class="pc-skeleton">
              <a-skeleton :animation="true" class="skeleton">
                <div style="width: 800px; display: flex">
                  <a-skeleton-line :line-height="250" :widths="[350]" :rows="1"/>
                  <div style="margin-left: 38px">
                    <a-skeleton-line :line-height="22" :widths="[150]" :rows="1"/>
                    <div style="height: 10px"></div>
                    <a-skeleton-line :line-height="41" :widths="[150]" :rows="1"/>
                    <div style="height: 10px"></div>
                    <a-skeleton-line :line-height="167" :widths="[400]" :rows="1"/>
                  </div>
                </div>
              </a-skeleton>
              <div style="height: 60px"></div>
            </div>
            <div class="mobile-skeleton">
              <a-skeleton :animation="true" class="skeleton">
                <a-skeleton-line :line-height="150" :widths="['100%']" :rows="1"/>
                <div style="height: 10px"></div>
                <a-skeleton-line :line-height="18" :widths="['50%']" :rows="1"/>
                <div style="height: 10px"></div>
                <a-skeleton-line :line-height="24" :widths="['50%']" :rows="1"/>
                <div style="height: 10px"></div>
                <a-skeleton-line :line-height="50" :widths="['100%']" :rows="1"/>
                <div style="height: 40px"></div>
              </a-skeleton>
            </div>

          </div>
        </template>
        <template v-else>
          <template v-if="newsDataList.length > 0">
            <div class="news-box" v-for="item in newsDataList" @click="toNewsDetail(item)">
              <a-image
                  :src="baseImgPrefix + item.img"
                  fit="cover"
                  show-loader>
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <div class="info-box">
                <div class="time">{{parseTime(item.news_time, '{y}-{m}-{d}')}}</div>
                <div class="title">{{ item.title }}</div>
                <div class="des">
                  {{ item.abstract }}
                </div>
              </div>
            </div>
            <div class="pag">
              <a-pagination :total="totalRes" v-model:current="page" :page-size="5" simple @change="changePage"/>
            </div>
          </template>
          <template v-else>
            <div class="no-data">
              <img src="@/assets/images/no-data-box.png" alt="">
              <div class="title">{{ $t('helpCenter.noData') }}</div>
              <div class="tip">{{ $t('helpCenter.noDataTip') }}</div>
            </div>
          </template>
        </template>

      </div>
      <div class="right">
        <div class="title">
          {{ $t('newsCenter.recentNews') }}
        </div>
        <template v-if="dataLoading">
          <div class="recent-skeleton">
            <a-skeleton :animation="true" class="skeleton">
              <a-skeleton-line :line-height="22" :rows="5" :line-spacing="20"/>
            </a-skeleton>
          </div>

        </template>
        <template v-else>
          <div v-for="item in recentNewsList" @click="toNewsDetail(item)" class="news-title">
            {{ item.title }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import {newsList, recentNews} from "~/api/newsCenter";
import {Message} from "@arco-design/web-vue";
import {parseTime} from "~/utils/time";

const runtimeConfig = useRuntimeConfig();
const baseImgPrefix =  runtimeConfig.VITE_OSS_PREFIX
const searchKey = ref('')
const dataLoading = ref(true);
const dataLoading1 = ref(true);
const page = ref(1)
const totalRes = ref(0)
let newsDataList = ref([]);
let recentNewsList = ref([]);

const router = useRouter()
const route = useRoute()
searchKey.value = route.query.title ? route.query.title : ''
const searchHandle = () => {
  page.value = 1
  router.push(`/newsCenter?title=${searchKey.value}`)
  getNewsList()
}
const toNewsDetail = (e) => {
  console.log('toNewsDetail')
  console.log(e)
  router.push(`/newsCenter/detail?id=${e.id}`)
}
const getNewsList = () => {
  dataLoading.value = true
  newsList({
    page: page.value,
    title: searchKey.value
  }).then(res => {
    dataLoading.value = false
    if (res.code === 0) {
      res.data.data.forEach(item => {
        item.news_time = parseTime(item.news_time, '{y}-{m}-{d}')
      })
      newsDataList.value = res.data.data
      totalRes.value = res.data.total
    } else {
      Message.error(res.message)
    }
  })
}
const getRecentNews = () => {
  dataLoading1.value = true
  recentNews().then(res => {
    dataLoading1.value = false
    if (res.code === 0) {
      recentNewsList.value = res.data
    } else {
      Message.error(res.message)
    }
  })
}
const changePage = (e) => {
  getNewsList()
}
getNewsList()
getRecentNews()
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";

.global-content {
  padding-top: 57px;
}

.news-head {
  padding: 55px 0 36px 0;
  border-bottom: 1px solid #CCCCCC;
  display: flex;
  justify-content: space-between;

  .left {
    font-size: 48px;
  }

  .right {
    .search-input {
      width: 305px;
      height: 46px;
      margin-left: 46px;

      :deep(.arco-btn) {
        background: $main-pink;
        width: 46px;
        height: 46px;
      }

      :deep(.arco-icon) {
        width: 15px;
        height: 15px;
      }
    }
  }
}

.news-content {
  margin-top: 46px;
  display: flex;
  justify-content: space-between;

  .left {
    width: 100%;

    .info-box {
      margin-left: 38px;
      color: $main-grey;

      .time {
        font-size: 14px;
        margin-bottom: 10px;
      }

      .title {
        font-size: 28px;
        line-height: 41px;
        margin-bottom: 10px;
        max-width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .des {
        font-size: 14px;
        line-height: 21px;
        max-width: 500px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
      }
    }

    .news-box {
      display: flex;
      cursor: pointer;

      .info-box {
        margin-left: 38px;
        color: $main-grey;

        .time {
          font-size: 14px;
          margin-bottom: 10px;
        }

        .title {
          font-size: 28px;
          line-height: 41px;
          margin-bottom: 10px;
          max-width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .des {
          font-size: 14px;
          line-height: 21px;
          max-width: 500px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
        }
      }

      &:hover {
        .title {
          color: $main-blue;
        }
      }
    }

    .news-box + .news-box {
      margin-top: 61px;
    }

    .no-data {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 200px;

      img {
        width: 86px;
      }

      .title {
        margin-top: 11px;
        color: $main-black-333;
        font-size: 18px;
      }

      .tip {
        color: $grey-font-label;
        margin-top: 10px;
        font-size: 12px;
      }
    }

    .arco-image {
      width: 350px;
      height: 250px;

      :deep(.arco-image-img) {
        width: 350px;
        height: 250px;
      }
    }

  }

  .right {
    width: 322px;
    flex-shrink: 0;

    .title {
      color: $main-black-1D;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 1px solid #E5E6E8;
      padding: 9px 20px;
    }

    .news-title {
      padding: 9px 20px;
      font-size: 14px;
      max-width: 322px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #E5E6E8;
      line-height: 22px;
      cursor: pointer;

      &:hover {
        color: $main-blue;
      }
    }
  }
}

.pag {
  padding-top: 30px;
  padding-bottom: 25px;

  .arco-pagination-simple {
    justify-content: center;

    :deep(.arco-pagination-jumper-input) {
      padding: 0;
      width: 32px;
    }

    :deep(.arco-pagination-jumper-total-page) {
      color: $grey-font-label;
    }
  }
}

.pc-skeleton{
  display: block;
}
.mobile-skeleton{
  display: none;
}
.recent-skeleton{
  padding-left: 20px;
  margin-top: 20px
}
</style>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

@media screen and (max-width: 1000px) {
  .news-head {
    display: block;
    padding: 15px;

    .left {
      font-size: 28px;
    }

    .right {
      margin-top: 12px;

      .search-input {
        margin-left: 0;

      }
    }
  }
  .news-content {
    display: block;
    margin-top: 24px;
    .left{
      .news-box{
        display: block;
        .info-box{
          margin-left: 0;
          .time{
            margin-top: 12px;
          }
          .title{
            margin-top: 12px;
            font-size: 24px;
            line-height: 24px;
          }
        }
      }
      .news-box + .news-box {
        margin-top: 32px;
      }
      .arco-image {
        width: 100%;
        height: 200px;

        :deep(.arco-image-img) {
          width: 100%;
          height: 200px;
        }
      }
    }
    .right{
      width: 100%;
      .title{
        padding: 9px 0;
      }
      .news-title{
        padding: 9px 0;
        width: 100%;
        max-width: 100%;
      }
    }

  }
  .pc-skeleton{
    display: none;
  }
  .mobile-skeleton{
    display: block;
  }
  .recent-skeleton{
    padding-left: 0;
  }
}
</style>

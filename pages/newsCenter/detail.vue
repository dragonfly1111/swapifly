<template>
  <div class="global-content">
    <div class="news-head common-row">
      <div class="left">{{ $t('newsCenter.title') }}</div>
      <div class="right">
        <a-input-search class="search-input" v-model="searchKey" @search="searchHandle" @press-enter="searchHandle" :placeholder="$t('newsCenter.search')"
                        search-button/>
      </div>
    </div>
    <div class="news-detail-content common-row">
      <div class="left">
        <template v-if="!dataLoading">
          <a-image fit="cover" show-loader :src="baseImgPrefix + newsDataDetail.img">
            <template #loader>
              <div class="loader-animate"/>
            </template>
          </a-image>
          <div class="time">{{ newsDataDetail.news_time }}</div>
          <div class="title">{{ newsDataDetail.title }}</div>
          <div class="content" v-html="newsDataDetail.details"></div>
          <div class="recent">
            <div>
              <span class="block-title">{{ $t('newsCenter.recent') }}</span>
            </div>
            <div class="recent-wrap">
              <div class="news-block" v-for="item in recentNewsList.slice(0, 3)" @click="toNewsDetail(item)">
                <a-image width="237" height="170" fit="cover" show-loader :src="baseImgPrefix + item.img">
                  <template #loader>
                    <div class="loader-animate"/>
                  </template>
                </a-image>
                <div class="news-block-title">{{ item.title }}</div>
                <div class="news-block-title">{{ item.news_time }}</div>
              </div>
            </div>
            <div class="line"></div>
            <div class="control">
              <div class="pre control-item" :class="!preNews ? 'hide-control' : ''" @click="toNewsDetail(preNews)">
                <div class="control-but">
                  <icon-left/>
                  {{ $t('newsCenter.preNews') }}
                </div>
                <div class="news-title">{{ preNews ? preNews.title : $t('newsCenter.noNews') }}</div>
              </div>
              <div class="next control-item" :class="!nextNews ? 'hide-control' : ''"  @click="toNewsDetail(nextNews)">
                <!--??????arco?????????<icon-right/> ?????????left????????????-->
                <div class="control-but">
                  {{ $t('newsCenter.nextNews') }}
                  <icon-left/>
                </div>
                <div class="news-title">{{ nextNews ? nextNews.title : $t('newsCenter.noNews') }}</div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="pc-skeleton">
            <a-skeleton :animation="true" class="skeleton">
              <div style="width: 768px">
                <a-skeleton-line :line-height="200" :rows="1"/>
                <div style="width: 120px; margin-top: 34px">
                  <a-skeleton-line :line-height="21" :rows="1"/>
                </div>
                <div style="height: 10px"></div>
                <div style="width: 200px">
                  <a-skeleton-line :line-height="53" :rows="1"/>
                </div>
                <div style="height: 17px"></div>
                <a-skeleton-line :line-height="200" :rows="1"/>
                <div style="display: flex; margin-top: 50px; width: 768px;justify-content: space-between">
                  <a-skeleton-line :line-height="200" :widths="[230]" :rows="1"/>
                  <a-skeleton-line :line-height="200" :widths="[230]" :rows="1"/>
                  <a-skeleton-line :line-height="200" :widths="[230]" :rows="1"/>
                </div>
              </div>
            </a-skeleton>
          </div>
          <div class="mobile-skeleton">
            <div style="width: 100%">
              <a-skeleton :animation="true" class="skeleton">
                <a-skeleton-line :line-height="150" :rows="1"/>
                <div style="width: 120px; margin-top: 12px">
                  <a-skeleton-line :line-height="21" :rows="1"/>
                </div>
                <div style="height: 10px"></div>
                <div style="width: 200px">
                  <a-skeleton-line :line-height="53" :rows="1"/>
                </div>
                <div style="height: 17px"></div>
                <a-skeleton-line :line-height="200" :rows="1"/>
                <div style="height: 17px"></div>
                <a-skeleton-line :line-height="200" :rows="1"/>

              </a-skeleton>

            </div>
          </div>
        </template>
      </div>
      <div class="right">
        <div class="title">
          {{ $t('newsCenter.recentNews') }}
        </div>
        <template v-if="!dataLoading">
          <div v-for="item in recentNewsList" @click="toNewsDetail(item)" class="news-title">
            {{ item.title }}
          </div>
        </template>
        <template v-else>
          <div style="height: 20px"></div>
          <a-skeleton-line :line-height="22" :line-spacing="16" :rows="5"/>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import {newsDetail, recentNews} from "~/api/newsCenter";
import {Message} from "@arco-design/web-vue";
import {parseTime} from "~/utils/time";
import {watch} from "vue";
const runtimeConfig = useRuntimeConfig();
const baseImgPrefix =  runtimeConfig.VITE_OSS_PREFIX
const router = useRouter()
const route = useRoute();
const dataLoading = ref(true);
const dataLoading1 = ref(true);
let newsDataDetail = ref({});
let recentNewsList = ref([]);
let preNews = ref({});
let nextNews = ref({});
const searchKey = ref('');


const searchHandle = (e) => {
  console.log(e)
  router.push(`/newsCenter?title=${e}`)
}

const toNewsDetail = (e) => {
  router.push(`/newsCenter/detail?id=${e.id}`)
}

const getNewsDetail = () => {
  dataLoading.value = true
  newsDetail({
    id: route.query.id
  }).then(res => {
    dataLoading.value = false
    if (res.code === 0) {
      res.data.news.news_time = parseTime(res.data.news.news_time, '{y}-{m}-{d}');
      newsDataDetail.value = res.data.news
      preNews.value = res.data.pro
      nextNews.value = res.data.next
      console.log(res)
    } else {
      Message.error(res.message)
    }
  })
}

const getNewsRecent = () => {
  dataLoading1.value = true
  recentNews().then(res => {
    dataLoading1.value = false
    if (res.code === 0) {
      res.data.forEach(item => {
        item.news_time = parseTime(item.news_time, '{y}-{m}-{d}')
      })
      recentNewsList.value = res.data
    } else {
      Message.error(res.message)
    }
  })
}
watch(() => route.query.id, (newValue, oldValue) => {
  getNewsDetail()
});
getNewsDetail()
getNewsRecent()
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
.news-detail-content {
  margin-top: 44px;
  display: flex;
  justify-content: space-between;

  .left {
    max-width: 768px;

    .time {
      color: #A6A6A6;
      font-size: 14px;
      margin-top: 34px;
    }

    .title {
      color: #D43030;
      font-size: 36px;
      margin-top: 10px;
    }

    .content {
      margin-top: 17px;

      :deep(*) {
        max-width: 900px;
      }
    }

    .recent {
      margin-top: 113px;

      .block-title {
        color: $main-grey;
        font-size: 12px;
        position: relative;

        &::before {
          content: '';
          height: 1px;
          width: 100%;
          position: absolute;
          background: $main-grey;
          top: -8px;
          left: 0;
        }
      }

      .recent-wrap {
        display: flex;
        justify-content: space-between;

        .news-block {
          margin-top: 10px;
          color: $main-grey;
          font-size: 14px;
          width: 237px;
          cursor: pointer;

          .news-img {
            width: 237px;
            height: 170px;
            object-fit: cover;
          }

          .news-block-title {
            height: 21px;
            line-height: 21px;
            width: 237px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .line {
        width: 100%;
        height: 1px;
        background: $grey-font-label;
        margin-top: 43px;
        margin-bottom: 21px;
      }

      .control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 96px;

        .control-item {
          cursor: pointer;
          max-width: 50%;

          .control-but {
            color: $grey-font-label;
            display: flex;
            align-items: center;
          }

          .news-title {
            margin-top: 5px;
            font-size: 16px;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &:hover {
            .news-title {
              color: $main-blue;
            }
          }
        }

        .hide-control {
          visibility: hidden;
          pointer-events: none;
        }

        .next {
          .control-but {
            display: flex;
            justify-content: flex-end;
          }

          :deep(.arco-icon-left) {
            transform: rotate(180deg);
          }
        }

      }
    }

    .arco-image{
      width: 768px;
      height: 438px;
      :deep(.arco-image-img){
        width: 768px;
        height: 438px;
      }
    }
  }

  .right {
    width: 322px;

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
.pc-skeleton{
  display: block;
}
.mobile-skeleton{
  display: none;
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
      display: none;
    }
  }
  .news-detail-content{
    display: block;
    margin-top: 24px;
    .left{
      .time{
        margin-top: 12px;
      }
      .title{
        font-size: 24px;
      }
      .content {
        margin-top: 12px;

        :deep(*) {
          max-width: calc(100vw - 30px);
        }
        :deep(img){
          object-fit: cover;
        }
      }
      .recent{
        margin-top: 32px;
        .control{
          margin-bottom: 24px;
        }
        .line{
          margin: 18px 0;
        }
        .recent-wrap{
          display: block;
          .news-block{
            width: 100%;
            .news-block-title{
              margin-top: 6px;
              width: 100%;
              max-width: 100%;
            }
          }
        }
      }
      .arco-image{
        width: 100%;
        height: 200px;
        :deep(.arco-image-img){
          width: 100%;
          height: 200px;
        }
      }
    }
    .right{
      display: none;
    }
  }
  .pc-skeleton{
    display: none;
  }
  .mobile-skeleton{
    display: block;
  }
}
</style>

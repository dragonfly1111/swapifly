<template>
  <div class="global-content1 common-row">
    <div class="detail-content">
      <div class="left">
        <template v-if="!dataLoading">
          <a-breadcrumb>
            <template #separator>
              <img src="@/assets/images/icon/breadcrumb-separator.png" alt="">
            </template>
            <a-breadcrumb-item>{{ articleDetail.r1 }}</a-breadcrumb-item>
            <a-breadcrumb-item>{{ articleDetail.r2 }}</a-breadcrumb-item>
          </a-breadcrumb>
          <div class="time">{{ articleDetail.create_time }}</div>
          <div class="title">{{ articleDetail.title }}</div>
          <div class="content">
            <div v-html="articleDetail.details"></div>
          </div>
        </template>
        <div v-else>
          <a-skeleton :animation="true" class="skeleton">
            <div style="width: 200px">
              <a-skeleton-line :line-height="22" :rows="1"/>
            </div>
            <div style="height: 10px"></div>
            <div style="width: 120px">
              <a-skeleton-line :line-height="22" :rows="1"/>
            </div>
            <div style="height: 10px"></div>
            <div style="width: 500px">
              <a-skeleton-line :line-height="53" :rows="1"/>
            </div>
            <div style="height: 17px"></div>
            <div style="width: 700px">
              <a-skeleton-line :line-height="300" :rows="1"/>
            </div>
          </a-skeleton>
        </div>

      </div>
      <div class="right">
        <a-input-search class="search-input" :placeholder="$t('newsCenter.search')" v-model="searchKey"
                        @press-enter="searchHandleKey" @search="searchHandle" search-button/>
        <div class="same-title">{{ $t('helpCenter.sameTheme') }}</div>
        <template v-if="!dataLoading">
          <div v-for="item in witharticle" class="other-title" @click="toDetail(item)">
            {{ item.title }}
          </div>
        </template>
        <template v-else>
          <div style="height: 20px"></div>
          <a-skeleton-line :line-height="22" :line-spacing="16" :rows="3"/>
        </template>
      </div>
    </div>
  </div>

</template>
<script setup>
import {helpDetail} from '~/api/helpCenter'
import {Notification} from "@arco-design/web-vue";
import {parseTime} from "~/utils/time";
const searchKey = ref('')
const route = useRoute();
const dataLoading = ref(true);
let articleDetail = ref({});
let witharticle = ref([])
const router = useRouter();
const searchHandleKey = (e) => {
  searchHandle(searchKey.value)
}
const searchHandle = (e) => {
  router.push(`/helpCenter/search?title=${e}`)
}
const getHelpDetail = () => {
  dataLoading.value = true
  helpDetail({
    id: route.query.id
  }).then(res => {
    dataLoading.value = false
    if (res.code === 0) {
      res.data.article.create_time = parseTime(res.data.article.create_time);
      articleDetail.value = res.data.article
      witharticle.value = res.data.witharticle
    } else {
      Notification.error(res.message)
    }
  })
}
const toDetail = (e) => {
  console.log(e)
  router.push(`/helpCenter/detail?id=${e.id}`)
  getHelpDetail()
}

getHelpDetail()
</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

.global-content1 {

}

.detail-content {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;

  .left {
    color: $main-grey;

    .time {
      font-size: 14px;
      margin-top: 10px;
    }

    .title {
      font-size: 36px;
      margin-top: 10px;
      max-width: 750px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .content {
      margin-top: 17px;
      max-width: 750px;
    }
  }

  .right {
    width: 305px;

    .search-input {
      width: 305px;
      height: 46px;

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

    .same-title {
      font-size: 16px;
      font-weight: 700;
      margin-top: 30px;
      padding-left: 11px;
    }

    .other-title {
      font-size: 14px;
      padding-left: 11px;
      margin-top: 20px;
      cursor: pointer;

      &:hover {
        color: $main-blue;
      }
    }
  }
}

:deep(.arco-breadcrumb) {
  color: #333333 !important;
  font-size: 16px;

  .arco-breadcrumb-item {
    color: #333333 !important;
    font-weight: 400;
  }
}

</style>

<template>
  <div class="common-row global-content">
    <div class="user-content">
      <div class="content-title">{{ $t("pages.searchUser") }} “{{ route.query.title }}”</div>
      <section class="user-wrap">
        <div v-if="pageLoading">
          <a-skeleton>
            <div style="display: flex; align-items: center; margin-bottom: 20px" v-for="item in 3">
              <a-skeleton-shape shape="circle" size="large" />
              <div style="margin-left: 10px;">
                <a-skeleton-line :rows="2" :widths="[300]" />
              </div>
            </div>
          </a-skeleton>
        </div>
        <div
          class="user-item"
          v-for="(item, index) in userList"
          :key="item.id"
          @click="router.push('/userDetails?userId=' + item.id)"
        >
          <a-image :src="baseImgPrefix + item.avatar" fit="cover" show-loader>
            <template #loader>
              <div class="loader-animate" />
            </template>
          </a-image>
          <div class="user-info">
            <div class="name">{{ item.nickname }}</div>
            <div class="id">@{{ item.realname }}</div>
            <div class="follow-num">
              <span>{{ item.b_follow }}</span
              >{{ $t("pages.followers") }}
            </div>
          </div>
          <div>
            <a-button
              type="outline"
              class="black-outline-btn"
              v-if="item.type == 0"
              :loading="btnLoading"
              @click.stop="handleFollow(item, index)"
              >{{ $t("pages.follow") }}</a-button
            >
            <a-button
              class="black-btn"
              :loading="btnLoading"
              v-if="item.type == 1"
              @click.stop="handleFollow(item, index)"
              >{{ $t("pages.followIn") }}</a-button
            >
          </div>
        </div>
        <div class="no-user" v-if="!userList.length && !pageLoading">
          <a-empty>
            <template #image>
              <img src="@/assets/images/no-follow.png" alt="" srcset="" />
            </template>
            <h3>{{ $t("pages.searchUserEmpty") }}</h3>
            <p>{{ $t("pages.searchUserEmptyTip") }}</p>
          </a-empty>
        </div>
      </section>
    </div>

    <div class="see-more" v-if="page < lastPage">
      <a-button type="outline" @click="loadMore" :loading="moreLoading">{{
        $t("pages.seeMore")
      }}</a-button>
    </div>

    <AD :advert="googleAd.content"></AD>

    <PageFooterLink></PageFooterLink>
  </div>
</template>

<script setup>
import { getShopList, followUser } from "~/api/shop";
import { getSearchAdvert } from "~/api/ad";
import { Message } from "@arco-design/web-vue";
import { useSysData } from "~/stores/sysData";
import { useUserInfo } from "~/stores/userInfo";
const userInfo = useUserInfo();
const runtimeConfig = useRuntimeConfig();
const baseImgPrefix = runtimeConfig.VITE_OSS_PREFIX;
const route = useRoute();
const router = useRouter();
const page = ref(1);
const limit = ref(8);
const lastPage = ref(0);
const pageLoading = ref(true);
const btnLoading = ref(false);
const moreLoading = ref(false);
const googleAd = ref({});
const userList = ref([]);

const getAd = () => {
  getSearchAdvert().then((res) => {
    googleAd.value = res.data;
  });
};

const handleQuery = (data) => {
  page.value = 1;
  userList.value = [];
  getSearchData(data);
};

const searchKey = computed(() => {
  return route.query.title;
});

const getSearchData = (data) => {
  let requery = { title: searchKey.value, page: page.value, limit: limit.value };
  getShopList({ title: searchKey.value, page: page.value, limit: limit.value })
    .then((res) => {
      if (res.code === 0) {
        userList.value = [...userList.value, ...res.data.data];
        lastPage.value = res.data.last_page;
      }
    })
    .finally(() => {
      pageLoading.value = false;
      moreLoading.value = false;
    });
};

// 关注/取消关注
const handleFollow = (row, index) => {
  if (!userInfo.checkLogin()) return;
  let reqData = {
    id: row.id,
    state: row.type == 1 ? 2 : 1,
  };
  followUser(reqData)
    .then((res) => {
      if (res.code == 0) {
        row.b_follow = row.type == 1 ? row.b_follow - 1 : row.b_follow + 1;
        row.type = row.type == 1 ? 0 : 1;
        Message.success(res.message);
      } else {
        Message.error(res.message);
      }
    })
    .finally(() => {});
};

const loadMore = () => {
  page.value++;
  moreLoading.value = true;
  handleQuery();
};

watch(
  () => route.query,
  (newValue, oldValue) => {
    handleQuery(newValue || {});
  },
  { immediate: true }
);

getAd();
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";
.user-content {
  width: 90%;
  max-width: 600px;
  margin: auto;
  .content-title {
    font-size: 20px;
    margin: 20px 0;
  }
  .user-wrap {
    .user-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 20px 12px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
      }
      :deep(.arco-image) {
        flex-shrink: 0;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 14px;
        .arco-image-img {
          width: 100%;
          height: 100%;
        }
      }
      .user-info {
        flex: auto;
        div {
          margin-bottom: 20px;
        }
        .follow-num {
          span {
            margin-right: 8px;
            text-decoration: underline;
          }
        }
      }
      :deep(.arco-btn) {
        height: 34px;
        width: 90px;
      }
      .black-outline-btn {
        border: 1px solid $grey-font-label !important;
      }
    }
  }
}
.no-user {
  padding: 8vh 0;
  h3 {
    color: $main-grey;
  }
  img {
    width: 100px;
    object-fit: contain;
  }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .user-content {
    width: 100%;
    .user-wrap {
      .user-item {
        :deep(.arco-image) {
          width: 80px;
          height: 80px;
          margin-right: 10px;
        }
        .user-info {
          div {
            margin-bottom: 12px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="common-row global-content user-detail-content">


    <div class="user-banner">
      <a-image class="pc-banner" :src="testImg" fit="cover" show-loader>
        <template #loader>
          <div class="loader-animate"/>
        </template>
      </a-image>
      <a-image class="mobile-banner" :src="testImgMobile" fit="cover" show-loader>
        <template #loader>
          <div class="loader-animate"/>
        </template>
      </a-image>
    </div>

    <div class="user-details">
      <a-tabs class="pc-tab" :active-key="activeTab"
              @change="handleTabChange" :class="{ noline: activeTab == 'followRow' }">
        <template #extra>
          <a-space class="extra-btn" v-if="hasMounted">
            <a-button type="outline" v-if="userInfo.id == form.id" @click="router.push('/userProfile')">{{
                $t("profile.edit_profile")
              }}
            </a-button>
            <a-button type="outline" v-if="userInfo.id != form.id" :loading="btnLoading" @click="handleFollow">
              {{ form.isfollow == 1 ? $t("pages.cancelFollow") : $t("pages.follow") }}
            </a-button>
            <a-button type="outline" v-if="userInfo.id != form.id" @click="handleReport">{{
                $t("pages.report")
              }}
            </a-button>
          </a-space>
        </template>
        <a-tab-pane key="goodsRow" :title="$t('pages.goods')"></a-tab-pane>
        <a-tab-pane key="evaluateRow" :title="$t('pages.evaluate')"></a-tab-pane>
        <a-tab-pane key="businessInformation" :title="$t('pages.businessInformation')"
                    v-if="form.shop == 1 && form.p_type == 2">
        </a-tab-pane>
      </a-tabs>
      <div class="tab-content" v-if="hasMounted">
        <div class="left-content">
          <UserCard :advert="advert" :page-loading="pageLoading" :form="form" @toFollow="toFollow"
                    @openRegBusiness="openRegBusiness"></UserCard>
          <a-space class="extra-btn extra-btn-m">
            <a-button type="outline" v-if="userInfo.id != form.id" :loading="btnLoading" @click="handleFollow">
              {{ form.isfollow == 1 ? $t("pages.cancelFollow") : $t("pages.follow") }}
            </a-button>
            <a-button type="outline" v-if="userInfo.id != form.id" @click="handleReport">{{
                $t("pages.report")
              }}
            </a-button>
          </a-space>
        </div>
        <a-tabs class="m-tab" style="margin-left: 0px" :active-key="activeTab"
                @change="handleTabChange" :class="{ noline: activeTab == 'followRow' }">
          <a-tab-pane key="goodsRow" :title="$t('pages.goods')"></a-tab-pane>
          <a-tab-pane key="evaluateRow" :title="$t('pages.evaluate')"></a-tab-pane>
          <a-tab-pane key="businessInformation" :title="$t('pages.businessInformation')"
                      v-if="form.shop == 1 && form.p_type == 2">
          </a-tab-pane>
        </a-tabs>
        <div class="right-content">
          <GoodsRow :userData="form" ref="goodsRow" v-show="activeTab == 'goodsRow'"></GoodsRow>
          <EvaluateRow :userData="form" ref="evaluateRow" v-show="activeTab == 'evaluateRow'"></EvaluateRow>
          <BusinessInformation :userData="form" ref="businessInformation" v-show="activeTab == 'businessInformation'">
          </BusinessInformation>
          <FollowRow v-show="activeTab == 'followRow'" ref="followRow" @change="getInfo"></FollowRow>
        </div>
      </div>
    </div>
    <div class="foot-link">
      <PageFooterLink></PageFooterLink>
    </div>

    <!-- 举报用户 -->
    <ReportModal ref="reportModal"></ReportModal>
  </div>
</template>
<script setup>
import UserCard from "./components/UserCard";
import GoodsRow from "./components/GoodsRow";
import FollowRow from "./components/FollowRow";
import EvaluateRow from "./components/EvaluateRow";
import BusinessInformation from "./components/BusinessInformation";
import {useUserInfo} from "~/stores/userInfo";
import {getUserDetails, followUser} from "~/api/shop";
import {Message} from "@arco-design/web-vue";
import testBanner from "@/assets/images/test-banner.png";
import testBannerMobile from "@/assets/images/test-banner-mobile.png";

const userInfo = useUserInfo();
const router = useRouter();
const form = ref({id: "", isfollow: 0});
const reportModal = ref(null);
const evaluateRow = ref(null);
const goodsRow = ref(null);
const businessInformation = ref(null);
const followRow = ref(null);
const btnLoading = ref(false);
const pageLoading = ref(true);
const advert = ref("");
const testImg = testBanner;
const testImgMobile = testBannerMobile;
const activeTab = ref("goodsRow"); //goodsRow
const hasMounted = ref(false)

const handleTabChange = (e) => {
  activeTab.value = e;
  switch (e) {
    case "goodsRow":
      nextTick(() => {
        goodsRow.value.initData();
      })
      break;
    case "evaluateRow":
      nextTick(() => {
        evaluateRow.value.initData();
      })
      break;
    case "businessInformation":
      nextTick(() => {
        businessInformation.value.handleQuery();
      })
      break;
  }
};

const getInfo = () => {
  getUserDetails(form.value.id).then((res) => {
    if (res.code == 0) {
      form.value = res.data.shop;
      form.value.p_type = res.data.p_type;
      advert.value = res.data.advert.content;
    }
  }).finally(() => {
    pageLoading.value = false
  })
};

// 关注取消用户
const handleFollow = () => {
  if (!userInfo.checkLogin()) return
  let state = form.value.isfollow == 1 ? 2 : 1;
  btnLoading.value = true;
  followUser({
    id: form.value.id,
    state,
  })
      .then((res) => {
        if (res.code === 0) {
          Message.success(res.message);
          getInfo();
        } else {
          Message.error(res.message);
        }
      })
      .finally(() => {
        btnLoading.value = false;
      });
};

// 举报用户
const handleReport = () => {
  if (!userInfo.checkLogin()) return
  reportModal.value.openDialog(form.value, "user");
};
// 注册商户
const openRegBusiness = () => {
  handleTabChange("businessInformation");
  businessInformation.value.toAuthentication();
};
const toFollow = (e) => {
  if (!userInfo.checkLogin()) return
  activeTab.value = "followRow";
  followRow.value.resetQuery(e);
};

const initData = () => {
  form.value.id = router.currentRoute.value.query.userId;
  getInfo();
  activeTab.value = "goodsRow";
  goodsRow.value.initData();
};
watch(
    () => router.currentRoute.value.query.userId,
    (newValue, oldValue) => {
      if (router.currentRoute.value.path == "/userDetails" && newValue !== oldValue) {
        initData();
      }
    }
);

onMounted(() => {
  hasMounted.value = true
  nextTick(() => {
    if (router.currentRoute.value.query.userId) {
      form.value.id = router.currentRoute.value.query.userId;
      getInfo();
      goodsRow.value.initData();
    }
    if (router.currentRoute.value.query.tab) {
      activeTab.value = router.currentRoute.value.query.tab;
      evaluateRow.value.initData();
    }
  })
});
</script>
<style lang="scss" scoped>
@import "assets/sass/var";

.user-banner {
  width: 100%;
  height: 130px;
  .pc-banner{
      display: block;
    }
    .mobile-banner{
      display: none;
    }

  :deep(.arco-image-img) {
    width: 100%;
    height: 100%;
  }

  :deep(.arco-image) {
    width: 100%;
    height: 100%;
  }
}

.user-details {
  margin-bottom: 40px;

  :deep(.arco-tabs-nav-tab) {
    padding-left: 320px;
    padding-top: 15px;
  }

  :deep(.arco-tabs-tab) {
    color: $grey-font-label;
    font-size: 16px;
  }

  :deep(.arco-tabs-nav-ink) {
    background-color: $main-pink;
  }

  .noline {
    :deep(.arco-tabs-nav-ink) {
      display: none;
    }
  }

  :deep(.arco-tabs-tab-active, .arco-tabs-tab-active:hover) {
    color: $main-grey;
  }

  .extra-btn {
    :deep(.arco-btn) {
      min-width: 90px;
      border: 1px solid $main-grey;
      color: $main-grey;
      padding-left: 5px;
      padding-right: 5px;
      background-color: $main-white;

      &:hover {
        background-color: #eee;
      }
    }
  }
}

.tab-content {
  display: flex;
  justify-content: space-between;

  .left-content {
    width: 300px;
    flex-shrink: 0;
    margin-right: 30px;
  }

  .right-content {
    border: 1px solid $main-grey-border;
    border-radius: 2px;
    width: calc(100% - 340px);
    flex: auto;
    margin-top: 10px;
  }
}

.pc-tab {
  display: block;
}

.m-tab {
  display: none;
}

.extra-btn-m {
  display: none;
}
</style>
<style lang="scss" scoped>
@import "assets/sass/var";

@media screen and (min-width: 0px) and (max-width: 1000px) {
  .user-details {
    :deep(.arco-tabs-nav-tab) {
      padding-left: 0;
      padding-top: 0;
    }
  }
  .user-detail-content {
    padding-left: 0;
    padding-right: 0;
  }
  .user-banner {
    height: 105px;
    .pc-banner{
      display: none;
    }
    .mobile-banner{
      display: block;
    }
  }
  .profile-box {
    width: 100%;

    .header {
      padding-top: 40px;
    }
  }
  .extra-btn {
    position: absolute;
    right: 10px;
    top: 195px;
    z-index: 888;
    .arco-btn:hover{
      background: $main-white;
    }
  }
  .foot-link {
    padding: 0 17px;
  }
  .tab-content {
    display: block;

    .left-content {
      width: 100%;
    }

    .right-content {
      width: 100%;
      border: unset;
    }
  }
  .pc-tab {
    display: none;
  }
  .m-tab {
    display: block;
  }
  .extra-btn-m {
    display: flex;
  }
  .tab-content {
    display: block;

    .left-content {
      width: 100%;
      margin-right: 0;
    }

    .right-content {
      border: 0;
      border-radius: 0;
      width: 100%;
      margin-top: -10px;
    }
  }
}
</style>

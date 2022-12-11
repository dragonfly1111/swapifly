<template>
  <div class="common-row global-content user-detail-content">


    <div class="user-banner">
      <a-image :src="testImg" fit="cover" show-loader>
        <template #loader>
          <div class="loader-animate" />
        </template>
      </a-image>
    </div>

    <div class="user-details">
      <a-tabs v-if="['PC', 'SCALE'].includes(resize.screenType)" :active-key="activeTab"
        @change="handleTabChange" :class="{ noline: activeTab == 'followRow' }">
        <template #extra>
          <a-space class="extra-btn">
            <a-button type="outline" v-if="userInfo.id == form.id" @click="router.push('/userProfile')">{{
                $t("profile.edit_profile")
            }}</a-button>
            <a-button type="outline" v-if="userInfo.id != form.id" :loading="btnLoading" @click="handleFollow">
              {{ form.isfollow == 1 ? $t("pages.cancelFollow") : $t("pages.follow") }}
            </a-button>
            <a-button type="outline" v-if="userInfo.id != form.id" @click="handleReport">{{
                $t("pages.report")
            }}</a-button>
          </a-space>
        </template>
        <a-tab-pane key="goodsRow" :title="$t('pages.goods')"></a-tab-pane>
        <a-tab-pane key="evaluateRow" :title="$t('pages.evaluate')"></a-tab-pane>
        <a-tab-pane key="businessInformation" :title="$t('pages.businessInformation')"
          v-if="form.shop == 1 || form.p_type == 2">
        </a-tab-pane>
      </a-tabs>
      <div class="tab-content">
        <div class="left-content">
          <UserCard :advert="advert" :page-loading="pageLoading" :form="form" @toFollow="toFollow" @openRegBusiness="openRegBusiness"></UserCard>
          <a-space class="extra-btn" v-if="resize.screenType === 'MOBILE'">
            <a-button type="outline" v-if="userInfo.id == form.id" @click="router.push('/settingProfile')">{{
                $t("profile.mobile_setting")
            }}</a-button>
            <a-button type="outline" v-if="userInfo.id != form.id" :loading="btnLoading" @click="handleFollow">
              {{ form.isfollow == 1 ? $t("pages.cancelFollow") : $t("pages.follow") }}
            </a-button>
            <a-button type="outline" v-if="userInfo.id != form.id" @click="handleReport">{{
                $t("pages.report")
            }}</a-button>
          </a-space>
        </div>
<!--        <a-tabs v-if="resize.screenType === 'MOBILE'" style="margin-left: 0px" :active-key="activeTab"-->
<!--          @change="handleTabChange" :class="{ noline: activeTab == 'followRow' }">-->
<!--          <a-tab-pane key="goodsRow" :title="$t('pages.goods')"></a-tab-pane>-->
<!--          <a-tab-pane key="evaluateRow" :title="$t('pages.evaluate')"></a-tab-pane>-->
<!--          <a-tab-pane key="businessInformation" :title="$t('pages.businessInformation')"-->
<!--            v-if="form.shop == 1 || form.p_type == 2">-->
<!--          </a-tab-pane>-->
<!--        </a-tabs>-->
        <div class="right-content">
          <GoodsRow :userData="form" ref="goodsRow" v-if="activeTab == 'goodsRow'"></GoodsRow>
          <EvaluateRow :userData="form" ref="evaluateRow" v-if="activeTab == 'evaluateRow'"></EvaluateRow>
          <BusinessInformation :userData="form" ref="businessInformation" v-if="activeTab == 'businessInformation'">
          </BusinessInformation>
          <FollowRow v-if="activeTab == 'followRow'" ref="followRow" @change="getInfo"></FollowRow>
        </div>
      </div>
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
import { useUserInfo } from "~/stores/userInfo";
import { getUserDetails, followUser } from "~/api/shop";
import { useResize } from "~/stores/resize";
import { Notification } from "@arco-design/web-vue";
import testBanner from "@/assets/images/test-banner.png";
const userInfo = useUserInfo();
const router = useRouter();
const resize = useResize();
const form = ref({ id: "", isfollow: 0 });
const reportModal = ref(null);
const evaluateRow = ref(null);
const goodsRow = ref(null);
const businessInformation = ref(null);
const followRow = ref(null);
const btnLoading = ref(false);
const pageLoading = ref(true);
const advert = ref("");
const testImg = testBanner;
const activeTab = ref("goodsRow"); //goodsRow

const handleTabChange = (e) => {
  activeTab.value = e;
  switch (e) {
    case "goodsRow":
      nextTick(()=>{
        goodsRow.value.initData();
      })
      break;
    case "evaluateRow":
      nextTick(()=>{
        evaluateRow.value.initData();
      })
      break;
    case "businessInformation":
      nextTick(()=>{
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
  }).finally(()=>{
    pageLoading.value = false
  })
};

// 关注取消用户
const handleFollow = () => {
  let state = form.value.isfollow == 1 ? 2 : 1;
  btnLoading.value = true;
  followUser({
    id: form.value.id,
    state,
  })
    .then((res) => {
      if (res.code === 0) {
        Notification.success(res.message);
        getInfo();
      } else {
        Notification.error(res.message);
      }
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

// 举报用户
const handleReport = () => {
  reportModal.value.openDialog(form.value, "user");
};
// 注册商户
const openRegBusiness = () => {
  handleTabChange("businessInformation");
  businessInformation.value.toAuthentication();
};
const toFollow = (e) => {
  followRow.value.resetQuery(e);
  activeTab.value = "followRow";
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
  if (router.currentRoute.value.query.userId) {
    form.value.id = router.currentRoute.value.query.userId;
    getInfo();
    goodsRow.value.initData();
  }
  if (router.currentRoute.value.query.tab) {
    activeTab.value = router.currentRoute.value.query.tab;
    evaluateRow.value.initData();
  }
});
</script>
<style lang="scss" scoped>
@import "assets/sass/var";

.user-banner {
  width: 100%;
  height: 130px;

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
      width: 90px;
      border: 1px solid $main-grey;
      color: $main-grey;

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
   border: 1px solid #e5e5e5;
   border-radius: 2px;
   width: calc(100% - 340px);
   flex: auto;
   margin-top: 10px;
 }
}
</style>

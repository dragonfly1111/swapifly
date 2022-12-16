<template>
  <div class="user-container">
    <div class="user-icon">
      <a-image :src="baseImgPrefix + form.avatar" fit="cover" show-loader>
        <template #loader>
          <div class="loader-animate" />
        </template>
      </a-image>
    </div>
    <div class="user-body" v-if="!pageLoading">
      <h2>{{ form.nickname }}</h2>
      <div class="user-desc">
        <a-space direction="vertical" fill>
          <div class="userid">@{{ form.realname }}</div>
          <a-space size="mini">
            <span>{{ form.stars }}</span>
            <icon-star-fill class="star" :size="18" />
            <span>（{{ form.e_num }}review）</span>
          </a-space>
          <a-space>
            <span>{{ form.region }}</span>
            <span>{{ form.region_en }}</span>
            <span>{{ form.create_time }}</span>
          </a-space>
          <a-space v-if="form.email">
            <img class="email-img" src="@/assets/images/icon/email_black.png" alt="" />
            <span>{{ $t("pages.verified") }}</span>
          </a-space>
          <div>{{ getRStateLabel() }}</div>
          <a-space class="link-row">
            <div @click="changeFollow(0)">{{ form.bfollow }} {{ $t("pages.followers") }}</div>
            <div @click="changeFollow(1)">{{ form.follow }} {{ $t("pages.followIn") }}</div>
          </a-space>
          <div v-if="resize.screenType !== 'MOBILE'" class="user-desc-content">
            {{ form.describe }}
          </div>
        </a-space>
      </div>
      <div class="look-click-rate" v-if="userInfo.id == form.id && resize.screenType !== 'MOBILE'">
        <a-space direction="vertical" fill>
          <div>{{ form.qday }}</div>
          <div>{{ $t("pages.visitorYourTip") }}</div>
          <a-button class="look-btn black-btn" type="primary" @click="openVisitTimes">{{
            $t("pages.lookClickRate")
          }}</a-button>
        </a-space>
      </div>
      <div class="registered-btn" v-if="(form.shop == 1)">
        <img src="@/assets/images/swapifly-logo.png" alt="" />
        {{ $t("pages.registeredMerchant") }}
      </div>
    </div>

    <AD v-if="resize.screenType !== 'MOBILE'" width="300px" :advert="props.advert"></AD>

    <ClickRateModal ref="clickRateModal"></ClickRateModal>
  </div>
</template>
<script setup>
import { useUserInfo } from "~/stores/userInfo";
import { useI18n } from "vue-i18n";
import { useResize } from "~/stores/resize";
const { t } = useI18n();
const appConfig = useAppConfig();
const baseImgPrefix = appConfig.baseImgPrefix;
const resize = useResize();
const userInfo = useUserInfo();
const router = useRouter();
const clickRateModal = ref(null);
const emits = defineEmits(["toFollow", "openRegBusiness"]);
// 回复频率
const getRStateLabel = () => {
  let rStateOptions = {
    1: t("rState.efficient"),
    2: t("rState.goodEfficiency"),
    3: t("rState.notReplying"),
  };
  return rStateOptions[form.value.r_state] || "";
};
const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
  advert: {
    type: String,
    default: "",
  },
  pageLoading: {
    type: Boolean,
    default: true,
  },
});

const form = computed(() => {
  return props.form;
});

// 查看被关注/已关注
const changeFollow = (e) => {
  emits("toFollow", e);
};
// 注册商户
const openRegBusiness = () => {
  emits("openRegBusiness");
};
// 查看点击率
const openVisitTimes = () => {
  clickRateModal.value.openDialog();
};
onMounted(() => {
  form.value.userId = router.currentRoute.value.query.userId;
});
</script>
<style lang="scss" scoped>
@import "assets/sass/var";

.user-container {
  margin-top: -100px;
  position: relative;
  z-index: 50;
  margin-bottom: 10px;
}

.user-icon {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #fff;
  margin-left: 8px;
  :deep(.arco-image-img) {
    width: 100%;
    height: 100%;
  }
  :deep(.arco-image) {
    width: 100%;
    height: 100%;
  }
}
.user-body {
  position: relative;
  margin-left: 3px;
  h2 {
    margin: 10px 0;
    font-weight: 400;
    font-size: 26px;
    word-break: break-all;
  }
  .user-desc {
    .userid {
      color: $grey-font-label;
    }
    .star {
      color: #ffb400;
    }
    .email-img {
      width: 20px;
    }
    .link-row {
      div {
        color: $main-grey;
        text-decoration: underline;
        padding-left: 2px;
        padding-right: 2px;
        cursor: pointer;
        &:hover {
          background-color: #eee;
        }
      }
    }
    .user-desc-content {
      min-height: 80px;
      word-break: break-all;
    }
  }

  .look-click-rate {
    border: 1px solid #f2f2f2;
    border-radius: 2px;
    padding: 20px;
    margin: 20px 0;

    .look-btn {
      margin-top: 20px;
    }
  }
  .registered-btn {
    position: absolute;
    // cursor: pointer;
    top: 55px;
    right: 5px;
    border-radius: 4px;
    border: 1px solid $grey-font-label;
    padding: 8px 15px 8px 42px;
    img {
      position: absolute;
      top: -15px;
      left: 4px;
      width: 38px;
    }
  }
}

@media screen and (min-width: 0px) and (max-width: 1000px) {
  .user-container {
    margin-top: -50px !important;
    padding: 0 17px;
    .user-icon {
      width: 100px !important;
      height: 100px !important;
      margin-left: 0;
    }
    .user-body {
      h2 {
        font-size: 16px;
      }
      .registered-btn {
        top: 20% !important;
        right: 10px !important;
      }
    }
  }
}
</style>

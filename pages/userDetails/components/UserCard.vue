<template>
  <div class="user-container">
    <div class="user-icon">
      <img :src="testImg" alt="" srcset="" />
    </div>
    <div class="user-body">
      <h2>用戶名稱</h2>
      <div class="user-desc">
        <a-space direction="vertical" fill>
          <div class="userid">@用户id</div>
          <a-space>
            <span>286</span>
            <icon-star-fill class="star" :size="18" />
            <span>（99review）</span>
          </a-space>
          <a-space>
            <span>香港</span>
            <span>Joined</span>
            <span>2年前</span>
          </a-space>
          <a-space>
            <img class="email-img" src="@/assets/images/icon/email_black.png" alt="" />
            <span>已驗證</span>
          </a-space>
          <div>回复频率高</div>
          <a-space class="link-row">
            <div  @click="changeFollow(0)">999 Followers</div>
            <div  @click="changeFollow(1)">999 Follow緊</div>
          </a-space>
          <div class="user-desc-content">個人簡介文本內容</div>
        </a-space>
      </div>
      <div class="look-click-rate" v-if="userInfo.id == form.userId">
        <a-space direction="vertical" fill>
          <div>999</div>
          <div>{{ $t("pages.visitorYourTip") }}</div>
          <a-button class="look-btn black-btn" type="primary" @click="openVisitTimes">{{ $t("pages.lookClickRate") }}</a-button>
        </a-space>
      </div>
      <div class="registered-btn">
        <img src="@/assets/images/swapifly-logo.png" alt="" />
        {{ $t("pages.registeredMerchant") }}
      </div>
    </div>

    <AD width="300px"></AD>

    <ClickRateModal ref="clickRateModal"></ClickRateModal>
  </div>
</template>
<script setup>
import { useUserInfo } from "~/stores/userInfo";
const userInfo = useUserInfo();
const router = useRouter();
const form = reactive({ userId: "" });
const clickRateModal = ref(null)
const emits = defineEmits(["toFollow"]);

const testImg =
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";

// 查看被关注/已关注
const changeFollow = (e) => {
  emits("toFollow", e);
};
// 查看点击率
const openVisitTimes = () =>{
  clickRateModal.value.openDialog()
}
onMounted(() => {
  form.userId = router.currentRoute.value.query.userId;
});
</script>
<style lang="scss" scoped>
@import "assets/sass/var";

.user-container {
  margin-top: -100px;
  position: relative;
  z-index: 50;
}
.user-icon {
  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #fff;
    margin-left: 8px;
  }
}
.user-body {
  position: relative;
  h2 {
    margin: 10px 0;
    font-weight: 400;
    font-size: 26px;
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
      div{
        color: $main-grey;
        text-decoration: underline;
        padding-left: 2px;
        padding-right: 2px;
        cursor: pointer;
        &:hover{
          background-color: #eee;
        }
      }
    }
    .user-desc-content {
      min-height: 80px;
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
    cursor: pointer;
    top: 45px;
    right: 10px;
    border-radius: 4px;
    border: 1px solid $grey-font-label;
    padding: 8px 15px 8px 48px;
    img {
      position: absolute;
      top: -15px;
      left: 6px;
      width: 38px;
    }
  }
}
</style>

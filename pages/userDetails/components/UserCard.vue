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
            <a-link href="link">999 Followers</a-link>
            <a-link href="link">999 Follow緊</a-link>
          </a-space>
          <div class="user-desc-content">個人簡介文本內容</div>
        </a-space>
      </div>
      <div class="look-click-rate">
        <a-space direction="vertical" fill>
          <div>999</div>
          <div>{{ $t("pages.visitorYourTip") }}</div>
          <a-button class="look-btn" type="primary">{{$t('pages.lookClickRate')}}</a-button>
        </a-space>
      </div>
    </div>

    <AD width="95%"></AD>
  </div>
</template>
<script setup>
const testImg =
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
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
      :deep(.arco-link) {
        color: $main-grey;
        text-decoration: underline;
        padding-left: 0;
        padding-right: 0;
      }
    }
    .user-desc-content {
      min-height: 80px;
    }
  }

  .look-click-rate {
    border: 1px solid #F2F2F2;
    border-radius: 2px;
    padding: 20px;
    margin: 20px 0;
    
    .look-btn{
        background-color: $main-grey;
        color: #fff;
        margin-top: 20px;
    }
  }
}
</style>
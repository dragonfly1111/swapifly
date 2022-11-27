<template>
  <div class="common-row global-content">
    <AD height="160px"></AD>

    <section class="section-wrapper goods-wrapper">
      <a-breadcrumb>
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Channel</a-breadcrumb-item>
        <a-breadcrumb-item>News</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="section-content">
        <div class="goods-swiper">
          <!-- Swiper -->
          <div class="swiper mySwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in images">
                <a-image width="100%" :src="item" />
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div class="goods-info">
          <a-row justify="space-between" :gutter="40">
            <a-col flex="auto" class="goods-content">
              <div class="goods-name">商品名称</div>
              <a-row justify="space-between" class="goods-desc">
                <a-col :span="8">
                  <icon-common />
                  <span>幾乎全新</span>
                  <icon-info-circle />
                </a-col>
                <a-col :span="8">
                  <icon-user-group />
                  <span>面交</span>
                </a-col>
                <a-col :span="8">
                  <icon-location />
                  <span>香港</span>
                </a-col>
              </a-row>
              <a-typography>
                <a-typography-paragraph
                  :ellipsis="{
                    rows: 6,
                    expandable: true,
                  }"
                >
                  A design is a plan or specification for the construction of an object or system or
                  for the implementation of an activity or process, or the result of that plan or
                  specification in the form of a prototype, product or process. The verb to design
                  expresses the process of developing a design. The verb to design expresses the
                  process of developing a design. A design is a plan or specification for the
                  construction of an object or system or for the implementation of an activity or
                  process, or the result of that plan or specification in the form of a prototype,
                  product or process. The verb to design expresses the process of developing a
                  design. The verb to design expresses the process of developing a design.
                  <template #expand-node="{ expanded }">
                    {{ expanded ? $t("pages.expanded") : $t("pages.unfoldMore") }}
                  </template>
                </a-typography-paragraph>

                <a-typography-title :heading="4" class="mt30">{{
                  $t("pages.handDeliver")
                }}</a-typography-title>
                <a-typography-paragraph>
                  <div class="trade-type-item">
                    <a-space align="start" :strokeWidth="2">
                      <icon-location :size="18" />
                      <div>
                        <div>昌裕大廈</div>
                        <div class="grey">Kent Rd, Kowloon City</div>
                      </div>
                    </a-space>
                  </div>
                  <div>
                    <a-space align="start" :strokeWidth="2">
                      <icon-location :size="18" />
                      <div>
                        <div>昌裕大廈</div>
                        <div class="grey">Kent Rd, Kowloon City</div>
                      </div>
                    </a-space>
                  </div>
                </a-typography-paragraph>
                <a-typography-title :heading="4" class="mt30">{{
                  $t("pages.postAndCourier")
                }}</a-typography-title>
                <a-typography-paragraph class="grey">
                  詳細文本內容詳細文本內容詳細文本內容詳細文本內容
                </a-typography-paragraph>
              </a-typography>
              <div class="module-box">
                <a-divider orientation="left" class="module-header">{{
                  $t("pages.viewSeller")
                }}</a-divider>
                <a-row justify="space-between" :gutter="20">
                  <a-col flex="250px" class="seller-box">
                    <a-avatar :size="100">
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                    <div class="seller-info">
                      <div>用户名称</div>
                      <div class="grey">@用户id</div>
                      <div class="fs12">
                        <span>joined</span>
                        <span>2年前</span>
                      </div>
                      <div class="fs12">回復頻率高</div>
                      <div class="fs12">
                        <img class="email-icon" src="@/assets/images/icon/email_black.png" />
                        <span>已验证</span>
                      </div>
                    </div>
                  </a-col>
                  <a-col flex="auto" class="comment-box">
                    <a-space class="comment-header">
                      <span>用户名称</span>
                      <span>获得的评价</span>
                      <span class="fs12">286</span>
                      <span><icon-star-fill /></span>
                      <span class="fs12">（99review）</span>
                    </a-space>
                    <EvaluateList :showSource="false" :showLine="false"></EvaluateList>
                    <a-link class="see-more-comment">
                      {{ $t("pages.viewAllComment") }}
                      <icon-left />
                    </a-link>
                  </a-col>
                </a-row>
              </div>
            </a-col>

            <!-- 用户信息 -->
            <a-col flex="340px" class="right-box">
              <div class="user-card">
                <a-comment author="Socrates" datetime="用户@id" class="user-info">
                  <template #content>
                    <span>286</span>
                    <icon-star-fill :size="16" />
                    <span>（99review）</span>
                  </template>
                  <template #avatar>
                    <a-avatar>
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                </a-comment>
                <a-button class="to-talk">{{ $t("pages.viewConversations") }}</a-button>
                <div class="center">{{ $t("pages.shouldLoginTip") }}</div>
                <a-input-search
                  placeholder="HK$ 888"
                  :button-text="$t('pages.bid')"
                  search-button
                  class="bid-input"
                />
              </div>
              <AD width="86%" height="560px"></AD>
            </a-col>
          </a-row>

          <div class="module-box">
            <a-divider orientation="left" class="module-header">{{
              $t("pages.similarGoods")
            }}</a-divider>
            <ProductCard></ProductCard>
          </div>

          <div class="see-more">
            <a-button type="outline">{{ $t("pages.seeMore") }}</a-button>
          </div>
        </div>
      </div>
    </section>

    <PageFooterLink></PageFooterLink>
  </div>
</template>

<script setup>
import EvaluateList from "@/pages/userDetails/components/EvaluateList.vue";
const swiper = ref(null);
const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp",
];
const handleQuery = (data) => {};

const initSwiper = () => {
  swiper.value = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
};

onMounted(async () => {
  await nextTick();
  initSwiper();
});
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";
@import "assets/sass/swiper.scss";

.grey {
  color: $grey-font-label;
}
.mt30 {
  margin-top: 30px;
}

.section-wrapper {
  margin: 30px auto;
  :deep(.arco-breadcrumb-item) {
    color: $grey-font-label;
    cursor: pointer;
    &:hover {
      color: $main-grey;
    }
  }
  .section-content {
    margin: 10px 0;
    .goods-swiper {
      // height: 300px;
      .arco-image {
        height: 0;
        padding-bottom: 100%;
        cursor: pointer;
        :deep(.arco-image-img){
            object-fit: cover;
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
        }
      }
    }
  }
  .goods-content {
    width: calc(100% - 340px);
    :deep(.arco-typography-operation-expand) {
      display: block;
      margin: 10px 0;
    }
    .trade-type-item {
      margin-bottom: 18px;
    }
  }
  .goods-info {
    margin-top: 25px;
    .goods-name {
      font-size: 20px;
      height: 80px;
      margin-bottom: 10px;
    }
    .goods-desc {
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 20px;
      margin-bottom: 30px;
      .arco-col {
        display: flex;
        align-items: center;
        .arco-icon {
          font-size: 17px;
          flex-shrink: 0;
        }
        span {
          margin: 0 8px;
        }
      }
    }
    .module-box {
      margin-top: 60px;
      .module-header {
        margin: 40px 0;
      }
      :deep(.arco-divider-text-left) {
        left: 0;
        font-size: 24px;
      }
      .seller-box {
        display: flex;
        .arco-avatar {
          margin-right: 20px;
        }
        .seller-info {
          div {
            margin-bottom: 11px;
            &:first-child,
            &:nth-child(2) {
              font-size: 16px;
            }
          }
          .email-icon {
            width: 18px;
            height: 18px;
            vertical-align: middle;
            margin-right: 3px;
          }
        }
      }
      .comment-box {
        .comment-header {
          margin-bottom: 20px;
        }
        .see-more-comment {
          .arco-icon {
            transform: rotate(180deg);
            color: #2a82e4;
          }
        }
      }
    }
  }

  .right-box {
    .user-card {
      border: 1px solid #e5e5e5;
      padding: 20px;
      border-radius: 2px;
      margin-bottom: 35px;
      .user-info {
        span {
          margin-right: 5px;
        }
      }

      .arco-icon-star-fill {
        color: #ffb400;
      }
      .arco-comment-author {
        font-size: 16px;
      }
      :deep(.arco-comment-avatar) {
        margin-right: 8px;
      }
    }
    .to-talk {
      color: #fff;
      width: 100%;
      background-color: $main-pink;
      height: 38px;
      margin: 15px 0 26px;
      &:hover {
        background-color: #f53991;
      }
    }
    .center {
      text-align: center;
      color: #2a82e4;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        color: #0d4e99;
      }
    }
    .bid-input {
      margin-top: 20px;
      height: 44px;
      :deep(.arco-input-search-btn) {
        height: 44px;
        width: 80px;
        background-color: $main-pink;
        &:hover {
          background-color: #f53991;
        }
      }
    }
  }
}
</style>

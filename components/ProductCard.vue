<template>
  <div>
    <a-skeleton :animation="true" :loading="pageLoading" line-height="50">
      <a-row justify="space-between">
        <a-col :span="5" v-for="item in 4">
          <a-row justify="start" align="center">
            <a-col :span="4">
              <a-skeleton-shape shape="circle" size="small" />
            </a-col>
            <a-col :span="6">
              <a-skeleton-line />
            </a-col>
          </a-row>
          <div style="margin-top: 10px">
            <a-skeleton-line lineHeight="200" />
          </div>
        </a-col>
      </a-row>
    </a-skeleton>

    <div class="goods-list">
      <div class="recommend-item" v-for="item in 7">
        <div class="user-box">
          <img :src="testImg" alt="" />
          <div class="user-desc">
            <div>用户名称</div>
            <div class="time">一天前</div>
          </div>
        </div>
        <div class="product-img">
          <div class="img-box">
            <img :src="testImg" alt="" />
          </div>
          <div class="product-tag" v-if="index < 4">{{ $t("pages.recommendTag") }}</div>
        </div>
        <div class="product-desc">
          <div>商品名称</div>
          <div class="price">HK$999</div>
          <div class="desc">全新</div>
        </div>
        <div class="product-handle">
          <div>
            <icon-heart :strokeWidth="3" size="16" />
            <span>999</span>
          </div>
          <a-dropdown :popup-max-height="false">
            <a-button type="text"><icon-more-vertical :strokeWidth="6" size="18" /> </a-button>
            <template #content>
              <a-doption @click="handleReport">{{ $t("pages.reportProduct") }}</a-doption>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <a-modal
      v-model:visible="visible"
      :title="$t('components.report.reportTheGoods')"
      :on-before-cancel="handleCancel"
      @before-ok="handleBeforeOk"
      :okText="$t('pages.submit')"
      unmount-on-close
    >
      <a-form :model="form" auto-label-width size="large" ref="formRef">
        <a-form-item field="contact" label="">
          <a-input
            v-model="form.contact"
            :placeholder="$t('components.report.leaveYourContact')"
            maxLength="100"
          />
        </a-form-item>
        <a-form-item field="why" label="">
          <a-textarea
            v-model="form.why"
            :placeholder="$t('components.report.writeDownReporting')"
            allow-clear
            :auto-size="{ minRows: 10, maxRows: 12 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    const testImg =
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";

    const visible = ref(false);
    const pageLoading = ref(false);
    const formRef = ref();
    const form = reactive({
      contact: "",
      why: "",
    });
    const handleClick = () => {
      visible.value = true;
    };
    const handleBeforeOk = (done) => {
      console.log(form);
      window.setTimeout(() => {
        done();
      }, 3000);
    };
    const handleCancel = () => {
      visible.value = false;
      Object.assign(form, {
        contact: "",
        why: "",
      });
    };
    // 举报
    const handleReport = () => {
      visible.value = true;
    };
    return {
      testImg,
      visible,
      form,
      handleClick,
      handleBeforeOk,
      handleCancel,
      handleReport,
      pageLoading,
    };
  },
};
</script>
<style scoped lang="scss">
@import "assets/sass/var.scss";
.goods-list {
  display: flex;
  flex-wrap: wrap;
  //   grid-template-columns: repeat(auto-fill, 24%);
  grid-gap: 10px;
}
.recommend-item + .recommend-item {
}
.recommend-item {
  width: 24%;
  min-width: 180px;
  max-width: 310px;
  background: #fff;
  padding: 15px 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  color: #333333;
  cursor: pointer;
  &:last-child {
    margin-right: auto;
  }
  &:hover {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .user-box {
    display: flex;
    font-size: 12px;
    img {
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 5px;
    }
    .user-desc {
      .time {
        margin-top: 2px;
        transform: scale(0.9);
      }
    }
  }
  .product-img {
    position: relative;
    margin: 10px 0;
    .img-box {
      width: 100%;
      // height: 40vw;
      // max-height: 280px;
      // min-height: 180px;
      border-radius: 2px;
      height: 0;
      padding-bottom: 100%;
      overflow: hidden;
      position: relative;
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .product-tag {
      background-color: $main-pink;
      color: #fff;
      padding: 5px 10px;
      border-radius: 2px;
      display: inline-block;
      position: absolute;
      top: 14px;
      left: 14px;
    }
  }
  .product-desc {
    div {
      margin-bottom: 5px;
    }
    .price {
      font-size: 18px;
    }
  }
  .product-handle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin-left: 3px;
    }
    .arco-btn {
      color: #333333;
      height: 20px;
      padding: 0;
    }
  }
}

// 移动端
@media screen and(max-width:1000px) {
  .recommend-item {
    width: 48%;
    min-width: 150px;
  }
}
</style>

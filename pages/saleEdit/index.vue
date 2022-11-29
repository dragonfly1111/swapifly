<template>
  <div class="global-content">
    <div class="sale-header">{{ $t("sale.saleTitle") }}</div>
    <div class="edit-box border-box">
      <div class="left">
        <div>
          <a-upload
            draggable
            :show-file-list="false"
            :action="uploadUrl"
            accept="image/*,.png"
            :headers="headers"
          >
            <template #upload-button>
              <div class="upload-area">
                <icon-plus :strokeWidth="10" :size="18" />
                <div>{{ $t("sale.uploadTip") }}</div>
                <span>{{ $t("sale.uploadAlert") }}</span>
              </div>
            </template>
          </a-upload>
        </div>
        <p class="cover-tip">{{ $t("sale.coverTip") }}</p>
        <div class="image-preview-list">
          <div
            class="image-item"
            v-for="(item, index) in images"
            :class="{ 'is-cover': index == 0 }"
          >
            <a-image :src="item"> </a-image>
            <span class="is-cover-span" v-if="index == 0">{{ $t("sale.cover") }}</span>
            <icon-close @click="handleDelImage(item)" class="icon-close" :title="$t('sale.delete')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { uploadUrl, baseImgPrefix } from "~/config/baseUrl";
import { useI18n } from "vue-i18n";
import { useUserInfo } from "~/stores/userInfo";

let headers = reactive({
  "X-Utoken": null,
  "X-Userid": null,
});
if (process.client) {
  const userInfo = useUserInfo();
  headers["X-Utoken"] = userInfo.token;
  headers["X-Userid"] = userInfo.id;
}
const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp",
];

// 删除图片
const handleDelImage = (item) =>{

}
</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";
.common-row {
  padding-left: 0;
  padding-right: 0;
}
.sale-header {
  font-size: 24px;
  padding: 15px 10%;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
}

.edit-box {
  margin: 20px 10%;
  display: flex;
  justify-content: space-between;
  &.border-box {
    .left,
    .right {
      border: 1px solid #e5e5e5;
      padding: 20px 24px;
      box-sizing: border-box;
    }
  }
  .left {
    width: 45%;
    .upload-area {
      width: 100%;
      background-color: #f2f3f5;
      height: 210px;
      text-align: center;
      padding-top: 55px;
      box-sizing: border-box;
      div {
        margin: 20px 0 15px;
        font-size: 16px;
      }
      span {
        color: #86909c;
      }
    }
    .cover-tip {
      text-align: center;
      margin: 20px auto;
    }

    .image-preview-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 50px;
      .image-item {
        width: 134px;
        height: 134px;
        margin-right: 20px;
        margin-bottom: 20px;
        border-radius: 2px;
        position: relative;
        cursor: pointer;
        .icon-close {
          position: absolute;
          right: 5px;
          top: 5px;
          font-size: 16px;
          color: #4E5969;
          z-index: 22;
        }
        &.is-cover {
          border: 4px solid $main-grey;
          border-top-width: 0;
          box-sizing: border-box;
          .is-cover-span {
            position: absolute;
            width: 134px;
            top: -25px;
            left: -4px;
            right: 0;
            text-align: center;
            color: #fff;
            background-color: $main-grey;
            height: 26px;
            line-height: 26px;
            border-radius: 2px 2px 0 0;
          }
        }
        .arco-image {
          width: 100%;
          height: 100%;
        }
        :deep(.arco-image-img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .right {
    width: 52%;
  }
}
</style>

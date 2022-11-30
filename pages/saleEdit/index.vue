<template>
  <div class="global-content">
    <div class="sale-header">{{ $t("sale.saleTitle") }}</div>
    <div class="edit-box border-box">
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
      <div class="draft-title">{{ $t("sale.yourDraft") }}</div>
      <div class="image-preview-list">
        <div class="image-item" v-for="(item, index) in images" @click="toEdit">
          <a-image :src="item" :preview="false"> </a-image>
          <span class="draft">{{ $t("sale.draft") }}</span>
          <div class="image-info">
            <span class="goods-name">商品名称</span>
            <icon-close
              @click="handleDelDraft(item)"
              class="icon-close"
              :title="$t('sale.delete')"
            />
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
const router = useRouter();
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

// 删除
const handleDelDraft = (item) => {};
// 编辑
const toEdit = (item) => {
  router.push('/saleEditGoods')
};
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
  .upload-area {
    width: 100%;
    background-color: #f2f3f5;
    height: 380px;
    text-align: center;
    padding-top: 125px;
    box-sizing: border-box;
    div {
      margin: 20px 0 15px;
      font-size: 16px;
    }
    span {
      color: #86909c;
    }
  }
  .draft-title {
    margin: 60px auto 30px;
    font-size: 20px;
  }

  .image-preview-list {
    display: flex;
    flex-wrap: wrap;
    .image-item {
      width: 200px;
      height: 200px;
      margin-right: 20px;
      margin-bottom: 50px;
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      .image-info {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        .goods-name {
          width: 80%;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //用省略号显示
          white-space: nowrap; //不换行
        }
        .icon-close {
          font-size: 16px;
          color: #4e5969;
          flex-shrink: 0;
        }
      }
      .draft {
        position: absolute;
        bottom: 0px;
        left: 0;
        background: linear-gradient(180deg, #00000000 0%, #00000039 100%);
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #fff;
        padding-left: 10px;
        box-sizing: border-box;
        font-size: 12px;
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
</style>

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
        <!-- <div class="image-preview-list"> -->
        　<draggable
          v-model="imageList.list"
          class="image-preview-list"
          ghost-class="ghost"
          chosen-class="chosenClass"
          animation="300"
          @end="onEnd"
          :fallback-on-body="true"
          item-key="id"
        >
          <template #item="{ element, index }">
            <div class="item image-item" :class="{ 'is-cover': index == 0 }">
              <a-image :src="element.images"> </a-image>
              <span class="is-cover-span" v-if="index == 0">{{ $t("sale.cover") }}</span>
              <icon-close
                @click="handleDelImage(element)"
                class="icon-close"
                :title="$t('sale.delete')"
              />
            </div>
          </template>
        </draggable>
        <!-- <div
            class="image-item"
            v-for="(item, index) in images"
            :class="{ 'is-cover': index == 0 }"
          >
            <a-image :src="item"> </a-image>
            <span class="is-cover-span" v-if="index == 0">{{ $t("sale.cover") }}</span>
            <icon-close
              @click="handleDelImage(item)"
              class="icon-close"
              :title="$t('sale.delete')"
            />
          </div> -->
        <!-- </div> -->
      </div>
      <div class="right">
        <a-form size="large" :model="form" layout="vertical" ref="formRef" class="right-form">
          <a-form-item field="rid" hide-label hide-asterisk>
            <a-tree-select
              :data="typeList"
              v-model="form.rid"
              :fieldNames="{
                key: 'id',
                title: 'title',
                children: 'children',
              }"
              :placeholder="$t('sale.chooseType')"
              selectable="leaf"
              class="input-wrp"
            ></a-tree-select>
            <template #extra>
              <div>分类/分类</div>
            </template>
          </a-form-item>
          <div v-if="!form.rid">
            <a-form-item field="title" hide-asterisk hide-label>
              <a-input class="input-wrp" v-model="form.title" :placeholder="$t('sale.goodsName')" />
              <template #extra>
                <div class="form-item-danger tip-danger">
                  {{ $t("sale.forbidTip") }}
                </div>
              </template>
            </a-form-item>
            <div class="form-title">{{ $t("sale.goodsDetails") }}</div>
            <a-form-item field="nid" :label="$t('pages.oldAndNew')">
              <a-radio-group v-model="form.nid">
                <a-radio v-for="item in newOldList" :key="item.id" :value="item.id">
                  {{ item.title }}
                </a-radio>
              </a-radio-group>
              <template #extra>
                {{ filterNewOldAdvice() }}
              </template>
            </a-form-item>
            <a-form-item field="price" :label="$t('sale.price')">
              <a-input class="input-wrp" v-model="form.price">
                <template #prefix>
                  <span>HK$</span>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="describe" :label="$t('sale.goodsDesc')">
              <a-textarea
                class="input-wrp"
                :placeholder="$t('sale.goodsDescTip')"
                allow-clear
                :auto-size="{ minRows: 8, maxRows: 8 }"
                v-model="form.describe"
              />
              <template #extra>
                <a-row justify="space-between">
                  <a-col flex="auto">{{ $t("sale.descSuggest") }}</a-col>
                  <a-col flex="138px" class="tip-danger"> {{ $t("sale.forbidTip") }}</a-col>
                </a-row>
              </template>
            </a-form-item>
            <a-form-item field="region" :label="$t('profile.countries_regions')">
              <a-select
                v-model="form.region"
                :placeholder="$t('profile.countries_regions_empty')"
                allow-clear
              >
                <a-option
                  v-for="item in regionOptions"
                  :value="item.id"
                  :key="item.id"
                  :label="item.title"
                >
                  {{ item.title }}
                </a-option>
              </a-select>
            </a-form-item>
            <div class="form-title">{{ $t("sale.trading") }}</div>
            <a-form-item field="address" hide-label :content-flex="false">
              <a-checkbox :model-value="form.handDeliver" :value="1">{{
                $t("pages.handDeliver")
              }}</a-checkbox>
              <a-input-search class="input-wrp" :placeholder="$t('sale.deliverAddress')" />
              <div class="offline-address">
                <div class="offline-address-item" v-for="item in 3">
                  <p>MTR Kowloon Tong Station (港鐵九龍塘站)</p>
                  <span>Kent Rd, Kowloon City</span>
                  <div class="close-box">
                    <icon-close />
                  </div>
                </div>
              </div>
            </a-form-item>
            <a-form-item field="mail_note" hide-label :content-flex="false">
              <a-checkbox :model-value="form.postAndCourier" :value="2">{{
                $t("pages.postAndCourier")
              }}</a-checkbox>
              <a-textarea
                class="input-wrp"
                :placeholder="$t('sale.postTip')"
                allow-clear
                :auto-size="{ minRows: 5, maxRows: 5 }"
                v-model="form.mail_note"
              />
            </a-form-item>
            <div class="publish">
              <a-button class="publish-btn">{{ $t("sale.publish") }}</a-button>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import draggable from "vuedraggable";
import { uploadUrl, baseImgPrefix } from "~/config/baseUrl";
import { useI18n } from "vue-i18n";
import { useUserInfo } from "~/stores/userInfo";
import { useSysData } from "~/stores/sysData";

const sysData = useSysData();
const typeList = sysData.goodsClass;
const newOldList = sysData.goodsOan;
const regionOptions = sysData.region;
let headers = reactive({
  "X-Utoken": null,
  "X-Userid": null,
});
if (process.client) {
  const userInfo = useUserInfo();
  headers["X-Utoken"] = userInfo.token;
  headers["X-Userid"] = userInfo.id;
}
const form = reactive({
  rid: "",
  handDeliver: null,
  postAndCourier: null,
});
const formRef = ref(null);
const imageList = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  list: [
    {
      id: 1,
      images:
        "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
    },
    {
      id: 2,
      images:
        "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
    },
    {
      id: 3,
      images:
        "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
    },
  ],
});

// 新旧程度说明
const filterNewOldAdvice = () => {
  let obj = newOldList.find((i) => i.id == form.nid);
  return obj ? obj.advice : "";
};

// 删除图片
const handleDelImage = (item) => {};

//拖拽结束的事件
const onEnd = (e) => {
  console.log("结束拖拽");
};
</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";
.tip-danger {
  color: #d43030;
}
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
      height: fit-content;
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
      .item:hover {
        cursor: move;
      }
      .image-item {
        width: 134px;
        height: 134px;
        margin-right: 20px;
        margin-bottom: 20px;
        border-radius: 2px;
        position: relative;
        .icon-close {
          position: absolute;
          right: 5px;
          top: 5px;
          font-size: 16px;
          color: #4e5969;
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
    .right-form {
      .input-wrp {
        background-color: #fff;
        border: 1px solid #e5e5e5;
        padding-top: 5px;
        padding-bottom: 5px;
      }
      .form-title {
        font-size: 24px;
        margin: 10px 0 28px;
      }
      :deep(.arco-form-item-extra) {
        width: 100%;
        color: $grey-font-label;
      }
      :deep(.arco-form-item-label-col) {
        line-height: 16px;
        & > .arco-form-item-label {
          color: $grey-font-label;
          font-size: 16px;
        }
      }
      :deep(.arco-select-view-single) {
        @extend .input-wrp;
      }
      :deep(.arco-radio-checked .arco-radio-icon),
      :deep(.arco-checkbox-checked .arco-checkbox-icon) {
        border-color: $main-grey;
        background-color: $main-grey;
      }
      .arco-checkbox {
        margin-bottom: 15px;
        margin-top: 10px;
      }

      .form-item-danger {
        position: relative;
        width: 100%;
        text-align: right;
        margin-top: 2px;
      }
    }
  }
}

.publish {
  text-align: right;
  .publish-btn {
    background-color: $main-pink;
    color: #fff;
  }
}

.ghost {
  border: solid 1px $main-grey;
}
.chosenClass {
  background-color: #f1f1f1;
}

.offline-address {
  display: flex;
  flex-wrap: wrap;

  .offline-address-item {
    width: 46%;
    position: relative;
    margin-bottom: 10px;
    padding: 15px 40px 20px 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #E5E6E8;
    &:nth-child(2n){
      margin-left: 4%;
    }
    p{
      margin: 0 0 10px 0;
    }
    span{
      color: #4E5969;
    }
    .close-box {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 50px;
      line-height: 50px;
      width: 20px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.address-popover {
  width: 600px;
}
</style>

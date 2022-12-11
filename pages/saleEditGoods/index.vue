<template>
  <div class="global-content">
    <div class="sale-header">{{ $t("sale.saleTitle") }}</div>
    <div class="edit-box border-box media-sale-edit-goods">
      <div class="left" v-if="resize.screenType !== 'MOBILE'">
        <div>
          <a-upload
            draggable
            :show-file-list="false"
            :file-list="fileList"
            :action="uploadUrl"
            accept="image/*,.png"
            :headers="headers"
            :limit="10"
            :on-before-upload="beforeUpload"
            @success="uploadSuccess"
            @error="uploadError"
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
          v-model="fileList"
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
              <a-image :src="element.url"> </a-image>
              <span class="is-cover-span" v-if="index == 0">{{ $t("sale.cover") }}</span>
              <icon-close
                @click="handleDelImage(element, index)"
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
        <div v-if="resize.screenType === 'MOBILE'">
          <div>
            <a-upload
              draggable
              :show-file-list="false"
              :file-list="fileList"
              :action="uploadUrl"
              accept="image/*,.png"
              :headers="headers"
              :limit="10"
              :on-before-upload="beforeUpload"
              @success="uploadSuccess"
              @error="uploadError"
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
            v-model="fileList"
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
                <a-image :src="element.url"> </a-image>
                <span class="is-cover-span" v-if="index == 0">{{ $t("sale.cover") }}</span>
                <icon-close
                  @click="handleDelImage(element, index)"
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
        <a-form
          size="large"
          :rules="rules"
          :model="form"
          layout="vertical"
          ref="formRef"
          class="right-form"
        >
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
          <div v-if="form.rid">
            <a-form-item field="title" hide-asterisk hide-label>
              <a-input class="input-wrp" v-model="form.title" :placeholder="$t('sale.goodsName')" />
              <template #extra v-if="hasBanWord(form.title)">
                <div class="form-item-danger tip-danger">
                  {{ $t("sale.forbidTip") }}
                  <a-link :href="forbidLink">详情</a-link>
                </div>
              </template>
            </a-form-item>
            <div class="form-title">{{ $t("sale.goodsDetails") }}</div>
            <a-form-item field="nid" :label="$t('pages.oldAndNew')" hide-asterisk>
              <a-radio-group v-model="form.nid">
                <a-radio v-for="item in newOldList" :key="item.id" :value="item.id">
                  {{ item.title }}
                </a-radio>
              </a-radio-group>
              <template #extra>
                {{ filterNewOldAdvice() }}
              </template>
            </a-form-item>
            <a-form-item field="price" :label="$t('sale.price')" hide-asterisk>
              <!-- <a-input-number class="input-wrp" :precision="2" v-model="form.price" > -->
              <a-input class="input-wrp" v-model="form.price" type="number">
                <template #prefix>
                  <span>HK$</span>
                </template>
              </a-input>
              <!-- </a-input-number> -->
            </a-form-item>
            <a-form-item field="describe" :label="$t('sale.goodsDesc')" hide-asterisk>
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
                  <a-col flex="138px" v-if="hasBanWord(form.describe)" class="tip-danger">
                    {{ $t("sale.forbidTip") }}
                    <a-link :href="forbidLink">详情</a-link>
                  </a-col>
                </a-row>
              </template>
            </a-form-item>
            <a-form-item field="region" :label="$t('profile.countries_regions')" hide-asterisk>
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
            <a-form-item field="address" hide-label hide-asterisk :content-flex="false">
              <a-checkbox v-model="form.offline" :value="1">{{
                $t("pages.handDeliver")
              }}</a-checkbox>
              <a-select
                v-if="form.offline == 1"
                v-model="offline_address"
                :placeholder="$t('sale.deliverAddress')"
                allow-clear
                allow-search
                :loading="locationLoading"
                class="input-wrp"
                @search="handleSearch"
                multiple
                :filter-option="false"
              >
                <a-option
                  v-for="item in addressOptions"
                  :value="JSON.stringify(item)"
                  :key="item.location"
                  :label="item.name"
                >
                  <div class="ad-option">
                    <div class="ad-title">{{ item.name }}</div>
                    <div class="ad-des">{{ item.address }}</div>
                  </div>
                </a-option>
              </a-select>
<!--              {{offline_address}}-->
              <!-- <a-input-search class="input-wrp" v-if="form.mail == 1" :placeholder="$t('sale.deliverAddress')" /> -->
              <div class="offline-address" v-if="form.offline == 1">
                <div class="offline-address-item" v-for="item in addressSaveOptions">
                  <p>{{ item.name }}</p>
                  <span>{{ item.address }}</span>
                  <div class="close-box">
                    <icon-close />
                  </div>
                </div>
              </div>
            </a-form-item>
            <a-form-item field="mail_note" hide-label :content-flex="false" hide-asterisk>
              <a-checkbox v-model="form.mail" :value="1">{{
                $t("pages.postAndCourier")
              }}</a-checkbox>
              <a-textarea
                class="input-wrp"
                v-if="form.mail == 1"
                :placeholder="$t('sale.postTip')"
                allow-clear
                :auto-size="{ minRows: 5, maxRows: 5 }"
                v-model="form.mail_note"
              />
            </a-form-item>
            <div class="publish">
              <!-- <a-button class="black-btn" style="margin-right: 15px">{{
                $t("sale.saveDraft")
              }}</a-button> -->
              <a-button class="publish-btn" @click="submitForm">{{ $t("sale.publish") }}</a-button>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "saleEditGoods",
};
</script>
<script setup>
import draggable from "vuedraggable";
import { uploadUrl, baseImgPrefix, forbidLink } from "~/config/baseUrl";
import { useI18n } from "vue-i18n";
import { useUserInfo } from "~/stores/userInfo";
import { useSysData } from "~/stores/sysData";
import { useResize } from "~/stores/resize";
import { Notification, Modal } from "@arco-design/web-vue";
import {
  getProductDraftDetails,
  getProductInfo,
  getProductAddress,
  editProduct,
  addProductDraft,
  addProduct,
} from "~/api/goods";
import axios from "axios";
const { t } = useI18n();
const router = useRouter();
const sysData = useSysData();
const typeList = sysData.goodsClass;
const newOldList = sysData.goodsOan;
const regionOptions = sysData.region;
const pdwList = sysData.goodsPdwList || [];
const userInfo = useUserInfo();
const draftModal = ref(null);
const locationLoading = ref(false);
const resize = useResize();
let headers = reactive({
  "X-Utoken": null,
  "X-Userid": null,
});
if (process.client) {
  headers["X-Utoken"] = userInfo.token;
  headers["X-Userid"] = userInfo.id;
}
const offline_address = ref(null); // 面交地点选择结果
const formType = ref("draft"); // 来源 draft 草稿/ edit编辑商品
const form = ref({
  id: null,
  rid: "",
  title: "",
  nid: 1,
  describe: "",
  region: "",
  price: "",
  mail_note: "",
  offline_address: [],
  images: [],
});
const fileList = ref([]);
const addressOptions = ref([]);
const addressSaveOptions = ref([]);
const clickNumber = ref(0); // 保存草稿点击事件
const formRef = ref(null);
const btnType = ref("draft");
const appConfig = useAppConfig()
const gdKey = appConfig.gdKey

const rules = reactive({
  rid: [{ required: true, message: t("sale.formValidate.typeValidate") }],
  title: [{ required: true, message: t("sale.formValidate.goodsNameValidate") }],
  describe: [{ required: true, message: t("sale.formValidate.describeValidate") }],
  nid: [{ required: true, message: t("sale.formValidate.oldAndNewValidate") }],
  price: [{ required: true, message: t("sale.formValidate.priceValidate") }],
  region: [{ required: true, message: t("sale.regionTip") }],
});

const listAll = () => {
  // 地址
  getProductAddress().then((res) => {
    const arr = []
    // 放到options里面去 回显已选
    res.data.forEach(item=>{
      arr.push({
        location: `${item.lng},${item.lat}`,
        address: item.address,
        name: item.title
      })
    })
    addressSaveOptions.value = arr;
    addressOptions.value = arr;
  });
};

// 搜索地址
const handleSearch = (value) => {
  if (value) {
    locationLoading.value = true;
    axios.get(`https://restapi.amap.com/v5/place/text?keywords=${value}&key=${gdKey}`).then(res=>{
      console.log(res)
      addressOptions.value = [...addressSaveOptions.value, ...res.data.pois]
      console.log(addressOptions.value)
      locationLoading.value = false;
    })
  } else {
    addressOptions.value = []
  }
};

// 新旧程度说明
const filterNewOldAdvice = () => {
  let obj = newOldList.find((i) => i.id == form.value.nid);
  return obj ? obj.advice : "";
};

// 是否含有违禁词汇
const hasBanWord = (val) => {
  if (val && pdwList) {
    return (
      pdwList.filter((i) => {
        return val.indexOf(i) > -1;
      }).length > 0
    );
  }
  return false;
};

// 草稿详情
const getDraftInfo = () => {
  getProductDraftDetails(form.value.id).then((res) => {
    if (res.code == 0) {
      form.value = res.data;
      if(res.data.offline_address && res.data.offline_address.length > 0){
        const arr = []
        res.data.offline_address.forEach(item=>{
          arr.push(JSON.stringify({
            location: `${item.lng},${item.lat}`,
            address: item.address,
            name: item.title
          }))
        })
        offline_address.value = arr
      }
      form.value.mail = res.data.mail ? 1 : false;
      form.value.offline = res.data.offline ? 1 : false;
      fileList.value = res.data.images.map((item, index) => {
        return {
          id: index + 1,
          uid: index + 1,
          url: baseImgPrefix + item,
        };
      });
    }
  });
};

// 商品详情
const getProduct = () => {
  getProductInfo(form.value.id).then((res) => {
    if (res.code == 0) {
      form.value = res.data;
      if(res.data.offline_address && res.data.offline_address.length > 0){
        const arr = []
        res.data.offline_address.forEach(item=>{
          arr.push(JSON.stringify({
            location: `${item.lng},${item.lat}`,
            address: item.address,
            name: item.title
          }))
        })
        offline_address.value = arr
      }
      form.value.mail = res.data.mail ? 1 : false;
      form.value.offline = res.data.offline ? 1 : false;
      fileList.value = res.data.images.map((item, index) => {
        return {
          id: index + 1,
          uid: index + 1,
          url: baseImgPrefix + item,
        };
      });
    }
  });
};

// 删除图片
const handleDelImage = (item, index) => {
  fileList.value.splice(index, 1);
};

//拖拽结束的事件
const onEnd = (e) => {
  console.log("结束拖拽");
};

const beforeUpload = (e) => {
  return true;
};
// 上传成功
const uploadSuccess = (e) => {
  if (e.response.code == 0) {
    fileList.value.push({
      id: e.uid,
      uid: e.uid,
      url: baseImgPrefix + e.response.data,
    });
  }
};

const uploadError = (e) => {};

// 提交表单
const submitForm = () => {
  formRef.value.validate().then((validate) => {
    if (validate) {
      return;
    }
    console.log('',fileList.value)
    if (!fileList.value.length) {
      Notification.error(t("sale.shouldUpload"));
      return;
    }
    publishProduct();
  });
};

// 立即发布
const publishProduct = (type) => {
  Modal.info({
    titleAlign: "start",
    content: t("sale.publishBtnComfirm"),
    closable: true,
    hideCancel: false,
    cancelText: t("pages.cancel"),
    okText: t("sale.publish"),
    onBeforeOk: (done) => {
      done(true);
      let reqUrl = form.value.id && formType.value == "edit" ? editProduct : addProduct;
      btnType.value = "publish"; // 防止触发弹出保存草稿
      reqUrl(setReqForm()).then((res) => {
        if (res.code === 0) {
          Notification.success(res.message);
          router.push(`/userDetails?userId=${userInfo.id}`);
        } else {
          Notification.error(res.message);
        }
      });
    },
  });
};

// 提交的数据
const setReqForm = () => {
  let arr = []
  console.log(offline_address)
  if(offline_address.value && offline_address.value.length > 0){
    offline_address.value.forEach(item=>{
      const obj = JSON.parse(item)
      arr.push({
        title: obj.name,
        address: obj.address,
        lat: obj.location.split(',')[0],
        lng: obj.location.split(',')[1]
      })
    })
  }
  let formData = {
    ...form.value,
    offline: form.value.offline ? 1 : 0,
    mail: form.value.mail ? 1 : 0,
    offline_address: arr,
    images: fileList.value.map((i) => {
      return i.url.replace(baseImgPrefix, "");
    }),
  };
  return formData;
};

// 关闭浏览器 判断保存
const beforeunloadHandler = (e) => {
  if (router.currentRoute.value.path == "/saleEditGoods") {
    e = e || window.event;
    // 兼容IE8和Firefox 4之前的版本
    if (e) {
      e.returnValue = "关闭提示";
    }
    saveDraftModal();
    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    return "关闭提示222";
  } else {
    window.onbeforeunload = null;
  }
};

// 保存草稿
const saveDraftModal = (to) => {
  if (clickNumber.value == 1) return;
  clickNumber.value = 1;
  draftModal.value = Modal.info({
    titleAlign: "start",
    title: t("sale.saveDraftTitle"),
    content: t("sale.saveDraftContent"),
    closable: true,
    hideCancel: false,
    cancelText: t("pages.cancel"),
    okText: t("sale.saveDraft"),
    onBeforeOk: (done) => {
      done(true);
      addProductDraft(setReqForm()).then((res) => {
        if (res.code === 0) {
          btnType.value = "isSaveDraft";
          Notification.success(res.message);
          router.push(`/userDetails?userId=${userInfo.id}`);
          clickNumber.value = 0;
        } else {
          Notification.error(res.message);
        }
      });
    },
    onCancel: () => {
      router.push(to.fullPath);
    },
  });
};

router.beforeEach((to, from, next) => {
  if (
    router.currentRoute.value.path == "/saleEditGoods" &&
    from.path != to.path &&
    from.path == "/saleEditGoods" &&
    btnType.value != "publish" &&
    btnType.value != "isSaveDraft" &&
    clickNumber.value === 0
  ) {
    saveDraftModal(to);
  } else {
    next();
  }
});

onMounted(() => {
  if (setUserDraft().value && setUserDraft().value.length) {
    fileList.value = setUserDraft().value.map((item, index) => {
      return {
        id: index + 1,
        uid: index + 1,
        url: baseImgPrefix + item,
      };
    });
  } else {
    fileList.value = [];
  }
  if (router.currentRoute.value.query.id) {
    form.value.id = router.currentRoute.value.query.id;
    formType.value = "edit";
    getProduct();
  }
  if (router.currentRoute.value.query.draftId) {
    form.value.id = router.currentRoute.value.query.draftId;
    formType.value = "draft";
    getDraftInfo();
  }
  listAll();
  // window.addEventListener("beforeunload", (e) => beforeunloadHandler(e));
});
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
  //margin: 20px 10%;
  display: flex;
  justify-content: space-between;

  &.border-box {
    .left,
    .right {
      //border: 1px solid #e5e5e5;
      //padding: 20px 24px;
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
          z-index: 99;
          cursor: pointer;
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
    //width: 52%;
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
          z-index: 99;
          cursor: pointer;
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
      :deep(.arco-link) {
        font-size: 12px;
      }

      :deep(.arco-form-item-label-col) {
        line-height: 16px;

        & > .arco-form-item-label {
          color: $grey-font-label;
          font-size: 16px;
        }
      }

      :deep(.arco-select) {
        @extend .input-wrp;
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
    border-bottom: 1px solid #e5e6e8;

    &:nth-child(2n) {
      margin-left: 4%;
    }

    p {
      margin: 0 0 10px 0;
    }

    span {
      color: #4e5969;
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
.ad-option{
  font-size: 14px;
  margin-left: 12px;
  margin-bottom: 6px;
  .ad-title{
    color: #1D2129;
    line-height: 22px;
  }
  .ad-des{
    margin-top: 2px;
    color: #4E5969;
    line-height: 22px;
  }
}
</style>

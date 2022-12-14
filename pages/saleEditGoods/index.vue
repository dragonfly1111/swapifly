<template>
  <div class="global-content">
    <div id="map" style="width: 100%; height: 0"></div>
    <div class="sale-header">{{ $t("sale.saleTitle") }}</div>

    <div style="margin: 20px" v-if="pageLoading">
      <a-skeleton animation :loading="pageLoading">
        <a-space direction="vertical" :style="{ width: '100%' }" size="large">
          <a-skeleton-line :line-height="160"/>
          <a-skeleton-line :line-height="20"/>
          <a-row :gutter="20">
            <a-col :span="12">
              <a-skeleton-line :widths="['100%']" :line-height="160"/>
            </a-col>
            <a-col :span="12">
              <a-skeleton-line :widths="['100%']" :line-height="160"/>
            </a-col>
          </a-row>
        </a-space>
      </a-skeleton>
    </div>

    <div class="edit-box border-box" v-if="!pageLoading">
      <div class="left">
        <a-spin :loading="uploadLoading" style="width: 100%">
          <div>
            <a-upload
                draggable
                multiple
                :show-file-list="false"
                :file-list="realFileList"
                :action="uploadUrl"
                accept="image/*,.png"
                :headers="headers"
                :limit="10"
                :on-before-upload="beforeUpload"
                :on-button-click="uploadClick"
                @success="uploadSuccess"
                @error="uploadError"
                @exceed-limit="overLimit"
            >
              <template #upload-button>
                <div class="upload-area">
                  <icon-plus :strokeWidth="10" :size="18"/>
                  <div>{{ $t("sale.uploadTip") }}</div>
                  <span>{{ $t("sale.uploadAlert") }}</span>
                </div>
              </template>
            </a-upload>
          </div>
        </a-spin>
        <p class="cover-tip">{{ $t("sale.coverTip") }}</p>　
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
              <a-image :src="element.url"></a-image>
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
        <div class="m-upload">
          <div>
            <a-upload
                draggable
                multiple
                :show-file-list="false"
                :file-list="realFileList"
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
                  <icon-plus :strokeWidth="10" :size="18"/>
                  <div>{{ $t("sale.uploadTip") }}</div>
                  <span>{{ $t("sale.uploadAlert") }}</span>
                </div>
              </template>
            </a-upload>
          </div>
          <p class="cover-tip">{{ $t("sale.coverTip") }}</p>　
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
                <a-image :src="element.url"></a-image>
                <span class="is-cover-span" v-if="index == 0">{{ $t("sale.cover") }}</span>
                <icon-close
                    @click="handleDelImage(element, index)"
                    class="icon-close"
                    :title="$t('sale.delete')"
                />
              </div>
            </template>
          </draggable>
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
                :data="sysData.goodsClass"
                v-model="form.rid"
                :fieldNames="{
                key: 'id',
                title: 'title',
                children: 'children',
              }"
                :placeholder="$t('sale.chooseType')"
                :tree-props="{
                'default-expand-all': false,
              }"
                selectable="leaf"
                class="input-wrp"
                @change="changeClass"
            ></a-tree-select>
            <template #extra>
              <div v-if="form.rid">
                <a-breadcrumb>
                  <template #separator>
                    <img src="@/assets/images/icon/breadcrumb-separator.png" alt=""/>
                  </template>
                  <a-breadcrumb-item v-for="item in curClassPath">{{
                      item.title
                    }}
                  </a-breadcrumb-item>
                </a-breadcrumb>
              </div>
            </template>
          </a-form-item>
          <div v-if="form.rid">
            <a-form-item field="title" hide-asterisk hide-label>
              <a-input class="input-wrp" v-model="form.title" :placeholder="$t('sale.goodsName')" :max-length="30"
                       :show-word-limit="true"/>
              <template #extra v-if="hasBanWord(form.title)">
                <div class="form-item-danger tip-danger">
                  {{ $t("sale.forbidTip") }}
                  <a-link @click="toForbid">{{ $t("sale.forbidTipDetail") }}</a-link>
                </div>
              </template>
            </a-form-item>
            <div class="form-title">{{ $t("sale.goodsDetails") }}</div>
            <a-form-item field="nid" :label="$t('pages.oldAndNew')" hide-asterisk>
              <a-radio-group v-model="form.nid">
                <a-radio v-for="item in sysData.goodsOan" :key="item.id" :value="item.id">
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
                  :max-length="500" :show-word-limit="true"
              />
              <template #extra>
                <a-row justify="space-between">
                  <a-col flex="auto" v-if="curClassPath.length === 3">{{
                      curClassPath[2].advice
                    }}
                  </a-col>
                  <a-col flex="auto" v-else></a-col>
                  <a-col flex="170px" v-if="hasBanWord(form.describe)" class="tip-danger">
                    {{ $t("sale.forbidTip") }}
                    <a-link @click="toForbid">{{ $t("sale.forbidTipDetail") }}</a-link>
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
                    v-for="item in sysData.region"
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
              <a-checkbox v-model="form.offline" :value="1"
              >{{ $t("pages.handDeliver") }}
              </a-checkbox>
              <a-select
                  v-if="form.offline == 1"
                  v-model="offline_address"
                  :placeholder="$t('sale.deliverAddress')"
                  allow-clear
                  allow-search
                  :loading="locationLoading"
                  class="input-wrp"
                  @search="handleSearch"
                  @remove="removeLocation"
                  multiple
                  :filter-option="false"
                  id="ship-address"
                  :show-extra-options="false"
              >
                <a-option
                    v-for="item in addressOptions"
                    @click="handlePlaceDetail(item)"
                    :value="item.address"
                    :key="item.location"
                    :label="item.title"
                >
                  <div class="ad-option">
                    <div class="ad-title">{{ item.title }}</div>
                    <div class="ad-des">{{ item.address }}</div>
                  </div>
                </a-option>
              </a-select>
              <!--              <input-->
              <!--                  id="ship-address"-->
              <!--                  name="ship-address"-->
              <!--                  required-->
              <!--                  autocomplete="off"-->
              <!--              />-->
<!--              当前选中的key-->
<!--              {{offline_address}}-->
<!--              <div>搜索结果</div>-->
<!--              {{addressOptions}}-->
<!--              <div>当选选中的对象</div>-->
<!--              {{addressSelectedOptions}}-->
              <!--              <div style="height: 20px"></div>-->
              <!--                            {{addressOptions}}-->
              <!-- <a-input-search class="input-wrp" v-if="form.mail == 1" :placeholder="$t('sale.deliverAddress')" /> -->
              <div class="offline-address" v-if="form.offline == 1">
                <div
                    class="offline-address-item"
                    v-for="item in addressSaveOptions"
                    @click="addToSelect(item)"
                >
                  <p>{{ item.title }}</p>
                  <span>{{ item.address }}</span>
                  <div class="close-box" @click.stop="removeAdd(item)">
                    <icon-close/>
                  </div>
                </div>
              </div>
            </a-form-item>
            <a-form-item field="mail_note" hide-label :content-flex="false" hide-asterisk>
              <a-checkbox v-model="form.mail" :value="1"
              >{{ $t("pages.postAndCourier") }}
              </a-checkbox>
              <a-textarea
                  class="input-wrp"
                  v-if="form.mail == 1"
                  :placeholder="$t('sale.postTip')"
                  allow-clear
                  :auto-size="{ minRows: 5, maxRows: 5 }"
                  v-model="form.mail_note"
                  :max-length="255" :show-word-limit="true"
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
import {useI18n} from "vue-i18n";
import {useUserInfo} from "~/stores/userInfo";
import {useSysData} from "~/stores/sysData";
import {useResize} from "~/stores/resize";
import {Message, Modal} from "@arco-design/web-vue";
import {getPathByKey} from "~/utils/common";
import {
  getProductDraftDetails,
  getProductInfo,
  getProductAddress,
  editProduct,
  addProductDraft,
  addProduct,
  removeSaveAd,
} from "~/api/goods";
import axios from "axios";

const {t} = useI18n();
const router = useRouter();
const sysData = useSysData();
const pdwList = computed(() => {
  return sysData.goodsPdwList || [];
});
const userInfo = useUserInfo();
const draftModal = ref(null);
const locationLoading = ref(false);
const pageLoading = ref(true);
const resize = useResize();
let headers = reactive({
  "X-Utoken": null,
  "X-Userid": null,
});
if (process.client) {
  headers["X-Utoken"] = userInfo.token;
  headers["X-Userid"] = userInfo.id;
}
const offline_address = ref([]); // 面交地点选择结果
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
const realFileList = ref([]);
const addressOptions = ref([]);
const addressSaveOptions = ref([]);
const addressSelectedOptions = ref([]);
const clickNumber = ref(0); // 保存草稿点击事件
const formRef = ref(null);
const btnType = ref("draft");
const runtimeConfig = useRuntimeConfig();
const forbidLink = runtimeConfig.VITE_FORBID_LINK;
const baseImgPrefix =  runtimeConfig.VITE_OSS_PREFIX
const uploadUrl = runtimeConfig.VITE_UPLOAD ;
const uploadLoading = ref(false);
const curClassPath = ref([]);
const rules = reactive({
  rid: [{required: true, message: t("sale.formValidate.typeValidate")}],
  title: [{required: true, message: t("sale.formValidate.goodsNameValidate")}],
  describe: [{required: true, message: t("sale.formValidate.describeValidate")}],
  nid: [{required: true, message: t("sale.formValidate.oldAndNewValidate")}],
  price: [{required: true, message: t("sale.formValidate.priceValidate")}],
  region: [{required: true, message: t("sale.regionTip")}],
});
let autocomplete = null
let map = null
const overLimit = (e) => {
  Message.warning(t("sale.overLimit"));
};

const listAll = () => {
  // 地址
  getProductAddress().then((res) => {
    addressSaveOptions.value = res.data;
  });
};

const toForbid = () => {
  window.open(forbidLink, '_blank')
}

// 选中分类
const changeClass = (e) => {
  curClassPath.value = getPathByKey(e, sysData.goodsClass);
};

// 搜索地址
const handleSearch = (value) => {
  if (value) {
    locationLoading.value = true;
    googleAutocompleteService.getPlacePredictions({
      input: value,
      language: 'zh-HK',
      location: new google.maps.LatLng(22.414522, 114.109767),
      radius: 45000
    }, (predictions, status) => {
      const arr = []
      predictions.forEach(item => {
        arr.push({
          title: item.structured_formatting.main_text,
          address: item.description,
          placeId: item.place_id
          // location: `${item.geometry.location.lat()},${item.geometry.location.lng()}`
        })
      })
      addressOptions.value = arr;
      console.log(predictions)
      locationLoading.value = false;
    });

  } else {
    addressOptions.value = [];
  }
};

// 移除一个选中的地址
const removeLocation = (e) =>{
  console.log(e)
  addressSelectedOptions.value = addressSelectedOptions.value.filter(item=>{
    return item.title !== e
  })

}

// 新旧程度说明
const filterNewOldAdvice = () => {
  let obj = sysData.goodsOan.find((i) => i.id == form.value.nid);
  return obj ? obj.advice : "";
};

// 是否含有违禁词汇
const hasBanWord = (val) => {
  if (val && pdwList.value) {
    return (
        pdwList.value.filter((i) => {
          return val.indexOf(i) > -1;
        }).length > 0
    );
  }
  return false;
};

// 草稿详情
const getDraftInfo = () => {
  getProductDraftDetails(form.value.id)
      .then((res) => {
        if (res.code == 0) {
          form.value = res.data;
          if (res.data.region === 0) {
            res.data.region = null;
          }
          if (res.data.offline_address && res.data.offline_address.length > 0) {
            const arr = [];
            res.data.offline_address.forEach((item) => {
              arr.push(item.title);
            });
            offline_address.value = arr;
          }
          addressSelectedOptions.value = res.data.offline_address ? res.data.offline_address : []
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
      })
      .finally(() => {
        pageLoading.value = false;
      });
};

// 商品详情
const getProduct = () => {
  pageLoading.value = true;
  getProductInfo(form.value.id)
      .then((res) => {
        if (res.code == 0) {
          form.value = res.data;
          if (res.data.region === 0) {
            res.data.region = null;
          }
          changeClass(res.data.rid);
          if (res.data.offline_address && res.data.offline_address.length > 0) {
            const arr = [];
            res.data.offline_address.forEach((item) => {
              arr.push(item.title);
            });
            offline_address.value = arr;
          }
          addressSelectedOptions.value = res.data.offline_address ? res.data.offline_address : []
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
      })
      .finally(() => {
        pageLoading.value = false;
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
  // 放到上传之前去设置header 防止页面刷新时pina未初始化获取不到token
  headers["X-Utoken"] = userInfo.token;
  headers["X-Userid"] = userInfo.id;
  uploadLoading.value = true;
  return true;
};
const uploadClick = () => {
  if (uploadLoading.value) return new Promise(() => {
  });
};
// 上传成功
const uploadSuccess = (e) => {
  if (e.response.code === 999) {
    uploadLoading.value = false;
    // 登录过期 跳转首页
    const router = useRouter();
    const openLogin = useState < Boolean > "openLogin";
    userInfo.logout();
    userInfo.openDialog();
    openLogin.value = true;
  }
  if (e.response.code == 0) {
    fileList.value.push({
      id: e.uid,
      uid: e.uid,
      url: baseImgPrefix + e.response.data,
    });
  }
  uploadLoading.value = false;
};

const uploadError = (e) => {
  uploadLoading.value = false;
};

// 提交表单
const submitForm = () => {
  formRef.value.validate().then((validate) => {
    if (validate) {
      Message.error(t("sale.submitTip"));
      return;
    }
    if (!fileList.value.length) {
      Message.error(t("sale.shouldUpload"));
      return;
    }
    if (hasBanWord(form.value.describe) || hasBanWord(form.value.title)) {
      Message.error(t("sale.forbidTip"));
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
    width: resize.screenType === "MOBILE" ? "80%" : "-",
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
          Message.success(t("sale.publishSucc"));
          router.replace(`/userDetails?userId=${userInfo.id}`);
        } else {
          Message.error(res.message);
          btnType.value = "draft"; // 发布错误能够继续保存草稿
        }
      });
    },
    onCancel: () => {
      btnType.value = "draft";
    },
  });
};

// 提交的数据
const setReqForm = () => {
  let arr = [];
  const route = useRoute();
  let formData = {
    ...form.value,
    offline: form.value.offline ? 1 : 0,
    mail: form.value.mail ? 1 : 0,
    offline_address: addressSelectedOptions.value,
    cid: route.query.draftId ? route.query.draftId : "",
    images: fileList.value.map((i) => {
      return i.url.replace(baseImgPrefix, "");
    }),
  };
  if (!formData.region) {
    formData.region = ''
  }
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
    width: resize.screenType === "MOBILE" ? "80%" : "-",
    closable: true,
    hideCancel: false,
    cancelText: t("pages.cancel"),
    okText: t("sale.saveDraft"),
    onBeforeOk: (done) => {
      if (hasBanWord(form.value.describe) || hasBanWord(form.value.title)) {
        Message.error(t("sale.forbidTip"));
        clickNumber.value = 0;
        done(true);
        return
      }
      done(true);
      addProductDraft(setReqForm()).then((res) => {
        clickNumber.value = 0;
        if (res.code === 0) {
          btnType.value = "isSaveDraft";
          Message.success(res.message);
          router.replace(`/userDetails?userId=${userInfo.id}`);
        } else {
          Message.error(res.message);
        }
      });
    },
    onCancel: () => {
      router.push(to.fullPath);
    },
  });
};

// 移除地址
const removeAdd = (item) => {
  console.log(item);
  removeSaveAd({
    id: item.id,
  }).then((res) => {
    if (res.code === 0) {
      Message.success(res.message);
      listAll();
    } else {
      Message.error(res.message);
    }
  });
};

// 点击保存地址 添加到选中
const addToSelect = (item) => {
  // 如果点击的地址已选中 return
  console.log(item)
  console.log(addressSelectedOptions.value)
  if (offline_address.value) {
    const tmpArr = addressSelectedOptions.value.filter((add) => {
      return add.title === item.title;
    });
    if (tmpArr.length > 0) return;
  }
  addressSelectedOptions.value.push(item)
  offline_address.value.push(item.title);
};

const initService = () => {
  const inter = setInterval(() => {
    const ele = document.getElementById('map')
    if (ele) {
      console.log(ele)
      const hk = new google.maps.LatLng(22.3193039, 114.1693611);
      map = new google.maps.Map(document.getElementById('map'), {center: hk, zoom: 15});
      window.googleAutocompleteService = new google.maps.places.AutocompleteService();
      console.log(map)
      window.googlePlacesService = new google.maps.places.PlacesService(map);
      clearInterval(inter)
    }
  }, 200)
}

const handlePlaceDetail = (option) => {
  console.log(option)
  const request = {
    placeId: option.placeId,
    fields: ['name', 'geometry']
  };
  googlePlacesService.getDetails(request, (place, status) => {
    console.log(place)
    addressSelectedOptions.value.push({
      title: option.title,
      address: option.address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    })
  });
}

// 监听sysData 获取到goodsClass之后给curClassPath赋值一次（防止出现刷新页面进入时 还未获取到系统数据就赋值的问题）
watch(
    sysData,
    (val) => {
      if (val.goodsClass.length && form.value.rid) {
        changeClass(form.value.rid);
      }
    },
    {immediate: true, deep: true}
);

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
    pageLoading.value = false;
    fileList.value = setUserDraft().value.map((item, index) => {
      return {
        id: index + 1,
        uid: index + 1,
        url: baseImgPrefix + item,
      };
    });
  } else {
    fileList.value = [];
    pageLoading.value = false;
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
  window.initService = initService;
  useHead({
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${runtimeConfig.VITE_GOOGLE_MAP_KEY}&callback=initService&libraries=places&v=weekly`,
        async: true,
        defer: true
      }
    ]
  })
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
  border-bottom: 1px solid $main-grey-border;
}

.edit-box {
  margin: 20px 10%;
  display: flex;
  justify-content: space-between;

  &.border-box {
    .left,
    .right {
      border: 1px solid $main-grey-border;
      padding: 20px 24px;
      box-sizing: border-box;
      height: fit-content;
    }
  }

  .left {
    width: 45%;
    display: block;

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
            color: $main-white;
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

    .m-upload {
      display: none;
    }

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
            color: $main-white;
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
        background-color: $main-white;
        border: 1px solid $main-grey-border;
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
    color: $main-white;
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
    cursor: pointer;

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
@import "assets/sass/var";

.address-popover {
  width: 600px;
}

.ad-option {
  font-size: 14px;
  margin-left: 12px;
  margin-bottom: 6px;

  .ad-title {
    color: $main-black-1D;
    line-height: 22px;
  }

  .ad-des {
    margin-top: 2px;
    color: #4e5969;
    line-height: 22px;
  }
}

</style>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .sale-header {
    padding: 15px;
  }
  .edit-box {
    margin: 20px 15px;
    display: block;

    &.border-box .right,
    &.border-box .left {
      width: 100%;
      border: 0;
      padding: 0;
    }

    .left {
      display: none;
    }

    .right {
      .m-upload {
        display: block;
      }

      .upload-area {
        height: 160px;
        padding-top: 35px;
      }

      .image-preview-list {
        margin-top: 20px;

        .image-item {
          width: 31%;
          height: 0;
          padding-bottom: 31%;
          margin-right: 3%;

          &:nth-child(3n) {
            margin-right: 0;
          }

          position: relative;

          :deep(.arco-image) {
            position: absolute;
            top: 0;
            left: 0;
          }

          &.is-cover {
            .is-cover-span {
              width: calc(100% + 8px);
            }
          }
        }
      }
    }
  }
  .publish {
    .publish-btn {
      width: 100%;
      height: 45px;
    }
  }
}
</style>

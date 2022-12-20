<template>
  <div class="more-search-filter">
    <div class="login-title">
      <icon-left  class="back-index" @click="handToIndex"/>
      <span>{{ $t("pages.mobile_search") }}</span>
    </div>
    <div>
      <a-form class="select-wrapper" :modal="form" auto-label-width layout="horizontal" ref="formRef">
        <a-form-item field="rid">
          <div class="border-bottom-mobile">
            <p class="p-word-mobile">{{$t('pages.classification')}}</p>
            <a-tree-select
                style="width: 100%;border: none;padding-left: 0"
                :data="classListAsync"
                v-model="form.rid"
                :load-more="loadMore"
                :fieldNames="{
          key: 'id',
          title: 'title',
          children: 'children',
        }"
                :placeholder="$t('pages.classification')"
            ></a-tree-select>
          </div>
        </a-form-item>
        <a-form-item field="sort">
          <div class="border-bottom-mobile">
            <p class="p-word-mobile">{{ $t("pages.mobile_sort") }}</p>
            <a-select
                style="width: 100%;border: none;padding-left: 0"
                :placeholder="$t('pages.sort')"
                v-model="form.sort">
              <template #label="{ data }">
                <span class="select-span">{{ $t("pages.sort") }}：</span>
                {{ data.label }}
              </template>
              <a-option v-for="item in sortList" :key="item.id" :value="item.id" :label="item.title">{{
                  item.title
                }}</a-option>
            </a-select>
          </div>
        </a-form-item>
        <a-form-item field="nid">
          <div class="border-bottom-mobile">
            <p class="p-word-mobile">{{ $t("pages.degree_of_old_and_new") }}</p>
            <a-select
                style="width: 100%;border: none;padding-left: 0;background-color: $main-white;"
                :placeholder="$t('pages.oldAndNew')"
                v-model="form.nid"
                multiple
                class="multiple-select"
                :max-tag-count="1"
            >
              <template #arrow-icon>
                <icon-down />
              </template>
              <a-option
                  v-for="item in newOldList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.title"
              ></a-option>
            </a-select>
          </div>
        </a-form-item>
        <a-form-item field="price">
          <a-space style="width: 320px;">
            <a-input-number
                style="background-color: $main-white;border: 1px solid #ccc"
                v-model="priceForm.min"
                :placeholder="$t('pages.minPrice')"
                :min="0"
                size="large"
                @blur.stop="confirmPrice"
            />
            <div style="width: 8px; height: 1px; background: #ccc"></div>
            <a-input-number
                style="background-color: $main-white;border: 1px solid #ccc"
                v-model="priceForm.max"
                :placeholder="$t('pages.maxPrice')"
                :min="0"
                size="large"
                @blur.stop="confirmPrice"
            />
          </a-space>
        </a-form-item>
        <a-form-item field="offline" style="margin-right: 10px">
          <a-checkbox value="offline" v-model="form.offline">{{
              $t("pages.handDeliver")
            }}</a-checkbox>
        </a-form-item>
        <a-form-item field="mail">
          <a-checkbox value="mail" v-model="form.mail">{{
              $t("pages.postAndCourier")
            }}</a-checkbox>
        </a-form-item>
        <a-form-item>
          <div class="bottom-search">
            <a-button type="primary" class="btn" @click="lastFormData">{{ $t("pages.mobile_search") }}</a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { useSysData } from "~/stores/sysData";
const router = useRouter()
const sysData = useSysData();
const sourceClassList = sysData.goodsClass
const classList = sysData.goodsClass.map(item=>{
  return {
    id: item.id,
    title: item.title,
    children: []
  }
});
const classListAsync = ref(classList)
const sortList = sysData.goodsSort;
const newOldList = sysData.goodsOan;
const showPriceBox = ref(false);
let form = reactive({
  sort: "",
  nid: [],
  rid: "",
  min: null,
  max: null,
  offline: false,
  mail: false,
});
const priceForm = reactive({
  min: null,
  max: null,
});

const formRef = ref(null);

// 价格选择确定
const confirmPrice = () => {
  // form = { ...form, ...priceForm };
  console.log("====priceForm====",priceForm)
  form.min = priceForm.min
  form.max = priceForm.max
};

// 传值
const lastFormData = () => {
  console.log(form)
  let setForm = { ...form };
  console.log(setForm)
  setForm.nid = form.nid.join(",");
  console.log("====最后的===",setForm)
  router.push({
    path: '/searchResult',
    query: {
      ...setForm
    }
  })
  // emits("change", setForm);
};

// 智障arco没有提供默认折叠全部节点功能 并且点击打开面板时非常卡，所以做成"动态"加载数据的样子
const loadMore = (nodeData) => {
  const { title, key } = nodeData;
  // 从sourceClassList中找到id相同的节点 把他的children赋值过来
  const tmpNode = findNodeById(sourceClassList, nodeData.id)
  return new Promise((resolve) => {
    nodeData.children = tmpNode ? tmpNode.children : [];
    resolve();
  });
};

const findNodeById = (arr, targetId) =>{
  let node = null
  arr.forEach(item=>{
    if(item.id === targetId) {
      node = item
    }
    if(item.children){
      findNodeById(item.children, targetId)
    }
  })
  return node
}
const handToIndex=()=>{
  router.back()
}
</script>

<style scoped lang="scss">
@import "assets/sass/var.scss";
.more-search-filter{
  .login-title {
    border-bottom: 1px solid #ccc;
    text-align: center;
    position: relative;
    height: 45px;
    font-weight: bold;
    line-height: 45px;
    font-size: 18px;
    .back-index{
      display: block;
      position: absolute;
      left: 0;
      font-size: 25px;
      font-weight: bold;
      top: 50%;
      transform: translateY(-50%);
    }
    img {
      width: 152px;
      height: 36px;
      display: inline-block;
    }
  }
  .select-wrapper {
    margin: 10px 0px;
    .bottom-search{
      position: fixed;
      bottom: 10px;
      width: 80%;
      left: 10%;
      background-color: $main-white;
      text-align: center;
      .btn{
        width: 100%;
        background-color: rgba(51, 51, 51, 1);
      }
    }
    .border-bottom-mobile{
      border-bottom: 1px solid #a1a1a1;
      width: 100%;
      .p-word-mobile{
        margin: 0;
        padding: 5px 0;
        text-align: left;
      }
    }
    :deep(.arco-select-view-single) {
      background-color: $main-white;
      border-radius: 50px;
      border: 1px solid $grey-font-label;
      color: $main-grey;
      padding-left: 15px;
      padding-right: 15px;
      width: min-content;
      min-width: 140px;
    }
    :deep(.arco-form-item-layout-inline) {
      margin-right: 0;
    }
    :deep(.arco-form-item-label-col) {
      padding-right: 8px;
    }
    .select-span {
      color: $grey-font-label;
    }
  }
}
</style>

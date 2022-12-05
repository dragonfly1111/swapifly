<template>
  <div class="more-search-filter">
    <div class="login-title">
      <icon-left  class="back-index" @click="handToIndex"/>
      <img src="@/assets/images/logo-long.png" alt=""/>
    </div>
    <div>
      <a-form class="select-wrapper" :modal="form" auto-label-width layout="horizontal" ref="formRef">
        <a-form-item field="rid">
          <div class="border-bottom-mobile">
            <p class="p-word-mobile">分类</p>
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
                @change="updateSearch"
            ></a-tree-select>
          </div>
        </a-form-item>
        <a-form-item field="sort">
          <div class="border-bottom-mobile">
            <p class="p-word-mobile">排序</p>
            <a-select
                style="width: 100%;border: none;padding-left: 0"
                :placeholder="$t('pages.sort')"
                v-model="form.sort" @change="updateSearch">
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
            <p class="p-word-mobile">新旧程度</p>
            <a-select
                style="width: 100%;border: none;padding-left: 0;background-color: #fff;"
                :placeholder="$t('pages.oldAndNew')"
                v-model="form.nid"
                multiple
                class="multiple-select"
                :max-tag-count="1"
                @change="updateSearch"
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
                style="background-color: #fff;border: 1px solid #ccc"
                v-model="priceForm.min"
                :placeholder="$t('pages.minPrice')"
                :min="0"
                size="large"
                @keyup.enter.native="confirmPrice"
            />
            <div style="width: 8px; height: 1px; background: #ccc"></div>
            <a-input-number
                style="background-color: #fff;border: 1px solid #ccc"
                v-model="priceForm.max"
                :placeholder="$t('pages.maxPrice')"
                :min="0"
                size="large"
                @keyup.enter.native="confirmPrice"
            />
          </a-space>
        </a-form-item>
        <a-form-item field="offline" style="margin-right: 10px">
          <a-checkbox value="offline" v-model="form.offline" @change="updateSearch">{{
              $t("pages.handDeliver")
            }}</a-checkbox>
        </a-form-item>
        <a-form-item field="mail">
          <a-checkbox value="mail" v-model="form.mail" @change="updateSearch">{{
              $t("pages.postAndCourier")
            }}</a-checkbox>
        </a-form-item>
        <a-form-item>
          <div class="bottom-search">
            <a-button type="primary" class="btn" @click="resetForm">{{ $t("pages.reset") }}</a-button>
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

const emits = defineEmits(["change"]);

const formRef = ref(null);
const resetForm = () => {
  priceForm.min = null
  priceForm.max = null
  form.sort = ''
  form.nid = []
  form.rid = ''
  form.min = ''
  form.max = ''
  form.offline = false
  form.mail = false
  emits("change", {});
};

// 价格选择取消
const cancelPrice = () => {
  showPriceBox.value = false;
};

// 价格选择确定
const confirmPrice = () => {
  // form = { ...form, ...priceForm };
  form.min = priceForm.min
  form.max = priceForm.max
  cancelPrice()
  updateSearch();
};

// 传值
const updateSearch = () => {
  console.log(form)
  let setForm = { ...form };
  console.log(setForm)
  setForm.nid = form.nid.join(",");
  emits("change", setForm);
};

// 智障arco没有提供默认折叠全部节点功能 并且点击打开面板时非常卡，所以做成"动态"加载数据的样子
const loadMore = (nodeData) => {
  const { title, key } = nodeData;
  // 从sourceClassList中找到id相同的节点 把他的children赋值过来
  console.log(nodeData)
  const tmpNode = findNodeById(sourceClassList, nodeData.id)
  console.log(tmpNode)
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
    padding-bottom: 10px;
    .back-index{
      display: block;
      position: absolute;
      left: 0;
      font-size: 30px;
      font-weight: bold;
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
      background-color: #fff;
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
      background-color: #fff;
      border-radius: 50px;
      border: 1px solid $grey-font-label;
      color: #383838;
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
<template>
  <a-form class="select-wrapper" :modal="form" auto-label-width layout="inline" ref="formRef">
    <a-form-item field="rid" v-if="treeShow">
      <a-tree-select
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
    </a-form-item>
    <a-form-item field="sort">
      <a-select :placeholder="$t('pages.sort')" v-model="form.sort" @change="updateSearch">
        <template #label="{ data }">
          <span class="select-span">{{ $t("pages.sort") }}：</span>
          {{ data.label }}
        </template>
        <a-option v-for="item in sortList" :key="item.id" :value="item.id" :label="item.title">{{
            item.title
          }}
        </a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="nid">
      <a-select
          :placeholder="$t('pages.oldAndNew')"
          v-model="form.nid"
          multiple
          class="multiple-select"
          :max-tag-count="1"
          @change="updateSearch"
      >
        <template #arrow-icon>
          <icon-down/>
        </template>
        <a-option
            v-for="item in newOldList"
            :key="item.id"
            :value="item.id"
            :label="item.title"
        ></a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="price">
      <a-popover title="" trigger="click" position="bottom" :popup-visible="showPriceBox">
        <a-select
            @click="showPriceBox = !showPriceBox"
            :placeholder="$t('pages.price_degree')"
            :input-value="getMinMax()"
            :popup-visible="false"
        >
        </a-select>
        <template #content>
          <a-space style="width: 320px">
            <a-input-number
                v-model="priceForm.min"
                :placeholder="$t('pages.minPrice')"
                :min="0"
                size="large"
                @keyup.enter.native="confirmPrice"
            />
            <div style="width: 8px; height: 1px; background: #ccc"></div>
            <a-input-number
                v-model="priceForm.max"
                :placeholder="$t('pages.maxPrice')"
                :min="0"
                size="large"
                @keyup.enter.native="confirmPrice"
            />
          </a-space>
          <div class="handle-price">
            <a-button @click="cancelPrice">{{ $t("pages.cancel") }}</a-button>
            <a-button type="primary" @click="confirmPrice">{{ $t("pages.confirm") }}</a-button>
          </div>
        </template>
      </a-popover>
    </a-form-item>
    <a-form-item field="offline" style="margin-right: 10px">
      <a-checkbox value="offline" v-model="form.offline" @change="updateSearch">{{
          $t("pages.handDeliver")
        }}
      </a-checkbox>
    </a-form-item>
    <a-form-item field="mail">
      <a-checkbox value="mail" v-model="form.mail" @change="updateSearch">{{
          $t("pages.postAndCourier")
        }}
      </a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-divider direction="vertical"/>
      <a-button type="text" @click="resetForm">{{ $t("pages.reset") }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { useSysData } from "~/stores/sysData";
import { findNode } from "~/utils/common";


const sysData = useSysData();
const sourceClassList = sysData.goodsClass
const classList = sysData.goodsClass.map(item => {
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
const treeShow = ref(false);
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
  updateSearch()
};

// 价格选择取消
const cancelPrice = () => {
  showPriceBox.value = false;
};

// 最低-最高展示文笨
const getMinMax = () => {
  if(priceForm.min && priceForm.max){
    return 'HK$' + priceForm.min +  '-' + 'HK$' + priceForm.max
  } else if (priceForm.min && !priceForm.max){
    return 'HK$' + priceForm.min + '+'
  } else if (!priceForm.min && priceForm.max){
    return 'Up to HK$' + priceForm.max
  } else {
    return ''
  }
}

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
  let setForm = {...form};
  setForm = JSON.parse(JSON.stringify(setForm))
  setForm.nid = form.nid.join(",");
  if(setForm.offline){
    setForm.offline = 1
  } else {
    setForm.offline = 0
  }
  if(setForm.mail){
    setForm.mail = 1
  } else {
    setForm.mail = 0
  }
  if(!setForm.min && !setForm.max){
    setForm.min = ''
    setForm.max = ''
  } else if(!setForm.min && setForm.max) {
    // 如果有最大没有最小 手动塞一个0
    setForm.min = 0
  } else if(setForm.min && !setForm.max){
    // 如果有最小没有最大 手动塞一个999999
    setForm.max = 9999999999
  }
  console.log(setForm)
  emits("change", setForm);
};

// 智障arco没有提供默认折叠全部节点功能 并且点击打开面板时非常卡，所以做成"动态"加载数据的样子
const loadMore = (nodeData) => {
  const {title, key} = nodeData;
  // 从sourceClassList中找到id相同的节点 把他的children赋值过来
  console.log(nodeData)
  const tmpNode = findNode(sourceClassList, (node) => {
    return node.id === nodeData.id
  })
  console.log(tmpNode)
  return new Promise((resolve) => {
    nodeData.children = tmpNode ? tmpNode.children : [];
    resolve();
  });
};

const resetTree = (id, level) =>{
  if(!level){
    treeShow.value = true
  }
  if(level < 3){
    treeShow.value = true
    // 如果父组件传了pid 根据pid获取他的子节点作为下拉列表
    const tmpNode = findNode(sourceClassList, (node) => {
      return node.id === id
    })
    console.log(tmpNode)
    if(tmpNode.children.length > 0) {
      // 移除子节点
      tmpNode.children.map(item => {
        return {
          id: item.id,
          title: item.title,
          children: []
        }
      })
      classListAsync.value = tmpNode.children
    }
  } else {
    // 如果是三级分类 不出现分类下拉
    treeShow.value = false
  }

}

defineExpose({
  resetTree
})
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";

.select-wrapper {
  margin: 10px 5px;

  :deep(.arco-select-view-single) {
    background-color: #fff;
    border-radius: 50px;
    border: 1px solid $grey-font-label;
    color: #383838;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
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

:deep(.multiple-select) {
  background-color: #fff;
  border-radius: 50px;
  border: 1px solid #aaaaaa;
  color: #383838;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  min-width: 140px;
}

.handle-price {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;

  .arco-btn + .arco-btn {
    margin-left: 10px;
  }

  .arco-btn-primary {
    background-color: $main-grey;
  }
}

:deep(.arco-checkbox-checked .arco-checkbox-icon) {
  background-color: $main-grey;
}
</style>

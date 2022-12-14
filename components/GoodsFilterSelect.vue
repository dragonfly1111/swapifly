<template>
  <a-form class="select-wrapper" :modal="form" auto-label-width layout="inline" ref="formRef">
    <a-form-item field="rid" v-if="treeShow">
      <a-tree-select
          :data="classListAsync"
          v-model="form.rid"
          :class="form.rid ? 'has-val-item' : ''"
          :fieldNames="{
            key: 'id',
            title: 'title',
            children: 'children',
          }"
          :tree-props="{
              'default-expand-all': false,
          }"
          @change="updateSearch"
          :placeholder="$t('pages.classification')"
      ></a-tree-select>
    </a-form-item>
    <a-form-item field="sort">
      <a-select :placeholder="$t('pages.sort')" v-model="form.sort" @change="updateSearch"
                :class="form.sort ? 'has-val-item' : ''">
        <template #label="{ data }">
          <span class="select-span">{{ $t("pages.sort") }}：</span>
          {{ data.label }}
        </template>
        <a-option v-for="item in sysData.goodsSort" :key="item.id" :value="item.id" :label="item.title">{{
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
          :class="form.nid && form.nid.length > 0 ? 'has-val-item' : ''"
      >
        <template #arrow-icon>
          <icon-down/>
        </template>
        <a-option
            v-for="item in sysData.goodsOan"
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
            :class="getMinMax() ? 'has-val-item' : ''"
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
import {useSysData} from "~/stores/sysData";
import {findNode} from "~/utils/common";


const sysData = useSysData();
const resetParam = ref({});
const props = defineProps({
  curLevel: {
    type: Number,
    default: null
  },
  curRid: {
    type: Number,
    default: null
  }
});
const classListAsync = computed(() => {
  if(props.curRid){
    // 如果父组件传了pid 根据pid获取他的子节点作为下拉列表
    const tmpNode = findNode(sysData.goodsClass, (node) => {
      return node.id === props.curRid
    })
    return tmpNode && tmpNode.children
  } else {
    return sysData.goodsClass
  }

})


const treeShow = computed(() => {
  if (!props.curLevel) {
    return  true
  }
  return props.curLevel < 3;
})

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
  updateSearch()
};

// 价格选择取消
const cancelPrice = () => {
  showPriceBox.value = false;
};

// 最低-最高展示文笨
const getMinMax = () => {
  if (priceForm.min && priceForm.max) {
    return 'HK$' + priceForm.min + '-' + 'HK$' + priceForm.max
  } else if (priceForm.min && !priceForm.max) {
    return 'HK$' + priceForm.min + '+'
  } else if (!priceForm.min && priceForm.max) {
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
  if (setForm.offline) {
    setForm.offline = 1
  } else {
    setForm.offline = 0
  }
  if (setForm.mail) {
    setForm.mail = 1
  } else {
    setForm.mail = 0
  }
  if (!setForm.min && !setForm.max) {
    setForm.min = ''
    setForm.max = ''
  } else if (!setForm.min && setForm.max) {
    // 如果有最大没有最小 手动塞一个0
    setForm.min = 0
  } else if (setForm.min && !setForm.max) {
    // 如果有最小没有最大 手动塞一个999999
    setForm.max = 9999999999
  }
  console.log(setForm)
  emits("change", setForm);
};

defineExpose({
  resetForm
});

</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";

.select-wrapper {
  margin: 10px 5px;

  :deep(.arco-select-view-single) {
    background-color: $main-white;
    border-radius: 50px;
    border: 1px solid $grey-font-label;
    color: $main-grey;
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
  background-color: $main-white;
  border-radius: 50px;
  border: 1px solid $grey-font-label;
  color: $main-grey;
  padding-left: 15px;
  padding-right: 15px;
  //width: 210px;
  min-width: 210px;
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

:deep(.has-val-item) {
  border: 1px solid $main-blue !important;
  color: $main-blue !important;
  background: #2A82E420 !important;

  .select-span {
    color: $main-blue !important;
  }
  .arco-tag{
    color: $main-blue !important;
    background: #2A82E420 !important;
    border: unset !important;
  }
}
</style>

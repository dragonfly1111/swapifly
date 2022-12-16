<template>
  <a-modal
    v-model:visible="visible"
    modal-class="filter-dialog"
    :footer="false"
    @close="handleCancel"
    title="筛选"
  >
    <div class="more-search-filter-modal">
      <div>
        <a-form
          class="select-wrapper"
          :modal="form"
          auto-label-width
          layout="vertical"
          ref="formRef"
        >
          <a-form-item field="rid" :label="$t('pages.classification')">
            <a-tree-select
              :data="classListAsync"
              v-model="form.rid"
              :load-more="loadMore"
              :fieldNames="{
                key: 'id',
                title: 'title',
                children: 'children',
              }"
              :tree-props="{
                'default-expand-all': false,
              }"
            ></a-tree-select>
          </a-form-item>
          <a-form-item field="sort" :label="$t('pages.sort')">
            <a-select v-model="form.sort">
              <a-option
                v-for="item in sortList"
                :key="item.id"
                :value="item.id"
                :label="item.title"
                >{{ item.title }}</a-option
              >
            </a-select>
          </a-form-item>
          <a-form-item field="nid" :label="$t('pages.oldAndNew')">
            <a-select v-model="form.nid" multiple class="multiple-select">
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
          </a-form-item>
          <a-form-item field="price" :label="$t('pages.price_degree')">
            <a-space style="width: 320px">
              <a-input-number
                style="background-color: #fff; border: 1px solid #ccc"
                v-model="form.min"
                :placeholder="$t('pages.minPrice')"
                :min="0"
                size="large"
              />
              <div style="width: 8px; height: 1px; background: #ccc"></div>
              <a-input-number
                style="background-color: #fff; border: 1px solid #ccc"
                v-model="form.max"
                :min="0"
                size="large"
                :placeholder="$t('pages.maxPrice')"
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
        </a-form>
        <div class="bottom-search">
          <a-button type="primary" class="black-btn" @click="updateSearch">{{
            $t("pages.mobile_search")
          }}</a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { useSysData } from "~/stores/sysData";
const sysData = useSysData();
const sourceClassList = sysData.goodsClass;
const classList = sysData.goodsClass.map((item) => {
  return {
    id: item.id,
    title: item.title,
    children: [],
  };
});
const classListAsync = ref(classList);
const visible = ref(true);
const sortList = sysData.goodsSort;
const newOldList = sysData.goodsOan;
const emits = defineEmits(["change"]);
// const props = defineProps({
//   form: {
//     default: () => ({
//       sort: "",
//       nid: [],
//       rid: "",
//       min: null,
//       max: null,
//       offline: false,
//       mail: false,
//     }),
//   },
// });
const form = ref({
  sort: "",
  nid: [],
  rid: "",
  min: null,
  max: null,
  offline: false,
  mail: false,
});
// const priceForm = reactive({
//   min: null,
//   max: null,
// });

const formRef = ref(null);
const resetForm = () => {
  form.value = {
    sort: "",
    nid: [],
    rid: "",
    min: null,
    max: null,
    offline: false,
    mail: false,
  };
};
const openDialog = (e) => {
  console.log(e,'??')

  visible.value = true;
  form.value = { ...form.value, ...e };
};

const handleCancel = () => {
  resetForm();
  visible.value = false;
};

const updateSearch = () => {
  console.log(form);
  let setForm = { ...form.value };
  emits("change", setForm);
  visible.value = false;
};

// 智障arco没有提供默认折叠全部节点功能 并且点击打开面板时非常卡，所以做成"动态"加载数据的样子
const loadMore = (nodeData) => {
  const { title, key } = nodeData;
  // 从sourceClassList中找到id相同的节点 把他的children赋值过来
  const tmpNode = findNodeById(sourceClassList, nodeData.id);
  return new Promise((resolve) => {
    nodeData.children = tmpNode ? tmpNode.children : [];
    resolve();
  });
};

const findNodeById = (arr, targetId) => {
  let node = null;
  arr.forEach((item) => {
    if (item.id === targetId) {
      node = item;
    }
    if (item.children) {
      findNodeById(item.children, targetId);
    }
  });
  return node;
};

defineExpose({
  openDialog,
  handleCancel,
});
</script>

<style lang="scss">
@import "assets/sass/var.scss";
.filter-dialog {
  top: 0;
  border-radius: 0;
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  .arco-modal-header {
    border-bottom: 0;
    .arco-modal-close-btn {
      font-size: 20px;
    }
  }
  .arco-modal-body {
    padding: 20px 15px;
  }
}

.more-search-filter-modal {
  .arco-select-view-single,
  .arco-select-view-multiple {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    padding-left: 0;
    &.arco-select-view-focus {
      border: 0;
      border-bottom: 1px solid $main-grey;
    }
  }
  .arco-checkbox {
    font-size: 15px;
  }
  .arco-input-wrapper .arco-input.arco-input-size-large {
    padding: 10px 0;
  }
  .bottom-search {
    text-align: center;
    margin-top: 30px;
    .black-btn {
      width: 80%;
      margin: auto;
      height: 50px;
    }
  }
}
</style>

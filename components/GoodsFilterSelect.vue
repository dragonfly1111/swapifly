<template>
  <a-form class="select-wrapper" :modal="form" auto-label-width layout="inline" ref="formRef">
    <a-form-item field="rid">
      <a-tree-select
        :data="classList"
        v-model="form.rid"
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
        }}</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="nid">
      <a-select
        :placeholder="$t('pages.old_new')"
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
    </a-form-item>
    <a-form-item field="price">
      <a-popover title="" trigger="click" position="bottom" :popup-visible="showPriceBox">
        <a-select
          @click="showPriceBox = !showPriceBox"
          :placeholder="$t('pages.price_degree')"
          input-value=""
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
      }}</a-checkbox>
    </a-form-item>
    <a-form-item field="mail">
      <a-checkbox value="mail" v-model="form.mail" @change="updateSearch">{{
        $t("pages.postAndCourier")
      }}</a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-divider direction="vertical" />
      <a-button type="text" @click="resetForm">{{ $t("pages.reset") }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { useSysData } from "~/stores/sysData";

const sysData = useSysData();
const classList = sysData.goodsClass;
const sortList = sysData.goodsSort;
const newOldList = sysData.goodsOan;
const showPriceBox = ref(false);
const form = reactive({
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
  priceForm.value = {
    max: null,
    min: null,
  };
  formRef.value.resetFields();
  console.log(form);
};

// 价格选择取消
const cancelPrice = () => {
  showPriceBox.value = false;
};

// 价格选择确定
const confirmPrice = () => {
  form.value = { ...form, ...priceForm };
  cancelPrice()
  updateSearch();
};

// 传值
const updateSearch = () => {
  let setForm = { ...form.value };
  setForm.nid = form.nid.join(",");
  emits("change", setForm);
};
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

:deep(.multiple-select) {
  background-color: #fff;
  border-radius: 50px;
  border: 1px solid #aaaaaa;
  color: #383838;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 240px;
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

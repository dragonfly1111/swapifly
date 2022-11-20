<template>
  <a-form class="select-wrapper" :modal="form" auto-label-width layout="inline" ref="formRef">
    <a-form-item field="rid">
      <a-tree-select
        :data="treeData"
        v-model="form.rid"
        :placeholder="$t('pages.classification')"
      ></a-tree-select>
    </a-form-item>
    <a-form-item field="sort">
      <a-select :placeholder="$t('pages.sort')" v-model="form.sort">
        <template #label="{ data }">
          <span>{{ $t("pages.sort") }}：{{ data.label }}</span>
        </template>
        <a-option v-for="item in sortOptions" :key="item.value">{{ item.label }}</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="nid">
      <a-select
        :placeholder="$t('pages.old_new')"
        v-model="form.nid"
        multiple
        class="multiple-select"
        :max-tag-count="1"
      >
        <template #arrow-icon>
          <icon-down />
        </template>
        <a-option>Beijing</a-option>
        <a-option>2</a-option>
        <a-option>3</a-option>
        <a-option>4</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="price">
      <a-popover title="" trigger="click" position="bottom">
        <a-select :placeholder="$t('pages.price_degree')" v-model="form.nid" :popup-visible="false">
        </a-select>
        <template #content>
          <a-space style="width: 320px">
            <a-input-number
              v-model="form.min"
              :placeholder="$t('pages.minPrice')"
              :min="0"
              size="large"
            />
            <div style="width: 8px; height: 1px; background: #ccc"></div>
            <a-input-number
              v-model="form.max"
              :placeholder="$t('pages.maxPrice')"
              :min="0"
              size="large"
            />
          </a-space>
          <div class="handle-price">
            <a-button>{{ $t("pages.cancel") }}</a-button>
            <a-button type="primary" @click="confirmPrice">{{ $t("pages.confirm") }}</a-button>
          </div>
        </template>
      </a-popover>
    </a-form-item>
    <a-form-item field="offline" style="margin-right: 10px">
      <a-checkbox value="offline">{{ $t("pages.hand_deliver") }}</a-checkbox>
    </a-form-item>
    <a-form-item field="mail">
      <a-checkbox value="mail">{{ $t("pages.post_and_courier") }}</a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-divider direction="vertical" />
      <a-button type="text" @click="resetForm">{{ $t("pages.reset") }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { ref, reactive, defineEmits } from "vue";
import IconEdit from "@arco-design/web-vue/es/icon/icon-edit";
import IconPlus from "@arco-design/web-vue/es/icon/icon-plus";
export default {
  name: "GoodsFilterSelect",
  components: { IconPlus, IconEdit },
  setup(props, { emit }) {
    const form = reactive({
      sort: "",
      nid: "",
      rid: "",
    });
    const formRef = ref(null);
    const sortOptions = reactive([{ value: 2, label: "价钱高至低" }]);
    const resetForm = () => {
      formRef.value.resetFields();
      console.log(form);
    };

    const treeData = [
      {
        key: "node1",
        title: "Trunk",
        disabled: true,
        children: [
          {
            key: "node2",
            title: "Leaf",
          },
        ],
      },
      {
        key: "node3",
        title: "Trunk2",
        children: [
          {
            key: "node4",
            title: "Leaf",
          },
          {
            key: "node5",
            title: "Leaf",
          },
        ],
      },
    ];

    // 价格选择取消
    const cancelPrice = () => {};

    // 价格选择确定
    const confirmPrice = () => {
      updateSearch();
    };

    // 传值
    const updateSearch = () => {
      emit("change", form);
    };

    return {
      treeData,
      form,
      formRef,
      sortOptions,
      resetForm,
      confirmPrice,
      cancelPrice,
      emit,
    };
  },
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

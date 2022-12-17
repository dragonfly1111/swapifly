<template>
  <div>
    <a-row class="search-data-mobile">
      <a-col :span="10" v-if="treeShow">
        <a-tree-select
          :data="treeList"
          v-model="form.rid"
          :fieldNames="{
            key: 'id',
            title: 'title',
            children: 'children',
          }"
          :tree-props="{
            'default-expand-all': false,
          }"
          allow-search
          :placeholder="$t('pages.classification')"
          @change="updateSearch"
          class="search-data-mobile"
        ></a-tree-select>
      </a-col>
      <a-col :span="8">
        <a-select
          :placeholder="$t('pages.sort')"
          v-model="form.sort"
          @change="updateSearch"
          class="search-data-mobile"
        >
          <a-option
            v-for="item in sysData.goodsSort"
            :key="item.id"
            :value="item.id"
            :label="item.title"
            >{{ item.title }}</a-option
          >
        </a-select>
      </a-col>
      <a-col :span="6">
        <div class="add-more-search" @click="toMoreSearch">
          {{ $t("pages.more_filters") }}
        </div>
      </a-col>
    </a-row>

    <MobileSearchFilter
      v-model:form="form"
      ref="mobileSearchFilter"
      @change="changeFilter"
    ></MobileSearchFilter>
  </div>
</template>

<script setup>
import { useSysData } from "~/stores/sysData";
import { findNode } from "~/utils/common";

const router = useRouter();
const sysData = useSysData();
const sourceClassList = ref([]);
const resetParam = ref({});

const classList = sysData.goodsClass.map((item) => {
  return {
    id: item.id,
    title: item.title,
    children: [],
  };
});

const mobileSearchFilter = ref(null);
const emits = defineEmits(["change"]);
let form = ref({
  sort: "",
  nid: [],
});

watch(
  sysData,
  (val) => {
    if (val.goodsClass.length) {
      sourceClassList.value = val.goodsClass;
    }
  },
  { immediate: true, deep: true }
);

const treeShow = computed(() => {
  let level = router.currentRoute.value.query?.level || "";
  // 如果是三级分类 不出现分类下拉
  if(+level == 3) return false 
  return true
})
const treeList = computed(() => {
  let treeId = router.currentRoute.value.query?.id || "";
  let level = router.currentRoute.value.query?.level || "";
  if (treeId && level < 3) {
    // 如果父组件传了pid 根据pid获取他的子节点作为下拉列表
    const tmpNode = findNode(sourceClassList.value, (node) => {
      return node.id === +treeId;
    });
    if (tmpNode && tmpNode.children.length > 0) {
      return tmpNode.children;
    }
  }
  return sysData.goodsClass;
});

// 传值
const updateSearch = () => {
  let setForm = { ...form.value };
  console.log(setForm);
  setForm.nid = form.value.nid.join(",");
  setForm.offline = setForm.offline ? 1 : 0;
  setForm.mail = setForm.mail ? 1 : 0;
  if (!setForm.min && !setForm.max) {
    setForm.min = "";
    setForm.max = "";
  } else if (!setForm.min && setForm.max) {
    // 如果有最大没有最小 手动塞一个0
    setForm.min = 0;
  } else if (setForm.min && !setForm.max) {
    // 如果有最小没有最大 手动塞一个999999
    setForm.max = 9999999999;
  }
  emits("change", setForm);
};

const changeFilter = (data) => {
  form.value = { ...form.value, ...data };
  updateSearch();
};

const toMoreSearch = () => {
  mobileSearchFilter.value.openDialog(form.value);
};
</script>

<style scoped lang="scss">
.search-data-mobile {
  height: 60px;
  background-color: #fff;
  text-align: center;
  line-height: 60px;
  border-top: 1px solid #a1a1a1;
  border-bottom: 1px solid #a1a1a1;
  width: 100%;
  .add-more-search {
    cursor: pointer;
  }
  :deep(.arco-select-view-single) {
    &:hover,
    &:focus-within,
    &.arco-select-view-focus {
      border: 0;
      background-color: #fff;
    }
  }
}
</style>

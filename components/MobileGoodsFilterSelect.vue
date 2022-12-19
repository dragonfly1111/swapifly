<template>
  <div>
    <a-row class="search-data-mobile">
      <a-col :span="10" v-if="treeShow">
        <a-tree-select
          :data="classListAsync"
          v-model="form.rid"
          :fieldNames="{
            key: 'id',
            title: 'title',
            children: 'children',
          }"
          :tree-props="{
            'default-expand-all': false,
          }"
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
const resetParam = ref({});

const mobileSearchFilter = ref(null);
const emits = defineEmits(["change"]);
let form = ref({
  sort: "",
  rid: "",
});

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
  // 如果父组件传了pid 根据pid获取他的子节点作为下拉列表
  const tmpNode = findNode(sysData.goodsClass, (node) => {
    return node.id === props.curRid
  })
  console.log('tmpNode')
  return tmpNode && tmpNode.children
})
const treeShow = computed(() => {
  if (!props.curLevel) {
    return  true
  }
  return props.curLevel < 3;
})
// 传值
const updateSearch = () => {
  let setForm = { ...form.value };
  console.log(setForm);
  setForm.nid = '';
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
  console.log('changeFilter')
  form.value = { ...form.value, ...data };
  updateSearch();
};

const toMoreSearch = () => {
  mobileSearchFilter.value.openDialog(form.value, classListAsync.value, treeShow.value);
};

const resetForm = () => {
  form.value.sort = ''
  form.value.rid = ''
};

defineExpose({
  resetForm
});
</script>

<style scoped lang="scss">
@import "assets/sass/var.scss";
.search-data-mobile {
  height: 45px;
  background-color: $main-white;
  text-align: center;
  line-height: 45px;
  border-top: 1px solid #a1a1a1;
  border-bottom: 1px solid #a1a1a1;
  width: 100%;
  .add-more-search {
    cursor: pointer;
  }
  :deep(.arco-select-view-single) {
    background-color: $main-white;
    color: $main-black;
    &:hover,
    &:focus-within,
    &.arco-select-view-focus {
      border: 0;
      background-color: $main-white;
    }
  }
}
</style>

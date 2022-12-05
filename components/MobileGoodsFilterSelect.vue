<template>
  <div>
    <a-row class="search-data-mobile">
      <a-col :span="8">
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
      </a-col>
      <a-col :span="8">
        <a-select :placeholder="$t('pages.sort')" v-model="form.sort" @change="updateSearch">
          <template #label="{ data }">
            <span class="select-span">{{ $t("pages.sort") }}：</span>
            {{ data.label }}
          </template>
          <a-option v-for="item in sortList" :key="item.id" :value="item.id" :label="item.title">{{
              item.title
            }}</a-option>
        </a-select>
      </a-col>
      <a-col :span="8">
        <div class="add-more-search" @click="toMoreSearch">
          {{ $t("pages.more_filters") }}
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { useSysData } from "~/stores/sysData";
const router = useRouter()
const sysData = useSysData();
const sortList = sysData.goodsSort;
const sourceClassList = sysData.goodsClass
const classList = sysData.goodsClass.map(item=>{
  return {
    id: item.id,
    title: item.title,
    children: []
  }
});
const emits = defineEmits(["change"]);
const classListAsync = ref(classList)
let form = reactive({
  sort: "",
  nid: [],
});

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
const toMoreSearch = () => {
  router.push(`/moreSearchFilter`)
}
</script>

<style scoped lang="scss">
.search-data-mobile{
  height: 60px;
  background-color: #fff;
  text-align: center;
  line-height: 60px;
  border-top: 1px solid #a1a1a1;
  border-bottom: 1px solid #a1a1a1;
  width: 100%;
  .add-more-search{
    cursor: pointer;
  }
}

</style>
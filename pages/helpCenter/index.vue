<template>
  <div class="global-content1">
    <div class="help-head">
      <div class="common-row">
        <div class="left">
          <div class="info">{{ $t('helpCenter.hello') }}</div>
          <div class="info">{{ $t('helpCenter.helpInfo') }}</div>
          <a-input-search class="search-box" :placeholder="$t('helpCenter.search')" @search="searchHandle"></a-input-search>
        </div>
        <div class="right">
          <img width="250" height="250" src="@/assets/images/help-head.png" alt="">
        </div>
      </div>
    </div>
    <div class="content common-row">
      <p class="big-title">{{ $t('helpCenter.theme') }}</p>
      <div class="main-content">
        <a-tree
            :data="treeData"
            :default-expand-all="false"
            v-model:expanded-keys="expandedKeys"
        >
          <!--由于title插槽会报错 这里用icon插槽来实现-->
          <template #icon="{ node }">
            <span @click="clickNode(node)" :class="node.level === 1 ? 'font1' : (node.level === 2 ? 'font2' : 'font3')  ">
              {{ node.title }}
            </span>
          </template>
        </a-tree>
        <a-tree
            :data="treeData"
            :default-expand-all="false"
        >
          <!--由于title插槽会报错 这里用icon插槽来实现-->
          <template #icon="{ node }">
            <span :class="node.level === 1 ? 'font1' : (node.level === 2 ? 'font2' : 'font3')  ">
              {{ node.title }}
            </span>
          </template>
        </a-tree>
        <a-tree
            :data="treeData"
            :default-expand-all="false"
        >
          <!--由于title插槽会报错 这里用icon插槽来实现-->
          <template #icon="{ node }">
            <span :class="node.level === 1 ? 'font1' : (node.level === 2 ? 'font2' : 'font3')  ">
              {{ node.title }}
            </span>
          </template>
        </a-tree>
      </div>
      <div class="content-foot">
        <div class="left-foot">
          <div class="big-title">{{ $t('helpCenter.problem') }}</div>
          <div class="info-box">
            <div class="info-bar">
              文章標題文本
            </div>
            <div class="info-bar">
              文章標題文本
            </div>
            <div class="info-bar">
              文章標題文本
            </div>
          </div>
        </div>
        <div class="right-foot">
          <div class="big-title">{{ $t('helpCenter.notice') }}</div>
          <div class="info-box">
            <div class="info-bar">
              文章標題文本
            </div>
            <div class="info-bar">
              文章標題文本
            </div>
            <div class="info-bar">
              文章標題文本
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const treeData = [
  {
    title: '一级标题',
    key: '0-0',
    level: 1,
    children: [
      {
        title: '二级标题1',
        key: '0-0-0',
        level: 2,
        children: [
          {
            title: 'Leaf',
            key: '0-0-0-0',
            level: 3
          },
          {
            title: 'Leaf',
            key: '0-0-0-1',
            level: 3
          }
        ]
      },
      {
        title: '二级标题2',
        key: '0-0-1',
        level: 2,
        children: [
          {
            title: 'Leaf',
            key: '0-0-1-0',
            level: 3
          },
        ]
      },
    ],
  }
];
const treeData1 = [
  {
    title: 'Trunk 0-0',
    key: '1-0',
    children: [
      {
        title: 'Branch 0-0-0',
        key: '1-0-0',
        children: [
          {
            title: 'Leaf',
            key: '1-0-0-0',
          },
          {
            title: 'Leaf',
            key: '1-0-0-1',
          }
        ]
      },
      {
        title: 'Branch 0-0-1',
        key: '1-0-1',
        children: [
          {
            title: 'Leaf',
            key: '1-0-1-0',
          },
        ]
      },
    ],
  }
];
const treeData2 = [
  {
    title: 'Trunk 0-0',
    key: '2-0',
    children: [
      {
        title: 'Branch 0-0-0',
        key: '2-0-0',
        children: [
          {
            title: 'Leaf',
            key: '2-0-0-0',
          },
          {
            title: 'Leaf',
            key: '2-0-0-1',
          }
        ]
      },
      {
        title: 'Branch 0-0-1',
        key: '2-0-1',
        children: [
          {
            title: 'Leaf',
            key: '2-0-1-0',
          },
        ]
      },
    ],
  }
];
const expandedKeys = ref([]);
const router = useRouter()
const searchHandle = (e) =>{
  router.push('/helpCenter/search')
}
const clickNode = (e) =>{
  console.log(e.key)
  if(e.level === 3){
    router.push(`/helpCenter/detail?id=${e.key}`)
  } else {
    // 手动实现点击标题展开功能
    if(expandedKeys.value.indexOf(e.key) !== -1){
      const index = expandedKeys.value.findIndex(item=> item === e.key)
      console.log(index)
      expandedKeys.value.splice(index, 1)
    } else {
      expandedKeys.value.push(e.key);
    }
  }

}
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";
.help-head{
  background: $main-blue;
  height: 250px;
  .common-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      .info{
        font-size: 42px;
        font-weight: 700;
        font-family: '思源黑体';
        color: #FFFFFF;
        margin-bottom: 16px;
      }
      .search-box{
        width: 500px;
        height: 46px;
        background: #0B5499;
        color: $grey-font-label;
        :deep(.arco-input-suffix){
          color: #FFFFFF;
          font-weight: 700;
          .arco-icon-hover:hover::before{
            background: unset;
          }
        }
      }
    }
  }
}
.content{
  margin-top: 27px;
  .big-title{
    color: $main-grey;
    font-size: 36px;
  }
  .main-content{
    .arco-tree{
      max-width: 835px;
    }
    .arco-tree + .arco-tree{
      margin-top: 14px;
    }
    :deep(.arco-tree-node){
      background: #E5E6EB;
      padding: 19px;
      .arco-tree-node-switcher{
        height: 22px;
        .arco-icon-hover:hover::before{
          background: unset;
        }
      }
      .arco-tree-node-title{
        padding: 0;
        height: 22px;
        line-height: 22px;
        color: #1D2129;
        .font1{
          font-size: 18px;
          font-weight: 700;
        }
        .font2{
          font-size: 16px;
          font-weight: 400;
        }
        .font3{
          font-size: 14px;
          font-weight: 400;
          padding-left: 44px;
        }
        .arco-tree-node-title-text{
          display: none;
        }
        &:hover{
          background: unset;
          color: $main-blue;
        }
      }
      .arco-tree-node-indent-block{
        width: 30px;
        margin-right: 0;
      }
    }
  }
  .content-foot{
    margin-top: 79px;
    display: flex;
    justify-content: space-between;
    .left-foot{
      width: 50%;
      margin-right: 40px;
    }
    .right-foot{
      width: 50%;
    }
    .info-box{
      padding-bottom: 65px;
      margin-top: 20px;
      .info-bar{
        background: #E5E6E8;
        padding: 9px 20px;
        font-size: 14px;
        color: #1D2129;
        box-shadow: 0px 1px 0px 0px #E5E6E8;
        cursor: pointer;
        &:hover{
          color: $main-blue;
        }
      }
      .info-bar + .info-bar{
        margin-top: 10px;
      }
    }
  }
}
</style>

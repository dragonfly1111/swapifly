<template>
  <div class="global-content">
    <div class="help-head">
      <div class="common-row">
        <div class="left">
          <div class="info">{{ $t('helpCenter.hello') }}</div>
          <div class="info">{{ $t('helpCenter.helpInfo') }}</div>
          <a-input-search class="search-box" :placeholder="$t('helpCenter.search')" v-model="searchKey"
                          @press-enter="searchHandleKey" @search="searchHandle"></a-input-search>
        </div>
        <div class="right">
          <img width="250" height="250" src="@/assets/images/help-head.png" alt="">
        </div>
      </div>
    </div>
    <div class="content common-row">
      <p class="big-title">{{ $t('helpCenter.theme') }}</p>
      <div class="main-content">
        <div v-if="dataLoading" class="mobile-a-skeleton-con" style="width: 835px">
          <a-skeleton :animation="true" class="skeleton">
            <a-skeleton-line :line-height="60" :rows="4"/>
          </a-skeleton>
        </div>
        <div v-else>
          <template v-for="tree in themeTree">
            <a-tree
                :data="[tree]"
                :default-expand-all="false"
                :field-names="{
                key: 'title'
              }"
                v-model:expanded-keys="expandedKeys"
            >
              <!--由于title插槽会报错 这里用icon插槽来实现-->
              <template #icon="{ node }">
                <span @click="clickNode(node)"
                      :class="node.level === 1 ? 'font1' : (node.level === 2 ? 'font2' : 'font3')  ">
                  {{ node.title }}
                </span>
              </template>
            </a-tree>

          </template>
        </div>

      </div>
      <div class="content-foot">
        <div class="left-foot">
          <div class="big-title">{{ $t('helpCenter.problem') }}</div>
          <div class="info-box">
            <div v-if="dataLoading">
              <a-skeleton :animation="true" class="skeleton">
                <a-skeleton-line :line-height="34" :rows="3"/>
              </a-skeleton>
            </div>
            <div v-else>
              <div class="info-bar" v-for="item in qaList" @click="toDetail(item)">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
        <div class="right-foot">
          <div class="big-title">{{ $t('helpCenter.notice') }}</div>
          <div class="info-box">
            <div v-if="dataLoading">
              <a-skeleton :animation="true" class="skeleton">
                <a-skeleton-line :line-height="34" :rows="3"/>
              </a-skeleton>
            </div>
            <div v-else>
              <div class="info-bar" v-for="item in noticeList" @click="toDetail(item)">
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {helpList} from '~/api/helpCenter'
import {Message} from "@arco-design/web-vue";

const searchKey = ref('')
const expandedKeys = ref([]);
const dataLoading = ref(true);
let themeTree = ref([]);
let qaList = ref([]);
let noticeList = ref([]);
const router = useRouter();
const searchHandleKey = (e) => {
  searchHandle(searchKey.value)
}
const searchHandle = (e) => {
  router.push(`/helpCenter/search?title=${e}`)
}
const clickNode = (e) => {
  console.log(e)
  if (e.level === 3) {
    toDetail(e)
  } else {
    // 手动实现点击标题展开功能
    if (expandedKeys.value.indexOf(e.title) !== -1) {
      const index = expandedKeys.value.findIndex(item => item === e.title)
      console.log(index)
      expandedKeys.value.splice(index, 1)
    } else {
      expandedKeys.value.push(e.title);
    }
  }

}


const getHelpList = () => {
  console.log('getHelpList')
  helpList().then(res => {
    console.log()
    dataLoading.value = false
    if (res.code === 0) {
      themeTree.value = res.data.theme
      qaList.value = res.data.qa
      noticeList.value = res.data.notice
    } else {
      Message.error(res.message)
    }
  })
}
getHelpList()

const toDetail = (e) => {
  router.push(`/helpCenter/detail?id=${e.id}`)
}

</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";

.help-head {
  background: $main-blue;
  height: 250px;

  .common-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      .info {
        font-size: 42px;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 16px;
      }

      .search-box {
        width: 500px;
        height: 46px;
        background: #0B5499;
        color: $grey-font-label;

        :deep(.arco-input-suffix) {
          color: #FFFFFF;
          font-weight: 700;

          .arco-icon-hover:hover::before {
            background: unset;
          }
        }
      }
    }
  }
}

.content {
  margin-top: 27px;

  .big-title {
    color: $main-grey;
    font-size: 36px;
  }

  .main-content {
    .arco-tree {
      max-width: 835px;
    }

    .arco-tree + .arco-tree {
      margin-top: 14px;
    }

    :deep(.arco-tree-node) {
      background: #E5E6EB;
      padding: 19px;

      .arco-tree-node-switcher {
        height: 22px;

        .arco-icon-hover:hover::before {
          background: unset;
        }
      }

      .arco-tree-node-title {
        padding: 0;
        height: 22px;
        line-height: 22px;
        color: #1D2129;

        .font1 {
          font-size: 18px;
          font-weight: 700;
        }

        .font2 {
          font-size: 16px;
          font-weight: 400;
        }

        .font3 {
          font-size: 14px;
          font-weight: 400;
          padding-left: 44px;
        }

        .arco-tree-node-title-text {
          display: none;
        }

        &:hover {
          background: unset;
          color: $main-blue;
        }
      }

      .arco-tree-node-indent-block {
        width: 30px;
        margin-right: 0;
      }
    }
  }

  .content-foot {
    margin-top: 79px;
    display: flex;
    justify-content: space-between;

    .left-foot {
      width: 50%;
      margin-right: 40px;
    }

    .right-foot {
      width: 50%;
    }

    .info-box {
      padding-bottom: 65px;
      margin-top: 20px;

      .info-bar {
        background: #E5E6E8;
        padding: 9px 20px;
        font-size: 14px;
        color: #1D2129;
        box-shadow: 0px 1px 0px 0px #E5E6E8;
        cursor: pointer;

        &:hover {
          color: $main-blue;
        }
      }

      .info-bar + .info-bar {
        margin-top: 10px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

@media screen and (max-width: 1000px) {
  .help-head {
    height: 200px;
    display: flex;
    align-items: center;
    position: relative;

    .common-row {
      .left {
        z-index: 1;

        .info {
          font-size: 26px;
          font-weight: 700;
          font-family: '思源黑体';
          color: #FFFFFF;
          margin-bottom: 12px;
        }

        .search-box {
          width: 300px;
        }
      }

      .right {
        position: absolute;
        right: 10px;
        bottom: 10px;

        img {
          height: 150px;
          width: 150px;
          z-index: -1;
        }
      }
    }

  }
  .content {
    .big-title {
      margin: 12px 0;
      font-size: 28px;
    }

    .main-content {
      .arco-tree {
        max-width: 100%;
      }

      .arco-tree + .arco-tree {
        margin-top: 12px;
      }

      :deep(.arco-tree-node) {
        background: #E5E6EB;
        padding: 12px;

        .arco-tree-node-switcher {
          height: 18px;

          .arco-icon-hover:hover::before {
            background: unset;
          }
        }

        .arco-tree-node-title {
          padding: 0;
          height: 22px;
          line-height: 22px;
          color: #1D2129;

          .font1 {
            font-size: 16px;
            font-weight: 700;
          }

          .font2 {
            font-size: 14px;
            font-weight: 400;
          }

          .font3 {
            font-size: 14px;
            font-weight: 400;
            padding-left: 12px;
          }

          .arco-tree-node-title-text {
            display: none;
          }

          &:hover {
            background: unset;
            color: $main-blue;
          }
        }

        .arco-tree-node-indent-block {
          width: 15px;
          margin-right: 0;
        }
      }
    }

    .content-foot {
      display: block;
      margin-top: 24px;

      .left-foot {
        width: 100%;

        .info-box {
          padding-bottom: 0;
        }
      }

      .right-foot {
        width: 100%;
        margin-top: 24px;
      }
    }
  }
}
</style>

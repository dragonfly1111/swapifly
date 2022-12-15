<!---->
<template>
  <div>
    <section>
      <div class="evaluate-item" v-for="item in list" :class="{ line: showLine }">
        <img
          class="user-icon"
          :src="baseImgPrefix + item.avatar"
          alt=""
          @click="toUserDetails(item)"
        />
        <div class="evaluate-content">
          <a-space>
            <span class="fs16" @click="toUserDetails(item)">{{ item.nickname }}</span>
            <span>{{ item.create_time }}</span>
            <span class="grey" v-if="showSource">{{ getTypeLabel(item.type) }}</span>
          </a-space>
          <div class="star-box">
            <!-- <a-rate v-model="item.num" readonly /> -->
            <icon-star-fill v-for="i in item.num" :size="14" />
          </div>
          <div>{{ item.content }}</div>
          <a-list :class="{ point: isToDetails }">
            <a-list-item @click="toGoodsDetails(item)">
              <a-list-item-meta :title="item.title" :description="`HK$` + item.price">
                <template #avatar>
                  <a-avatar shape="square">
                    <img alt="avatar" :src="baseImgPrefix + item.image" />
                  </a-avatar>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </div>
    </section>

    <!-- 骨架屏 -->
    <section>
      <a-skeleton :animation="true" :loading="pageLoading">
        <div>
          <a-space size="large">
            <a-skeleton-shape />
            <a-skeleton-line :rows="2" />
          </a-space>
        </div>
        <a-space direction="vertical" :style="{ width: '80%' }" size="large">
          <a-skeleton-line :rows="3" />
        </a-space>
      </a-skeleton>
    </section>

    <section>
      <a-empty class="empty-box" v-if="!pageLoading && !list.length">
        <template #image>
          <img src="@/assets/images/icon/evaluate-empty.png" alt="" />
        </template>
        <a-space direction="vertical" fill size="medium">
          <div class="empty-tip">{{ $t("evaluate.evaluateEmpty") }}</div>
          <div>{{ $t("evaluate.evaluateEmptyTip") }}</div>
        </a-space>
      </a-empty>
    </section>
    <!-- 商品封禁 -->
    <BlockModal ref="blockModal"></BlockModal>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { getProductFj } from "~/api/goods";
import { Message } from "@arco-design/web-vue";
const blockModal = ref(null);
const { t } = useI18n();
const router = useRouter();
const props = defineProps({
  showSource: {
    // 显示来源
    type: Boolean,
    default: true,
  },
  showLine: {
    // 显示下划线
    type: Boolean,
    default: true,
  },
  pageLoading: {
    type: Boolean,
    default: true,
  },
  list: {
    type: Array,
    default: () => [],
  },
  // 是否跳转商品详情
  isToDetails: {
    type: Boolean,
    default: true,
  },
});
const appConfig = useAppConfig();
const baseImgPrefix = appConfig.baseImgPrefix;
const getTypeLabel = (type) => {
  let typeMap = {
    1: t("evaluate.evaluationType.formBuyer"),
    2: t("evaluate.evaluationType.formSeller"),
  };
};

// 商品详情
const toGoodsDetails = (item) => {
  // 判断封禁状态
  getProductFj(item.pid).then((res) => {
    // type 1.自己，2他人
    // state 商品狀態，1.出售中，2.交易完成，3已下架，4 已删除
    if (res.code === 0) {
      if (res.data.status === 2) {
        // 打开封禁封禁弹窗
        blockModal.value.openDialog(2, res.data.type);
      } else if ((res.data.state === 2 || res.data.state === 3) && res.data.type === 2) {
        // 如果不是自己的商品 并且不是上架状态 打开非上架状态弹窗
        blockModal.value.openDialog(4);
      } else if (res.data.state === 4) {
        // 如果数据已被删除 无乱是不是自己的 打开非上架弹窗
        blockModal.value.openDialog(4);
      } else if (res.data.status === 1) {
        if (props.isToDetails) {
          router.push("/goodsDetails?id=" + item.pid);
        }
      }
    } else {
      Message.error(res.message);
    }
  });
};

// 用户详情
const toUserDetails = (item) => {
  console.log(item);
  router.push("/userDetails?userId=" + item.uid);
};
</script>
<style lang="scss" scoped>
@import "assets/sass/var";
.fs16 {
  font-size: 16px;
  cursor: pointer;
}
.evaluate-item {
  display: flex;
  margin-bottom: 20px;
  &.line {
    border-bottom: 1px solid #f0f1f1;
    padding-bottom: 20px;
  }
  .user-icon {
    display: block;
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 6px;
    margin-top: 2px;
    cursor: pointer;
  }
  .evaluate-content {
    flex: auto;
    line-height: 16px;
    :deep(.arco-rate) {
      font-size: 14px;
      min-height: 28px;
    }
    :deep(.arco-rate-character:not(:last-child)) {
      margin-right: 0;
    }
    :deep(.arco-list-wrapper) {
      margin-top: 8px;
      width: 100%;
      min-width: 200px;
      max-width: 500px;
    }
    :deep(.arco-list-item) {
      padding: 0 6px;
      cursor: pointer;
    }
    .point {
      :deep(.arco-list-item) {
        cursor: pointer;
      }
    }

    :deep(.arco-list-bordered) {
      border: 0;
      background-color: #f2f2f2;
      border-radius: 0;
    }
    :deep(.arco-list-item-meta-avatar) {
      margin-right: 8px;
      .arco-avatar-image {
        border-radius: 2px;
      }
    }
    :deep(.arco-list-item-meta-title) {
      font-weight: 400;
    }
    :deep(.arco-list-item-meta-content):hover {
      .arco-list-item-meta-title {
        color: $main-blue;
      }
      .arco-list-item-meta-description {
        color: $main-blue;
      }
    }
  }
}
.grey {
  color: $grey-font-label;
}

.empty-box {
  color: $grey-font-label;
  font-size: 12px;
  margin-top: 10%;
  img {
    width: 100px;
    object-fit: contain;
  }
  .empty-tip {
    color: $main-grey;
    font-size: 18px;
  }
}

.star-box {
  color: #ffb400;
  margin: 4px 0;
}

</style>

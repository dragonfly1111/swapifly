<!---->
<template>
  <div>
    <section>
      <div class="evaluate-item" v-for="item in 6" :class="{ line: showLine }">
        <img class="user-icon" :src="testImg" alt="" />
        <div class="evaluate-content">
          <a-space>
            <span class="fs16">@用户id</span>
            <span>一天前</span>
            <span class="grey" v-if="showSource">来自买家的评价</span>
          </a-space>
          <div>
            <a-rate :default-value="4" readonly />
          </div>
          <div>文本内容</div>
          <a-list>
            <a-list-item>
              <a-list-item-meta title="商品名称" description="hk1000">
                <template #avatar>
                  <a-avatar shape="square">
                    <img
                      alt="avatar"
                      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                    />
                  </a-avatar>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </div>
    </section>

    <section>
      <a-empty class="empty-box" v-if="isEmpty">
        <template #image>
          <img src="@/assets/images/icon/evaluate-empty.png" alt="" />
        </template>
        <a-space direction="vertical" fill size="medium">
          <div class="empty-tip">{{ $t("evaluate.evaluateEmpty") }}</div>
          <div>{{ $t("evaluate.evaluateEmptyTip") }}</div>
        </a-space>
      </a-empty>
    </section>
  </div>
</template>
<script setup>
const props = defineProps({
  showSource: {
    type: Boolean,
    default: true,
  },
  showLine: {
    type: Boolean,
    default: true,
  },
});
const isEmpty = ref(false);
const testImg =
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
</script>
<style lang="scss" scoped>
@import "assets/sass/var";
.fs16 {
  font-size: 16px;
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
</style>

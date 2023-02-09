<template>
  <div class="ad-wrapper" :style="{ width: width }">
    <div class="ad-title" v-if="props.hasTitle">{{ $t("foot.AD") }}</div>
    <div v-if="advert" class="ad-content" :style="{ height: height }" v-html="advert"></div>
    <div v-else class="ad-content" :style="{ height: height }">
<!--      <div>-->
<!--        <a-skeleton :animation="true" :loading="true">-->
<!--          <div style="width: 100%">-->
<!--            <a-skeleton-line :line-height="parseInt(height)" />-->
<!--          </div>-->
<!--        </a-skeleton>-->
<!--      </div>-->
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  hasTitle: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: "80%",
  },
  height: {
    type: String,
    default: "140px",
  },
  advert:{
    type: String,
    default:''
  }
});
</script>
<style scoped lang="scss">
.ad-wrapper {
  width: 80%;
  max-width: 900px;
  margin: 20px auto;
  text-align: center;
  .ad-content {
    width: 100%;
    height: 100%;
    // border: 1px solid;
    margin: 10px 0;
  }
}
</style>

<template>
  <div class="ad-wrapper" :style="{width:width}">
    <div class="ad-title" v-if="props.hasTitle">{{ $t("foot.AD") }}</div>
    <div class="ad-content"></div>
  </div>
</template>
<script setup >
const props = defineProps({
  hasTitle:{
    type:Boolean,
    default:true
  },
  width:{
    type:String,
    default:'80%'
  },
})
</script>
<style scoped lang="scss">
.ad-wrapper {
  width: 80%;
  max-width: 900px;
  margin: 20px auto;
  text-align: center;
  .ad-content {
    width: 100%;
    height: 140px;
    border: 1px solid;
    margin: 10px 0;
  }
}
</style>

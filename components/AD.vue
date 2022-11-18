<template>
   <div class="ad-wrapper">
    <div class="ad-title">{{ $t("foot.AD") }}</div>
        <div class="ad-content"></div>
   </div>
  </template>
  <style scoped lang="scss">
    .ad-wrapper {
    width: 80%;
    max-width: 1000px;
    margin: auto;
    text-align: center;
    .ad-content {
      width: 100%;
      height: 120px;
      border: 1px solid;
      margin: 10px 0;
    }
  }
  </style>
  
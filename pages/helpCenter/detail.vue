<template>
  <div class="global-content1 common-row">
    <div class="detail-content">
      <div class="left">
        <a-breadcrumb>
          <template #separator>
            <img src="@/assets/images/icon/breadcrumb-separator.png" alt="">
          </template>
          <a-breadcrumb-item>一级主题</a-breadcrumb-item>
          <a-breadcrumb-item>二级主题</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="time">2022/09/01</div>
        <div class="title">文章標題文本文章標題文本文章標題文本文章標題文本文章標題文本文章標題文本文章標題文本</div>
        <div class="content">
          示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容
          示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容
          示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容
          示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容
        </div>
      </div>
      <div class="right">
        <a-input-search class="search-input" :placeholder="$t('newsCenter.search')" search-button/>
        <div class="same-title">{{ $t('helpCenter.sameTheme') }}</div>
        <div v-for="item in 3" class="other-title">
          文章標題文本{{item}}
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";
.global-content1{

}
.detail-content{
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  .left{
    color: $main-grey;
    .time{
      font-size: 14px;
      margin-top: 10px;
    }
    .title{
      font-size: 36px;
      margin-top: 10px;
      max-width: 750px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content{
      margin-top: 17px;
      max-width: 750px;
    }
  }
  .right{
    width: 305px;
    .search-input {
      width: 305px;
      height: 46px;
      :deep(.arco-btn) {
        background: $main-pink;
        width: 46px;
        height: 46px;
      }

      :deep(.arco-icon) {
        width: 15px;
        height: 15px;
      }
    }
    .same-title{
      font-size: 16px;
      font-weight: 700;
      margin-top: 30px;
      padding-left: 11px;
    }
    .other-title{
      font-size: 14px;
      padding-left: 11px;
      margin-top: 20px;
      cursor: pointer;
      &:hover{
        color: $main-blue;
      }
    }
  }
}
:deep(.arco-breadcrumb){
  color: #333333 !important;
  font-size: 16px;
  .arco-breadcrumb-item{
    color: #333333 !important;
    font-weight: 400;
  }
}

</style>

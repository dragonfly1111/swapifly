<template>
  <div class="global-content1">
    <div>
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
        <div class="left">
          <div class="big-title">
            {{ $t('helpCenter.searchResult') }}
          </div>
          <div v-for="item in 4" class="help-item" @click="$router.push(`/helpCenter/detail?id=${item}`)">
            <div class="title">文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章標題文本{{ item }}文章標題文本{{ item }}文章標題文本{{ item }}文章標題文本{{ item }}文章標題文本{{ item }}文章標題文本{{ item }}文章標題文本{{ item }}</div>
            <div class="des">文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}文章概要文本{{ item }}</div>
          </div>
        </div>
        <div class="right">
          <div class="theme">
            {{ $t('helpCenter.articleTheme') }}
          </div>
          <div v-for="item in 3" class="theme-name">
            一級主題名稱{{item}}
          </div>
        </div>
      </div>
    </div>

    <div class="pag">
      <a-pagination :total="200" simple @change="changePage"/>
    </div>
  </div>
</template>

<script setup>
const searchHandle = (e) =>{
  console.log(e)
}
const changePage = (e) =>{
  console.log(e)
}
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";
.global-content1{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
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
  display: flex;
  justify-content: space-between;
  .left{
    width: 800px;
    .big-title{
      color: $main-grey;
      font-size: 36px;
      border-bottom: 1px solid #CCCCCC;
      padding-bottom: 10px;
    }
    .help-item{
      padding: 20px 0 20px 16px;
      border-bottom: 1px solid #E5E6E8;
      cursor: pointer;
      max-width: 500px;
      .title{
        color: #1D2129;
        font-size: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .des{
        margin-top: 10px;
        color: $grey-font-label;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      &:hover{
        .title{
          color: $main-blue;
        }
      }
    }
  }
  .right{
    width: 320px;
    .theme{
      color: #1D2129;
      font-size: 16px;
      margin-top: 23px;
      font-weight: 700;
      line-height: 22px;
    }
    .theme-name{
      color: #1D2129;
      margin-top: 20px;
      cursor: pointer;
      font-size: 14px;
      line-height: 22px;
      &:hover{
        color: $main-blue;
      }
    }
  }
}
.pag{
  padding-top: 18px;
  padding-bottom: 18px;
  .arco-pagination-simple{
    justify-content: center;
    :deep(.arco-pagination-jumper-input){
      padding: 0;
      width: 32px;
    }
    :deep(.arco-pagination-jumper-total-page){
      color: $grey-font-label;
    }
  }
}
</style>

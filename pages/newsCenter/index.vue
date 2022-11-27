<template>
  <div class="global-content2">
   <div class="news-head common-row">
     <div class="left">{{$t('newsCenter.title')}}</div>
     <div class="right">
       <a-input-search class="search-input" @search="toSearchResult" :placeholder="$t('newsCenter.search')" search-button/>
     </div>
   </div>
    <div class="news-content common-row">
      <div class="left">
        <div class="news-box">
          <a-image width="350" height="250" src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp" show-loader></a-image>
          <div class="info-box">
            <div class="time">2022/09/01</div>
            <div class="title">新聞文章標題</div>
            <div class="des">文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本</div>
          </div>
        </div>
        <div class="news-box">
          <a-image width="350" height="250" src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp" show-loader></a-image>
          <div class="info-box">
            <div class="time">2022/09/01</div>
            <div class="title">新聞文章標題</div>
            <div class="des">文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本文章概要文本</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          {{ $t('newsCenter.recentNews') }}
        </div>
        <div v-for="item in 5" class="news-title">
          新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const toSearchResult = () => {
  console.log('toSearchResult')
}
</script>

<style lang="scss" scoped>
@import "assets/sass/var.scss";
.news-head{
  padding: 55px 0 36px 0;
  border-bottom: 2px solid #CCCCCC;
  display: flex;
  justify-content: space-between;
  .left{
    font-size: 48px;
  }
  .right{
    .search-input {
      width: 305px;
      height: 46px;
      margin-left: 46px;

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
  }
}
.news-content{
  margin-top: 46px;
  display: flex;
  justify-content: space-between;
  .left{
    .news-box{
      display: flex;
      .info-box{
        margin-left: 38px;
        color: $main-grey;
        .time{
          font-size: 14px;
          margin-bottom: 10px;
        }
        .title{
          font-size: 28px;
          line-height: 41px;
          margin-bottom: 10px;
          max-width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .des{
          font-size: 14px;
          line-height: 21px;
          max-width: 500px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
        }
      }
    }
    .news-box + .news-box{
      margin-top: 61px;
    }
  }
  .right{
    width: 322px;
    .title{
      color: #1D2129;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 2px solid #E5E6E8;
      padding: 9px 20px;
    }
    .news-title{
      padding: 9px 20px;
      font-size: 14px;
      max-width: 322px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #E5E6E8;
      line-height: 22px;
      cursor: pointer;
      &:hover{
        color: $main-blue;
      }
    }
  }
}
</style>

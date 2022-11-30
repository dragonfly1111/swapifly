<template>
  <div class="global-content2">
    <div class="news-head common-row">
      <div class="left">{{$t('newsCenter.title')}}</div>
      <div class="right">
        <a-input-search class="search-input" @search="toSearchResult" :placeholder="$t('newsCenter.search')" search-button/>
      </div>
    </div>
    <div class="news-detail-content common-row">
      <div class="left">
        <a-image width="768" height="438" fit="cover" show-loader src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp"></a-image>
        <div class="time">2022/09/01</div>
        <div class="title">新聞文章標題</div>
        <div class="content">
          示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容
          示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容
          示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容
          示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容示例文本內容
        </div>
        <div class="recent">
          <div>
            <span class="block-title">{{ $t('newsCenter.recent') }}</span>
          </div>
          <div class="recent-wrap">
            <div class="news-block" v-for="item in 3" @click="toNewsDetail({id: 1})">
              <img class="news-img" src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp" />
              <div class="news-block-title">新聞文章標題</div>
              <div class="news-block-title">2022/09/01</div>
            </div>
          </div>
          <div class="line"></div>
          <div class="control">
            <div class="pre control-item">
              <div class="control-but"><icon-left /> {{ $t('newsCenter.preNews') }}</div>
              <div class="news-title">新聞文章標題</div>
            </div>
            <div class="next control-item">
              <!--沙雕arco用不了<icon-right/> 只好用left翻转代替-->
              <div class="control-but">{{ $t('newsCenter.nextNews') }}<icon-left /></div>
              <div class="news-title">新聞文章標題</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          {{ $t('newsCenter.recentNews') }}
        </div>
        <div v-for="item in 5"  @click="toNewsDetail({id: 1})" class="news-title">
          新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import {newsDetail} from "~/api/newsCenter";
import {Message} from "@arco-design/web-vue";
const router = useRouter()
const dataLoading = ref(true);

const toNewsDetail = (e) => {
  console.log('toNewsDetail')
  console.log(e)
  router.push(`/newsCenter/detail?${e.id}`)
}
// const getNewsDetail = () => {
//   dataLoading.value = true
//   newsDetail({
//     id: page.value
//   }).then(res => {
//     dataLoading.value = false
//     if (res.code === 0) {
//
//       res.data.data.forEach(item=>{
//         item.news_time = timeFormat()
//       })
//       newsDataList.value = res.data.data
//       totalRes.value = res.data.total
//     } else {
//       Message.error(res.message)
//     }
//   })
// }

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
.news-detail-content{
  margin-top: 44px;
  display: flex;
  justify-content: space-between;
  .left{
    max-width: 768px;
    .time{
      color: #A6A6A6;
      font-size: 14px;
      margin-top: 34px;
    }
    .title{
      color: #D43030;
      font-size: 36px;
      margin-top: 10px;
    }
    .content{
      margin-top: 17px;
    }
    .recent{
      margin-top: 113px;
      .block-title{
        color: $main-grey;
        font-size: 12px;
        position: relative;
        &::before{
          content: '';
          height: 1px;
          width: 100%;
          position: absolute;
          background: #383838;
          top: -8px;
          left: 0;
        }
      }
      .recent-wrap{
        display: flex;
        justify-content: space-between;
        .news-block{
          margin-top: 10px;
          color: #383838;
          font-size: 14px;
          .news-img{
            width: 237px;
            height: 170px;
            object-fit: cover;
          }
          .news-block-title{
            height: 21px;
            line-height: 21px;
          }
        }
      }
      .line{
        width: 100%;
        height: 1px;
        background: $grey-font-label;
        margin-top: 43px;
        margin-bottom: 21px;
      }
      .control{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 96px;
        .control-item{
          cursor: pointer;
          .control-but{
            color: $grey-font-label;
            display: flex;
            align-items: center;
          }
          .news-title{
            margin-top: 5px;
            font-size: 16px;
            line-height: 24px;
          }
          &:hover{
            .news-title{
              color: $main-blue;
            }
          }
        }
        .next{
          .control-but{
            display: flex;
            justify-content: flex-end;
          }
          :deep(.arco-icon-left){
            transform: rotate(180deg);
          }
        }

      }
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

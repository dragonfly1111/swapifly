<template>
  <div class="global-content1">
    <div>
      <div class="help-head">
        <div class="common-row">
          <div class="left">
            <div class="info">{{ $t('helpCenter.hello') }}</div>
            <div class="info">{{ $t('helpCenter.helpInfo') }}</div>
            <a-input-search class="search-box" v-model="searchKey" :placeholder="$t('helpCenter.search')" @press-enter="searchHandleKey" @search="searchHandle"></a-input-search>
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
          <template v-if="!dataLoading">
            <template v-if="resultList.length > 0">
              <div v-for="item in resultList" class="help-item" @click="$router.push(`/helpCenter/detail?id=${item.id}`)">
                <div class="title">{{ item.title }}</div>
                <div class="des">{{ item.abstract }}</div>
              </div>
            </template>
            <template v-else>
              <div class="no-data">
                <img src="@/assets/images/no-data-box.png" alt="">
                <div class="title">{{ $t('helpCenter.noData') }}</div>
                <div class="tip">{{ $t('helpCenter.noDataTip') }}</div>
              </div>

            </template>
          </template>
          <template v-else>
            <a-skeleton :animation="true" class="skeleton">
              <div style="height: 20px;"></div>
              <div style="width: 70%;">
                <a-skeleton-line :line-height="22" :rows="2" :line-spacing="10"/>
              </div>
              <div style="height: 36px;"></div>
              <div style="width: 70%;">
                <a-skeleton-line :line-height="22" :rows="2" :line-spacing="10"/>
              </div>
              <div style="height: 36px;"></div>
              <div style="width: 70%;">
                <a-skeleton-line :line-height="22" :rows="2" :line-spacing="10"/>
              </div>
              <div style="height: 36px;"></div>
              <div style="width: 70%;">
                <a-skeleton-line :line-height="22" :rows="2" :line-spacing="10"/>
              </div>
            </a-skeleton>
          </template>

        </div>
        <div class="right">
          <div class="theme">
            {{ $t('helpCenter.articleTheme') }}
          </div>
          <div v-if="!dataLoading1">
            <div v-for="item in themeList" class="theme-name" @click="changeTheme(item)">
              {{ item.title }}
            </div>
          </div>
          <div v-else>
            <div style="height: 20px"></div>
            <a-skeleton-line :line-height="22" :line-spacing="16" :rows="3"/>
          </div>

        </div>
      </div>
    </div>

    <div class="pag">
      <a-pagination :total="totalRes" v-model:current="page" :page-size="4" simple @change="changePage"/>
    </div>
  </div>
</template>

<script setup>
import { helpSearch, helpTheme } from '~/api/helpCenter'
import {Message} from "@arco-design/web-vue";
const searchKey = ref('')
const page = ref(1)
const totalRes = ref(0)
const resultList = ref([])
const themeList = ref([])
const route = useRoute()
const dataLoading = ref(true);
const dataLoading1 = ref(true);
searchKey.value = route.query.title

const searchHandleKey = () =>{
  searchHandle(searchKey.value)
}

const changeTheme = (e) => {
  searchKey.value = ''
  getSearchRes('', e.id)
}

const searchHandle = (e) => {
  page.value = 1
  getSearchRes(e)
  // getHelpTheme()
}

const getSearchRes = (title, rid) => {
  dataLoading.value = true
  if(title){
    route.query.title = title
  }
  helpSearch({
    title: title ? title : null,
    rid: rid ? rid : null,
    page: page.value,
    limit: 4
  }).then(res=>{
    dataLoading.value = false
    if(res.code === 0){
      resultList.value = res.data.data
      totalRes.value = res.data.total
      console.log(res.total)
    } else {
      Message.error(res.message)
    }
  })
}
const getHelpTheme = () => {
  dataLoading1.value = true
  helpTheme().then(res=>{
    dataLoading1.value = false
    if(res.code === 0){
      themeList.value = res.data
    } else {
      Message.error(res.message)
    }
  })
}

getSearchRes(searchKey.value)
getHelpTheme()

const changePage = (e) => {
  console.log(e)
  console.log(page.value)
  getSearchRes(searchKey.value)
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
    .no-data{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 200px;
      img{
        width: 86px;
      }
      .title{
        margin-top: 11px;
        color: #333333;
        font-size: 18px;
      }
      .tip{
        color: $grey-font-label;
        margin-top: 10px;
        font-size: 12px;
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

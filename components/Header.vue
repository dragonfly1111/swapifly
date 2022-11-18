<template>
  <div class="global-head">
    <div class="head-bar">
      <div class="common-row">
        <div class="left">
          <img class="logo" src="@/assets/images/swapifly-logo.png" alt="">
          <div class="class-bar">
            <div v-for="i in 6" :key="i" class="class-item">分类名称{{i}}</div>
          </div>
        </div>
        <div class="right">
          <div class="sign">{{$t('head.sign')}}</div>
          <div class="login">{{$t('head.login')}}</div>
        </div>

      </div>
    </div>
    <div class="head-search">
      <div class="common-row">
        <div class="left">
          <img class="long-logo" src="@/assets/images/logo-long.png" alt="">
          <a-input-search class="search-input" :placeholder="$t('head.searchKey')" search-button/>
        </div>
        <div class="right">
          <a-button class="sell-but">{{$t('head.sell')}}</a-button>
        </div>
      </div>

    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "assets/sass/var.scss";
.global-head{
  position: fixed;
  top: 0;
  text-align: center;
  width: 100%;
  z-index: 998;
}
.head-bar{
  height: 40px;
  background: #383838;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  color: #FFFFFF;
  .common-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  .left{
    display: flex;
    align-items: center;
  }
  .right{
    display: flex;
    align-items: center;
    div{
      cursor: pointer;
    }
    .login{
      margin-left: 28px;
    }
  }
  .logo{
    width: 24px;
    height: 24px;
  }
  .class-bar{
    margin-left: 14px;
    display: flex;
    .class-item{
      cursor: pointer;
    }
    .class-item + .class-item{
      margin-left: 36px;
    }
  }
}
.head-search{
  padding: 10px 0;
  border-bottom: 1px solid #E5E5E5;
  background: #FFFFFF;
  .common-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .left{
    display: flex;
    align-items: center;
    .long-logo{
      width: 152px;
      height: 36px;
      object-fit: contain;
    }
    .search-input{
      width: 500px;
      height: 46px;
      margin-left: 46px;
      :deep(.arco-btn){
        background: $main-pink;
        width: 46px;
        height: 46px;
      }
      :deep(.arco-icon){
        width: 15px;
        height: 15px;
      }
    }
  }
  .right{
    display: flex;
    align-items: center;
    .sell-but{
      height: 35px;
      width: 82px;
      background: $main-pink;
      color: #FFFFFF;
      :deep(.arco-btn) {
        height: 35px;
        width: 82px;
        background: $main-pink;
      }
    }

  }

}
</style>

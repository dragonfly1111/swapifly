<template>
  <div class="global-head">
    <div @mouseleave="outClass">
      <div class="head-bar">
        <div class="common-row">
          <div class="left">
            <nuxt-link href="/">
              <img class="logo" src="@/assets/images/swapifly-logo.png" alt="">
            </nuxt-link>
            <div class="class-bar">
              <div v-for="item in classList" :key="item.id" class="class-item"
                   @mouseenter="changeCurType(item)" @click="toClassDetail(item)">
                {{ item.title }}
              </div>
            </div>
          </div>
          <div class="right">
            <div class="sign" @click="openRegister">
              {{ $t('head.sign') }}
             </div>
            <div class="login" @click="openLogin">
              {{ $t('head.login') }}
            </div>
          </div>

        </div>
      </div>
      <div v-if="showHeadPanel" class="class-panel">
<!--        {{ JSON.stringify(curClass) }}-->
        <!--    <div class="class-panel">-->
        <div class="class-wrap">
          <div v-for="item in curClass.value" :key="item.id" class="class-item">
            <div class="sec-title">
              <a-link @click="toClassDetail(item)"> {{ item.title }}</a-link>
            </div>
            <div class="class-sub-item" v-for="sub in item.children" :key="sub.id">
              <a-link @click="toClassDetail(item)"> {{ sub.title }}</a-link>
            </div>
          </div>
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
          <a-button class="sell-but">{{ $t('head.sell') }}</a-button>
        </div>
      </div>

    </div>

    <LoginModal ref="loginModal" @toRegister="toRegister"></LoginModal>
    <RegisterModal ref="registerModal" @toLogin="toLogin" @toPreference="toPreference"></RegisterModal>
    <ChoosePreference ref="choosePreference" @confirmPreference="confirmPreference"></ChoosePreference>
  </div>
</template>

<script setup lang="ts">
import {useSysData} from '~/stores/sysData'
import {IGoodsClass} from '~/model/goodsClass'
const router = useRouter()
const loginModal = ref(null)
const registerModal = ref(null)
const sysData = useSysData()
const classList = sysData.goodsClass
const showHeadPanel = ref(false)
let curClass: any = reactive({value: []})
curClass.value = classList[0].children

function openRegister(){
  registerModal.value.openDialog()
}

function openLogin(){
  loginModal.value.openDialog()
}

function toRegister(){
  loginModal.value.handleCancel()
  registerModal.value.openDialog()
}

function toLogin(){
  registerModal.value.handleCancel()
  loginModal.value.openDialog()
}

function confirmPreference(){

}

function changeCurType(e: IGoodsClass) {
  console.log(e)
  if (e.children && e.children.length) {
    curClass.value = e.children
    showHeadPanel.value = true
  } else {
    showHeadPanel.value = false
    curClass.value = []
  }
}

function outClass() {
  showHeadPanel.value = false
}

function toClassDetail(e: IGoodsClass) {
  console.log(e)
  router.push({
    path: '/goodsList',
    query: {
      rid: e.id
    }
  })
  showHeadPanel.value = false
}

</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

.global-head {
  position: fixed;
  top: 0;
  text-align: center;
  width: 100%;
  z-index: 998;
}

.head-bar {
  height: 40px;
  background: $main-grey;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  position: relative;
  color: #FFFFFF;
  .common-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;

    div {
      cursor: pointer;
    }

    .login {
      margin-left: 28px;
    }
  }

  .logo {
    width: 24px;
    height: 24px;
  }

  .class-bar {
    //margin-left: 14px;
    display: flex;

    .class-item {
      cursor: pointer;
      font-size: 16px;
      padding: 0 16px;
    }

    //.class-item + .class-item{
    //  margin-left: 36px;
    //}
  }
}

.class-panel {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 999;
  background: #FFFFFF;
  padding: 5px 55px 91px 55px;
  border: 1px solid rgba(229, 230, 235, 1);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  .arco-link{
    color: rgba(29, 33, 41, 1);
  }
  .class-wrap {
    display: flex;
    text-align: left;
    //color: rgba(29, 33, 41, 1);

    .sec-title {
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 700;
      line-height: 22px;
    }

    .class-sub-item {
      margin-bottom: 10px;
      padding-left: 22px;
      font-size: 14px;
      line-height: 22px;
    }

    .class-item + .class-item {
      margin-left: 66px;
    }

  }
}

.head-search {
  padding: 10px 0;
  border-bottom: 1px solid #E5E5E5;
  background: #FFFFFF;

  .common-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left {
    display: flex;
    align-items: center;

    .long-logo {
      width: 152px;
      height: 36px;
      object-fit: contain;
    }

    .search-input {
      width: 500px;
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

  .right {
    display: flex;
    align-items: center;

    .sell-but {
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

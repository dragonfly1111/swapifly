<template>
  <div class="global-head">
    <div @mouseleave="outClass">
      <div v-if="resize.screenType !== 'MOBILE'" class="head-bar">
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
            <template v-if="userInfo.token">
              <div class="user-bar">
                <a-dropdown trigger="click" @select="selectMenu" position="br" @popup-visible-change="dropShow = !dropShow">
                  <div class="name-box">
                    <img class="avatar" :src="baseImgPrefix + userInfo.avatar" alt="">
                    <span class="username">{{$t('head.wellcome')}}{{ userInfo.nickname }}</span>
                    <icon-down class="down-ico" :class="dropShow ? 'transform' : ''" />
                  </div>
                  <template #content>
                    <a-doption value="profile">
                      <template #icon>
                        <img class="user-drop-icon" src="@/assets/images/icon/icon_user.png" alt="">
                      </template>
                      {{ $t('head.profile') }}
                    </a-doption>
                    <a-doption value="setting">
                      <template #icon>
                        <img class="user-drop-icon"  src="@/assets/images/icon/icon_setting.png" alt="">
                      </template>
                      {{ $t('head.setting') }}
                    </a-doption>
                    <a-doption value="logout">
                      <template #icon>
                        <img class="user-drop-icon"  src="@/assets/images/icon/icon_logout.png" alt="">
                      </template>
                      {{ $t('head.logout') }}
                    </a-doption>
                  </template>
                </a-dropdown>
                <img class="user-menu-icon" src="@/assets/images/icon/icon_like.png" alt="" @click="router.push('/like')">
                <img class="user-menu-icon" src="@/assets/images/icon/icon_msg.png" alt="" @click="router.push('/dialogue')">
                <img class="user-menu-icon" src="@/assets/images/icon/icon_alert.png" alt="" @click="router.push('/notification')">
              </div>
            </template>
            <template v-else>
              <div class="sign" @click="openRegister">
                {{ $t('head.sign') }}
              </div>
              <div class="login" @click="openLogin">
                {{ $t('head.login') }}
              </div>
            </template>

          </div>
        </div>
      </div>
      <div v-if="showHeadPanel" class="class-panel">
        <div class="class-wrap">
          <div v-for="item in curClass.value" :key="item.id" class="class-item">
            <div class="sec-title">
              <a-link @click="toClassDetail(item)"> {{ item.title }}</a-link>
            </div>
            <div class="class-sub-item" v-for="sub in item.children" :key="sub.id">
              <a-link @click="toClassDetail(sub)"> {{ sub.title }}</a-link>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="head-search">
      <div class="common-row">
        <a-row style="width: 100%">
          <a-col :span="resize.screenType === 'MOBILE'?2:4" class="img-col">
            <nuxt-link href="/">
              <img class="phone-logo" v-if="resize.screenType === 'MOBILE'"  src="@/assets/images/swapifly-logo.png" alt="">
              <img v-else class="long-logo" src="@/assets/images/logo-long.png" alt="">
            </nuxt-link>
          </a-col>
          <a-col :span="resize.screenType === 'MOBILE'?16:10" class="search-col">
            <div class="search-input">
              <a-input-search v-model="searchKey" @focus="openHisPanel" @blur="hideHisPanel" @press-enter="toSearchResult" @search="toSearchResult" @input="changeSearchKey" :placeholder="$t('head.searchKey')" search-button>
                <template #suffix v-if="searchResPage">
                  <img @click.prevent.stop="handleCollection" class="icon-collection" src="@/assets/images/icon/icon-collection.png" alt="">
                </template>
              </a-input-search>
              <div :class="suggestShow ? 'show-suggest' : 'hide-suggest'" class="search-suggest">
<!--              <div class="search-suggest show-suggest">-->
                <div class="white-wrap wrap">
                  {{ $t('head.searchHis') }}
                </div>
                <template v-if="searchLog.length === 0">
                  <a-empty />
                </template>
                <template v-else>
                  <div class="gray-wrap wrap" v-for="item in searchLog" @click="handleHis(item.title)">{{ item.title }}</div>
                </template>
                <div class="white-wrap wrap">
                  {{ $t('head.collectionKey') }}
                </div>
                <template v-if="collectionList.length === 0">
                  <a-empty />
                </template>
                <template v-else>
                  <div class="gray-wrap wrap"  v-for="item in collectionList">
                    <div class="his-title" @click="handleHis(item.title)">{{ item.title }}</div>
                    <icon-close @click="deleteHis(item.id)" />
                  </div>
                </template>
              </div>
            </div>
          </a-col>
          <a-col :span="resize.screenType === 'MOBILE'?6:10" style="text-align: right;" class="btn-col">
            <div v-if="resize.screenType === 'MOBILE'" style="padding-right: 30px">
              <template v-if="userInfo.token" >
                <icon-message class="icon-message" @click="router.push('/dialogue')"/>
                <icon-list class="icon-list" @click="router.push('/mobileUserProfile')"/>
              </template>
              <a-button v-else class="sell-but-mobile" @click="openLogin">{{ $t('head.login') }}</a-button>
            </div>
            <a-button v-else class="sell-but" @click="toSell">{{ $t('head.sell') }}</a-button>
          </a-col>
        </a-row>
      </div>
    </div>

    <LoginModal ref="loginModal" @toRegister="toRegister"></LoginModal>
    <RegisterModal ref="registerModal" @toLogin="toLogin" @toPreference="toPreference"></RegisterModal>
    <ChoosePreference ref="choosePreference" @confirmPreference="confirmPreference"></ChoosePreference>
    <!--    <BindEmail ref="bindEmail"></BindEmail>-->
    <!--    <ResetPwd ref="resetPwd"></ResetPwd>-->
  </div>
</template>

<script setup lang="ts">
import {useSysData} from '~/stores/sysData'
import {useSearchKey} from '~/stores/search'
import {IGoodsClass} from '~/model/res/goodsClass'
import {useUserInfo} from "~/stores/userInfo";
import { useResize } from '~/stores/resize'
import { searchAdd, searchScDel, getSearchHistory } from '~/api/goods'
import { baseImgPrefix } from "~/config/baseUrl";
import {Message} from "@arco-design/web-vue";
const router = useRouter()
const route = useRoute()
const userInfo = useUserInfo()
const searchKeyState = useSearchKey()
import {useI18n} from "vue-i18n";
const {t} = useI18n();
const loginModal = ref(null)
const registerModal = ref(null)
const choosePreference = ref(null)
const dropShow = ref(false)
const suggestShow = ref(false)
const sysData = useSysData()
const classList = sysData.goodsClass
const searchLog = ref([])
const collectionList = ref([])

const showHeadPanel = ref(false)
const searchResPage = ref(false)
let searchKey = ref('')
const resize = useResize();
let curClass: any = reactive({value: []})
curClass.value = (classList && classList.length > 0) ? classList[0].children : []
console.log("===resize.screenType====",resize.screenType)
// 监听路由 如果是搜索结果页面 搜索框加上星星icon
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  console.log('header watch', newValue);
  if(newValue === '/searchResult'){
    searchResPage.value = true
  } else {
    searchResPage.value = false
    // 离开搜索结果路由时 清空搜索key
    searchKeyState.setKey('')
    searchKey.value = ''
  }
}, {immediate: true})
// 监听路由参数 将地址栏的搜索词放到pina
watch(() => route.query, (newValue, oldValue) => {
  searchKeyState.setKey(newValue.keyword)
  searchKey.value = searchKeyState.searchKey
}, {immediate: true})
function selectMenu(e){
  switch (e) {
    case 'profile':
      router.push(`/userDetails?userId=${userInfo.id}`)
      break
    case 'setting':
      router.push('/userProfile')
      break
    case 'logout':
      console.log('logout')
      userInfo.logout()
      router.replace('/')
      break
  }
}

function openRegister() {
  registerModal.value.openDialog()
}

function openLogin() {
  console.log("openLogin",resize.screenType)
  if (resize.screenType === 'MOBILE'){
    router.push('/login')
  }else {
    loginModal.value.openDialog()
  }
}
function toSell() {
  router.push('/saleEdit')
}
function toRegister() {
  loginModal.value.handleCancel()
  registerModal.value.openDialog()
}
function toLogin() {
  registerModal.value.handleCancel()
  loginModal.value.openDialog()
}
function toPreference() {
  choosePreference.value.openDialog()
}
function confirmPreference() {

}
function toSearchResult() {
  suggestShow.value = false
  router.push({
    path: '/searchResult',
    query: {
      keyword: searchKey.value
    }
  })
}
function changeSearchKey(e) {
  searchKeyState.setKey(e)
}
function openHisPanel(){
  searchLog.value = sysData.searchLog
  collectionList.value = sysData.collectionList
  suggestShow.value = true
}
function hideHisPanel(){
  setTimeout(()=>{
    suggestShow.value = false
    getSearchHistory().then(res=>{
      const searchLog = res.data.search_log
      const collectionList = res.data.scsearch_log
      sysData.setSearchHis({
        searchLog,
        collectionList
      })
    })
  }, 50)
}
function handleHis(e:string) {
  searchKey.value = e
  toSearchResult(e)
}
function deleteHis(id) {
  searchScDel({
    id
  }).then(res=>{
    if(res.code === 0){
      Message.success(t('head.deleteSuc'))
    } else {
      Message.success(res.message)
    }
  })
}
function handleCollection() {
  if(searchKey.value){
    searchAdd({
      title: searchKey.value
    }).then(res=>{
      if(res.code === 0){
        Message.success(t('head.collectionSuc'))
      } else {
        Message.erroe(res.message)
      }
    })
  }

}
function changeCurType(e: IGoodsClass) {
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
      id: e.id,
      level: e.level
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
    * {
      cursor: pointer;
    }
    .user-bar{
      position: absolute;
      right: 22px;
      display: flex;
      align-items: center;
      .name-box{
        display: flex;
        align-items: center;
        margin-right: 45px;
        .avatar{
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        .username{
          margin-left: 9px;
          font-size: 10px;
        }
        .down-ico{
          font-size: 12px;
          margin-left: 18px;
          transition: .2s all;
          transform: rotate(0);
        }
        .transform{
          transform: rotate(180deg);
        }
        .arco-dropdown-option-icon{
          background: red;
        }
      }
      .user-menu-icon{
        width: 20px;
      }
      .user-menu-icon + .user-menu-icon{
        margin-left: 24px;
      }

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

  .arco-link {
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
  .img-col{
    .phone-logo{
      height: 36px;
      margin-top:5px;
      object-fit: contain;
    }
    .long-logo {
      width: 152px;
      height: 36px;
      object-fit: contain;
    }
  }
  .search-col{
    .search-input {
      height: 46px;
      margin-left: 10px;
      position: relative;
      :deep(.arco-btn) {
        background: $main-pink;
        width: 46px;
        height: 46px;
      }
      //:deep(.arco-icon) {
      //  width: 15px;
      //  height: 15px;
      //}
      .icon-collection{
        cursor: pointer;
      }
      .search-suggest{
        position: absolute;
        width: calc(100% - 46px);
        box-shadow: 0px 2px 5px 0px #8d8d8d;
        transition: max-height 0.3s linear;
        overflow: hidden;
        .wrap{
          padding: 5px 19px 5px 12px;
          line-height: 22px;
          font-size: 14px;
          height: 22px;
          text-align: left;
        }
        .white-wrap{
          background: #FFFFFF;
        }
        .gray-wrap{
          background: #F2F3F5;
          color: #86909C;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .his-title{
            width: 80%;
          }
          :deep(.arco-icon-close){
            width: 9px;
            height: 9px;
          }
          &:hover{
            color: $main-blue;
          }
        }
      }
      .show-suggest{
        max-height: 330px;
      }
      .hide-suggest{
        max-height: 0;
      }
    }
  }
  .btn-col{
    .sell-but-mobile{
      height: 35px;
      background: $main-pink;
      color: #FFFFFF;
      line-height: 46px;
      margin-top:5px;
      :deep(.arco-btn) {
        height: 35px;
        width: 82px;
        background: $main-pink;
      }
    }
    .sell-but {
      height: 35px;
      width: 82px;
      background: $main-pink;
      color: #FFFFFF;
      line-height: 46px;
      margin-top:5px;
      :deep(.arco-btn) {
        height: 35px;
        width: 82px;
        background: $main-pink;
      }
    }
  }
  .icon-message{
    font-size: 25px;
    font-weight: bold;
    margin-top: 8px;
  }
  .icon-list{
    font-size: 25px;
    font-weight: bold;
    margin-left: 10px;
    margin-top: 8px;
  }
}

.arco-empty{
  background: #F2F3F5;
}
</style>
<style lang="scss">
.user-drop-icon{
  width: 28px;
  height: 28px;
}
</style>

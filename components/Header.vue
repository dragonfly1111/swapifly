<!--通用header(移动&pc)-->
<template>
  <div class="global-head">
    <div class="class-bar-block" @mouseleave="outClass">
      <div class="head-bar">
        <div class="common-row">
          <div class="left">
            <nuxt-link href="/">
              <img class="logo" src="@/assets/images/swapifly-logo.png" alt="" />
            </nuxt-link>
            <div class="class-bar" v-if="sysData.goodsClass.length > 0">
              <div
                v-for="item in sysData.goodsClass"
                :key="item.id"
                class="class-item"
                @mouseenter="changeCurType(item)"
                @click="toClassDetail(item)"
              >
                {{ item.title }}
              </div>
            </div>
            <div class="class-bar" v-else>
              <!--            <div class="class-bar">-->
              <a-skeleton
                :animation="sysData.goodsClass.length === 0"
                class="skeleton"
                style="
                  margin-left: 30px;
                  display: flex;
                  width: 600px;
                  justify-content: space-between;
                "
              >
                <a-skeleton-line :line-height="30" :widths="[70]" :rows="1" />
                <a-skeleton-line :line-height="30" :widths="[70]" :rows="1" />
                <a-skeleton-line :line-height="30" :widths="[70]" :rows="1" />
                <a-skeleton-line :line-height="30" :widths="[70]" :rows="1" />
                <a-skeleton-line :line-height="30" :widths="[70]" :rows="1" />
                <a-skeleton-line :line-height="30" :widths="[70]" :rows="1" />
                <a-skeleton-line :line-height="30" :widths="[70]" :rows="1" />
              </a-skeleton>
            </div>
          </div>
          <div class="right">
            <template v-if="userInfo.token">
              <div class="user-bar">
                <a-dropdown
                  trigger="click"
                  @select="selectMenu"
                  position="br"
                  @popup-visible-change="dropShow = !dropShow"
                >
                  <div class="name-box">
                    <img class="avatar" :src="baseImgPrefix + userInfo.avatar" alt="" />
                    <span class="username">{{ $t("head.wellcome") }}{{ userInfo.nickname }}</span>
                    <icon-down class="down-ico" :class="dropShow ? 'transform' : ''" />
                  </div>
                  <template #content>
                    <a-doption value="profile">
                      <template #icon>
                        <img
                          class="user-drop-icon"
                          src="@/assets/images/icon/icon_user.png"
                          alt=""
                        />
                      </template>
                      {{ $t("head.profile") }}
                    </a-doption>
                    <a-doption value="setting">
                      <template #icon>
                        <img
                          class="user-drop-icon"
                          src="@/assets/images/icon/icon_setting.png"
                          alt=""
                        />
                      </template>
                      {{ $t("head.setting") }}
                    </a-doption>
                    <a-doption value="logout">
                      <template #icon>
                        <img
                          class="user-drop-icon"
                          src="@/assets/images/icon/icon_logout.png"
                          alt=""
                        />
                      </template>
                      {{ $t("head.logout") }}
                    </a-doption>
                  </template>
                </a-dropdown>
                <img
                  class="user-menu-icon"
                  src="@/assets/images/icon/icon_like.png"
                  alt=""
                  @click="router.push('/like')"
                />
                <a-badge
                  class="user-menu-icon"
                  :count="userInfo.newMessage"
                  @click="router.push('/dialogue')"
                >
                  <img src="@/assets/images/icon/icon_msg.png" alt="" />
                </a-badge>
                <a-badge
                  class="user-menu-icon"
                  :count="userInfo.newNotice"
                  @click="router.push('/notification')"
                >
                  <img src="@/assets/images/icon/icon_alert.png" alt="" />
                </a-badge>
              </div>
            </template>
            <template v-else>
              <div class="sign" @click="openRegister">
                {{ $t("head.sign") }}
              </div>
              <div class="login" @click="openLogin">
                {{ $t("head.login") }}
              </div>
            </template>
          </div>
        </div>
      </div>
      <div v-if="showHeadPanel" class="class-panel">
        <!--              <div class="class-panel">-->
        <div class="class-wrap common-row">
          <div v-for="item in curClass.value" :key="item.id" class="class-item">
            <div class="sec-title">
              <a-link @click="toClassDetail(item)">
                <!--                <a-image :width="25" :height="25" show-loader>-->
                <!--                  <template #loader>-->
                <!--                    <div class="loader-animate"/>-->
                <!--                  </template>-->
                <!--                </a-image>-->
                <img :src="baseImgPrefix + item.background" alt="" />
                {{ item.title }}
              </a-link>
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
        <a-row style="width: 100%; display: flex; align-items: center">
          <a-col :span="4" class="img-col">
            <nuxt-link href="/">
              <img class="long-logo" src="@/assets/images/logo-long.png" alt="" />
            </nuxt-link>
          </a-col>
          <a-col :span="10" class="search-col">
            <div class="search-input">
              <a-input-search
                v-model="searchKey"
                ref="inputSearchPc"
                @focus="openHisPanel"
                @blur="hideHisPanel"
                @press-enter="toSearchResult"
                @search="toSearchResult"
                @input="changeSearchKey"
                :placeholder="$t('head.searchKey')"
                search-button
              >
                <template #suffix>
                  <img
                    v-if="searchResPage"
                    @click.prevent.stop="handleCollection"
                    class="icon-collection"
                    src="@/assets/images/icon/icon-collection.png"
                    alt=""
                  />
                </template>
              </a-input-search>
              <div :class="suggestDialogShow ? 'show-suggest' : 'hide-suggest'" class="search-suggest">
<!--                              <div class="search-suggest show-suggest">-->
                <template v-if="suggestShow">
                  <div class="white-wrap wrap">
                    {{ $t("head.searchHis") }}
                  </div>
                  <template v-if="searchLog.length === 0">
                    <a-empty />
                  </template>
                  <template v-else>
                    <div
                        class="gray-wrap wrap"
                        v-for="item in searchLog"
                        @click="handleHis(item.title)"
                    >
                      {{ item.title }}
                    </div>
                  </template>
                  <div class="white-wrap wrap">
                    {{ $t("head.collectionKey") }}
                  </div>
                  <template v-if="collectionList.length === 0">
                    <a-empty />
                  </template>
                  <template v-else>
                    <div class="gray-wrap wrap" v-for="item in collectionList">
                      <div class="his-title" @click="handleHis(item.title)">{{ item.title }}</div>
                      <icon-close @click.stop="deleteHis(item.id)" />
                    </div>
                  </template>
                </template>
                <div v-if="searchKey" class="wrap user-wrap" @click="toSearchUser">
                  <icon-user :size="20" />
                  <span>{{ $t("head.search") }} “{{ searchKey }}” {{ $t("head.user") }}</span>
                </div>
              </div>
            </div>
          </a-col>
          <a-col :span="10" style="text-align: right" class="btn-col">
            <a-button class="sell-but" @click="toSell" v-if="showSell">
              {{ $t("head.sell") }}
            </a-button>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="mobile-head-search">
      <div class="common-row">
        <div class="left">
          <div
            style="text-align: left; width: 36px; flex-shrink: 0"
            @click="goBack"
            v-if="needBackRoute.indexOf($route.path) !== -1"
          >
            <icon-left :size="24" />
          </div>

          <nuxt-link v-else href="/">
            <img class="phone-logo" src="@/assets/images/swapifly-logo.png" alt="" />
          </nuxt-link>
          <div class="search-input">
            <a-input-search
              v-if="$route.path !== '/dialogue/chatDetail'"
              v-model="searchKey"
              ref="inputSearchM"
              @focus="openHisPanel"
              @blur="hideHisPanel"
              @press-enter="toSearchResult"
              @search="toSearchResult"
              @input="changeSearchKey"
              :placeholder="$t('head.searchKey')"
              search-button
            >
              <template #suffix>
                <img
                  v-if="searchResPage"
                  @click.prevent.stop="handleCollection"
                  class="icon-collection"
                  src="@/assets/images/icon/icon-collection.png"
                  alt=""
                />
              </template>
            </a-input-search>
            <div v-else>{{ dialogName || "" }}</div>
            <div :class="suggestDialogShow ? 'show-suggest' : 'hide-suggest'" class="search-suggest">
              <template v-if="suggestShow">
                <div class="white-wrap wrap">
                  {{ $t("head.searchHis") }}
                </div>
                <template v-if="searchLog.length === 0">
                  <a-empty />
                </template>
                <template v-else>
                  <div
                      class="gray-wrap wrap"
                      v-for="item in searchLog"
                      @click="handleHis(item.title)"
                  >
                    {{ item.title }}
                  </div>
                </template>
                <div class="white-wrap wrap">
                  {{ $t("head.collectionKey") }}
                </div>
                <template v-if="collectionList.length === 0">
                  <a-empty />
                </template>
                <template v-else>
                  <div class="gray-wrap wrap" v-for="item in collectionList">
                    <div class="his-title" @click="handleHis(item.title)">{{ item.title }}</div>
                    <icon-close @click.stop="deleteHis(item.id)" />
                  </div>
                </template>
              </template>

              <div v-if="searchKey" class="wrap user-wrap" @click="toSearchUser">
                <icon-user :size="15" />
                <span>{{ $t("head.search") }} “{{ searchKey }}” {{ $t("head.user") }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <div v-if="userInfo.token">
            <template v-if="actionRoute.indexOf($route.path) !== -1">
              <icon-more-vertical class="icon-more" />
            </template>
            <template v-else>
              <a-badge
                class="icon-message"
                :count="userInfo.newMessage"
                @click="router.push('/dialogue/mobile')"
              >
                <icon-message class="icon-message" />
              </a-badge>
              <icon-list class="icon-list" @click="toMobilePerson" />
            </template>
          </div>
          <div v-else>
            <a-button class="login-but-mobile" @click="openLogin">{{ $t("head.login") }}</a-button>
          </div>
        </div>
      </div>
    </div>

    <LoginModal ref="loginModal" @toRegister="toRegister" @toForget="toForget"></LoginModal>
    <RegisterModal
      ref="registerModal"
      @toLogin="toLogin"
      @toPreference="toPreference"
    ></RegisterModal>
    <ChoosePreference
      ref="choosePreference"
      @confirmPreference="confirmPreference"
    ></ChoosePreference>
    <!--    <BindEmail ref="bindEmail"></BindEmail>-->
    <ResetPwd ref="resetPwdModal" @toLogin="toLogin"></ResetPwd>
    <BlockModal ref="blockModal"></BlockModal>
    <MobilePersonCenterModal ref="mobilePersonCenterModal"></MobilePersonCenterModal>
  </div>
</template>

<script setup>
import { useSysData } from "~/stores/sysData";
import { useSearchKey } from "~/stores/search";
import { useUserInfo } from "~/stores/userInfo";
import { searchAdd, searchScDel, getSearchHistory } from "~/api/goods";
import { Message } from "@arco-design/web-vue";

const props = defineProps({
  needBack: {
    type: Boolean,
    default: false,
  },
});

// 移动端需要将logo替换成返回按钮的路由
const needBackRoute = [
  "/dialogue/mobile",
  "/notification",
  "/mobileUserProfile",
  "/saleEdit",
  "/dialogue/chatDetail",
  "/settingProfile",
  "/mobileProfile",
  "/mobileEditPassword",
  "/userDetails",
  "/like",
  "/userProfile",
  "/goodsList",
  "/goodsDetails",
  "/searchResult",
];
const actionRoute = ["/goodsDetails", "/dialogue/chatDetail"];

const router = useRouter();
const route = useRoute();
const userInfo = useUserInfo();
const searchKeyState = useSearchKey();
import { useI18n } from "vue-i18n";
import { watch } from "vue";

const dialogName = useState("dialog.name");
const { t } = useI18n();
const runtimeConfig = useRuntimeConfig();
const baseImgPrefix = runtimeConfig.VITE_OSS_PREFIX;
const inputSearchPc = ref(null);
const inputSearchM = ref(null);
const loginModal = ref(null);
const registerModal = ref(null);
const choosePreference = ref(null);
const resetPwdModal = ref(null);
const blockModal = ref(null);
const mobilePersonCenterModal = ref(null);
const dropShow = ref(false);
const suggestDialogShow = ref(false);
const suggestShow = ref(false);
const sysData = useSysData();
const searchLog = ref([]);
const collectionList = ref([]);

const showHeadPanel = ref(false);
const searchResPage = ref(false);
let searchKey = ref("");
let curClass = reactive({ value: [] });
const showSell = computed(() => {
  var routerUrl = router.currentRoute.value.path;
  return routerUrl != "/saleEdit" && routerUrl != "/saleEditGoods";
});
// 监听路由 如果是搜索结果页面 搜索框加上星星icon
watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    console.log(newValue);
    if (newValue === "/searchResult") {
      searchResPage.value = true;
    } else {
      nextTick(() => {
        searchResPage.value = false;
        // 离开搜索结果路由时 清空搜索key
        searchKeyState.setKey("");
        searchKey.value = "";
      });
    }
  },
  { immediate: true }
);
// 监听路由参数 将地址栏的搜索词放到pina
watch(
  () => route.query,
  (newValue, oldValue) => {
    searchKeyState.setKey(newValue.keyword);
    searchKey.value = searchKeyState.searchKey;
  },
  { immediate: true }
);
// 监听pina是否需要打开登录对话框
watch(
  () => userInfo.openLogin,
  (newValue, oldValue) => {
    if (newValue) {
      nextTick(() => {
        loginModal.value.openDialog();
        userInfo.closeDialog();
      });
    }
  },
  { immediate: true }
);
// 监听pina是否需要打开封禁对话框
watch(
  () => userInfo.userBlock,
  (newValue, oldValue) => {
    if (newValue) {
      nextTick(() => {
        blockModal.value.openDialog(1);
      });
    }
  },
  { immediate: true }
);

function goBack() {
  console.log("gobak");
  history.back();
  // router.go(-1)
  // if (navigator.userAgent.indexOf("Safari") > -1) {
  //   // location.reload()
  // } //判断是否Safari浏览器
}

function selectMenu(e) {
  switch (e) {
    case "profile":
      router.push(`/userDetails?userId=${userInfo.id}`);
      break;
    case "setting":
      router.push("/userProfile");
      break;
    case "logout":
      console.log("logout");
      userInfo.logout();
      router.replace("/");
      break;
  }
}

function openRegister() {
  registerModal.value.openDialog();
}

function openLogin() {
  loginModal.value.openDialog();
}

function toMobilePerson() {
  mobilePersonCenterModal.value.openDialog();
}

function toSell() {
  router.push("/saleEdit");
}

function toRegister() {
  loginModal.value.handleCancel();
  registerModal.value.openDialog();
}

function toForget(e) {
  loginModal.value.handleCancel();
  resetPwdModal.value.openDialog(e);
}

function toLogin(e) {
  registerModal.value.handleCancel();
  loginModal.value.openDialog(e);
}

function toPreference() {
  choosePreference.value.openDialog();
}

function confirmPreference() {}

function toSearchResult() {
  inputSearchPc.value && inputSearchPc.value.blur();
  inputSearchM.value && inputSearchM.value.blur();
  suggestShow.value = false;
  suggestDialogShow.value = false;
  router.push({
    path: "/searchResult",
    query: {
      keyword: searchKey.value,
    },
  });
}

function changeSearchKey(e) {
  searchKeyState.setKey(e);
}

function openHisPanel() {
  // 如果未登录 不展示搜索下拉框
  if (!userInfo.token) {
    suggestShow.value = false
    suggestDialogShow.value = true
  } else {
    searchLog.value = sysData.searchLog;
    collectionList.value = sysData.collectionList;
    suggestShow.value = true;
    suggestDialogShow.value = true
  }
  console.log(suggestDialogShow.value)
  console.log(suggestShow.value)
}

function hideHisPanel() {
  setTimeout(() => {
    suggestDialogShow.value = false
  }, 200);
}

function handleHis(e) {
  searchKey.value = e;
  toSearchResult(e);
}

function deleteHis(id) {
  searchScDel({
    id,
  }).then((res) => {
    if (res.code === 0) {
      Message.success(t("head.deleteSuc"));
      getSearchHistory().then((res) => {
        const searchLog = res.data.search_log;
        const collectionList = res.data.scsearch_log;
        sysData.setSearchHis({
          searchLog,
          collectionList,
        });
      });
    } else {
      Message.error(res.message);
    }
  });
}

function handleCollection() {
  if (searchKey.value) {
    searchAdd({
      title: searchKey.value,
    }).then((res) => {
      if (res.code === 0) {
        Message.success(t("head.collectionSuc"));
        getSearchHistory().then((res) => {
          const searchLog = res.data.search_log;
          const collectionList = res.data.scsearch_log;
          sysData.setSearchHis({
            searchLog,
            collectionList,
          });
        });
      } else {
        Message.erroe(res.message);
      }
    });
  }
}

function changeCurType(e) {
  if (e.children && e.children.length) {
    curClass.value = e.children;
    showHeadPanel.value = true;
  } else {
    showHeadPanel.value = false;
    curClass.value = [];
  }
}

function outClass() {
  showHeadPanel.value = false;
}

function toClassDetail(e) {
  router.push({
    path: "/goodsList",
    query: {
      id: e.id,
      level: e.level,
    },
  });
  showHeadPanel.value = false;
}

// 搜索用户
function toSearchUser() {
  router.push({
    path: "/searchUser",
    query: {
      title: searchKey.value,
    },
  });
  suggestShow.value = false;
  suggestDialogShow.value = false
}
</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

.class-bar-block {
  display: block;
}

.global-head {
  position: fixed;
  top: 0;
  text-align: center;
  width: 100vw;
  z-index: 998;
  left: 0;
}

.head-bar {
  height: 40px;
  background: $main-grey;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  position: relative;
  color: $main-white;

  .common-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .left {
    display: flex;
    align-items: center;

    a {
      display: flex;
      align-items: center;
    }
  }

  .right {
    display: flex;
    align-items: center;
    height: 100%;

    * {
      cursor: pointer;
    }

    .user-bar {
      position: absolute;
      right: 22px;
      display: flex;
      align-items: center;

      .name-box {
        display: flex;
        align-items: center;
        margin-right: 45px;

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .username {
          margin-left: 9px;
          font-size: 10px;
        }

        .down-ico {
          font-size: 12px;
          margin-left: 18px;
          transition: 0.2s all;
          transform: rotate(0);
        }

        .transform {
          transform: rotate(180deg);
        }

        .arco-dropdown-option-icon {
          background: red;
        }
      }

      .user-menu-icon {
        width: 20px;

        img {
          width: 20px;
        }

        :deep(.arco-badge-number) {
          width: 15px;
          height: 15px;
          min-height: unset;
          min-width: unset;
          line-height: 15px;
          font-size: 10px;
          padding: 0;
        }
      }

      .user-menu-icon + .user-menu-icon {
        margin-left: 24px;
      }
    }

    .sign {
      height: 100%;
      line-height: 40px;
      padding: 0 14px;

      &:hover {
        background: #535559;
      }
    }

    .login {
      padding: 0 14px;
      height: 100%;
      line-height: 40px;

      &:hover {
        background: #535559;
      }
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
      height: 40px;
      line-height: 40px;
      position: relative;

      &:hover {
        background: #535559;
      }

      &:hover::after {
        content: "";
        border: 6px solid #53555900;
        border-bottom-color: $main-white;
        position: absolute;
        width: 0px;
        height: 0px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
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
  background: $main-white;
  padding: 5px 0 91px;
  border: 1px solid rgba(229, 230, 235, 1);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
  max-height: 75vh;
  overflow-y: auto;

  .arco-link {
    color: $main-black-1D-rbg;
  }

  .class-wrap {
    display: flex;
    text-align: left;
    flex-wrap: wrap;
    //color: rgba(29, 33, 41, 1);
    .arco-link {
      display: block;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sec-title {
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 700;
      line-height: 22px;
      padding-left: 22px;
      position: relative;
      img {
        width: 25px;
        height: 25px;
        object-fit: cover;
        position: absolute;
        top: 50%;
        left: -5px;
        transform: translateY(-50%);
      }
    }

    .class-sub-item {
      margin-bottom: 10px;
      padding-left: 22px;
      font-size: 14px;
      line-height: 22px;
    }

    .class-item {
      margin-right: 66px;
    }
  }
}

.head-search {
  padding: 10px 0;
  border-bottom: 1px solid $main-grey-border;
  background: $main-white;
  display: block;

  .img-col {
    text-align: left;

    .phone-logo {
      height: 32px;
      margin-left: 10px;
      //margin-top:5px;
      object-fit: contain;
    }

    .long-logo {
      width: 152px;
      height: 36px;
      object-fit: contain;
    }
  }

  .search-col {
    .search-input {
      height: 46px;
      width: 500px;
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
      .icon-collection {
        cursor: pointer;
      }

      .search-suggest {
        position: absolute;
        width: calc(100% - 46px);
        box-shadow: 0px 2px 5px 0px #8d8d8d;
        transition: max-height 0.3s linear;
        overflow: hidden;

        .wrap {
          padding: 5px 19px 5px 12px;
          line-height: 22px;
          font-size: 14px;
          height: 22px;
          text-align: left;
        }

        .white-wrap {
          background: $main-white;
        }

        .gray-wrap {
          background: #f2f3f5;
          color: #86909c;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .his-title {
            width: 80%;
          }

          :deep(.arco-icon-close) {
            width: 9px;
            height: 9px;
          }

          &:hover {
            color: $main-blue;
          }
        }
        .user-wrap {
          background: #f2f3f5;
          color: #86909c;
          cursor: pointer;
          text-align: left;
          display: flex;
          align-items: center;
          span {
            margin-left: 10px;
          }
          &:hover {
            color: $main-grey;
          }
        }
      }

      .show-suggest {
        max-height: 350px;
      }

      .hide-suggest {
        max-height: 0;
      }
    }
  }

  .btn-col {
    .sell-but-mobile {
      height: 35px;
      background: $main-pink;
      color: $main-white;
      line-height: 46px;

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
      color: $main-white;
      line-height: 46px;
      margin-top: 5px;

      :deep(.arco-btn) {
        height: 35px;
        width: 82px;
        background: $main-pink;
      }
    }
  }

  .icon-message {
    font-size: 25px;
    font-weight: bold;
    //margin-top: 8px;
    :deep(.arco-badge-number) {
      width: 12px;
      height: 12px;
      min-height: unset;
      min-width: unset;
      line-height: 12px;
      font-size: 9px;
    }
  }

  .icon-list {
    font-size: 25px;
    font-weight: bold;
    margin-left: 10px;
    //margin-top: 8px;
  }
}

.mobile-head-search {
  display: none;
}

.arco-empty {
  background: #f2f3f5;
}

.class-bar {
  :deep(.arco-skeleton-line-row) {
    //animation: my-skeleton 1.5s cubic-bezier(0, 0, 1, 1) infinite;
    background: linear-gradient(90deg, #545252 25%, $main-grey 37%, #545252 63%);
    background-size: 400% 100%;
  }
}

@media screen and (min-width: 1001px) and (max-width: 1200px) {
  .name-box {
    .username {
      display: none;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

@media screen and (max-width: 1000px) {
  .class-bar-block {
    display: none;
  }
  .head-search {
    display: none;
  }
  .mobile-head-search {
    display: block;
    width: 100%;
    padding: 15px 0;
    background: $main-white;

    .common-row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        width: 100%;
        align-items: center;

        a {
          height: 36px;
        }

        .phone-logo {
          height: 36px;
          width: 36px;
          flex-shrink: 0;
        }

        .search-input {
          width: 100%;
          margin-left: 10px;
          flex-grow: 2;
          position: relative;

          .arco-input-wrapper {
            height: 36px;
          }

          .icon-collection {
            cursor: pointer;
            width: 24px;
          }

          .search-suggest {
            position: absolute;
            width: 100%;
            box-shadow: 0px 2px 5px 0px #8d8d8d;
            transition: max-height 0.3s linear;
            overflow: hidden;

            .wrap {
              padding: 5px 19px 5px 12px;
              line-height: 22px;
              font-size: 14px;
              height: 22px;
              text-align: left;
            }

            .white-wrap {
              background: $main-white;
            }

            .gray-wrap {
              background: #f2f3f5;
              color: #86909c;
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .his-title {
                width: 80%;
              }

              :deep(.arco-icon-close) {
                width: 9px;
                height: 9px;
              }

              &:hover {
                color: $main-blue;
              }
            }
            .user-wrap {
              background: #f2f3f5;
              color: #86909c;
              cursor: pointer;
              text-align: left;
              display: flex;
              align-items: center;
              span {
                margin-left: 5px;
              }
              &:hover {
                color: $main-grey;
              }
            }
          }

          .show-suggest {
            max-height: 350px;
          }

          .hide-suggest {
            max-height: 0;
          }

          :deep(.arco-input-append) {
            display: none;
          }
        }
      }

      .right {
        flex-shrink: 0;
        margin-left: 15px;

        .icon-message {
          width: 20px;
          height: 20px;
        }

        .icon-list {
          width: 20px;
          height: 20px;
          margin-left: 15px;
        }

        .icon-more {
          width: 20px;
          height: 20px;
        }

        .login-but-mobile {
          background: $main-pink;
          color: $main-white;
          height: 32px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.user-drop-icon {
  width: 28px;
  height: 28px;
}
</style>

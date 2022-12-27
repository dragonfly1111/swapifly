<template>
  <div class="global-content">
    <div id="left-msg-list" class="msg-select">
      <a-select v-model="curMsgType" @change="changeMsgType" :bordered="false">
        <a-option
            v-for="item in sysData.msgType"
            :value="item.value"
            :key="item.value"
            :label="item.key"
        >
        </a-option>
      </a-select>
    </div>

    <div class="msg-list common-row">
      <template v-if="pageLoading">
        <div>
          <a-skeleton :animation="true">
            <a-skeleton-line :line-height="80" :rows="5"/>
          </a-skeleton>
        </div>
      </template>
      <template v-else>
        <div v-for="item in conversationList">
          <div class="msg-item" @click="toChatDetail(item)">
            <div class="left-avatar">
              <a-image width="50" height="50" show-loader fit="cover" :src="baseImgPrefix + item.avatar" alt="">
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
            </div>
            <div class="conv-main-content">
              <div class="content-title">
                <span class="nick-name">{{ item.nickname }}</span>
                <span class="time">{{ item.latest_time ? parseTime(item.latest_time, "{y}/{m}/{d}") : '-/-' }}</span>
              </div>
              <div class="content">
                <div class="left">
                  <div class="msg-content">{{
                      item.new_text ? (item.new_text.c_type === 0 ? item.new_text.content : $t('dialogue.imgMsg')) : '-'
                    }}
                  </div>
                  <!--{{ item.x_type }}-->
                  <div class="new-msg" v-if="item.x_type === 1">{{ $t('dialogue.newMsg') }}</div>
                  <div class="tip">{{
                      item.f_type === 1 ? $t('dialogue.yourPrice') : $t('dialogue.hisPrice')
                    }}{{ item.price }}
                  </div>
                </div>
                <div class="right">
                  <a-image width="50" height="50" show-loader fit="cover" :src="baseImgPrefix + item.p_image" alt="">
                    <template #loader>
                      <div class="loader-animate"/>
                    </template>
                  </a-image>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nomore">{{ $t('dialogue.noMore') }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {getChatList} from "~/api/dialogue"
import {parseTime} from "~/utils/time"
import {useSysData} from "~/stores/sysData";
import {useI18n} from "vue-i18n";

const pageLoading = ref(true)
const curMsgType = ref(0)
const conversationList = ref([])
const router = useRouter();
let pageTask
const {t} = useI18n()
const runtimeConfig = useRuntimeConfig();
const baseImgPrefix =  runtimeConfig.VITE_OSS_PREFIX
const sysData = useSysData();
// 切换消息类型
const changeMsgType = () => {
  pageLoading.value = true
  fetchListData()
}

const fetchListData = () => {
  getChatList({
    type: curMsgType.value
  }).then(res => {
    pageLoading.value = false
    conversationList.value = res.data
  }).catch(e=>{
    console.log('fetchListData catch')
  })
}

const toChatDetail = (e) => {
  router.push(`/dialogue/chatDetail?id=${e.id}`)
}
fetchListData()
const pageLoopTask = () => {
  pageTask = setInterval(() => {
    fetchListData()
  }, 2000)
}
onMounted(() => {
  pageLoopTask()
});
onUnmounted(() => {
  console.log('onUnmounted')
  clearInterval(pageTask)
  // mainContentEle.removeEventListener("scroll", scrollListen)
})
</script>

<style scoped lang="scss">
@import "assets/sass/var.scss";
.msg-list {
  overflow-y: auto;

  :deep(.arco-list-item) {
    padding: 0;
  }

  .msg-item {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #F2F2F2;

    .arco-image {
      border-radius: 50%;
    }

    .conv-main-content {
      width: calc(100% - 65px);
      margin-left: 15px;

      .content-title {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: $main-black-333;
        .nick-name{
          max-width: 60%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time {
          font-size: 12px;
        }
      }

      .content {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .left {
          margin-right: 18px;

          .msg-content {
            max-width: 50vw;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 21px;
            height: 21px;
            font-size: 14px;
          }

          .new-msg {
            color: $sub-main-pink;
            margin-top: 4px;
            line-height: 21px;
            height: 21px;
            font-size: 14px;
          }

          .tip {
            font-size: 12px;
            color: $grey-font-label;
            margin-top: 12px;
          }
        }

        .right {
          img {
            width: 50px;
            height: 50px;
            border-radius: 2px;
          }
        }
      }
    }
  }

  .nomore {
    border-top: 1px solid #F2F2F2;
    color: $grey-font-label;
    text-align: center;
    font-size: 16px;
    padding: 20px 0;
  }
}

.msg-select {
  //width: 100%;
  text-align: right;
  padding: 10px 0px;

  :deep(.arco-select) {
    padding: 0 15px;

    .arco-select-view-value {
      font-size: 24px;
      overflow: unset;
      line-height: 22px;
    }

    .arco-select-view-suffix {
      padding-left: 8px;
    }

    .arco-icon-down {
      color: $main-black-333;
    }
  }
}

.msg-item {
  padding: 14px 0px 19px 0px;
}
</style>

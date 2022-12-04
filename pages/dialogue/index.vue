<template>
  <div class="global-content">
    <div class="left-msg-list">
      <div id="left-msg-list" class="msg-select">
        <a-select v-model="curMsgType" @change="changeMsgType" :style="{width:'100%'}" :bordered="false">
          <a-option
              v-for="item in msgType"
              :value="item.value"
              :key="item.value"
              :label="item.key"
          >
          </a-option>
        </a-select>
      </div>
      <div class="msg-list">
        <a-list :max-height="listMaxHeight" @reach-bottom="fetchListData" :scrollbar="scrollbar">
          <template #scroll-loading>
            <div v-if="bottom" class="nomore">
              {{ $t('dialogue.noMore') }}
            </div>
            <a-spin v-else/>
          </template>
          <a-list-item v-for="item in conversationList">
            <div class="msg-item">
              <div class="left-avatar">
                <a-image width="50" height="50" show-loader fit="cover" :src="baseImgPrefix + item.avatar" alt="">
                  <template #loader>
                    <div class="loader-animate"/>
                  </template>
                </a-image>
              </div>
              <div class="conv-main-content">
                <div class="content-title">
                  <span>{{ item.nickname }}</span>
                  <span class="time">{{ item.latest_time ? parseTime(item.latest_time, "{y}/{m}/{d}") : '-/-'}}</span>
                </div>
                <div class="content">
                  <div class="left">
                    <div class="msg-content">{{ item.new_text ? (item.new_text.c_type === 0 ? item.new_text.content : $t('dialogue.imgMsg')) : '-' }}</div>
                    <div class="new-msg" v-if="item.x_type === 1">{{ $t('dialogue.newMsg') }}</div>
                    <div class="tip">{{ item.f_type === 1 ? $t('dialogue.yourPrice') : $t('dialogue.hisProce') }}{{ item.price }}</div>
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
          </a-list-item>
        </a-list>
      </div>
    </div>
    <div class="main-content">
<!--      <div class="info-wrap" v-if="conversationList.length > 0">-->
      <div class="info-wrap">
        <div class="main-content-title">
          <div class="left">
            <a-image width="50" height="50" show-loader fit="cover" :src="baseImgPrefix + curConversationMeta.avatar" alt="">
              <template #loader>
                <div class="loader-animate"/>
              </template>
            </a-image>
            <span>{{ curConversationMeta.nickname }}</span>
          </div>
          <a-dropdown @select="handleOperationSelect">
            <icon-more-vertical/>
            <template #content>
              <a-doption v-for="item in dialogueOperationType" :value="item.value">{{ item.key }}</a-doption>
            </template>
          </a-dropdown>
        </div>
        <div class="meta-wrap">
          <div class="left">
            <a-image class="goods-img" width="50" height="50" show-loader fit="cover" :src="baseImgPrefix + curConversationMeta.p_image" alt="">
              <template #loader>
                <div class="loader-animate"/>
              </template>
            </a-image>
            <div class="info-box">
              <div>{{ curConversationMeta.p_title }}</div>
              <div>HK$ {{ curConversationMeta.p_price }}</div>
            </div>
          </div>
          <div class="right">
            <span>對方出價：HK$888</span>
            <a-button class="but accept" @click="openEvaluateDialog">{{ $t('dialogue.accept') }}</a-button>
            <a-button class="but reject">{{ $t('dialogue.refuse') }}</a-button>
          </div>
        </div>
      </div>
      <div class="conversation-content">
        <div v-if="conversationDetail.length === 0" class="no-msg">
          <img src="@/assets/images/no-msg.png" alt="">
          <div class="no-msg-title">{{ $t('dialogue.noMsg') }}</div>
          <div class="no-msg-tip">{{ $t('dialogue.noMsgTip') }}</div>
        </div>
        <div v-else>
          <div class="time-line">2022/09/01 16:28</div>
          <div class="conversation-item" :class="item.wz === 'left' ? 'conversation-left' : 'conversation-right'"
               v-for="item in conversationDetail">
            <div class="content-item" :class="item.wz === 'left' ? 'content-left' : 'content-right'">
              <a-image width="36" height="36" show-loader fit="cover" :src="baseImgPrefix + item.avatar" alt="">
                <template #loader>
                  <div class="loader-animate"/>
                </template>
              </a-image>
              <div class="content">
                <div class="triangle"></div>
                <div class="fill"></div>
                <!--消息/文本类型-->
                <template v-if="item.type === 0">
                  <div v-if="item.c_type === 0">{{ item.content }}</div>
                  <div v-else style="cursor: pointer">
                    <a-image width="120" height="120" show-loader fit="cover" :src="baseImgPrefix + item.content" alt="">
                      <template #loader>
                        <div class="loader-animate"/>
                      </template>
                    </a-image>
                  </div>
                </template>
                <!--操作类型-->
                <template v-else>
                  <div class="operation-msg">{{ parseOperationType(item.type) }}</div>
                  <div class="operation-msg" v-if="item.type !== 5">HK$ {{ item.price }}</div>
                </template>
<!--                <div>c_type: {{ item.c_type }} type: {{ item.type }}</div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-line">
        <a-input class="input-box" :max-length='500' :placeholder="$t('dialogue.inputHere')" allow-clear>
          <template #suffix>
            <icon-image/>
          </template>
        </a-input>
      </div>
    </div>

    <div class="right-ad">
      <AD width="160px" height="600px"/>
    </div>

    <EvaluateDialog ref="evaluateDialog" />

  </div>
</template>
<script setup>
import { useSysData } from "~/stores/sysData";
import { getChatList, getChatDetail } from "~/api/dialogue"
import EvaluateDialog from "./components/EvaluateDialog";
import { baseImgPrefix } from "~/config/baseUrl";
import { parseTime } from "~/utils/time"
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const evaluateDialog = ref(null);
const sysData = useSysData();
const msgType = ref([]);
// 左侧会话列表
const conversationList = ref([]);
// 中间对话详情
const conversationDetail = ref([]);
// 当前对话的元信息
const curConversationMeta = ref({})
const dialogueOperationType = ref([]);
const curMsgType = ref(1)
const listMaxHeight = ref(0)
const bottom = ref(false);
const scrollbar = ref(false);
const fetchDetailData = (id) => {
  getChatDetail({
    id
  }).then(res=>{
    conversationDetail.value = res.data.data
  })
}
// 计算左侧列表最大高度
const getListMaxHeight = () => {
  // 窗口高度 - 头部高度 - 上方选择高度
  const height = window.innerHeight - 107 - 70
  console.log(height)
  listMaxHeight.value = height
}
const handleOperationSelect = (val) =>{
  console.log(val)
}
const openEvaluateDialog = () =>{
  evaluateDialog.value.openDialog();
}

// 获取左侧对话列表
const fetchListData = () =>{
  getChatList({
    type: curMsgType.value
  }).then(res=>{
    conversationList.value = res.data
    console.log('---------')
    console.log(conversationList)
    // 获取到对话列表后 默认获取第一个消息对话详情
    fetchDetailData(res.data[0].id)
    curConversationMeta.value = res.data[0]
    bottom.value = true
  })
}
// 切换消息类型
const changeMsgType = () =>{
  bottom.value = false
  fetchListData()
}
// 转换消息操作类型
const parseOperationType = (e) =>{
  let str = ''
  switch (e) {
    case 1:
      str = t('dialogue.operationOffer')
      break
    case 2:
      str = t('dialogue.operationEditOffer')
      break
    case 3:
      str = t('dialogue.operationCancelOffer')
      break
    case 4:
      str = t('dialogue.operationRejectOffer')
      break
    case 5:
      str = t('dialogue.operationAcceptOffer')
      break
  }
  return str
}

onMounted(() => {
  msgType.value = sysData.msgType;
  dialogueOperationType.value = sysData.dialogueOperationType;
  // 先计算高度再填充数据 防止高度被撑开
  getListMaxHeight()
  // fetchListData()
  // fetchDetailData()
});

</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

.global-content {
  height: 100%;
  display: flex;
  min-height: calc(100vh - 106px);
}

.left-msg-list {
  width: 30%;
  border-top: 1px solid #F2F2F2;;
  .msg-select {
    width: 110px;
    padding: 20px 12px;

    :deep(.arco-select) {
      padding-left: 8px;

      .arco-select-view-value {
        font-size: 24px;
        overflow: unset;
        line-height: 22px;
      }

      .arco-select-view-suffix {
        padding-left: 8px;
      }

      .arco-icon-down {
        color: #333333;
      }
    }
  }

  .msg-list {
    :deep(.arco-list-item) {
      padding: 0;
    }

    .msg-item {
      cursor: pointer;
      padding: 14px 16px 19px 51px;
      display: flex;
      justify-content: space-between;

      .arco-image {
        border-radius: 50%;
      }

      .conv-main-content {
        width: 100%;
        margin-left: 15px;

        .content-title {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #333333;

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
              max-width: calc(30vw - 51px - 50px - 15px - 18px - 50px - 16px - 10px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 21px;
              height: 21px;
              font-size: 14px;
            }

            .new-msg {
              color: #E33C64;
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
      color: $grey-font-label;
      font-size: 16px;
      padding: 20px 0;
    }
  }
}

.main-content {
  width: 55%;
  border: 1px solid #F2F2F2;

  .main-content-title {
    padding: 16px 18px;
    border-bottom: 1px solid #F2F2F2;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: flex-start;
      .arco-image{
        border-radius: 50%;

      }
      span {
        margin-left: 15px;
        font-size: 14px;
        color: #333333;
      }
    }

    :deep(.arco-icon-more-vertical) {
      cursor: pointer;
      width: 34px;
      height: 34px;
    }
  }

  .meta-wrap {
    padding: 16px 18px;
    border-bottom: 1px solid #F2F2F2;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .goods-img {
        width: 50px;
        height: 50px;
        border-radius: 2px;
      }

      .info-box {
        margin-left: 15px;
        font-size: 16px;

        div {
          height: 24px;
          line-height: 24px;
        }

        div + div {
          margin-top: 3px;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;

      span {
        margin-right: 21px;
      }

      .but {
        width: 67px;
        height: 34px;
        color: #FFFFFF;
      }

      .but + .but {
        margin-left: 13px;
      }

      .accept {
        background: $main-pink;
      }

      .reject {
        background: $main-grey;
      }
    }

  }

  .conversation-content {
    height: calc(100vh - 105px - 171px - 60px - 20px);
    overflow-y: scroll;
    padding: 0 14px 20px 24px;
    .no-msg{
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        width: 118px;
      }
      .no-msg-title{
        font-size: 18px;
        color: #333333;
        margin-top: 15px;
      }
      .no-msg-tip{
        color: $grey-font-label;
        margin-top: 10px;
        font-size: 12px;
      }
    }
    .time-line {
      text-align: center;
      margin-top: 18px;
      margin-bottom: 18px;
      color: #333333;
      font-size: 12px;
    }

    .conversation-item {
      .arco-image-img {
        border-radius: 50%;
        width: 36px;
        height: 36px;
      }

      .content-item {
        display: flex;
        justify-content: flex-start;
        .content {
          border: 1px solid #E5E6E8;
          border-radius: 4px;
          position: relative;
          padding: 6px 10px;
          max-width: 70%;
          line-height: 22px;
          font-size: 14px;
          color: #333333;
          .operation-msg{
            font-weight: bold;
          }
        }
      }

      .content-left {
        .arco-image {
          margin-right: 16px;
        }

        .content {
          padding-left: 15px;
          &::before{
            content: '';
            position: absolute;
            left: -7px;
            top: 12px;
            background: url('~/assets/images/icon/icon-left.png');
            background-size: cover;
            width: 9px;
            height: 14px;
          }
        }


      }

      .content-right {
        flex-direction: row-reverse;

        .arco-image {
          margin-left: 16px;
        }

        .content {
          padding-right: 15px;
          &::before{
            content: '';
            position: absolute;
            right: -7px;
            top: 12px;
            transform: rotate(180deg);
            background: url('~/assets/images/icon/icon-left.png');
            background-size: cover;
            width: 9px;
            height: 14px;
          }
        }
      }
    }

    .conversation-item + .conversation-item {
      margin-top: 10px;
    }

    .conversation-left + .conversation-right {
      margin-top: 16px;
    }

    .conversation-right + .conversation-left {
      margin-top: 16px;
    }
  }
  .input-line {
    height: 60px;
    border-top: 1px solid #F2F2F2;

    .input-box {
      height: 100%;
      border-radius: 0;
      background: #FFFFFF;
    }

    :deep(.arco-icon-image) {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}

.right-ad {
  width: 15%;
}
</style>

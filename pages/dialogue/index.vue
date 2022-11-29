<template>
  <div class="global-content">
    <div class="left-msg-list">
      <div id="left-msg-list" class="msg-select">
        <a-select v-model="curMsgType" :style="{width:'100%'}" :bordered="false">
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
                <img :src="item.avatar" alt="">
              </div>
              <div class="conv-main-content">
                <div class="content-title">
                  <span>{{ item.nickname }}</span>
                  <span class="time">{{ item.time }}</span>
                </div>
                <div class="content">
                  <div class="left">
                    <div class="msg-content">{{ item.content }}</div>
                    <div class="new-msg">{{ $t('dialogue.newMsg') }}</div>
                    <div class="tip">{{ item.contentTip }}</div>
                  </div>
                  <div class="right">
                    <img :src="item.contentImg" alt="">
                  </div>
                </div>
              </div>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </div>
    <div class="main-content">
      <div class="info-wrap">
        <div class="main-content-title">
          <div class="left">
            <img class="user-avatar"
                 src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
                 alt="">
            <span>用户名称</span>
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
            <img class="goods-img"
                 src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
                 alt="">
            <div class="info-box">
              <div>商品名称</div>
              <div>HK$888</div>
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
          <div class="conversation-item" :class="item.type === 'left' ? 'conversation-left' : 'conversation-right'"
               v-for="item in conversationDetail">
            <div class="content-item" :class="item.type === 'left' ? 'content-left' : 'content-right'">
              <img class="avatar" :src="item.avatar" alt="">
              <div class="content">
                <div class="triangle"></div>
                <div class="fill"></div>
                {{ item.content }}
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
import {useSysData} from "~/stores/sysData";
import EvaluateDialog from "./components/EvaluateDialog";
const evaluateDialog = ref(null);
const sysData = useSysData();
const msgType = ref([]);
// 左侧会话列表
const conversationList = reactive([]);
// 中间对话详情
const conversationDetail = reactive([]);
const dialogueOperationType = ref([]);
const curMsgType = ref(1)
const listMaxHeight = ref(0)
const bottom = ref(false);
const scrollbar = ref(false);
const fetchListData = () => {
  if (conversationList.length >= 20) {
    bottom.value = true
    return
  }
  setTimeout(() => {
    console.log(11111)
    for (let i = 0; i < 10; i++) {
      conversationList.push({
        avatar: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        nickname: '用户名称' + i,
        time: '2022/09/01',
        content: '对话内容对话内容对话内容对话内容对话内容对话内容对话内容对话内容对话内容',
        contentTip: '對方出價HK$788',
        hasRead: false,
        contentImg: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
      })
    }
  }, 0)
  console.log(conversationList)
}
const fetchDetailData = () => {
  for (let i = 0; i < 50; i++) {
    conversationDetail.push({
      avatar: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
      type: Math.random() > 0.5 ? 'left' : 'right',
      content: '对话内容对话内容对话内容对话对话内容对话内容对话内容对话对话内容对话内容对话内容对话对话内容对话内容对话内容对话对话内容对话内容对话内容对话'
    })
  }
  console.log(conversationDetail)
}
// 计算左侧列表最大高度
const getListMaxHeight = () => {
  // 窗口高度 - 头部高度 - 上方选择高度
  const height = window.innerHeight - 107 - 60
  console.log(height)
  listMaxHeight.value = height
}
const handleOperationSelect = (val) =>{
  console.log(val)
}
const openEvaluateDialog = () =>{
  evaluateDialog.value.openDialog();
}
onMounted(() => {
  msgType.value = sysData.msgType;
  dialogueOperationType.value = sysData.dialogueOperationType;
  // 先计算高度再填充数据 防止高度被撑开
  getListMaxHeight()
  fetchListData()
  fetchDetailData()
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

  .msg-select {
    width: 110px;
    padding-left: 12px;
    padding-top: 20px;

    :deep(.arco-select) {
      padding-left: 8px;

      .arco-select-view-value {
        font-size: 24px;
        overflow: unset;
        line-height: 32px;
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

      .left-avatar {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
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

      span {
        margin-left: 15px;
        font-size: 14px;
        color: #333333;
      }
    }

    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
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
      .avatar {
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
        }
      }

      .content-left {
        .avatar {
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

        .avatar {
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

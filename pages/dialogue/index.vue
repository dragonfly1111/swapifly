<template>
  <div class="global-content">
<!--    <div class="dialogue-content">-->
<!--     -->
<!--    </div>-->
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
            <a-spin v-else />
          </template>
          <a-list-item v-for="item in conversationList" >
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
            <img class="user-avatar" src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp" alt="">
            <span>用户名称</span>
          </div>
          <icon-more-vertical />
        </div>
        <div class="meta-wrap">
          <div class="left">
            <img class="goods-img" src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp" alt="">
            <div class="info-box">
              <div>商品名称</div>
              <div>HK$888</div>
            </div>
          </div>
          <div class="right">
            <span>對方出價：HK$888</span>
            <a-button class="but accept">{{ $t('dialogue.accept') }}</a-button>
            <a-button class="but reject">{{ $t('dialogue.refuse') }}</a-button>
          </div>

        </div>
        <div class="time-line">2022/09/01   16:28</div>
      </div>

      <div class="conversation-content">
        <div class="left-side">你好啊</div>
        <div class="right-side">得閒飲茶啊</div>
        <div class="left-side">丢给楼某</div>
        <div class="right-side">丢给楼某</div>
        <div class="left-side">丢给楼某</div>
        <div class="right-side">丢给楼某</div>
      </div>
      <div class="input-line">
        <a-input class="input-box" :placeholder="$t('dialogue.inputHere')" allow-clear>
          <template #suffix>
            <icon-image />
          </template>
        </a-input>
      </div>
    </div>

    <div class="right-ad">
      <AD width="160px" height="600px" />
    </div>
  </div>
</template>
<script setup>
import { useSysData } from "~/stores/sysData";
const sysData = useSysData();
const msgType = ref([]);
const conversationList = reactive([]);
const dialogueOperationType = ref([]);
const curMsgType = ref(1)
const listMaxHeight = ref(0)
const bottom = ref(false);
const scrollbar = ref(false);
const fetchListData = () => {
  if(conversationList.length >= 20) {
    bottom.value = true
    return
  }
  setTimeout(()=>{
    console.log(11111)
    for(let i = 0; i < 10; i ++){
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
// 计算左侧列表最大高度
const getListMaxHeight = () =>{
  // 窗口高度 - 头部高度 - 上方选择高度
  const height = window.innerHeight - 107 - 60
  console.log(height)
  listMaxHeight.value = height
}
onMounted(() => {
  msgType.value = sysData.msgType;
  dialogueOperationType.value = sysData.dialogueOperationType;
  // 先计算高度再填充数据 防止高度被撑开
  getListMaxHeight()
  fetchListData()
});

</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";
.global-content{
  height: 100%;
  display: flex;
  min-height: calc(100vh - 106px);
}
.left-msg-list{
  width: 30%;
  .msg-select{
    width: 110px;
    padding-left: 12px;
    padding-top: 20px;
    :deep(.arco-select){
      padding-left: 8px;
      .arco-select-view-value{
        font-size: 24px;
        overflow: unset;
        line-height: 32px;
      }
      .arco-select-view-suffix{
        padding-left: 8px;
      }
      .arco-icon-down{
        color: #333333;
      }
    }
  }
  .msg-list{
    :deep(.arco-list-item){
      padding: 0;
    }
    .msg-item{
      cursor: pointer;
      padding: 14px 16px 19px 51px;
      display: flex;
      justify-content: space-between;
      .left-avatar{
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .conv-main-content{
        width: 100%;
        margin-left: 15px;
        .content-title{
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #333333;
          .time{
            font-size: 12px;
          }
        }
        .content{
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          .left{
            margin-right: 18px;
            .msg-content{
              max-width: calc(30vw - 51px - 50px - 15px - 18px - 50px - 16px - 10px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 21px;
              height: 21px;
              font-size: 14px;
            }
            .new-msg{
              color: #E33C64;
              margin-top: 4px;
              line-height: 21px;
              height: 21px;
              font-size: 14px;
            }
            .tip{
              font-size: 12px;
              color: $grey-font-label;
              margin-top: 12px;
            }
          }
          .right{
            img{
              width: 50px;
              height: 50px;
              border-radius: 2px;
            }
          }
        }
      }
    }
    .nomore{
      color: $grey-font-label;
      font-size: 16px;
      padding: 20px 0;
    }
  }
}
.main-content{
  width: 55%;
  border: 1px solid #F2F2F2;
  .main-content-title{
    padding: 16px 18px;
    border-bottom: 1px solid #F2F2F2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      align-items: flex-start;
      span{
        margin-left: 15px;
        font-size: 14px;
        color: #333333;
      }
    }
    .user-avatar{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    :deep(.arco-icon-more-vertical){
      cursor: pointer;
      width: 34px;
      height: 34px;
    }
  }
  .meta-wrap{
    padding: 16px 18px;
    border-bottom: 1px solid #F2F2F2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      align-items: center;
      .goods-img{
        width: 50px;
        height: 50px;
        border-radius: 2px;
      }
      .info-box{
        margin-left: 15px;
        font-size: 16px;
        div{
          height: 24px;
          line-height: 24px;
        }
        div + div{
          margin-top: 3px;
        }
      }
    }
    .right{
      display: flex;
      align-items: center;
      span{
        margin-right: 21px;
      }
      .but{
        width: 67px;
        height: 34px;
        color: #FFFFFF;
      }
      .but + .but {
        margin-left: 13px;
      }
      .accept{
        background: $main-pink;
      }
      .reject{
        background: $main-grey;
      }
    }

  }
  .time-line{
    text-align: center;
    margin-top: 18px;
    color: #333333;
    font-size: 12px;
  }
  .conversation-content{
    height: calc(100% - 199px - 60px);
    .left-side{
      text-align: left;
    }
    .right-side{
      text-align: right;
    }
  }
  .input-line{
    height: 60px;
    border-top: 1px solid #F2F2F2;
    .input-box{
      height: 100%;
      border-radius: 0;
      background: #FFFFFF;
    }
    :deep(.arco-icon-image){
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}
.right-ad{
  width: 15%;
}
</style>

<template>
  <div class="global-content">
    <div class="left-msg-list">
      <div id="left-msg-list" class="msg-select">
        <template v-if="pageLoading">
          <div>
            <a-skeleton :animation="true" class="skeleton" style="margin-left: 8px">
              <a-skeleton-line :line-height="30" :rows="1"/>
            </a-skeleton>
          </div>
        </template>
        <template v-else>
          <a-select v-model="curMsgType" @change="changeMsgType" :bordered="false">
            <a-option
                v-for="item in sysData.msgType"
                :value="item.value"
                :key="item.value"
                :label="item.key"
            >
            </a-option>
          </a-select>
        </template>
      </div>
      <div class="msg-list">
        <template v-if="pageLoading">
          <div>
            <a-skeleton :animation="true" class="skeleton"
                        style="margin-left: 50px; margin-right: 16px">
              <a-skeleton-line :line-height="80" :rows="5"/>
            </a-skeleton>
          </div>
        </template>
        <template v-else>
          <div v-for="item in conversationList">
            <div class="msg-item" @click="changeChatDetail(item)">
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
    <div class="main-content">
      <a-spin :loading="mainContentLoading" style="width: 100%;">
        <!--      <div class="info-wrap" v-if="conversationList.length > 0">-->
        <div class="info-wrap">
          <div class="main-content-title"  v-if="Object.keys(curConversationMeta).length">
            <div class="left" @click="toUserDetail">
              <template v-if="pageLoading">
                <a-skeleton :animation="true" class="skeleton" style="width: 160px">
                  <a-skeleton-line :line-height="50" :rows="1"/>
                </a-skeleton>
              </template>
              <template v-if="!pageLoading">
                <a-image width="50" height="50" show-loader fit="cover"
                         :src="baseImgPrefix + curConversationMeta.avatar"
                         :preview="false"
                         alt="">
                  <template #loader>
                    <div class="loader-animate"/>
                  </template>
                </a-image>
                <span>{{ curConversationMeta.nickname }}</span>
              </template>
            </div>
            <a-dropdown @select="handleOperationSelect">
              <icon-more-vertical/>
              <template #content>
                <a-doption v-for="item in dialogueOperationType" :value="item.value">{{ item.key }}</a-doption>
              </template>
            </a-dropdown>
          </div>
          <div class="meta-wrap mobile-border-none" v-if="Object.keys(curConversationMeta).length">
            <div class="left" @click="toGoodsDetails">
              <template v-if="pageLoading">
                <a-skeleton :animation="true" class="skeleton" style="width: 250px">
                  <a-skeleton-line :line-height="50" :rows="1"/>
                </a-skeleton>
              </template>
              <template v-else>
                <a-image class="goods-img" width="50" height="50" show-loader fit="cover"
                         :src="baseImgPrefix + curConversationMeta.p_image" alt="">
                  <template #loader>
                    <div class="loader-animate"/>
                  </template>
                </a-image>
                <div class="info-box">
                  <div>{{ curConversationMeta.p_title }}</div>
                  <div>HK$ {{ curConversationMeta.p_price }}</div>
                </div>
              </template>

            </div>
            <!--"f_type": 1.当前用户为购买方，显示你出价，編輯出價，取消出價，2.为出售方，显示对方出价，接受出价，驳回 按钮-->
            <!--"status": 0.沟通中，1.已出价，买方，显示你出價：HK$788，编辑出价，卖方显示：接受出价，驳回出价，2.已接受出价，卖方显示评价，显示评价/查看评价，3.驳回出价-->
            <div class="right">
              <template v-if="pageLoading">
                <a-skeleton :animation="true" class="skeleton" style="width: 250px">
                  <a-skeleton-line :line-height="50" :rows="1"/>
                </a-skeleton>
              </template>
              <template v-else>
                <!--购买方按钮-->
                <template v-if="curConversationMeta.f_type === 1">
                  <!--还未出价 展示出价按钮-->
                  <template v-if="curConversationMeta.status === 0">
                    <a-input-number v-model="offerNum" v-if="openOffer" :precision="2"></a-input-number>
                    <a-button class="but accept" :loading="offerLoading" @click="handleOffer">{{
                        $t('dialogue.offer')
                      }}
                    </a-button>
                    <a-button class="but reject" v-if="openOffer" @click="handleOfferClose">{{
                        $t('dialogue.cancel')
                      }}
                    </a-button>
                  </template>
                  <!--已经出价 展示修改价格按钮-->
                  <template v-else-if="curConversationMeta.status === 1">
                    <a-input-number v-model="offerNum1" v-if="openEditOffer" :precision="2"></a-input-number>
                    <span v-if="!openEditOffer">{{ $t('dialogue.yourPrice') }}：{{ curConversationMeta.price }}</span>
                    <a-button class="but accept" @click="editOffer" :loading="editOfferLoading">{{
                        openEditOffer ? $t('dialogue.confirmEditOffer') : $t('dialogue.operationEditOffer')
                      }}
                    </a-button>
                    <a-button class="but reject" v-if="openEditOffer" @click="handleOfferClose1">{{
                        $t('dialogue.cancel')
                      }}
                    </a-button>
                    <a-button class="but reject" v-if="!openEditOffer" :loading="cancelOfferLoading"
                              @click="cancelOffer">
                      {{ $t('dialogue.operationCancelOffer') }}
                    </a-button>
                  </template>
                  <!--已接受出价 展示出价信息 评价按钮-->
                  <template v-else-if="curConversationMeta.status === 2">
                    <span>{{ $t('dialogue.yourPrice') }}：{{ curConversationMeta.price }}</span>
                    <span class="accepted">{{ $t('dialogue.accepted') }}</span>
                    <a-button v-if="curConversationMeta.pj_type === 0" class="but reject" @click="openEvaluateDialog">{{
                        $t('dialogue.evaluateBut')
                      }}
                    </a-button>
                    <a-button v-else class="but reject" @click="openEvaluateDetailDialog">{{
                        $t('dialogue.evaluateShowBut')
                      }}
                    </a-button>
                  </template>
                  <!--已拒绝出价 展示拒绝信息和出价按钮-->
                  <template v-else-if="curConversationMeta.status === 3">
                    <span v-if="!openOffer">{{ $t('dialogue.yourPrice') }}：{{ curConversationMeta.price }}</span>
                    <span class="rejected" v-if="!openOffer">{{ $t('dialogue.rejected1') }}</span>
                    <a-input-number v-model="offerNum" v-if="openOffer" :precision="2"></a-input-number>
                    <a-button class="but accept" :loading="offerLoading" @click="handleOffer">{{
                        $t('dialogue.offer')
                      }}
                    </a-button>
                    <a-button class="but reject" v-if="openOffer" @click="handleOfferClose">{{
                        $t('dialogue.cancel')
                      }}
                    </a-button>

                  </template>
                </template>
                <!--出售方按钮-->
                <template v-if="curConversationMeta.f_type === 2">
                  <!--对方已经出价 展示接受/拒绝按钮-->
                  <template v-if="curConversationMeta.status === 1">
                    <span>{{ $t('dialogue.hisPrice') }}：{{ curConversationMeta.price }}</span>
                    <a-button class="but accept" :loading="acceptLoading" @click="handleAccept(curConversationMeta)">{{
                        $t('dialogue.accept')
                      }}
                    </a-button>
                    <a-button class="but reject" :loading="rejectLoading" @click="handleReject(curConversationMeta)">{{
                        $t('dialogue.refuse')
                      }}
                    </a-button>
                  </template>
                  <!--我方已接受出价 展示已售出 评价按钮-->
                  <template v-if="curConversationMeta.status === 2">
                    <span>{{ $t('dialogue.yourPrice') }}：{{ curConversationMeta.price }}</span>
                    <span class="accepted">{{ $t('dialogue.accepted') }}</span>
                    <a-button v-if="curConversationMeta.p_state === 1" class="but accept" :loading="soldLoading"
                              @click="openSoldDialog">{{
                        $t('dialogue.markSold')
                      }}
                    </a-button>
                    <a-button v-if="curConversationMeta.pj_type === 0" class="but reject" @click="openEvaluateDialog">{{
                        $t('dialogue.evaluateBut')
                      }}
                    </a-button>
                    <a-button v-else class="but reject" @click="openEvaluateDetailDialog">{{
                        $t('dialogue.evaluateShowBut')
                      }}
                    </a-button>
                  </template>
                  <!--已拒绝出价 -->
                  <template v-else-if="curConversationMeta.status === 3">
                    <span>{{ $t('dialogue.hisPrice') }}：{{ curConversationMeta.price }}</span>
                    <span class="rejected">{{ $t('dialogue.rejected') }}</span>
                  </template>
                </template>
              </template>
            </div>
          </div>
        </div>
        <div class="conversation-content">
          <div v-show="conversationDetail.length === 0" class="no-msg">
            <img src="@/assets/images/no-msg.png" alt="">
            <div class="no-msg-title">{{ $t('dialogue.noMsg') }}</div>
            <div class="no-msg-tip">{{ $t('dialogue.noMsgTip') }}</div>
          </div>
          <div v-show="conversationDetail.length > 0" class="conversation-main-block">
            <div class="nomore">--{{ $t('dialogue.noMore') }}--</div>
            <div class="conversation-item" :class="item.wz === 'left' ? 'conversation-left' : 'conversation-right'"
                 v-for="(item, index) in conversationDetail">
              <div class="time-line" v-if="index % 20 === 0">{{
                  parseTime(item.create_time, "{y}/{m}/{d} {h}:{i}")
                }}
              </div>
              <div class="content-item" :class="item.wz === 'left' ? 'content-left' : 'content-right'">
                <a-image class="avatar" width="36" height="36" show-loader fit="cover"
                         :src="baseImgPrefix + item.avatar"
                         alt="">
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
                      <a-image width="120" height="120" show-loader fit="cover" :src="baseImgPrefix + item.content"
                               alt="">
                        <template #loader>
                          <div class="loader-animate"/>
                        </template>
                      </a-image>
                    </div>
                  </template>
                  <!--操作类型-->
                  <template v-else>
                    <div class="operation-msg">{{ parseOperationType(item.type) }}</div>
                    <div class="operation-msg" v-if="item.type === 1 || item.type === 2 || item.type === 4">HK$
                      {{ item.price }}
                    </div>
                  </template>
                  <!--                <div>c_type: {{ item.c_type }} type: {{ item.type }}</div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-spin>
      <div class="input-line" v-if="Object.keys(curConversationMeta).length">
        <a-input class="input-box" v-model="inputTxt" :max-length='500' @press-enter="sendTxt"
                 :placeholder="$t('dialogue.inputHere')" allow-clear>
          <template #suffix>
            <a-upload :custom-request="uploadChatImg" :show-file-list="false">
              <template #upload-button>
                <icon-loading v-if="uploadLoading"/>
                <icon-image v-else/>
              </template>
            </a-upload>
          </template>
        </a-input>
      </div>
    </div>
    <div class="right-ad">
      <!--            {{ JSON.stringify(curConversationMeta) }}-->
      <AD width="160px" height="600px" :advert="googleAd.content"></AD>
    </div>

    <EvaluateDialog ref="evaluateDialog"/>
    <CheckEvaluateDialog ref="checkEvaluateDialog"/>
    <SoldDialog ref="soldDialog" @markSuc="markSuc"/>
    <ReportModal ref="reportModal"></ReportModal>
    <!-- 商品封禁 -->
    <BlockModal ref="blockModal"></BlockModal>
  </div>
</template>
<script setup>
import {useSysData} from "~/stores/sysData";
import {getChatList, getChatMeta, getChatDetail, postMsg, fcsave, fssave, deleteChat} from "~/api/dialogue"
import {uploadToOss} from "~/api/comon"
import {getChatAdvert} from "~/api/ad"
import EvaluateDialog from "./components/EvaluateDialog";
import CheckEvaluateDialog from "./components/CheckEvaluateDialog";
import SoldDialog from "./components/SoldDialog";
import {parseTime} from "~/utils/time"
import {useI18n} from "vue-i18n";
import {Message} from '@arco-design/web-vue';
import {getProductFj} from "~/api/goods";

const {t} = useI18n()
const runtimeConfig = useRuntimeConfig();
const baseImgPrefix =  runtimeConfig.VITE_OSS_PREFIX
const router = useRouter();
const route = useRoute();
let dialogId = parseInt(route.query.id);
let pageTask = null
let mainContentEle = null
const evaluateDialog = ref(null)
const checkEvaluateDialog = ref(null)
const soldDialog = ref(null)
const reportModal = ref(null)
const blockModal = ref(null);
const sysData = useSysData();
//移动端展示对话列表
const showDiaList = ref(true);
// 左侧会话列表
const conversationList = ref([])
// 中间对话详情
const conversationDetail = ref([])
const page = ref(1)
// 当前对话的元信息
const curConversationMeta = ref({})
// 操作列表
const dialogueOperationType = ref([])
const curMsgType = ref(0)
const inputTxt = ref('')
const openOffer = ref(false)
const openEditOffer = ref(false)
const offerNum = ref(0)
const offerNum1 = ref(0)

const pageLoading = ref(true)
const mainContentLoading = ref(false)
const uploadLoading = ref(false)
const acceptLoading = ref(false)
const rejectLoading = ref(false)
const offerLoading = ref(false)
const editOfferLoading = ref(false)
const cancelOfferLoading = ref(false)
const soldLoading = ref(false)
const nextDetailNeedBottom = ref(false)
const googleAd = ref({})


// 跳转到用户详情
const toUserDetail = () => {
  router.push("/userDetails?userId=" + curConversationMeta.value.df_uid);
}
// 跳转到商品详情
const toGoodsDetails = () => {
  getProductFj(curConversationMeta.value.pid).then((res) => {
    // type 1.自己，2他人
    // state 商品狀態，1.出售中，2.交易完成，3已下架，4 已删除
    if (res.code === 0) {
      if (res.data.status === 2) {
        // 打开封禁封禁弹窗
        blockModal.value.openDialog(2, res.data.type);
      } else if ((res.data.state === 2 || res.data.state === 3) && res.data.type === 2) {
        // 如果不是自己的商品 并且不是上架状态 打开非上架状态弹窗
        blockModal.value.openDialog(4);
      } else if (res.data.state === 4) {
        // 如果数据已被删除 无乱是不是自己的 打开非上架弹窗
        blockModal.value.openDialog(4);
      } else if (res.data.status === 1) {
        router.push("/goodsDetails?id=" + curConversationMeta.value.pid);
      }
    } else {
      Message.error(res.message);
    }
  });
};
// 获取左侧对话列表
const fetchListData = (autoFocus = true) => {
  getChatList({
    type: curMsgType.value,
    key: new Date().getTime()
  }).then(res => {
    pageLoading.value = false
    conversationList.value = res.data
    // 获取到对话列表后 默认获取第一个消息对话详情
    if (res.data.length > 0) {
      if (autoFocus) {
        console.log('autoFocus')
        console.log(res.data[0])
        if(dialogId){
          const data = res.data.filter((item)=>{
            return item.id === dialogId
          })
          curConversationMeta.value = data[0]
          dialogId = null
        } else {
          curConversationMeta.value = res.data[0]
        }
        fetchDetailData()
        calcOperationOptions()
      }
    }
  }).catch(e => {
    console.log('fetchListData catch')
    clearInterval(pageTask)
  })
}
// 获取对话详情
const fetchDetailData = (callback) => {
  if (!curConversationMeta.value.id) return
  const id = curConversationMeta.value.id
  getChatDetail({
    id: curConversationMeta.value.id,
    key: new Date().getTime()
    // limit: 999
    // 暂时不做分页
    // page: page.value
  }).then(res => {
    mainContentLoading.value = false
    if (res.code === 0) {
      // 在轮询的过程中 可能中途被切换了对话详情 如果切换了 放弃上一次轮询的结果 id相同 说明没有切换
      if (id === curConversationMeta.value.id) {
        // 暂时不做分页
        // conversationDetail.value = [...res.data.data.reverse(), ...conversationDetail.value]
        conversationDetail.value = res.data.reverse()
        nextTick(()=>{
          mainContentEle = document.getElementsByClassName('conversation-content')[0]
        })
      }

    } else {
      Message.error(res.message)
    }
    callback && callback()
  }).catch(e => {
    if (callback) callback()
    console.log('fetchDetailData catch')
    clearInterval(pageTask)
  })
}
// 获取对话元信息
const getChartMetaInfo = () => {
  if (!curConversationMeta.value.id) return
  const id = curConversationMeta.value.id
  getChatMeta({
    id: curConversationMeta.value.id,
    key: new Date().getTime()
  }).then(res => {
    // 在轮询的过程中 可能中途被切换了对话详情 如果切换了 放弃上一次轮询的结果 id相同 说明没有切换
    if (id === curConversationMeta.value.id) {
      if (res.code === 0) {
        curConversationMeta.value = res.data
      } else {
        Message.error(res.message)
      }
    }
  }).catch(e => {
    console.log('getChartMetaInfo catch')
    clearInterval(pageTask)
  })
}
// 打开评论面板
const openEvaluateDialog = () => {
  console.log('openEvaluateDialog')
  evaluateDialog.value.openDialog(curConversationMeta.value.id);
}
// 打开评价详情面板
const openEvaluateDetailDialog = () => {
  console.log('openEvaluateDetailDialog')
  checkEvaluateDialog.value.openDialog(curConversationMeta.value.id);
}
// 打开标记售出面板
const openSoldDialog = () => {
  soldDialog.value.openDialog(curConversationMeta.value.pid);
}
// 标记售出回调
const markSuc = () => {
  curConversationMeta.value.p_state = 2
}
// 切换消息类型
const changeMsgType = () => {
  page.value = 1
  mainContentLoading.value = true
  fetchListData()
}
// 切换对话详情
const changeChatDetail = (item) => {
  showDiaList.value = false
  conversationDetail.value = []
  page.value = 1
  curConversationMeta.value = item
  calcOperationOptions()
  mainContentLoading.value = true
  nextDetailNeedBottom.value = true
  // flag
  fetchDetailData(() => {
    mainContentLoading.value = false
    scrollToBottom(true)
  })
}
// 上传图片
const uploadChatImg = (option) => {
  const {onProgress, onError, onSuccess, fileItem, name} = option
  console.log(fileItem.file)
  console.log(name)
  uploadLoading.value = true
  uploadToOss({
    file: fileItem.file
  }).then(res => {
    if (res.code === 0) {
      // 上传成功，发送消息
      const data = {
        id: curConversationMeta.value.id,
        type: 0,
        c_type: 1,
        content: res.data,
        price: null
      }
      sendMsg(data, () => {
        uploadLoading.value = false
      }, () => {
        uploadLoading.value = false
      })
    } else {
      Message.error(res.message)
      uploadLoading.value = false
    }
  })
}
// 转换消息操作类型
const parseOperationType = (e) => {
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
// 出价操作
const handleOffer = () => {
  // 如果未打开输入状态 就打开
  if (!openOffer.value) {
    openOffer.value = true
  } else {
    // 已经打开再次点击 发送出价请求
    offerLoading.value = true
    const data = {
      id: curConversationMeta.value.id,
      type: 1,
      c_type: 0,
      content: t('dialogue.offer'),
      price: offerNum.value
    }
    sendMsg(data, () => {
      offerLoading.value = false
      Message.success(t('dialogue.offerSuc'))
      handleOfferClose()
    }, () => {
      offerLoading.value = false
      handleOfferClose()
    })
  }
}
// 取消出价操作
const cancelOffer = () => {
  cancelOfferLoading.value = true
  const data = {
    id: curConversationMeta.value.id,
    type: 3,
    c_type: 0,
    content: t('dialogue.operationCancelOffer'),
    price: offerNum.value
  }
  sendMsg(data, () => {
    cancelOfferLoading.value = false
    Message.success(t('dialogue.cancelOfferSuc'))
  }, () => {
    cancelOfferLoading.value = false
  })
}
// 编辑出价操作
const editOffer = () => {
  if (!openEditOffer.value) {
    openEditOffer.value = true
    offerNum1.value = parseFloat(curConversationMeta.value.price)
  } else {
    editOfferLoading.value = true
    const data = {
      id: curConversationMeta.value.id,
      type: 2,
      c_type: 0,
      content: t('dialogue.operationEditOffer'),
      price: offerNum1.value
    }
    sendMsg(data, () => {
      editOfferLoading.value = false
      handleOfferClose1()
      Message.success(t('dialogue.editOfferSuc'))
    }, () => {
      editOfferLoading.value = false
      handleOfferClose1()
    })
  }

}
// 关闭出价输入
const handleOfferClose = () => {
  openOffer.value = false
  offerNum.value = 0
}
const handleOfferClose1 = () => {
  openEditOffer.value = false
  offerNum1.value = 0
}
// 接受出价操作
const handleAccept = (e) => {
  acceptLoading.value = true
  const data = {
    id: e.id,
    type: 5,
    c_type: 0,
    content: t('dialogue.operationAcceptOffer'),
    price: e.price
  }
  sendMsg(data, () => {
    acceptLoading.value = false
    Message.success(t('dialogue.acceptSuc'))
  }, () => {
    acceptLoading.value = false
  })
}
// 驳回出价操作
const handleReject = (e) => {
  rejectLoading.value = true
  const data = {
    id: e.id,
    type: 4,
    c_type: 0,
    content: t('dialogue.operationRejectOffer'),
    price: e.price
  }
  sendMsg(data, () => {
    rejectLoading.value = false
    Message.success(t('dialogue.rejectSuc'))
  }, () => {
    rejectLoading.value = false
  })
}
// 发送文本消息
const sendTxt = (e) => {
  console.log(e)
  if (!inputTxt.value) return
  const data = {
    id: curConversationMeta.value.id,
    type: 0,
    c_type: 0,
    content: inputTxt.value,
    price: null
  }
  sendMsg(data, () => {
    inputTxt.value = ''
  })
}
// 发送消息
const sendMsg = (e, callbackSuc, callbackFail) => {
  postMsg(e).then(res => {
    if (res.code === 0) {
      if (callbackSuc) callbackSuc()
      nextDetailNeedBottom.value = true
      fetchListData(false)
      fetchDetailData(() =>{
        scrollToBottom(true)
      })
    } else {
      Message.error(res.message)
      if (callbackFail) callbackFail()
    }
  }).catch(e => {
    if (callbackSuc) callbackSuc()
  })
}
// 下拉操作按钮处理
const handleOperationSelect = (e) => {
  console.log(e)
  // 1 封存对话 2 封禁对方 3解封对方 4 删除对话 5 举报对方
  switch (e) {
    case 1:
      sealingChat(1)
      break
    case 2:
      bockOtherParty(1)
      break
    case 3:
      bockOtherParty(2)
      break
    case 4:
      deleteChatItem()
      break
    case 5:
      reportModal.value.openDialog({
        id: curConversationMeta.value.df_uid
      }, 'user');
      break
  }
}
// 封存对话
const sealingChat = (type) => {
  fcsave({
    id: curConversationMeta.value.id,
    type
  }).then(res => {
    if (res.code === 0) {
      Message.success(t('dialogue.sealeSuc'))
      fetchListData()
    } else {
      Message.error(res.message)
    }
  })
}
// 封锁对方
const bockOtherParty = (type) => {
  fssave({
    id: curConversationMeta.value.id,
    type
  }).then(res => {
    if (res.code === 0) {
      Message.success(type === 1 ? t('dialogue.blockSuc') : t('dialogue.unBlockSuc'))
      fetchListData()
    } else {
      Message.error(res.message)
    }
  })
}
// 删除对话
const deleteChatItem = () => {
  deleteChat({
    id: curConversationMeta.value.id
  }).then(res => {
    if (res.code === 0) {
      Message.success(t('dialogue.reportSuc'))
      fetchListData()
    } else {
      Message.error(res.message)
    }
  })
}
// 根据当前对话属性计算操作下拉列表
const calcOperationOptions = () => {
  console.log('calcOperationOptions')
  console.log(curConversationMeta.fs_type)
  if (curConversationMeta.value.fs_type === 1) {
    // 已封锁对方状态 展示解封对方
    dialogueOperationType.value = sysData.dialogueOperationType.filter(item => {
      return item.value !== 2
    })
  } else {
    // 未封锁对方状态 展示封禁对方
    dialogueOperationType.value = sysData.dialogueOperationType.filter(item => {
      return item.value !== 3
    })
  }
  console.log(dialogueOperationType.value)
}
// 循环查询对话列表和当前对话详情
const pageLoopTask = () => {
  pageTask = setInterval(() => {
    fetchListData(false)
    getChartMetaInfo()
    fetchDetailData(null)
  }, 2000)
}
// 对话详情页面滚到底部
const scrollToBottom = (forceBottom = false) => {
  console.log('执行了滚动到底')
  const distance = mainContentEle.scrollHeight - mainContentEle.clientHeight - mainContentEle.scrollTop
  // clientHeight + scrollTop === scrollHeight 判断当前是不是在底部 如果是 就滚 否则不滚
  if(distance <= 100 || forceBottom){
    console.log('滚啊！')
    nextTick(()=>{
      const ele = document.getElementsByClassName('conversation-main-block')[0]
      mainContentEle && mainContentEle.scrollTo({
        top: ele.scrollHeight,
        behavior: 'smooth'
      })
    })
  }

}
const getAd = () => {
  getChatAdvert().then(res => {
    googleAd.value = res.data
  })
}
getAd()


onMounted(() => {
  dialogueOperationType.value = sysData.dialogueOperationType;
  // 监听对话主体部分数据长度变化 发生变化滚到底部
  watch(() => conversationDetail.value.length, (newValue, oldValue) => {
        if (newValue !== oldValue) {
          nextTick(() => {
            scrollToBottom()
          })
        }
      }, {immediate: true, deep: true});
  fetchListData()
  pageLoopTask()
});
onUnmounted(() => {
  console.log('onUnmounted')
  clearInterval(pageTask)
})
</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

body {
  overflow: hidden;
}

.global-content {
  height: 100%;
  display: flex;
  min-height: calc(100vh - 106px);
}

.left-msg-list {
  border-top: 1px solid #F2F2F2;
  width: 30%;
  .msg-select {
    padding: 20px 12px;
    position: relative;
    width: 110px;

    .back-icon-mobile {
      position: absolute;
      left: 0;
      display: block;
      font-size: 25px;
      font-weight: 400;
      z-index: 888;
    }

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
        color: $main-black-333;
      }
    }
  }

  .msg-list {
    height: calc(100vh - 70px - 106px);
    overflow-y: auto;

    :deep(.arco-list-item) {
      padding: 0;
    }

    .msg-item {
      cursor: pointer;
      padding: 14px 16px 19px 51px;
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
          //width: 100%;
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
              max-width: calc(30vw - 51px - 50px - 15px - 18px - 50px - 16px - 10px);
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
      text-align: center;
      cursor: pointer;

      .back-icon-mobile {
        position: absolute;
        left: 0;
        display: block;
        font-size: 25px;
        font-weight: 400;
        z-index: 999999;
        cursor: pointer;
      }

      .arco-image {
        border-radius: 50%;

      }

      span {
        margin-left: 15px;
        font-size: 14px;
        color: $main-black-333;
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
      cursor: pointer;

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
        //width: 67px;
        height: 34px;
        color: $main-white;
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

      .rejected {
        margin-left: 4px;
        color: rgb(var(--danger-6));
      }

      .accepted {
        margin-left: 4px;
        color: rgb(var(--success-6));
      }
    }

  }

  .conversation-content {
    height: calc(100vh - 105px - 171px - 60px - 20px);
    overflow-y: scroll;
    padding: 0 14px 20px 24px;

    .nomore {
      color: $grey-font-label;
      text-align: center;
      font-size: 12px;
      padding-top: 12px;
    }

    .no-msg {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 118px;
      }

      .no-msg-title {
        font-size: 18px;
        color: $main-black-333;
        margin-top: 15px;
      }

      .no-msg-tip {
        color: $grey-font-label;
        margin-top: 10px;
        font-size: 12px;
      }
    }

    .time-line {
      text-align: center;
      margin-top: 18px;
      margin-bottom: 18px;
      color: $main-black-333;
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
          color: $main-black-333;
          word-break: break-all;
          .operation-msg {
            font-weight: bold;
          }
        }
      }

      .content-left {
        .avatar {
          margin-right: 16px;
        }

        .content {
          padding-left: 15px;

          &::before {
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

          &::before {
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
      background: $main-white;
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

:deep(.arco-list) {
  border-radius: 0;
  border-right: unset;
}
</style>


<style lang="scss" scoped>
@import "assets/sass/var.scss";

@media screen and (max-width: 1000px) {
  .left-msg-list {
    width: 100%;

    .msg-list {
      margin-top: 24px;
      height: unset;
    }

    .msg-select {
      //width: 100%;
      text-align: right;
      padding: 10px 0px;

      .arco-select-view-single {
        padding-right: 0px;
      }

      .arco-select {
        padding-left: 0px;
      }
    }

    .msg-item {
      padding: 14px 0px 19px 0px;
    }
  }

}
</style>

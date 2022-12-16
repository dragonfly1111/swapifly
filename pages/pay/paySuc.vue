<template>
  <div class="common-row global-content">
    <div class="pay-res">
      <img src="@/assets/images/paySuc.png" alt="">
      <div class="title" v-if="status === 999">{{ $t('exposure.noOrder') }}</div>
      <div class="title" v-if="status === 1">{{ $t('exposure.orderLoading') }}</div>
      <div class="title" v-else-if="status === 0">{{ $t('exposure.paySuc') }}</div>
      <div class="title" v-else-if="status === 2 ">{{ $t('exposure.overTime') }}</div>
      <div class="tip" v-if="status === 0">{{ $t('exposure.paySucTip') }}</div>
      <div class="tip" v-else-if="status === 1" style="width: 120px">
        <a-skeleton :animation="true">
          <a-skeleton-line :rows="1"  :line-height="25"/>
        </a-skeleton>
      </div>
      <a-button class="back-but" @click="router.push(`/userDetails?userId=${userInfo.id}`)">{{ $t('exposure.back') }}</a-button>
    </div>
  </div>
</template>

<script setup>
import { exposureStatus } from '~/api/pay'
import {useUserInfo} from "~/stores/userInfo";
const userInfo = useUserInfo()
const route = useRoute()
const router = useRouter()
// 999-没有订单 1-查询中 0-支付成功 2-支付超时
const status = ref(1)
console.log(status.value)
const getOrderStatus = ()=> {
  exposureStatus({
    orderId: route.query.orderId
  }).then(res=>{
    console.log(res)
    if(res.code === 0){
      // 未支付 data 1； 支付成功 data 0； 支付超时 data 2
      if(res.data === 1){
        // 如果是未支付状态 继续查询
        setTimeout(()=>{
          getOrderStatus()
        }, 500)
      } else if(res.data === 0){
        status.value = 0
      } else if(res.data === 2){
        status.value = 2
      }
    } else {
      status.value = 999
    }
    console.log('status.value')
    console.log(status.value)
  })
}
getOrderStatus()

</script>

<style lang="scss">
@import "assets/sass/var";
.pay-res{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 250px;
  .title{
    color: #333333;
    margin-top: 23px;
    font-size: 18px;
  }
  .tip{
    margin-top: 10px;
    color: $grey-font-label;
    font-size: 12px;
  }
  .back-but{
    margin-top: 40px;
    background: $main-pink;
    color: #FFFFFF;
    height: 42px;
    width: 300px;
  }
}
</style>

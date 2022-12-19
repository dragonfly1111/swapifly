<template>
  <div class="common-row global-content">
    <div class="pay-res">
      <img src="@/assets/images/payFail.png" alt="">
      <div class="title">{{ $t('exposure.payFail') }}</div>
      <div class="tip">{{ $t('exposure.payFailTip') }}</div>
      <a-button class="back-but" @click="router.push(`/userDetails?userId=${userInfo.id}`)">{{ $t('exposure.back') }}</a-button>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
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
    color: $main-black-333;
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
    color: $main-white;
    height: 42px;
    width: 300px;
  }
}
</style>

<template>
  <a-modal v-model:visible="visible" title-align="start" modal-class="preference-dialog" :footer="false"
           @cancel="handleCancel">
    <template #title>
      <div class="login-title">
        <img src="@/assets/images/logo-long.png" alt=""/>
      </div>
    </template>
    <div class="title">{{ $t('loginDialog.preferenceTip') }}</div>

    <div class="card-box">
      <div class="card-item" :class="card.checked ? 'check-item' : ''" v-for="card in labelList.value" :key="card.id" @click="card.checked = !card.checked">
        <img :src="baseImgPrefix + card.background"/>
        <div>{{ card.title }}</div>
        <a-checkbox v-if="card.checked" class="check-box" v-model="card.checked"></a-checkbox>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { getUserLabel } from '~/api/login'
import { baseImgPrefix } from '~/config/baseUrl'
import {IUserLabel} from "~/model/userLabel";
const visible = ref(true);
const labelList: IUserLabel[] = reactive({value: []})
const confirmPreference = defineEmits(['confirmPreference'])
getUserLabel().then(res=>{
  res.data.data.forEach(item=>{
    item.checked = false
  })
  labelList.value = res.data.data
  console.log( labelList.value)
})
const handleOk = () => {
  confirmPreference('confirmPreference')
};

const handleCancel = () => {
  visible.value = false;
}
const openDialog = () => {
  visible.value = true;
}
defineExpose({
  openDialog,
  handleCancel
})
</script>
<style lang="scss">
@import "assets/sass/var";
.preference-dialog {
  padding: 20px 27px;
  width: 999px;
  .arco-modal-header {
    padding: 0;
    height: unset;
    align-items: start;
    border-bottom: unset;
    .login-title {
      text-align: left;

      img {
        width: 152px;
        height: 36px;
      }
    }
  }
  .arco-modal-body {
    padding: 0;
    color: $grey-font-label;
    .title {
      margin-top: 27px;
      text-align: left;
      font-size: 16px;
      user-select: none;
    }

  }
  .card-box{
    margin-top: 28px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    .check-item{
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    }
    .card-item{
      padding: 24px 18px;
      cursor: pointer;
      border-radius: 2px;
      margin-right: 10px;
      transition: box-shadow .2s cubic-bezier(0,0,1,1);
      position: relative;
      margin-bottom: 36px;
      img{
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
      }
      &:hover{
        //background: var(--color-bg-2);
        //box-shadow: 0 4px 10px rgb(var(--gray-2));
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
      }
      .check-box{
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }
  }
  .card-item:nth-child(8n){
    margin-right: 0;
  }

}
</style>

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
      <div class="card-item" :class="card.checked ? 'check-item' : ''" v-for="card in labelList.value" :key="card.id"
           @click="card.checked = !card.checked">
        <img :src="baseImgPrefix + card.background"/>
        <div class="label-title">{{ card.title }}</div>
        <a-checkbox v-if="card.checked" class="check-box" v-model="card.checked"></a-checkbox>
      </div>

      <div class="skeleton-box" v-if="loading">
        <div v-for="i in 24" :key="i">
          <a-skeleton :animation="true" class="skeleton">
            <a-skeleton-shape shape="circle"/>
            <a-skeleton-line :rows="1"/>
          </a-skeleton>
        </div>
      </div>

    </div>
    <div class="foot">
      <a-button class="but" @click="handleCancel">{{ $t('loginDialog.jump') }}</a-button>
      <a-button class="confirm-but but" @click="handleOk">{{ $t('loginDialog.done') }}</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {getUserLabel, setUserLabel} from '~/api/loginAndRegister'
import {baseImgPrefix} from '~/config/baseUrl'
import {IUserLabel} from "~/model/res/userLabel";
import {Message} from '@arco-design/web-vue';

const visible = ref(false);
const loading = ref(false);
const labelList: IUserLabel[] = reactive({value: []})
const confirmPreference = defineEmits(['confirmPreference'])
loading.value = true
// todo 放到sysdata里面去 放这里会经常重复请求
getUserLabel().then(res => {
  loading.value = false
  res.data.data.forEach((item: { checked: boolean; }) => {
    item.checked = false
  })
  labelList.value = res.data.data
})
const handleOk = () => {
  const ckeckedList: IUserLabel[] = labelList.value.filter(item => {
    return item.checked
  })
  const ids = ckeckedList.map(item => item.id)
  setUserLabel({
    rid: ids
  }).then((res) => {
    console.log(res)
    if(res.code === 0){
      Message.success(res.message)
      handleCancel()
    } else {
      Message.error(res.message)
    }
  })
};

const resetForm = () => {
  labelList.value.forEach((item: { checked: boolean; }) => {
    item.checked = false
  })
}

const handleCancel = () => {
  visible.value = false;
  // 延迟清空 避免出现先清空了表单 对话框再消失视觉问题
  setTimeout(() => {
    resetForm()
  }, 100)
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
  padding: 20px 27px 40px 20px;
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

  .card-box {
    margin-top: 28px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;

    .check-item {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    }

    .card-item {
      padding: 24px 18px;
      cursor: pointer;
      border-radius: 2px;
      margin-right: 10px;
      transition: box-shadow .2s cubic-bezier(0, 0, 1, 1);
      position: relative;
      margin-bottom: 36px;

      img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
      }

      .label-title {
        color: #383838;
        text-align: center;
        font-size: 14px;
        margin-top: 5px;
      }

      &:hover {
        //background: var(--color-bg-2);
        //box-shadow: 0 4px 10px rgb(var(--gray-2));
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
      }

      .check-box {
        position: absolute;
        left: 5px;
        top: 5px;
      }
    }

    .skeleton-box {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;

      .skeleton {
        width: 78px;
        height: 113px;
        padding: 24px 18px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        margin-bottom: 36px;
        margin-right: 10px;

        .arco-skeleton-shape-circle {
          height: 80px;
          width: 80px;
        }

        .arco-skeleton-line-row {
          margin-top: 12px;
        }
      }
    }
  }

  .card-item:nth-child(8n) {
    margin-right: 0;
  }

  .skeleton:nth-child(8n) {
    margin-right: 0;
  }

  .foot {
    text-align: right;

    .but {
      width: 100px;
      height: 46px;
    }

    .confirm-but {
      margin-left: 26px;
      background: $main-pink;
      color: #FFFFFF;
    }
  }
}
</style>

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
        <a-image :src="baseImgPrefix + card.background" :preview="false" show-loader>
          <template #loader>
            <div class="loader-animate"/>
          </template>
        </a-image>
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

    <!--移动端-->
    <div class="mobile-card-box">
      <a-row>
        <a-col class="mobile-card-item" :span="6" v-for="card in labelList.value" :key="card.id" @click="card.checked = !card.checked">
          <a-image :src="baseImgPrefix + card.background" :preview="false" show-loader>
            <template #loader>
              <div class="loader-animate"/>
            </template>
          </a-image>
          <div class="label-title">{{ card.title }}</div>
          <a-checkbox v-if="card.checked" class="check-box" v-model="card.checked"></a-checkbox>
        </a-col>
      </a-row>
      <div class="skeleton-box" v-if="loading">
        <a-row>
          <a-col :span="6" v-for="i in 24">
            <a-skeleton :animation="true" class="skeleton">
              <a-skeleton-shape shape="circle"/>
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="foot">
      <a-button class="but" @click="handleCancel">{{ $t('loginDialog.jump') }}</a-button>
      <a-button class="confirm-but but" @click="handleOk">{{ $t('loginDialog.done') }}</a-button>
    </div>
  </a-modal>
</template>

<script setup>
import {getUserLabel, setUserLabel} from '~/api/loginAndRegister'
import {Message} from '@arco-design/web-vue';
const runtimeConfig = useRuntimeConfig();
const baseImgPrefix =  runtimeConfig.VITE_OSS_PREFIX
const visible = ref(false);
const loading = ref(false);
const labelList = reactive({value: []})
const emits = defineEmits(['confirmPreference'])
loading.value = true
const handleOk = () => {
  const ckeckedList = labelList.value.filter(item => {
    return item.checked
  })
  const ids = ckeckedList.map(item => item.id)
  setUserLabel({
    rid: ids
  }).then((res) => {
    console.log(res)
    if (res.code === 0) {
      Message.success(res.message)
      emits('confirmPreference', ckeckedList)
      handleCancel()
    } else {
      Message.error(res.message)
    }
  })
};

const resetForm = () => {
  labelList.value.forEach((item) => {
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
const openDialog = (value) => {
  visible.value = true;
  getUserLabel().then(res => {
    loading.value = false
    res.data.data.forEach((item) => {
      item.checked = false
    })
    labelList.value = res.data.data
    if (value) {
      const arr = value.split(',')
      console.log(labelList.value)
      console.log(arr)
      labelList.value.forEach(item => {
        if (arr.indexOf(item.id + '') != -1) {
          item.checked = true
        }
      })
    }
    console.log('openDialog')
    console.log(value)
  })
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
        transform: translateY(0px);
        transition: all .3s ease-out;
      }

      .label-title {
        color: $main-grey;
        text-align: center;
        font-size: 14px;
        margin: 5px auto 0 auto;
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &:hover {
        //background: var(--color-bg-2);
        //box-shadow: 0 4px 10px rgb(var(--gray-2));
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        transition: box-shadow .3s ease-out;
        .arco-image{
          background: rgba(44,44,45,.07);
          transition: background .3s ease-out;
        }
        img{
          transform: translateY(-4px);
        }
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
  .mobile-card-box{
    display: none;
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
      color: $main-white;
    }
  }
}
</style>
<style lang="scss">
@import "assets/sass/var";
@media screen and (max-width: 1000px) {
  .preference-dialog {
    top: 0;
    border-radius: 0;
    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    .arco-modal-header {
    }

    .arco-modal-body {
      .title {
        margin-top: 15px;
      }
      .foot {
        .but {
          width: 60px;
          height: 32px;
        }
      }
    }
    .mobile-card-box{
      display: block;
      text-align: center;
      padding-bottom: 24px;
      .skeleton-box {
        .skeleton {
          margin-right: 10px;
          .arco-skeleton-shape-circle {
            margin: 0 auto;
          }

          .arco-skeleton-line-row {
            margin: 12px 0;
          }
        }
      }
      .mobile-card-item{
        position: relative;
        margin-top: 12px;
        .check-box{
          position: absolute;
          left: 5px;
          top: 5px;
        }
        .label-title {
          color: $main-grey;
          text-align: center;
          font-size: 14px;
          margin: 5px auto 0 auto;
          width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      img{
        width: 50px;
        height: 50px;
      }
    }
    .card-box{
      display: none;
    }
  }
}

</style>

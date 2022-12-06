<template>
  <div class="preference-page">
    <div class="login-title">
      <icon-left  class="back-index" @click="router.back()"/>
      {{ $t("profile.edit_preference") }}
    </div>
    <div class="title">{{ $t('loginDialog.preferenceTip') }}</div>

    <div class="card-box">
      <div class="card-item" :class="card.checked ? 'check-item' : ''" v-for="card in labelList.value" :key="card.id"
           @click="card.checked = !card.checked">
        <a-image :src="baseImgPrefix + card.background" show-loader>
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
    <div class="foot">
      <a-button class="but" @click="router.back()">{{ $t('loginDialog.jump') }}</a-button>
      <a-button class="confirm-but but" @click="handleOk">{{ $t('loginDialog.done') }}</a-button>
    </div>
  </div>
</template>


<script setup lang="ts">
import {getUserLabel, setUserLabel} from '~/api/loginAndRegister'
import {baseImgPrefix} from '~/config/baseUrl'
import {IUserLabel} from "~/model/res/userLabel";
import {Message} from '@arco-design/web-vue';
const router = useRouter();
const visible = ref(false);
const loading = ref(false);
const labelList: IUserLabel[] = reactive({value: []})
loading.value = true
const handleOk = () => {
  const ckeckedList: IUserLabel[] = labelList.value.filter(item => {
    return item.checked
  })
  const ids = ckeckedList.map(item => item.id)
  setUserLabel({
    rid: ids
  }).then((res) => {
    console.log(res)
    if (res.code === 0) {
      Message.success(res.message)
      router.push({
        path:'/mobileProfile',
        query:{
          ckeckedList: JSON.stringify(ckeckedList)
        }
      })
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
  // 延迟清空 避免出现先清空了表单 对话框再消失视觉问题
  setTimeout(() => {
    resetForm()
  }, 100)
}
const openDialog = (value: any) => {
  visible.value = true;
  getUserLabel().then(res => {
    loading.value = false
    res.data.data.forEach((item: { checked: boolean; }) => {
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
</script>
<style lang="scss">
@import "assets/sass/var";

.preference-page {
  width: 100%;
  .login-title {
    border-bottom: 1px solid #ccc;
    text-align: center;
    position: relative;
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    .back-index{
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      font-size: 25px;
      font-weight: bold;
      transform: translateY(-50%);
    }
    img {
      width: 152px;
      height: 36px;
      display: inline-block;
    }
  }
  .title {
    margin-top: 27px;
    text-align: left;
    font-size: 16px;
    user-select: none;
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
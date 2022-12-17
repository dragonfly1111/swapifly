<template>
  <a-modal
      v-model:visible="visible"
      title-align="start"
      modal-class="exposure-dialog"
      :footer="false"
      @close="handleCancel"
  >
    <div class="right-close" @click="handleCancel">
      <icon-close/>
    </div>
    <a-row>
      <a-col :span="24" class="left-box">
        <div class="login-title">
          <img src="@/assets/images/logo-long.png" alt=""/>
        </div>
        <template v-if="dataLoading">
          <a-skeleton :animation="true" class="skeleton">
            <div style="display: flex;margin-top: 28px">
              <div style="width: 100px;">
                <a-skeleton-line :line-height="100" :widths="[100]" :rows="1" :line-spacing="10"/>
              </div>
              <div style="width: 100px;margin-left: 12px">
                <a-skeleton-line :line-height="25" :rows="3" :line-spacing="12.5"/>
              </div>
            </div>
            <div class="select-title">{{ $t("exposure.chooseTip") }}</div>
            <div class="sk-card-pc">
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[131]" :rows="1" :line-spacing="10"/>
              </div>
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[131]" :rows="1" :line-spacing="10"/>
              </div>
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[131]" :rows="1" :line-spacing="10"/>
              </div>
            </div>
            <div class="sk-card-pc">
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[131]" :rows="1" :line-spacing="10"/>
              </div>
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[131]" :rows="1" :line-spacing="10"/>
              </div>
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[131]" :rows="1" :line-spacing="10"/>
              </div>
            </div>

            <div class="sk-card-m">
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[90]" :rows="1" :line-spacing="10"/>
              </div>
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[90]" :rows="1" :line-spacing="10"/>
              </div>
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[90]" :rows="1" :line-spacing="10"/>
              </div>
            </div>
            <div class="sk-card-m">
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[90]" :rows="1" :line-spacing="10"/>
              </div>
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[90]" :rows="1" :line-spacing="10"/>
              </div>
              <div style="width: 100px;">
                <a-skeleton-line :line-height="80" :widths="[90]" :rows="1" :line-spacing="10"/>
              </div>
            </div>
          </a-skeleton>
        </template>
        <template v-else>
          <div class="goods-box">
            <a-image :src="baseImgPrefix + productDetail.image" show-loader>
              <template #loader>
                <div class="loader-animate"/>
              </template>
            </a-image>
            <div class="goods-desc">
              <div>{{ productDetail.title }}</div>
              <div class="grey">HK${{ productDetail.price }}</div>
              <div>{{ productDetail.newold }}</div>
            </div>
          </div>
          <div class="price-select">
            <div class="select-title">{{ $t("exposure.chooseTip") }}</div>
            <div class="select-content">
              <div
                  class="select-item"
                  v-for="item in exposureList"
                  :class="{ active: formData.tid == item.id }"
                  @click="formData.tid = item.id"
              >
                <div>{{ item.number }}{{ $t('exposure.exposureNums') }}/{{ item.days }}{{
                    $t('exposure.exposureDays')
                  }}
                </div>
                <div class="price">HK$ {{ item.price }}</div>
              </div>
            </div>
          </div>
        </template>

        <a-button :loading="saveLoading" class="confirm black-btn" @click="handleSubmit">
          {{ $t("exposure.payName") }}
        </a-button>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {getExposureMeal, buyExposure} from "~/api/pay";
import {Message} from "@arco-design/web-vue";

const {t} = useI18n();
const appConfig = useAppConfig();
const baseImgPrefix = appConfig.baseImgPrefix;
const formRef = ref(null);
const uploadRef = ref(null);
const exposureList = ref([]);
const productDetail = ref({});
const dataLoading = ref(true);
const saveLoading = ref(false);
const visible = ref(false);
const emits = defineEmits(["change"]);
const payOptions = reactive([{id: 1}, {id: 2}, {id: 3}, {id: 4}]);
const formData = reactive({
  // title: "",
  // address: "",
  // contact: "",
  // image: "",
  // payway: 1,
  id: null,
  tid: null,
});
const rules = reactive({
  title: [{required: true, message: t("exposure.formValidate.businessTitle")}],
  address: [{required: true, message: t("exposure.formValidate.businessAddress")}],
  contact: [{required: true, message: t("exposure.formValidate.businessContact")}],
  image: [
    {
      required: true,
      message: t("exposure.authApplyForm.businessCertificateTip"),
    },
  ],
});
const updatePage = () => {
  emits("change");
};
const handleCancel = () => {
  visible.value = false;
  // 延迟清空 避免出现先清空了表单 对话框再消失视觉问题
  setTimeout(() => {
    resetForm();
  }, 100);
};
const resetForm = () => {
  formRef.value.resetFields();
};
const openDialog = (id) => {
  formData.id = id
  getExposureList()
  visible.value = true;
};
const getExposureList = () => {
  dataLoading.value = true
  getExposureMeal(formData.id).then(res => {
    dataLoading.value = false
    if (res.code === 0) {
      exposureList.value = res.data.exposure
      productDetail.value = res.data.product
    } else {
      Message.error(res.message)
    }
  })
}
// const stripe = Stripe('pk_test_ijpUbWJgsrGW9X1fOTGwfEY5');

// console.log('stripe')
// console.log(stripe)
// const paymentIntent = stripe.paymentIntents.create({
//   amount: 1099,
//   currency: 'usd',
//   automatic_payment_methods: {enabled: true},
// });
// const elements = stripe.elements({
//   clientSecret: 'sk_test_DypAECv8Fe8TNBiI0m8650pt',
// });

// console.log(paymentIntent)
// console.log(elements)
// 撤销申请
// const handleUndo = () => {
//   Modal.info({
//     content: t('exposure.authApplyForm.undoApplyTip'),
//     closable: true,
//     hideCancel: false,
//     cancelText: t('pages.cancel'),
//     okText: t('pages.confirm'),
//     onBeforeOk: () => {
//       undoApplyBusiness({ id: formData.value.id })
//         .then((res) => {
//           if (res.code === 0) {
//             Message.success(t('exposure.authApplyForm.undoSuc'))
//             handleCancel()
//             updatePage()
//           } else {
//             Message.error(res.message)
//           }
//         })
//         .finally(() => {
//           saveLoading.value = false
//         })
//     },
//   })
// }

const handleSubmit = () => {
  if (!formData.tid) {
    // select-title-shiny
    const ele = document.getElementsByClassName('select-title')[0]
    console.log(ele)
    ele.classList.add('select-title-shiny')
    ele.classList.add('select-title-red')
    setTimeout(() => {
      ele.classList.remove('select-title-shiny')
    }, 500)
    return
  }
  saveLoading.value = true
  buyExposure(formData).then(res => {
    saveLoading.value = false
    console.log(res)
    if (res.code === 0) {
      window.open(res.data.url, '_blank');
    } else {
      Message.error(res.message)
    }

  }).catch(() => {
    saveLoading.value = false
  })
  console.log(formData)
};
defineExpose({
  openDialog,
  handleCancel,
});
</script>

<style lang="scss">
@import "assets/sass/var";

.exposure-dialog {
  padding: 0;
  width: 630px;
  position: relative;

  .right-close {
    position: absolute;
    width: 20px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #4e5969;
    top: 20px;
    right: 27px;
    cursor: pointer;
    display: flex;
    align-items: center;

    .arco-icon-close {
      font-size: 20px;
    }
  }

  .arco-modal-header {
    display: none;
  }

  .login-title {
    text-align: left;

    img {
      width: 152px;
      height: 36px;
    }
  }

  .left-box {
    padding: 20px 27px;

    .goods-box {
      display: flex;
      margin-top: 20px;
      //margin-left: 30px;

      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
      }

      .goods-desc {
        margin-left: 10px;
        width: calc(100% - 100px);

        div:first-child {
          height: 40px;
        }

        div:last-child {
          margin-top: 20px;
        }
      }
    }

    .price-select {
      //margin-left: 30px;

      .select-content {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .select-item {
          width: calc((100% - 40px) / 3);
          //width: 45%;
          border: 1px solid $main-grey-border;
          text-align: center;
          padding: 15px 10px;
          box-sizing: border-box;
          margin-bottom: 14px;
          font-size: 12px;
          cursor: pointer;
          margin-right: 20px;

          &.active,
          &:hover {
            background-color: #fafafa;
            border-color: $main-grey;
          }

          .price {
            color: #ed0e76;
            font-size: 14px;
            margin-top: 2px;
          }
        }

        @media screen and(min-width: 1001px) {
          .select-item:nth-child(3n) {
            margin-right: 0;
          }
        }

      }
    }

    .black-btn {
      width: 100%;
      height: 38px;
      margin-top: 24px;
    }
  }

  .arco-modal-body {
    padding: 0;

    .arco-form-item {
      margin-bottom: 22px;
    }

    .input-warp {
      height: 36px;
    }
  }

  .select-title {
    margin: 15px 0;
  }

  .select-title-red {
    color: rgb(var(--danger-6));
  }

  .select-title-shiny {
    animation: shiny .5s infinite;
  }

  .sk-card-pc {
    display: flex;
    width: 433px;
    justify-content: space-between;
    margin-top: 15px
  }
  .sk-card-m{
    display: none;
  }

  @keyframes shiny {
    0% {
      color: rgb(var(--danger-6));
    }
    25% {
      color: rgb(var(--danger-4));
    }
    50% {
      color: rgb(var(--danger-6));
    }
    75% {
      color: rgb(var(--danger-4));
    }
    100% {
      color: rgb(var(--danger-6));
    }
  }
}
</style>
<style lang="scss">
@import "assets/sass/var";

@media screen and(max-width: 1000px) {
  .exposure-dialog {
    top: 0;
    border-radius: 0;
    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    pointer-events: auto;

    .left-box {
      .price-select {
        //margin-left: 30px;
        .select-content {
          display: flex;
          flex-wrap: wrap;
          width: 100%;

          .select-item {
            width: calc((100% - 20px) / 2);
          }

          .select-item:nth-child(2n) {
            margin-right: 0;
          }

        }
      }
    }
    .sk-card-pc{
      display: none;
    }
    .sk-card-m{
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      width: calc(100vw - 54px);
    }
  }
}
</style>

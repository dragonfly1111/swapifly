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
            <div style="display: flex; width: 433px; justify-content: space-between; margin-top: 15px">
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
            <div style="display: flex; width: 433px; justify-content: space-between; margin-top: 15px">
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
                <div>{{ item.number }} {{ $t('exposure.exposureNums') }} / {{ item.days }} {{
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
      <!--      <a-col :span="12" class="right-box">-->
      <!--        <a-button class="apply-pay-btn">{{ $t("exposure.pay") }}</a-button>-->
      <!--        <a-divider orientation="center">-->
      <!--          <span class="grey fs12">{{ $t("exposure.orPayWay") }}</span>-->
      <!--        </a-divider>-->
      <!--        <a-form ref="formRef" :model="formData" :rules="rules" layout="vertical" size="small">-->
      <!--          <a-form-item-->
      <!--            hide-asterisk-->
      <!--            field="title"-->
      <!--            :label="$t('profile.email')"-->
      <!--            :validate-trigger="['change', 'input']"-->
      <!--          >-->
      <!--            <a-input-->
      <!--              class="input-warp"-->
      <!--              v-model="formData.title"-->
      <!--              :placeholder="$t('profile.email')"-->
      <!--            ></a-input>-->
      <!--          </a-form-item>-->
      <!--          <a-form-item-->
      <!--            hide-asterisk-->
      <!--            field="address"-->
      <!--            :label="$t('exposure.payType')"-->
      <!--            :validate-trigger="['change', 'input']"-->
      <!--          >-->
      <!--            <a-radio-group v-model="formData.payway">-->
      <!--              <a-radio :value="1">-->
      <!--                <template #radio="{ checked }">-->
      <!--                  <div class="payway-item" :checked="checked">-->
      <!--                    <icon-wechatpay />-->
      <!--                    <div>{{ $t("exposure.wechat") }}</div>-->
      <!--                  </div>-->
      <!--                </template>-->
      <!--              </a-radio>-->
      <!--              <a-radio :value="2">-->
      <!--                <template #radio="{ checked }">-->
      <!--                  <div class="payway-item" :checked="checked">-->
      <!--                    <icon-wechat />-->
      <!--                    <div>{{ $t("exposure.backCard") }}</div>-->
      <!--                  </div>-->
      <!--                </template>-->
      <!--              </a-radio>-->
      <!--              <a-radio :value="3">-->
      <!--                <template #radio="{ checked }">-->
      <!--                  <div class="payway-item" :checked="checked">-->
      <!--                    <icon-alipay-circle />-->
      <!--                    <div>{{ $t("exposure.alipay") }}</div>-->
      <!--                  </div>-->
      <!--                </template>-->
      <!--              </a-radio>-->
      <!--            </a-radio-group>-->
      <!--          </a-form-item>-->
      <!--          <a-form-item-->
      <!--            hide-asterisk-->
      <!--            field="contact"-->
      <!--            maxlength="100"-->
      <!--            :label="$t('exposure.bankCardInfo')"-->
      <!--            :validate-trigger="['change', 'input']"-->
      <!--            :content-flex="false"-->
      <!--            class="backcard-box"-->
      <!--          >-->
      <!--            <div>-->
      <!--              <a-input-->
      <!--                v-model="formData.contact"-->
      <!--                allow-clear-->
      <!--                maxlength="100"-->
      <!--                class="input-warp"-->
      <!--              ></a-input>-->
      <!--            </div>-->

      <!--            <a-input-group>-->
      <!--              <a-input-->
      <!--                class="input-warp1"-->
      <!--                :style="{ width: '50%' }"-->
      <!--                :placeholder="$t('exposure.yearOrMonth')"-->
      <!--              />-->
      <!--              <a-input class="input-warp1" :style="{ width: '50%' }" placeholder="second" />-->
      <!--            </a-input-group>-->
      <!--          </a-form-item>-->
      <!--          <a-form-item-->
      <!--            hide-asterisk-->
      <!--            field="title"-->
      <!--            :label="$t('exposure.cardUserName')"-->
      <!--            :validate-trigger="['change', 'input']"-->
      <!--          >-->
      <!--            <a-input class="input-warp" v-model="formData.cardUserName"></a-input>-->
      <!--          </a-form-item>-->
      <!--          <a-form-item-->
      <!--            hide-asterisk-->
      <!--            field="title"-->
      <!--            :label="$t('exposure.countriesRegions')"-->
      <!--            :validate-trigger="['change', 'input']"-->
      <!--          >-->
      <!--            <a-select class="input-warp">-->
      <!--              <a-option>Beijing</a-option>-->
      <!--              <a-option>Shanghai</a-option>-->
      <!--            </a-select>-->
      <!--          </a-form-item>-->
      <!--        </a-form>-->
      <!--        <a-button :loading="saveLoading" class="confirm black-btn" @click="handleSubmit">-->
      <!--          {{ $t("exposure.payName") }}-->
      <!--        </a-button>-->
      <!--      </a-col>-->
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

  }).catch(()=>{
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
  width: 550px;
  position: relative;

  .right-close {
    position: absolute;
    width: 35px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    color: #4e5969;
    right: 0;
    top: 0;
    cursor: pointer;
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
          border: 1px solid #e5e5e5;
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

          &:nth-child(3n) {
            margin-left: 0;
          }

          .price {
            color: #ed0e76;
            font-size: 14px;
            margin-top: 2px;
          }
        }
        .select-item:nth-child(3n){
          margin-right: 0;
        }
      }
    }

    .black-btn {
      width: 100%;
      height: 38px;
      margin-top: 24px;
    }
  }

  .right-box {
    border-left: 5px solid #eee;
    padding: 30px 40px;

    .apply-pay-btn {
      width: 100%;
      height: 40px;
      background-color: #000;
      color: #fff;
      font-size: 16px;
    }

    .arco-form-item-label-col {
      line-height: 20px;
      margin-bottom: 2px;
      color: $grey-font-label;
    }

    .arco-radio-group .arco-radio {
      margin-right: 2px;
    }

    .payway-item {
      width: 80px;
      border-radius: 5px;
      border: 1px solid #e5e5e5;
      padding: 5px 8px;
      line-height: 14px;
      font-size: 12px;

      .arco-icon {
        font-size: 15px;
        margin-bottom: 2px;
      }

      .arco-icon-wechatpay {
        color: rgb(48, 188, 48);
      }
    }

    .arco-radio-checked {
      .payway-item {
        border-color: $main-grey;
      }
    }

    .backcard-box {
      .input-warp {
        background-color: #fff;
        border: 1px solid #eee;
      }

      .input-warp1 {
        background-color: #fff;
        border: 1px solid #eee;
      }
    }

    .black-btn {
      width: 100%;
      height: 38px;
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

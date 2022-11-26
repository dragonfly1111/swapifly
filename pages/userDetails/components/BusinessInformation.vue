<template>
  <div class="business-box">
    <div class="box-header">
      <a-row justify="space-between" align="center" class="header-select">
        <a-col flex="100px" class="title"> {{ $t("pages.businessInformation") }} </a-col>
        <a-col flex="100px">
          <a-button type="outline" @click="toAuthentication">{{
            $t("pages.authenticationApply")
          }}</a-button>
        </a-col>
      </a-row>
    </div>

    <div class="business-box-body">
      <a-form :model="form" layout="vertical" size="large" disabled class="business-form">
        <a-form-item field="title" :label="$t('business.businessTitle')">
          <a-input v-model="form.title" :placeholder="$t('pages.noContent')" />
        </a-form-item>
        <a-form-item field="address" :label="$t('business.businessAddress')">
          <a-input v-model="form.address" :placeholder="$t('pages.noContent')"  />
        </a-form-item>
        <a-form-item field="contact" :label="$t('business.businessContact')">
          <a-input v-model="form.contact" :placeholder="$t('pages.noContent')"  />
        </a-form-item>
        <a-form-item field="image" :label="$t('business.businessCertificate')">
          <a-image
            width="270"
            height="180"
            v-if="form.image"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
          />
          <span class="grey" v-if="!form.image">{{$t('pages.noImage')}}</span>
        </a-form-item>
        <div class="text-danger" v-if="form.auditReson">{{$t('business.auditResult')}}：</div>
        <div class="auth-status">{{$t('business.authStatus')}}：{{$t('business.authStatusNo')}}</div>
      </a-form>
      
    </div>

    <BusinessRegistration ref="businessRegistration"></BusinessRegistration>
  </div>
</template>

<script setup>
import { getBusinessInfo } from "~/api/business";
const router = useRouter();
const businessRegistration = ref(null)
const form = reactive({
  title: null,
  address: null,
  contact: null,
  image: null,
  auditReson:null
});

const testImg =
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
onMounted(() => {});

const handleQuery = () => {
    getBusinessInfo(router.currentRoute.value.query.userId).then(res=>{
        if(res.code == 0){
            form.value = res.data
        }
    })
};
const toAuthentication = () => {
    businessRegistration.value.openDialog()
};
defineExpose({
    handleQuery,
    toAuthentication
});
</script>
<style lang="scss" scoped>
@import "assets/sass/var";
.grey {
  color: $grey-font-label;
}
.business-box {
  .box-header {
    .header-select {
      padding: 20px 15px 15px 30px;
      border-bottom: 1px solid #e5e5e5;
    }
    .title {
      font-size: 24px;
    }
    .arco-btn {
      border-color: $main-grey;
      color: $main-grey;
      padding: 0 15px;
      height: 32px;
    }
  }
  .business-box-body {
    padding: 50px 30px;
    .business-form {
      width: 60%;
      max-width: 500px;
      min-width: 300px;
    }
    :deep(.arco-form-item) {
      margin-bottom: 30px;
    }
    :deep(.arco-form-item-label-col) {
      line-height: 16px;
      margin-bottom: 5px;
      .arco-form-item-label {
        color: $grey-font-label;
        font-size: 16px;
      }
    }
  }
}

.text-danger{
    color: #D43030;
    font-size: 16px;
}

.auth-status{
    margin: 60px 0 20px;
    font-size: 16px;
}
</style>

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
          <a-input v-model="form.title" placeholder="" />
        </a-form-item>
        <a-form-item field="address" :label="$t('business.businessAddress')">
          <a-input v-model="form.address" placeholder="" />
        </a-form-item>
        <a-form-item field="contact" :label="$t('business.businessContact')">
          <a-input v-model="form.contact" placeholder="" />
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  title: null,
  address: null,
  contact: null,
  image: null,
});

const testImg =
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp";
onMounted(() => {});

const handleQuery = () => {};
const toAuthentication = () => {};
</script>
<style lang="scss" scoped>
@import "assets/sass/var";

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
    padding: 30px;
    .business-form{
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
</style>

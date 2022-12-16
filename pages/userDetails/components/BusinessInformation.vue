<template>
  <div class="business-box">
    <div class="box-header">
      <a-row
        justify="space-between"
        align="center"
        class="header-select"
        v-if="resize.screenType !== 'MOBILE'"
      >
        <a-col flex="180px" class="title"> {{ $t("pages.businessInformation") }} </a-col>
        <a-col flex="100px">
          <a-button
            type="outline"
            @click="toAuthentication"
            v-if="props.userData.p_type == 2 && props.userData.shop != 1"
            >{{ $t("pages.authenticationApply") }}</a-button
          >
        </a-col>
      </a-row>
    </div>

    <div class="business-box-body">
      <a-form :model="form" layout="vertical" size="large" disabled class="business-form">
        <a-form-item field="title" :label="$t('business.businessTitle')">
          <a-input v-model="form.title" :placeholder="$t('pages.noContent')" />
        </a-form-item>
        <a-form-item field="address" :label="$t('business.businessAddress')">
          <a-input v-model="form.address" :placeholder="$t('pages.noContent')" />
        </a-form-item>
        <a-form-item field="contact" :label="$t('business.businessContact')">
          <a-input v-model="form.contact" :placeholder="$t('pages.noContent')" />
        </a-form-item>
        <a-form-item field="image" :label="$t('business.businessCertificate')">
          <a-image
            width="270"
            height="180"
            v-if="form.image"
            :src="baseImgPrefix + form.image"
            fit="cover"
          />
          <span class="grey" v-if="!form.image">{{ $t("pages.noImage") }}</span>
        </a-form-item>
        <div class="auth-status">
          {{ $t("business.authStatus") }}：{{ getStatusLabel() || $t("business.authStatusNo") }}
        </div>
        <div class="text-danger" v-if="form.opinion && form.state == 2">
          {{ $t("business.auditResult") }}：{{ form.opinion }}
        </div>
      </a-form>
    </div>
    <a-button
      v-if="resize.screenType === 'MOBILE' && !userInfo.token"
      class="mobile-sell"
      type="primary"
      @click.stop="router.push('/saleEdit')"
      >{{ $t("head.sell") }}</a-button
    >
    <BusinessRegistration ref="businessRegistration" @change="handleQuery"></BusinessRegistration>
  </div>
</template>

<script setup>
import { getBusinessInfo } from "~/api/business";
import { useSysData } from "~/stores/sysData";
import { useResize } from "~/stores/resize";
import { useUserInfo } from "~/stores/userInfo";
const resize = useResize();
const userInfo = useUserInfo();
const sysData = useSysData();
const router = useRouter();
const businessRegistration = ref(null);
const appConfig = useAppConfig();
const baseImgPrefix = appConfig.baseImgPrefix;

const props = defineProps({
  userData: {
    type: Object,
    default: () => {},
  },
});
const form = ref({
  title: null,
  address: null,
  contact: null,
  image: null,
  opinion: null,
  state: null,
});

const getStatusLabel = () => {
  if (form.value.state != null) {
    let obj = sysData.authenticationStatus.find((i) => i.value == form.value.state);
    return obj ? obj.key : "";
  }
};

const handleQuery = () => {
  getBusinessInfo(router.currentRoute.value.query.userId).then((res) => {
    if (res.code == 0 && res.data) {
      form.value = res.data;
    } else {
      form.value = {
        title: null,
        address: null,
        contact: null,
        image: null,
        opinion: null,
        state: null,
      };
    }
  });
};
const toAuthentication = () => {
  businessRegistration.value.openDialog(form.value);
};
onMounted(() => {});
defineExpose({
  handleQuery,
  toAuthentication,
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
      .arco-input-wrapper .arco-input[disabled] {
        color: #86909c;
        -webkit-text-fill-color: #86909c;
      }
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

.text-danger {
  color: #d43030;
  font-size: 16px;
  margin-bottom: 40px;
}

.auth-status {
  margin: 13px 0 20px;
  font-size: 16px;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
  .business-box {
    .business-box-body {
      padding: 30px;
    }
  }
}
</style>

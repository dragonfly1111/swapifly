<template>
  <div class="profile-box">
    <div class="header">
      <h1>{{ $t("profile.edit_profile") }}</h1>
    </div>
    <h4 class="title">{{ $t("profile.user_head_portrait") }}</h4>
    <div class="upload-box">
      <img class="avatar" alt="avatar" :src="form.avatar" />
      <div class="upload-btn">
        <p class="tip">{{ $t("profile.user_head_portrait_tip") }}</p>
        <a-upload
          :action="uploadUrl"
          :show-file-list="false"
          @success="uploadSuccess"
          with-credentials
          accept="image/*,.png"
        >
          <template #upload-button>
            <a-button type="outline">{{ $t("profile.user_head_upload") }}</a-button>
          </template>
        </a-upload>
      </div>
    </div>
    <h4 class="title">{{ $t("profile.open_user_profile") }}</h4>
    <a-form :model="form" layout="vertical" size="large">
      <a-form-item field="userId" label="">
        <a-input v-model="form.userId" placeholder="" disabled />
      </a-form-item>
      <a-form-item field="nickname" :label="$t('profile.user_name')">
        <a-input v-model="form.nickname" :placeholder="$t('profile.user_name_empty')" />
      </a-form-item>
      <a-form-item field="describe" :label="$t('profile.user_describe')">
        <a-textarea
          v-model="form.describe"
          :placeholder="$t('profile.user_describe_empty')"
          allow-clear
          :auto-size="{ minRows: 7, maxRows: 7 }"
        />
      </a-form-item>
      <a-form-item field="region" :label="$t('profile.countries_regions')">
        <a-input v-model="form.region" :placeholder="$t('profile.countries_regions_empty')" />
      </a-form-item>
      <h4 class="title mb20">{{ $t("profile.personal_information") }}</h4>
      <a-form-item field="email" :label="$t('profile.email')" :content-flex="false">
        <a-input v-model="form.email" />
        <div style="text-align: right">
          <a-button type="text" @click="handleBind">绑定</a-button>
        </div>
      </a-form-item>
      <a-form-item field="post" :label="$t('profile.phone')">
        <a-input v-model="form.post" />
      </a-form-item>
      <a-form-item field="sex" :label="$t('profile.sex')">
        <a-select v-model="form.sex" placeholder="" allow-clear>
          <a-option>Beijing</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="birth_time" :label="$t('profile.birthday')">
        <!-- <a-date-picker
          v-model="form.birth_time"
          style="width: 100%"
          value-format="timestamp"
          format="YYYY-MM-DD"
          :placeholder="$t('profile.birth_empty')"
        /> -->
        <div
          class="input-group log-event"
          data-td-target-input="nearest"
          data-td-target-toggle="nearest"
        >
          <a-input
            v-model="form.birthday"
            allow-clear
            id="datetimepicker"
            data-td-target="#datetimepicker"
            data-td-toggle="datetimepicker"
          ></a-input>
      </div>
      </a-form-item>
      <a-form-item>
        <a-row justify="space-between" style="width: 100%" align="center">
          <a-col flex="auto">
            <div class="tip">
              <a-space>
                <span>{{ $t("profile.preference_title") }}</span>
                <span>内容</span>
              </a-space>
            </div>
          </a-col>
          <a-col flex="90px">
            <a-button type="primary" @click="editPreference">{{
              $t("profile.edit_preference")
            }}</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <div class="save-btn">
        <a-button size="large" type="primary" :loading="btnLoading" @click="handleSave">{{
          $t("profile.save")
        }}</a-button>
      </div>
    </a-form>

    <a-skeleton :loading="pageLoading">
      <a-space direction="vertical" :style="{ width: '100%' }" size="large">
        <a-skeleton-line :rows="18" />
      </a-space>
    </a-skeleton>

    <ChoosePreference
      ref="choosePreference"
      @confirmPreference="confirmPreference"
    ></ChoosePreference>

    <BindEmail ref="bindEmail"></BindEmail>
  </div>
</template>

<script setup>
import { uploadUrl, baseImgPrefix } from "~/config/baseUrl";
import { TempusDominus } from "@eonasdan/tempus-dominus";

const choosePreference = ref(null);
const bindEmail = ref(null);
const pageLoading = ref(false);
const form = reactive({
  nickname: null,
  avatar: null,
  birth_time: new Date(),
});
const btnLoading = ref(false);
// 上传成功
const uploadSuccess = (e) => {
  form.avatar = baseImgPrefix + "/" + e.response.data;
};
// 保存
const handleSave = () => {};
// 绑定
const handleBind = () => {
    bindEmail.value.openDialog()
};
// 更改偏好
const editPreference = () => {
  choosePreference.value.openDialog();
};
function confirmPreference() {}
onMounted(() => {
  new TempusDominus(document.getElementById("datetimepicker"), {
    //put your config here
  });
});
</script>

<style lang="scss" scoped>
@import "assets/sass/var";

.profile-box {
  border: 1px solid $grey-font-label;
  padding: 10px 30px 40px;
  border-radius: 10px;
  .tip {
    color: $grey-font-label;
  }
  h1 {
    font-size: 30px;
  }
  h4.title {
    font-size: 20px;
    font-weight: 400;
    margin: 25px 0 10px;
  }
  h4.mb20 {
    margin-bottom: 20px;
  }
  .upload-box {
    display: flex;
    align-items: flex-end;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid #aaaaaa;
      flex-shrink: 0;
      object-fit: cover;
    }
    .upload-btn {
      margin-left: 30px;
      .arco-btn {
        border-color: $grey-font-label;
        color: $main-grey;
      }
    }
  }
  :deep(.arco-form-item-label-col) {
    line-height: 10px;
  }
  .input-group{
    width: 100%;
  }
  .input-box {
    background-color: #fff;
    border: 1px solid #e5e5e5;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 2px;
    width: 100%;
  }
  :deep(.arco-input-wrapper) {
    @extend .input-box;
  }
  :deep(.arco-textarea-wrapper) {
    @extend .input-box;
  }
  :deep(.arco-picker) {
    @extend .input-box;
  }
  :deep(.arco-select) {
    @extend .input-box;
  }
  :deep(.arco-form-item-label-col > .arco-form-item-label) {
    color: $grey-font-label;
  }
  :deep(.arco-btn-primary) {
    background-color: $main-grey;
  }
}

.save-btn {
  text-align: right;
  margin-top: 20px;
}
</style>

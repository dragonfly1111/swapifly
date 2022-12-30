<template>
  <div class="profile-box">
    <div class="header">
      <h1>{{ $t("profile.edit_profile") }}</h1>
    </div>
    <a-skeleton :loading="pageLoading" :animation="true">
      <h4 class="title">{{ $t("profile.user_head_portrait") }}</h4>
      <div style="margin-top: 22px; display: flex; align-items: flex-end">
        <a-skeleton-shape shape="circle" size="large" style="flex-shrink: 0;" />
        <div style="width: 28px"></div>
        <a-skeleton-line :rows="1" :line-height="50" :widths="[200]" />
      </div>
      <h4 class="title">{{ $t("profile.open_user_profile") }}</h4>
      <a-space direction="vertical" :style="{ width: '100%' }" size="large">
        <a-skeleton-line :rows="2" :line-height="46" />
        <a-skeleton-line :rows="1" :line-height="164" />
        <a-skeleton-line :rows="5" :line-height="46" />
      </a-space>
    </a-skeleton>

    <template v-if="!pageLoading">
      <h4 class="title">{{ $t("profile.user_head_portrait") }}</h4>
      <div class="upload-box">
        <a-image
          class="avatar"
          width="118"
          height="118"
          :src="baseImgPrefix + form.avatar"
          show-loader
        >
          <template #loader>
            <div class="loader-animate" />
          </template>
        </a-image>
        <div class="upload-btn">
          <p class="tip">{{ $t("profile.user_head_portrait_tip") }}</p>
          <a-upload
            :action="uploadUrl"
            :show-file-list="false"
            :on-before-upload="beforeUpload"
            :on-button-click="uploadClick"
            @success="uploadSuccess"
            @error="uploadError"
            accept="image/*,.png"
            :headers="headers"
          >
            <template #upload-button>
              <a-button type="outline" :loading="uploadLoading">{{
                $t("profile.user_head_upload")
              }}</a-button>
            </template>
          </a-upload>
        </div>
      </div>
      <h4 class="title">{{ $t("profile.open_user_profile") }}</h4>
      <a-form ref="formRef" :model="form" layout="vertical" size="large" :rules="rules">
        <a-form-item field="id" label="">
          <a-input v-model="form.id" placeholder="" disabled />
        </a-form-item>
        <a-form-item field="nickname" :label="$t('profile.user_name')">
          <a-input
            v-model="form.nickname"
            :max-length="25"
            :show-word-limit="true"
            :placeholder="$t('profile.user_name_empty')"
          />
        </a-form-item>
        <a-form-item field="describe" :label="$t('profile.user_describe')">
          <a-textarea
            v-model="form.describe"
            :placeholder="$t('profile.user_describe_empty')"
            allow-clear
            :auto-size="{ minRows: 7, maxRows: 7 }"
            :max-length="255"
            :show-word-limit="true"
          />
        </a-form-item>
        <a-form-item field="region" :label="$t('profile.countries_regions')">
          <a-select
            v-model="form.region"
            :placeholder="$t('profile.countries_regions_empty')"
            allow-clear
          >
            <a-option
              v-for="item in regionOptions"
              :value="item.id"
              :key="item.id"
              :label="item.title"
            >
              {{ item.title }}
            </a-option>
          </a-select>

          <!--        <a-input v-model="form.region" :placeholder="" />-->
        </a-form-item>
        <h4 class="title mb20">{{ $t("profile.personal_information") }}</h4>
        <a-form-item field="email" :label="$t('profile.email')" :content-flex="false">
          <a-input
            v-model="form.email"
            :placeholder="$t('profile.countries_email_empty')"
            disabled
          />
          <div v-if="!form.email" style="text-align: right">
            <a-button type="text" @click="handleBind">绑定</a-button>
          </div>
        </a-form-item>
        <a-form-item field="post" :label="$t('profile.phone')">
          <a-input v-model="form.phone" :placeholder="$t('profile.countries_phone_empty')" />
        </a-form-item>
        <a-form-item field="sex" :label="$t('profile.sex')">
          <a-select v-model="form.sex" :placeholder="$t('profile.countries_sex_empty')" allow-clear>
            <a-option
              v-for="item in sysData.gender"
              :value="item.value"
              :key="item.value"
              :label="item.key"
            >
              {{ item.key }}
            </a-option>
          </a-select>
        </a-form-item>

        <a-form-item field="age" :label="$t('profile.age')">
          <a-input-number v-model="form.age"  :precision="0" :min="0" :max="150"/>
        </a-form-item>

        <!-- <a-form-item field="birth_time" :label="$t('profile.birthday')"> -->
          <!-- <a-date-picker
            v-model="form.birth_time"
            style="width: 100%"
            value-format="timestamp"
            format="YYYY-MM-DD"
            :placeholder="$t('profile.birth_empty')"
          /> -->
          <!-- <el-date-picker
        v-model="form.birth_time"
        type="date"
        :placeholder="$t('profile.birth_empty')"
        size="default"
        format="YYYY-MM-DD"
      /> -->
          <!-- <va-date-input
            v-model="form.birth_time"
            :format="formatFn"
            :is-open="dateOpen"
            :close-on-anchor-click="true"
            @click:day="changeDay"
            @click="dateOpen = true"
            @blur="dateOpen = false"
            class="va-date"
          /> -->
          <!-- <TempusDatePicker
              v-model="form.birth_time"
              @change="form.birth_time = $event"
              ref="datePicker"
          ></TempusDatePicker> -->
        <!-- </a-form-item> -->
        <a-form-item>
          <div class="preference-row">
            <div class="tip">
                <span class="label-title">{{ $t("profile.preference_title") }}</span>
                <span class="label-content">{{ form.userlabel }}</span>
            </div>
            <div class="edit-but">
              <a-button type="primary" @click="editPreference">{{
                $t("profile.edit_preference")
              }}</a-button>
            </div>
          </div>
        </a-form-item>
        <div class="save-btn">
          <a-button size="large" type="primary" :loading="btnLoading" @click="handleSave">{{
            $t("profile.save")
          }}</a-button>
        </div>
      </a-form>
    </template>
    <ChoosePreference
      ref="choosePreference"
      @confirmPreference="confirmPreference"
    ></ChoosePreference>
    <BindEmail ref="bindEmail" @binSuc="binSuc"></BindEmail>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useUserInfo } from "~/stores/userInfo";
import { Message } from "@arco-design/web-vue";
import { useSysData } from "~/stores/sysData";
import { getUserInfo, updateUserInfo } from "~/api/user";
import { watch } from "vue";
import { parseTime } from "~/utils/time";

const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const baseImgPrefix = runtimeConfig.VITE_OSS_PREFIX;
const uploadUrl = runtimeConfig.VITE_UPLOAD;
const sysData = useSysData();
const { t } = useI18n();
const props = defineProps({
  ckeckedList: {
    type: Object,
    default: null,
  },
});
watch(
  () => props.ckeckedList,
  (newValue, oldValue) => {
    console.log("====Profile====", newValue);
    if (newValue && newValue !== "[]") {
      confirmPreference(newValue);
    }
  },
  { immediate: true }
);
let form = reactive({
  id: null,
  nickname: null,
  avatar: null,
  describe: null,
  region: null,
  email: null,
  phone: null,
  sex: null,
  // birth_time: null,
  userlabel: null,
  userLabel_id: null,
  age:null
});
let headers = reactive({
  "X-Utoken": null,
  "X-Userid": null,
});
const rules = reactive({
  nickname: [{ required: true, message: ref(t("profile.user_name_validate")) }],
});
const regionOptions = ref(null);
const choosePreference = ref(null);
const bindEmail = ref(null);
const datePicker = ref(null);
const dateOpen = ref(false);
const pageLoading = ref(true);
const btnLoading = ref(false);
const uploadLoading = ref(false);
const formRef = ref(null);
if (process.client) {
  const userInfo = useUserInfo();
  headers["X-Utoken"] = userInfo.token;
  headers["X-Userid"] = userInfo.id;
}

const beforeUpload = (e) => {
  uploadLoading.value = true;
  return true;
};
const uploadClick = () => {
  console.log("uploadClick");
  if (uploadLoading.value) return new Promise(() => {});
};
// 上传成功
const uploadSuccess = (e) => {
  form.avatar = e.response.data;
  uploadLoading.value = false;
};
const uploadError = (e) => {
  uploadLoading.value = false;
};
const formatFn = (date) => {
  return parseTime(date, "{y}-{m}-{d}");
};
const changeDay = (e) => {
  dateOpen.value = false;
};
// 保存
const handleSave = () => {
  formRef.value.validate().then((validate) => {
    if (validate) return;
    console.log(form);
    const data = JSON.parse(JSON.stringify(form));
    delete data.id;
    data.ularr = data.userLabel_id;
    // data.birth_time = +(new Date(data.birth_time).getTime() / 1000);
    console.log(data);
    btnLoading.value = true;
    for (const item in data) {
      if (data[item] === null) {
        data[item] = "";
      }
    }
    updateUserInfo(data)
      .then((res) => {
        if (res.code === 0) {
          Message.success(t("profile.editSuc"));
          const userInfo = useUserInfo();
          userInfo.refreshUserInfo(res.data);
        } else {
          Message.error(res.message);
        }
        btnLoading.value = false;
      })
      .catch(() => {
        btnLoading.value = false;
      });
  });
};
// 绑定
const handleBind = () => {
  bindEmail.value.openDialog(form.email);
};
// 更改偏好
const editPreference = () => {
  choosePreference.value.openDialog(form.userLabel_id);
};

const binSuc = (email) => {
  form.email = email;
};

const confirmPreference = (e) => {
  form.userlabel = e.map((item) => item.title).join(",");
  form.userLabel_id = e.map((item) => item.id).join(",");
  console.log(form.userLabel_id);
};
onMounted(() => {
  if (process.client) {
    getUserInfo().then((res) => {
      console.log(res);
      if (res.code === 0) {
        pageLoading.value = false;
        const data = res.data;
        // for (const label in form){
        //   form[label] = res.data[label]
        // }
        form.id = "ID: @" + data.realname;
        form.nickname = data.nickname;
        form.avatar = data.avatar;
        form.describe = data.describe;
        form.email = data.email;
        form.phone = data.phone;
        form.sex = data.sex;
        const arr = data.region.filter((item) => {
          return item.type === 1;
        });
        form.region = arr.length ? arr[0].id : "";
        // form.birth_time =  new Date(data.birth_time* 1000).toLocaleString();
        nextTick(() => {
          // console.log("datePicker.value");
          // console.log(datePicker.value);
          // datePicker.value && datePicker.value.initPicker(form.birth_time * 1000);
          // datePicker.value && datePicker.value.setInput(form.birth_time)
        });
        form.userlabel = data.userlabel;
        form.userLabel_id = data.userLabel_id;
        regionOptions.value = data.region;
      }
    });
  }
});
</script>

<style lang="scss" scoped>
@import "assets/sass/var";

.profile-box {
  border: 1px solid $grey-font-label;
  padding: 10px 30px 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 750px;
  min-height: 500px;
  margin: auto;
  .header {
    display: block;
  }
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
  .label-title{
    flex-shrink: 0;
  }
  .label-content {
    max-width: 84%;
  }
  .upload-box {
    display: flex;
    align-items: flex-end;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid $main-grey;
      flex-shrink: 0;
      overflow: hidden;
      object-fit: cover;
    }
    .upload-btn {
      margin-left: 30px;
      .tip {
        margin: 20px 0;
      }
      .arco-btn {
        border-color: $grey-font-label;
        color: $main-grey;
      }
    }
  }
  :deep(.arco-form-item-label-col) {
    line-height: 10px;
  }
  .input-group {
    width: 100%;
  }
  .input-box {
    background-color: $main-white;
    border: 1px solid $main-grey-border;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 2px;
    width: 100%;
  }
  .preference-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tip{
      display: flex;
      width: 80%;
    }
  }
  :deep(.arco-input-wrapper) {
    @extend .input-box;
  }
  :deep(.arco-input-disabled) {
    background-color: var(--color-fill-2);
    border: 1px solid transparent;
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
  :deep(.arco-skeleton-shape) {
    width: 118px;
    height: 118px;
  }
  :deep(.el-date-editor){
    width: 100%;
    height: 40px;
    .el-input__wrapper{
      border-radius: 2px;
    }
   
  }
  .va-date {
    width: 100%;
    @extend .input-box;
    :deep(.va-input-wrapper__field:after) {
      background-color: #fff;
    }
    :deep(.va-dropdown__content){
      box-shadow: 0 2px 10px 5px #e6e6e652;
    }
    :deep(.material-icons) {
      color: $main-grey !important;
    }
    :deep(.va-input-wrapper--solid .va-input-wrapper__field){
      border: 0;
    }
    :deep(.va-date-picker-cell_today){
      color: $main-grey ;
    }
    :deep(.va-date-picker-cell_selected){
      background-color: $main-grey;
      color: #fff;
    }
    :deep(.va-date-picker-cell_today:before){
      border-color: $main-grey;
    }

  }
}

.save-btn {
  text-align: right;
  margin-top: 20px;
}
</style>

<style lang="scss">
@import "assets/sass/var.scss";

.el-date-table td.current:not(.disabled) .el-date-table-cell__text{
  background: $main-grey;
}
.el-date-table td.today .el-date-table-cell__text{
  color:  $main-grey;
}
</style>

<style lang="scss" scoped>
@import "assets/sass/var.scss";

@media screen and (max-width: 1000px) {
  .profile-box {
    width: 100%;
    border: unset;
    padding: 0;
    .header {
      display: none;
    }
    h4.title {
      margin-top: 12px;
      margin-bottom: 12px;
    }
    .preference-row {
      display: block;
      .tip{
        width: 100%;
        display: block;
      }
      :deep(.arco-space) {
        align-items: unset;
      }
      :deep(.arco-space-item) {
        align-items: unset;
      }
      .label-title {
        flex-shrink: 0;
      }
      .label-content {
        width: 100%;
        max-width: 100%;
        margin-left: 12px;
        overflow: unset;
        text-overflow: unset;
        white-space: unset;
      }
      .edit-but {
        margin-top: 8px;
        text-align: right;
      }
    }
  }

  .save-btn {
    margin-top: 0;
    .arco-btn {
      width: 100%;
    }
  }
}
</style>

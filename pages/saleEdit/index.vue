<template>
  <div class="global-content">
    <div class="sale-header">{{ $t("sale.saleTitle") }}</div>
    <div class="edit-box border-box">
      <a-spin :loading="uploadLoading" style="width: 100%">
        <div>
          <a-upload
              draggable
              multiple
              :show-file-list="false"
              :fileList="fileList"
              :action="uploadUrl"
              :headers="headers"
              ref="uploadRef"
              :limit="10"
              :on-before-upload="beforeUpload"
              :on-button-click="uploadClick"
              @success="uploadSuccess"
              @error="uploadError"
              @change="uploadChange"
              @exceed-limit="overLimit"
              accept="image/*,.png"
          >
            <template #upload-button>
              <div class="upload-area">
                <icon-plus :strokeWidth="10" :size="18" />
                <div>{{ $t("sale.uploadTip") }}</div>
                <span>{{ $t("sale.uploadAlert") }}</span>
              </div>
            </template>
          </a-upload>
        </div>
      </a-spin>
      <div class="draft-title" v-if="draftList.length > 0">{{ $t("sale.yourDraft") }}</div>
      <div class="image-preview-list">
        <div class="image-item" v-for="(item, index) in draftList" @click="toEdit(item)">
          <a-image :src="baseImgPrefix + item.images" :preview="false" > </a-image>
          <span class="draft">{{ $t("sale.draft") }}</span>
          <div class="image-info">
            <span class="goods-name">{{ item.title }}</span>
            <icon-close
              @click.stop="handleDelDraft(item)"
              class="icon-close"
              :title="$t('sale.delete')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { Message, Modal } from "@arco-design/web-vue";
import { useUserInfo } from "~/stores/userInfo";
import { useResize } from '~/stores/resize'
import { delProductDraft, getProductDraftlist } from "~/api/goods";
const resize = useResize();
const { t } = useI18n();
const appConfig = useAppConfig();
const baseImgPrefix = appConfig.baseImgPrefix;
const uploadUrl = appConfig.uploadUrl
const router = useRouter();
const uploadLoading = ref(false);
const pageLoading = ref(true);
const realFileList = ref([]);
const fileList = ref([]);
const userInfo = useUserInfo();
let headers = reactive({
  "X-Utoken": null,
  "X-Userid": null,
});
// if (process.client) {
//   console.log('userInfo')
//   console.log(userInfo.token)
//
// }
const draftList = ref([]);

const handleQuery = () => {
  getProductDraftlist()
    .then((res) => {
      draftList.value = res.data;
    })
    .finally(() => {
      pageLoading.value = false;
    });
};

// 删除
const handleDelDraft = (item) => {
  Modal.info({
    titleAlign: "start",
    content: t("sale.deleteDraftComfirm"),
    closable: true,
    width:resize.screenType === 'MOBILE' ? '80%' : '-',
    hideCancel: false,
    cancelText: t("pages.cancel"),
    okText: t("sale.delete"),
    onBeforeOk: (done) => {
      done(true);
      delProductDraft({id:item.id}).then((res) => {
        if (res.code === 0) {
          Message.success(res.message);
          handleQuery()
        } else {
          Message.error(res.message);
        }
      });
    },
  });
};
// 编辑
const toEdit = (item) => {
  router.push("/saleEditGoods?draftId=" + item.id);
};

const beforeUpload = (e) => {
  // 放到上传之前去设置header 防止页面刷新时pina未初始化获取不到token
  headers["X-Utoken"] = userInfo.token;
  headers["X-Userid"] = userInfo.id;
  uploadLoading.value = true;
  return true;
};
const uploadClick = () => {
  if (uploadLoading.value) return new Promise(() => {});
};
// 上传成功
const uploadSuccess = (e) => {
  console.log(e)
  if(e.response.code === 999){
    uploadLoading.value = false;
    // 登录过期 跳转首页
    const router = useRouter();
    const openLogin = useState<Boolean>('openLogin')
    userInfo.logout();
    if (resize.screenType !== 'MOBILE'){
      userInfo.openDialog();
      openLogin.value = true;
      console.log(openLogin);
    }
    router.push({
      path: '/'
    })
  }
  if (e.response.code == 0) {
    realFileList.value.push(e.response.data);
  }
  if (realFileList.value.length == fileList.value.length) {
    setUserDraft().value = realFileList.value;
    router.push({ name: "saleEditGoods", query: { type: "draft" } });
    fileList.value = []
  }
};

const uploadError = (e) => {
  console.log(e)
  uploadLoading.value = false;
};
const uploadChange = (_, currentFile) => {
  fileList.value = _;
};

const overLimit = (e) =>{
  Message.warning(t('sale.overLimit'))
}

onMounted(async () => {
  handleQuery();
});
</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";
.common-row {
  padding-left: 0;
  padding-right: 0;
}
.sale-header {
  font-size: 24px;
  padding: 15px 10%;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
}

.edit-box {
  margin: 20px 10%;
  .upload-area {
    width: 100%;
    background-color: #f2f3f5;
    height: 380px;
    text-align: center;
    padding-top: 125px;
    box-sizing: border-box;
    div {
      margin: 20px 0 15px;
      font-size: 16px;
    }
    span {
      color: #86909c;
    }
  }
  .draft-title {
    margin: 65px auto 32px;
    font-size: 24px;
  }

  .image-preview-list {
    display: flex;
    flex-wrap: wrap;
    .image-item {
      width: 200px;
      height: 200px;
      margin-right: 20px;
      margin-bottom: 50px;
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      .image-info {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        .goods-name {
          width: 80%;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //用省略号显示
          white-space: nowrap; //不换行
        }
        .icon-close {
          font-size: 16px;
          color: #4e5969;
          flex-shrink: 0;
        }
      }
      .draft {
        position: absolute;
        bottom: 0px;
        left: 0;
        background: linear-gradient(180deg, #00000000 0%, #00000039 100%);
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #fff;
        padding-left: 10px;
        box-sizing: border-box;
        font-size: 12px;
      }
      .arco-image {
        width: 100%;
        height: 100%;
      }
      :deep(.arco-image-img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>

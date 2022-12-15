<template>
  <a-modal v-model:visible="visible" :title="$t('pages.shareTo')"
           title-align="start"
           modal-class="share-dialog"
           :footer="false">
    <div class="login-type-wrap">
      <img @click="handleShare(1)" src="@/assets/images/icon/icon_facebook.png" alt="">
      <!--      <img @click="handleShare(2)" src="@/assets/images/icon/icon_ins.png" alt="">-->
      <img @click="handleShare(3)" src="@/assets/images/icon/icon_gmail.png" alt="">
    </div>
    <a-input class="input-warp" disabled v-model="urlLink">
      <template #append>
        <img id="copyBtn" @click="doCopy" src="@/assets/images/icon/icon-copy.png" alt="">
      </template>
    </a-input>
    <!--    <div id="target" v-show="false">{{urlLink}}</div>-->
  </a-modal>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {Message} from "@arco-design/web-vue";
import Clipboard from "clipboard";

const {t} = useI18n();
let clipboard = null;
const visible = ref(false);
const route = useRoute();
const urlLink = ref('');
const productDetail = ref(null);
const handleShare = (e) => {
  const appConfig = useAppConfig()
  const url = appConfig.domain + route.fullPath.replace('#reloaded', '')
  switch (e) {
    case 1:
      FB.ui({
        method: 'stream.share',
        u: url
      }, function (response) {
        //分享回调
        console.log(response)
      })
      break
    case 2:
      break
    case 3:
      const ele = document.createElement("a"); //创建a标签
      ele.href = `mailto:?to=&subject=${productDetail.value.title}&body=${url}`;
      ele.target = "_blank";
      ele.click();
      break
  }
};

const handleCancel = () => {
};

const doCopy = () => {
  Message.success(t('pages.copySuc'))
};

const openDialog = (e) => {
  productDetail.value = e
  visible.value = true;
}

onMounted(() => {
  urlLink.value = window.location.href.replace('#reloaded', '')
  clipboard = new Clipboard("#copyBtn", {
    text(elem) {
      return urlLink.value
    }
  });
})

defineExpose({
  openDialog,
  handleCancel
})

</script>

<style lang="scss">
@import "assets/sass/var";

.login-type-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;

  img {
    width: 50px;
    height: 50px;
    -webkit-user-drag: none;
    cursor: pointer;
  }

  img + img {
    margin-left: 27px;
  }
}

.share-dialog {
  .input-warp {
    //margin-top: 50px;
    //margin-bottom: 80px;
    margin: 50px 20px 80px 20px;
    width: 450px;

    .arco-input {
      height: 37px;
    }

    .arco-input-append {
      color: #FFFFFF;
      background: $main-pink;
      user-select: none;
      cursor: pointer;
      width: 46px;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 30px;
        height: 30px;
      }
    }

  }
}

@media screen and (max-width: 1000px) {
  .share-dialog {
    width: 80%;

    .input-warp {
      width: calc(100% - 40px);
    }
  }
}
</style>

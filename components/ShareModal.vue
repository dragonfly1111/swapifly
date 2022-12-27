<template>
  <a-modal v-model:visible="visible" :title="$t('pages.shareTo')"
           title-align="start"
           modal-class="share-dialog"
           :footer="false">
    <div class="login-type-wrap">
      <div class="fb-share-button"
           :data-href="runtimeConfig.VITE_DOMAIN + runtimeConfig.VITE_PUBLIC_URL + 'goodsDetails?id=' + $route.query.id"
           data-layout="button_count"
           data-size="small">
        <a target="_blank"
            :href="'https://www.facebook.com/sharer/sharer.php?u=' + runtimeConfig.VITE_DOMAIN + runtimeConfig.VITE_PUBLIC_URL + 'goodsDetails?id=' + $route.query.id + '&amp;src=sdkpreparse'"
            class="fb-xfbml-parse-ignore">
          <img src="@/assets/images/icon/icon_facebook.png" alt="">
        </a>
      </div>
      <img @click="handleShare(2)" src="@/assets/images/icon/icon-messenger.png" alt="">
      <img @click="handleShare(3)" src="@/assets/images/icon/icon-whatsapp.png" alt="">
      <img @click="handleShare(4)" src="@/assets/images/icon/icon-twitter.png" alt="">
      <img @click="handleShare(5)" src="@/assets/images/icon/icon_gmail.png" alt="">
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
const runtimeConfig = useRuntimeConfig()
const handleShare = (e) => {
  const url = runtimeConfig.VITE_DOMAIN + '/swapifly' + route.fullPath.replace('#reloaded', '')
  switch (e) {
    case 1:
      // FB.ui({
      //   method: 'share',
      //   href: url,
      //   quote: productDetail.value.title
      // }, function (response) {
      //   //分享回调
      //   console.log(response)
      // })
      break
    case 2:
      window.open(`https://www.facebook.com/dialog/send?app_id=${runtimeConfig.VITE_FB_KEY}&link=${encodeURIComponent(url)}&redirect_uri=${encodeURIComponent(url)}`)
      break
    case 3:
      let _href = "https://api.whatsapp.com/send?";
      const text = productDetail.value.title
      const link = url // 分享的页面
      _href += "&text=" + text;//标题
      _href += "&url=" + encodeURIComponent(link);//链接
      window.open(_href)
      break
    case 4:
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`)
      break
    case 5:
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
  a{
    display: block;
    height: 50px;
    width: 50px;
    margin-right: 27px;
  }
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
      color: $main-white;
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

.fb-share-button {
}

@media screen and (max-width: 1000px) {
  .share-dialog {
    top: 0;
    border-radius: 0;
    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    pointer-events: auto;

    .login-type-wrap {
      margin-top: 30vh;
    }

    .input-warp {
      width: calc(100% - 40px);
    }
  }
}
</style>

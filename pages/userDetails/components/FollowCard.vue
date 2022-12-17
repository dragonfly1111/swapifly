<!---->
<template>
  <div class="follow-list-item">
    <div @click.stop="router.push('/userDetails?userId=' + item.uid)">
      <img :src="baseImgPrefix + item.avatar" alt="" />
      <div class="fs12">{{ item.nickname }}</div>
      <div class="fs10">@{{ item.realname }}</div>
      <div class="fs10">{{ item.b_follow }} Followers</div>
    </div>
    <div>
      <a-button
        type="outline"
        class="black-outline-btn"
        v-if="item.type == 0"
        :loading="btnLoading"
        @click.stop="handleFollow(item, index)"
        >{{ $t("pages.follow") }}</a-button
      >
      <a-button
        class="black-btn"
        :loading="btnLoading"
        v-if="item.type == 1"
        @click="handleFollow(item, index)"
        >{{ $t("pages.followIn") }}</a-button
      >
    </div>
  </div>
</template>
<script setup>

import {  followUser } from "~/api/shop";
import { useI18n } from "vue-i18n";
import { Message } from "@arco-design/web-vue";
const { t } = useI18n();
const router = useRouter();
const appConfig = useAppConfig();
const baseImgPrefix = appConfig.baseImgPrefix;
const btnLoading = ref(false);
const emits = defineEmits(["change"]);
const props = defineProps({
  item: {
    default: () => {},
  },
});


// 关注/取消关注
const handleFollow = (row, index) => {
  let reqData = {
    id: row.uid,
    state: row.type == 1 ? 2 : 1,
  };
  btnLoading.value = true;
  followUser(reqData)
    .then((res) => {
      if (res.code == 0) {
        let { b_follow } = props.item;
        props.item.b_follow = row.type == 1 ? b_follow - 1 : b_follow + 1;
        props.item.type = row.type == 1 ? 0 : 1;
        Message.success(res.message);
        emits("change");
      } else {
        Message.error(res.message);
      }
    })
    .finally(() => {
      btnLoading.value = false;
    });
};
</script>
<style lang="scss" scoped>
@import "assets/sass/var.scss";

.follow-list-item {
  text-align: center;
  border: 1px solid $main-grey-border;
  padding: 15px 10px 10px;
  width: 150px;
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 20px;
  margin-right: 30px;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  div {
    width: 100%;
    margin-top: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
  .fs10 {
    font-size: 10px;
  }
  .fs12 {
    font-size: 12px;
    word-break: break-all;
  }
  :deep(.arco-btn) {
    width: 90%;
    margin: 10px auto;
    height: 34px;
    max-width: 118px;
  }
}
@media screen and (min-width: 0px) and (max-width: 1000px) {
}
</style>

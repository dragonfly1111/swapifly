<template>
  <a-modal v-model:visible="visible" :title="$t('dialogue.markSold')" :ok-text="$t('dialogue.markSold')"
           :cancel-text="$t('dialogue.cancel')" title-align="start"
           modal-class="sold-dialog"
           :render-to-body="false"
           :on-before-ok="onBeforeOk"
           :ok-loading="okLoading"
           @ok="handleOk"
           @cancel="handleCancel">
    <div class="tip">{{ $t('dialogue.markSoldTip') }}</div>
    <div class="tip">{{ $t('dialogue.markSoldTip1') }}</div>
  </a-modal>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { setSoldOut } from "~/api/dialogue";
import { Message } from '@arco-design/web-vue';

const {t} = useI18n();
const emits = defineEmits(['markSuc'])
const visible = ref(false);
const okLoading = ref(false);
const handleId = ref(null);


const onBeforeOk = (done: any) => {
  setSoldOut({
    id: handleId.value
  }).then(res=>{
    if(res.code === 0){
      Message.success(t('dialogue.markSoldSuc'))
      done(true)
    } else {
      Message.error(res.message)
      done(false)
    }
  })
}
const handleOk = () => {
  emits('markSuc', true)
}
const openDialog = (id: any) => {
  handleId.value = id
  visible.value = true;
}
const handleCancel = () => {
  visible.value = false;
}
defineExpose({
  openDialog,
  handleCancel
})

</script>

<style lang="scss">
@import "assets/sass/var";

.sold-dialog {
  .arco-modal-body {
    padding: 20px 30px;
  }

  .arco-modal-footer {
    .arco-btn {
      height: 32px;
    }
  }

  .tip {
    color: $grey-font-label;
    text-align: center;
    font-size: 18px;
  }
}

@media screen and (max-width: 1000px) {
  .sold-dialog{
    width: 80%;
  }
}
</style>

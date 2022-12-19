<template>
  <a-modal v-model:visible="visible" :title="$t('dialogue.evaluateDetail')" title-align="start"
           modal-class="eva-detail-dialog"
           :footer="false"
           :render-to-body="false"
           @cancel="handleCancel">
    <template v-if="dataLoading">
      <a-skeleton :animation="true" class="skeleton">
        <div style="height: 10px;"></div>
        <a-skeleton-line :line-height="30" :rows="3" :line-spacing="10"/>
        <div style="height: 10px;"></div>
      </a-skeleton>
    </template>
    <template v-else>
      <div v-if="evaDetail">
        <div class="eva-wrap"><span>{{ $t('dialogue.rate') }}</span><Rate ref="rateComp" id-val="detail" :check-able="false"></Rate></div>
        <div class="eva-wrap eva-wrap1"><span>{{ $t('dialogue.evaluateContenTip') }}</span></div>
        <div class="eva-wrap eva-wrap2">{{ evaDetail.content || $t('dialogue.noEvaluateContenTip') }}</div>
      </div>
      <div v-else>
        <div class="tip">{{ $t('dialogue.noEvaluateContenTip') }}</div>
        <div class="tip">{{ $t('dialogue.evaluateDetailTip') }}</div>
        <div class="tip">{{ $t('dialogue.evaluateDetailTip1') }}</div>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { viewEvaluation } from "~/api/dialogue";
import { Message } from '@arco-design/web-vue';
const { t } = useI18n();
const visible = ref(false);
const rateComp = ref(null);
const dataLoading = ref(true)
const evaDetail = ref({})
const openDialog = (value) => {
  viewEvaluation({
    id: value
  }).then(res=>{
    if(res.code === 0){
      dataLoading.value = false
      if(res.data){
        evaDetail.value = res.data
        nextTick(()=>{
          rateComp.value.setValue(res.data.num)
        })
      } else {
        evaDetail.value = null
      }
    } else {
      Message.error(res.message)
    }
  })
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
.eva-detail-dialog{
  .arco-modal-body{
    padding: 20px 30px;
  }
  .eva-wrap{
    color: $main-grey;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .eva-wrap1{
    margin-top: 19px;
  }
  .eva-wrap2{
    margin-top: 8px;
  }
  .tip{
    color: $grey-font-label;
    font-size: 14px;
    text-align: center;
  }
}

@media screen and (max-width: 1000px) {
  .eva-detail-dialog{
    width: 80%;
  }
}
</style>

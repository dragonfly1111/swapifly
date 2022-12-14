<template>
  <a-modal
    v-model:visible="visible"
    title-align="start"
    modal-class="show-dialog"
    :footer="false"
    @close="handleCancel"
    :title="$t('pages.oldAndNew')"
    :width="350"
  >
    <a-typography :style="{ marginTop: '-30px' }">
      <div v-for="item in sysData.goodsOan" :key="item.id">
        <a-typography-title :heading="5">
          {{ item.title }}
        </a-typography-title>
        <a-typography-paragraph>
          {{ item.advice }}
        </a-typography-paragraph>
      </div>
    </a-typography>
  </a-modal>
</template>
<script setup>
import { useSysData } from "~/stores/sysData";
import { useI18n } from "vue-i18n";
const sysData = useSysData();
const { t } = useI18n();
const visible = ref(false);
const handleCancel = () => {
  visible.value = false;
};

const openDialog = ()=>{
  visible.value = true;
}

defineExpose({
  openDialog,
})
</script>
<style lang="scss" scoped></style>

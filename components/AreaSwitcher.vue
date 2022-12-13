<script lang="ts" setup>
import { availableArea } from '~/utils/area'
const appConfig = useAppConfig();
const baseImgPrefix = appConfig.baseImgPrefix;
const areaSetting = useState<string>('area.setting')
</script>

<template>
  <div class="flex items-center">
    <a-select v-model="areaSetting"
              :bordered="false"
              :style="{width:'60px', height: '35px'}" placeholder="Please select ...">
      <template #label="{ data }">
        <img class="select-value" :src="baseImgPrefix + data.label" alt="">
      </template>
      <a-option
          v-for="area in availableArea"
          :key="area.title"
          :value="area.id"
          :label="area.img_url"
      >
        <img class="select-option" :src="baseImgPrefix + area.img_url" alt="">
      </a-option>
    </a-select>
  </div>
</template>
<style scoped lang="scss">
:deep(.arco-select-view-single){
  padding: 0;
}
:deep(.arco-select-view-suffix){
  padding-left: 14px;
}
:deep(.arco-select-view-icon){
  width: 4px;
  height: 7px;
}
:deep(.arco-scrollbar){
  width: 70px;
}
.select-value{
  width: 35px;
  height: 35px;
}
.select-option{
  width: 35px;
  height: 35px;
}
</style>

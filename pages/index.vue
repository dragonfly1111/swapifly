<template>
  <div class="global-content">
    <a-space direction="vertical" size="large">
      <a-select :style="{width:'320px'}" placeholder="Please select ...">
        <a-option>Beijing</a-option>
        <a-option>Shanghai</a-option>
        <a-option>Guangzhou</a-option>
        <a-option disabled>Disabled</a-option>
      </a-select>
      <a-select defaultValue="Beijing" :style="{width:'320px'}" placeholder="Please select ..." disabled>
        <a-option>Beijing</a-option>
        <a-option>Shanghai</a-option>
        <a-option>Guangzhou</a-option>
        <a-option disabled>Disabled</a-option>
      </a-select>
      <a-select v-model="value" :style="{width:'320px'}" placeholder="Please select ...">
        <a-option v-for="item of data" :value="item" :label="item.label" />
      </a-select>
      <div>Select Value: {{ value }}</div>
      <a-select :style="{width:'160px'}" placeholder="Select" :trigger-props="{ autoFitPopupMinWidth: true }">
        <a-option>Beijing-Beijing-Beijing</a-option>
        <a-option>Shanghai</a-option>
        <a-option>Guangzhou</a-option>
        <a-option disabled>Disabled</a-option>
      </a-select>
    </a-space>
    <a-space direction="vertical" :style="{ width: '100%' }">
      <a-upload
          action="/"
          :fileList="file ? [file] : []"
          :show-file-list="false"
          @change="onChange"
          @progress="onProgress"
      >
        <template #upload-button>
          <div
              :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`"
          >
            <div
                class="arco-upload-list-picture custom-upload-avatar"
                v-if="file && file.url"
            >
              <img :src="file.url" />
              <div class="arco-upload-list-picture-mask">
                <IconEdit />
              </div>
              <a-progress
                  v-if="file.status === 'uploading' && file.percent < 100"
                  :percent="file.percent"
                  type="circle"
                  size="mini"
                  :style="{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }"
              />
            </div>
            <div class="arco-upload-picture-card" v-else>
              <div class="arco-upload-picture-card-text">
                <IconPlus />
                <div style="margin-top: 10px; font-weight: 600">Upload</div>
              </div>
            </div>
          </div>
        </template>
      </a-upload>
    </a-space>


    <div style="margin-top: 50px">{{ $t('pages.wdnmd') }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import IconEdit from '@arco-design/web-vue/es/icon/icon-edit';
import IconPlus from '@arco-design/web-vue/es/icon/icon-plus';
export default {
  components: {IconPlus, IconEdit},

  setup() {
    const file = ref();

    const onChange = (_, currentFile) => {
      file.value = {
        ...currentFile,
        // url: URL.createObjectURL(currentFile.file),
      };
    };
    const onProgress = (currentFile) => {
      file.value = currentFile;
    };

    const value = ref();
    const data = [{
      value: 'beijing',
      label: 'Beijing',
      other: 'extra'
    }, {
      value: 'shanghai',
      label: 'Shanghai',
      other: 'extra'
    }, {
      value: 'guangzhou',
      label: 'Guangzhou',
      other: 'extra'
    }, {
      value: 'chengdu',
      label: 'Chengdu',
      other: 'extra'
    }]

    return {
      value,
      data,
      file,
      onChange,
      onProgress
    }
  },
}
</script>

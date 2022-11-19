<script lang="ts" setup>
import {availableLocales} from '~/utils/lang'

// state
const localeSetting = useState<string>('locale.setting')
</script>

<template>
  <div class="flex items-center">
    <a-select v-model="localeSetting"
              :style="{width:'127px', height: '32px'}" placeholder="Please select ...">
      <a-option
          v-for="lang in availableLocales"
          :key="lang.name"
          :value="lang.name"
      >{{ lang.title }}
      </a-option>
    </a-select>
  </div>
</template>

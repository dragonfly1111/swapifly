<template>
  <div>
    <Profile :ckeckedList="data"/>
  </div>
</template>

<script setup lang="ts">
import Profile from "../userProfile/components/Profile";
import {ref, watch} from "vue";
const router = useRouter()
const route = useRoute()
const data = ref(null);
watch(() => route.query?.ckeckedList, (newValue, oldValue) => {
  console.log("====Profile====",newValue);
  if (newValue && newValue !== '[]'){
    data.value = JSON.parse(newValue);
  }
}, {immediate: true})
</script>

<style scoped>

</style>
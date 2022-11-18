<template>
  <main :style="'--scale:' + resize.scale + ';--pt:' + resize.contentPTStr">
<!--  <main :style="'zoom:' + resize.scale">-->
    <Header />
    <slot />
    <Footer />
  </main>
</template>
<script setup lang="ts">
import { useResize } from '~/stores/resize'
const resize = useResize()
</script>

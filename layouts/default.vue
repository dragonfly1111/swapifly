<template>
<!--  <main :style="'&#45;&#45;scale:' + resize.scale + ';&#45;&#45;pt:' + resize.contentPTStr">-->
  <main>
    <Header />
    <slot />
    <Footer />
  </main>
</template>
<script setup lang="ts">
import { useResize } from '~/stores/resize'
const resize = useResize()
</script>

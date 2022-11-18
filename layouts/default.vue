<template>
  <main :style="'transform: scale(' + resize.scale + ')'">
    <Header />
    <slot />
    <Footer />
  </main>
</template>
<script setup lang="ts">
import { useResize } from '~/stores/resize'
const resize = useResize()


// watch()
</script>

<template>
  <div :style="{ minHeight: `calc(100vh - ${headerHeight}px)` }">
    <slot></slot>
  </div>
</template>

<script setup>
const headerHeight = ref(0);
nextTick(() => {
  const header = document.querySelector('.van-nav-bar');
  headerHeight.value = header ? header.clientHeight+0.4 : 0;
});
</script>

<style scoped>
/* 根据需要添加样式 */
</style>

<script setup>
import Info from './components/info.vue'
import My from './components/my.vue'
</script>

<template>

  <div class="pt-[46px] relative">
    <div class="absolute top-0 left-0 w-full h-svh bg-[url(@/assets/image/community/image-bg-0.png)] bg-cover bg-no-repeat bg-center"></div>
    <Header ref="header"></Header>
    <section id="info">
      <Info/>
    </section>
    <section id="my">
      <My/>
    </section>
  </div>
</template>

<style scoped lang="less">
</style>

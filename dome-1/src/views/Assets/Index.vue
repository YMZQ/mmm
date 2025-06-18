<script setup>
import Health from './components/health.vue'
import Features from './components/features.vue'
import Records from './components/records.vue'
import WithdrawModal from './components/withdrawModal.vue'
</script>

<template>
  <div class="pt-[46px] relative">
    <div class="absolute top-0 left-0 w-full h-svh bg-[url(@/assets/image/assets/image-bg-0.png)] bg-cover bg-no-repeat bg-center"></div>
    <Header ref="header"></Header>
    <section id="health">
      <Health/>
    </section>
    <section id="features">
      <Features/>
    </section>
    <section id="records">
      <Records/>
    </section>
    <WithdrawModal/>
  </div>
</template>
<style scoped lang="less">
</style>

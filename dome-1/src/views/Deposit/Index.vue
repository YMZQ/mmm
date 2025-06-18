<script setup>
import ComputingPower from './components/computingPower.vue'
import Rules from './components/rules.vue'
import Records from './components/records.vue'
</script>

<template>
  <div class="">
    <Header ref="header"></Header>
    <section id="computingPower">
      <ComputingPower/>
    </section>
    <section id="rules">
      <Rules/>
    </section>
    <section id="records">
      <Records/>
    </section>
  </div>
</template>

<style scoped lang="less">
</style>

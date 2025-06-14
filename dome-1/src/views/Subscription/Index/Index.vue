<script setup>
import Subscribe from './components/subscribe.vue'
import MyMiner from './components/myMiner.vue'

</script>

<template>
  <HeaderBack ref="headerBackRef" :title="$t('subscription.title')" is-show to-url="earnings"/>
  <Subscribe/>
  <MyMiner/>
</template>

<style scoped lang="less">

</style>

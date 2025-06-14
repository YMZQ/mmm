<script setup>
const {molecular, denominator} = defineProps({
  molecular: [String, Number],
  denominator: [String, Number],
});

const percentage = computed(() => {
  const result = (Number(molecular) / Number(denominator)) * 100;
  return result.toFixed(2);
})

const pivotText = computed(() => `${percentage.value}%`);
</script>

<template>
  <van-progress color="linear-gradient(122deg,#0AFFEA 16.68%,#25AAFF 89.38%)" track-color="#2d343b" stroke-width="8" :pivot-text="pivotText" :percentage="percentage"/>
</template>

<style scoped lang="less">

</style>

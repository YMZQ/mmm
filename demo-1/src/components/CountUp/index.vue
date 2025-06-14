<script setup>
import CountUp from 'vue-countup-v3';

// const {number} = defineProps({
//   number: Number, String,
// });
const { number, decimalPlaces } = defineProps({
  number: {
    type: [Number, String],
    default: 0,
  },
  decimalPlaces: {
    type: Number,
    default: 2, // 默认小数点位数为 2
  }
});
const countUpOptions = ref({
  prefix: '',
  suffix: '',
  decimal: '.',
  separator: ',',
  duration: 1.5,
  decimalPlaces: decimalPlaces,
})
</script>

<template>
  <CountUp :startVal="0" :endVal="number" :options="countUpOptions"/>
</template>

<style scoped lang="less">
</style>

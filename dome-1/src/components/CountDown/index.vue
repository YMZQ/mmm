<script setup>
import {_getSystemTime} from "@/service/home";

const timestamp = ref(null);
const emits = defineEmits(['callback']);
const {endTime} = defineProps({
  endTime: String,
});

const fetchData = async () => {
  try {
    const [response1] = await Promise.all([_getSystemTime()]);
    updateTimestampsAndInfo(response1.nowTime || '');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const updateTimestampsAndInfo = (systemTime) => {
  if (!endTime) return;
  const currentTimestamp = new Date(systemTime).getTime();
  const endTimeStamp = new Date(endTime).getTime();
  if (endTimeStamp > currentTimestamp) {
    timestamp.value = (endTimeStamp - currentTimestamp);
  }
};

const onFinish = async () => {
  emits('callback');
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <van-count-down v-if="endTime&& timestamp" ref="countDown" :time="timestamp" format="HH:mm:ss" @finish="onFinish"></van-count-down>
  <slot v-else></slot>
</template>

<style scoped lang="less">
</style>

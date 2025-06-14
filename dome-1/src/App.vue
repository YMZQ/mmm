<template>
  <div class="max-w-[375px] mx-auto h-full">
    <router-view v-if="flag === true" v-slot="{ Component }">
      <component :is="Component"/>
    </router-view>
  </div>
</template>

<script setup>
import { appStore } from '@/stores/index'
import { storeToRefs } from 'pinia';

const store = appStore()
const { language } = storeToRefs(store);
const flag = ref(true);
const lang = computed(() => {
  return language.value;
})
watch(() => lang.value, () => {
  flag.value = false;
  nextTick(() => {
    flag.value = true;
  })
})
</script>

<style lang="less">
.van-button--default{
  border: none;
}
</style>

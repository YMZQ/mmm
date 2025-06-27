<script setup>
import {appStore} from "@/stores";
import {storeToRefs} from "pinia";

const store = appStore();
const {user, address, globalConfig} = storeToRefs(store);
const emit = defineEmits(['click-extract'])


const inputCurrency = computed(() => globalConfig.value?.rfx ?? '')
const swapUrl = computed(() =>
    `https://pancakeswap.finance/swap?inputCurrency=${inputCurrency.value}&outputCurrency=BNB`
)
</script>

<template>
  <div class="px-16 grid grid-cols-2 gap-x-[20px] text-12 font-600 mb-16">
    <div class="rounded-[8px] text-center py-8 bg-[#F57753]" @click="emit('click-extract')">{{$t('assets.features.extract')}}</div>
    <a :href="swapUrl" target="_blank" class="block rounded-[8px] text-center py-8 bg-[#F57753]">{{$t('assets.features.sell')}}</a>
  </div>
</template>

<style scoped lang="less">

</style>

<script setup>

const props = defineProps({
  assetRecords: {
    type: Array,
    default: () => []
  },
  address: {
    type: String
  },
})
const getImageUrl = (name) => {
  return new URL(`/src/assets/image/empty-img/${name}.png`, import.meta.url).href;
}
</script>

<template>
  <div class="text-14 pl-9 pr-15 pb-35">
    <div class="flex items-center justify-between mb-5">
      <div class="text-16 font-bold">{{ $t('assetRecord.text-0') }}</div>
      <router-link to="/assetsRecords" class="flex text-[#425F80]  items-center">
        <div>{{ $t('assetRecord.text-1') }}</div>
        <img class="w-[16px] h-[16px]" src="@/assets/image/icon/icon-right.png" alt="">
      </router-link>
    </div>
    <div v-for="item in assetRecords"
         class="ml-8 p-15 mb-15 relative rounded-md bg-[#F5FDFF] border border-solid border-[#000]">
      <img class="w-[15px] h-[20px] absolute -left-7 top-1/2 -translate-y-1/2" src="@/assets/image/home/image-13.png"
           alt="">
      <div class="flex items-center justify-between mb-5">
        <div>{{ $transactionFlows(item.type) }}</div>
        <div class="font-bold">{{ item.stype === 0 ? '-' : '+' }}{{ $filters.fixNumber(item.num) }} ELP</div>
      </div>
      <div class="text-right text-[#7B92AB]">{{ item.create_time }}</div>
    </div>
    <div v-if="assetRecords.length<=0">
      <van-empty :image="address?getImageUrl('img'):getImageUrl('img-1')" :description="$t('暂无数据')"/>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>

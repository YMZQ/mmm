<script setup>
import copyToClipboard from "@/utils/clipboard";

const props = defineProps({
  directList: {
    type: Array,
    default: () => []
  },
  shareLink: {
    type: String
  },
  address: {
    type: String
  },
  teamInfo: {
    type: Object,
    default: () => ({
      maxAmount: 0,
      minAmount: 0,
      thisAmount: 0,
      grade: 0
    })
  }
})

const getImageUrl = (name) => {
  return new URL(`/src/assets/image/empty-img/${name}.png`, import.meta.url).href;
}
</script>

<template>
  <div class="p-15">
    <div
        class="pl-15 pt-15 relative pr-10 mb-20 text-[#425F80] bg-[url(@/assets/image/home/image-bg-5.png)] h-[187px] bg-cover bg-no-repeat bg-center">
      <img class="absolute -top-35 right-[88px] w-[90px] h-[92px]" src="@/assets/image/home/image-12.png" alt="">
      <div class="flex items-center  text-14 mb-10">
        <p class="">{{ $t('feeding.team.text-0') }}:</p>
        <p class="text-[#1C3B5E] ml-2 underline decoration-solid">{{ teamInfo.grade === 0 ? $t('feeding.team.text-1') : 'V' + teamInfo.grade}}</p>
      </div>
      <div class="flex items-end  mb-10">
        <p class="text-12 leading-[22px]">{{ $t('feeding.team.text-9') }}(USDT):</p>
        <p class=" text-[#1C3B5E] text-18 font-700 ml-2">{{ $filters.fixNumber(teamInfo.thisAmount,2)}}</p>
      </div>
      <div class="flex justify-between  pb-10 border-solid border-b  border-[rgba(255,255,255,0.20)]">
        <div>
          <div class="text-[#1C3B5E] text-18 font-700 mb-5">{{ $filters.fixNumber(teamInfo.maxAmount,2)}}</div>
          <div class="text-12">{{ $t('feeding.team.text-2') }}(USDT)</div>
        </div>
        <div>
          <div class="text-[#1C3B5E] text-18 font-700 mb-5">{{ $filters.fixNumber(teamInfo.minAmount,2)}}</div>
          <div class="text-12">{{ $t('feeding.team.text-3') }}(USDT)</div>
        </div>
      </div>
      <div class="flex items-center pt-15">
        <p class="text-12 mr-5">{{ $t('feeding.team.text-4') }}:</p>
        <p v-if="shareLink" class="flex-1 text-[#1C3B5E] text-[12px] font-bold leading-[18px]">{{ $filters.prefix(shareLink, 12, 12) }} <img
            @click="copyToClipboard(shareLink)"  class="w-[18px] h-[18px] inline-block" src="@/assets/image/icon/copy.png" alt=""></p>
      </div>
    </div>
    <div class="text-16 font-bold mb-10">{{ $t('feeding.team.text-5') }}</div>
    <div class="bg-white rounded-md px-15 pb-40 border border-solid border-[#5BBBF6] shadow-[2px_2px_0px_0px_#5BBBF6] mb-25">
      <div v-for="item in directList"
           class="grid grid-cols-2 gap-y-[5px] pt-15 pb-7 border-b border-solid border-[#D6DFEA]">
        <div class="text-14 font-700 text-[#1C3B5E]">{{item.username}} <span class="text-12 text-[#FDA224] ml-2">{{ item.grade === 0 ? $t('feeding.team.text-1') : 'V' + item.grade}}</span></div>
        <div class="text-13 text-right">
          <span>{{ $t('feeding.team.text-8') }}：</span>
          <span class="ml-4">{{$filters.fixNumber(item.thisAmount,2)}}USDT</span>
        </div>
        <div class="text-13">
          <span>{{ $t('feeding.team.text-6') }}：</span>
          <span class="ml-4">{{$filters.fixNumber(item.minAmount,2)}}USDT</span>
        </div>
        <div class="text-13 text-right">
          <span>{{ $t('feeding.team.text-7') }}：</span>
          <span class="ml-4">{{$filters.fixNumber(item.maxAmount,2)}}USDT</span>
        </div>
      </div>
      <div v-if="directList.length===0">
        <van-empty :image="address?getImageUrl('img'):getImageUrl('img-1')" :description="$t('暂无数据')"/>
      </div>
    </div>

    <a  href="https://www.dextools.io/app/cn/bnb/pair-explorer/0xaaa8a72b73e306e0b2dc686fe4b5e20a855c7d3e?t=1749094049270" target="_blank">
      <img class="w-[137px] mx-auto " src="@/assets/image/home/image-16.png" alt="">
    </a>
  </div>
</template>

<style scoped lang="less">

.floating-image {
  animation: float 6s ease-in-out infinite;
}


@keyframes float {
  0% {
    transform: translateY(0) scale(0.9);
  }
  50% {
    transform: translateY(-10px) scale(1);
  }
  100% {
    transform: translateY(0) scale(0.9);
  }
}
</style>

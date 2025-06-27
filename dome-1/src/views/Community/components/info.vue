<script setup>
import copyToClipboard from "@/utils/clipboard";
import {storeToRefs} from "pinia";
import {appStore} from "@/stores";
const store = appStore();
const {user, address, globalConfig} = storeToRefs(store);

const props = defineProps({
  shareLink: {
    type: String
  },
  info: {
    type: Object,
    default: () => ({
      upBnbProfit: 0,
      downBnbProfit: 0,
      level: 0,
    })
  }
})
</script>

<template>
  <div class="px-16 pt-20 mb-30">
    <div class="p-20 rounded-sm bg-[rgba(255,255,255,0.05)] backdrop-blur-[40px] relative z-[2]">
      <div class="flex items-center justify-between mb-20">
        <div class="text-16 font-600">UID: {{user.uid}}</div>
        <div class="text-12 bg-[#161616] rounded-md py-7 px-30">{{$t('community.info.text-4',{number:info.level})}}</div>
      </div>
      <div class="grid grid-cols-2">
        <div>
          <div class="text-16 font-600 mb-4">{{ $filters.fixNumber(info.upBnbProfit,5) }}</div>
          <div class="text-12 text-[#CED0D8]">{{$t('community.info.text-0',{text:'BNB'})}}</div>
        </div>
        <div class="pr-20 text-right">
          <div class="text-16 font-600 mb-4">{{ $filters.fixNumber(info.downBnbProfit,5) }}</div>
          <div class="text-12 text-[#CED0D8]">{{$t('community.info.text-1',{text:'BNB'})}}</div>
        </div>
      </div>
    </div>
    <div class="pb-20 pt-30 px-14 bg-[#161616] rounded-sm -mt-10">
      <div class="text-12 flex items-center justify-between mb-16">
        <div class="flex-1">
          <div>{{$t('community.info.text-2')}}</div>
          <div class="text-16 font-600 mt-8">{{shareLink}}</div>
        </div>
        <div class="bg-[#fff] p-6 rounded-[50%]" @click="copyToClipboard(shareLink)">
          <img class="w-[16px] h-[16px]" src="@/assets/image/icon/icon-copy.png" alt="">
        </div>
      </div>
      <div class="text-12 flex items-center justify-between">
        <div class="flex-1">
          <div>{{$t('community.info.text-3')}}</div>
          <div class="text-16 font-600 mt-8">{{user.code}}</div>
        </div>
        <div class="bg-[#fff] p-6 rounded-[50%]" @click="copyToClipboard(user.code)">
          <img class="w-[16px] h-[16px]" src="@/assets/image/icon/icon-copy.png" alt="">
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="less">
.text-style-1 {
  font-weight: 500;
  background: linear-gradient(180deg, #FFB59F 0%, #EA3400 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<script setup>
import {_getRecords} from "@/service/leaderboard";

const listViewSearch = ref(null);
const dataList = ref([]);
const dataInfo = ref({});
const pageModel = reactive({
  pageNo: 1,
  pageSize: 20,
  total: 0,
  pages: 0,
  type: 1,
});
const getListApi = async () => {
  const result = await _getRecords(pageModel);
  dataList.value = result.list
  dataInfo.value.pool = result.pool
  // const sleep = (time) => {
  //   return new Promise(resolve => setTimeout(resolve, time))
  // }
  // await sleep(50)
  // return new Promise(resolve => resolve(result))
}

onMounted(getListApi);
</script>

<template>
  <div class="px-16 pt-16">
    <div
        class="rounded-sm bg-[linear-gradient(180deg,rgba(255,181,159,0.05)_0%,rgba(234,52,0,0.05)_100%)] flex items-center mb-25">
      <img class="w-[54px] h-[54px]" src="@/assets/image/leaderboard/image-1.png" alt="">
      <div class="text-style-1 text-14 font-600 inline-block">{{ $t('leaderboard.text-0') }}:   {{ $filters.fixNumber(dataInfo.pool) }} RFX</div>
    </div>
    <div class="px-5">
      <div class="grid grid-cols-5 text-12 text-[#CCC] mb-8">
        <div class="col-span-1">{{ $t('leaderboard.text-3') }}</div>
        <!--        <div class="text-center">{{ $t('leaderboard.text-4') }}</div>-->
        <div class="col-span-2 text-center">{{ $t('leaderboard.text-5') }}</div>
        <div class="col-span-2 text-center">{{ $t('leaderboard.text-6') }}</div>
      </div>
      <!--      <list-view ref="listViewSearch" :getListApi="getListApi" v-model:pageModel="pageModel" v-model:dataList="dataList"-->
      <!--                 v-model:dataInfo="dataInfo">-->
      <div class="grid grid-cols-5 text-12 py-12" v-for="(item,index) in dataList" :key="item.id">
        <div class="col-span-1">
          <img class="w-[24px]" v-if="index===0" src="@/assets/image/leaderboard/image-2.png" alt="">
          <img class="w-[24px]" v-else-if="index===1" src="@/assets/image/leaderboard/image-3.png" alt="">
          <img class="w-[24px]" v-else-if="index===2" src="@/assets/image/leaderboard/image-4.png" alt="">
          <span v-else class="w-[24px] inline-block text-center font-600">{{ index }}</span>
        </div>
        <!--          <div class="text-center">12.22%</div>-->
        <div class="col-span-2 text-center">{{ $filters.fixNumber(item.num) }}</div>
        <div class="col-span-2 text-center">{{ item.username }}</div>
      </div>
      <!--      </list-view>-->
    </div>
  </div>
</template>

<style scoped lang="less">
.text-style-1 {
  background: linear-gradient(180deg, #FFB59F 0%, #EA3400 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<script setup>
import {_getAssetRecords} from '@/service/feeding'


const headerBackRef = ref(null); // 创建引用
const headerHeight = ref(0);
const dataList = ref([]);
const typeList = ref([
  {id: 0, text: 'transactionType0', value: 0},
  {id: 0, text: 'transactionType6', value: 6},
  {id: 1, text: 'transactionType3', value: 3},
  {id: 2, text: 'transactionType4', value: 4},
  {id: 3, text: 'transactionType5', value: 5},
]);
const dataInfo = ref({});
const show = ref(false);
const type = ref(null);
const listViewSearch = ref(null);

const pageModel = reactive({
  pageNo: 1,
  pageSize: 20,
  total: 0,
  pages: 0,
});
const getListApi = async (pageModel) => {
  const result = await _getAssetRecords(pageModel);
  const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
  }
  await sleep(50)
  return new Promise(resolve => resolve(result))
}
const resetFun = async () => {
  pageModel.pageNo = 1
  pageModel.pageSize = 20
  pageModel.total = 0
  pageModel.pages = 0
  pageModel.type = ''
  listViewSearch.value.searchFun()
};
const searchFun = async (value) => {
  if (value === 0) {
    return await resetFun();
  }
  type.value = value
  pageModel.pageNo = 1
  pageModel.pageSize = 20
  pageModel.total = 0
  pageModel.pages = 0
  pageModel.type = type.value
  listViewSearch.value.searchFun()
};
const getImageUrl = (name) => {
  return new URL(`/src/assets/image/icon/${name}.png`, import.meta.url).href
}
onMounted(() => {
  headerHeight.value = headerBackRef.value.$el.clientHeight;
});
</script>

<template>
  <HeaderBack ref="headerBackRef" :title="$t('itemized.text-0')">
  </HeaderBack>
  <Main class="py-[15px] pl-9 pr-15  text-14">
    <div class="rounded-sm bg-[#141414] py-10 px-15 text-12 inline-block mb-10 " @click="show=!show">
      <div class="flex   items-center">
        <span>{{ $t('itemized.text-1') }}</span>
        <img class="w-[18px] h-[18px] ml-8" src="@/assets/image/icon/down.png" alt="">
      </div>
    </div>
    <div>
      <div class="bg-[#141414] rounded-md p-15">
        <div
            class="text-[#909090]  text-14 pb-5 border-b border-solid border-[rgba(255,255,255,0.10)] mb-10">
          {{ $t('itemized.text-2') }}: 2025/12/12 15:23
        </div>
        <div class="grid grid-cols-2 gap-[10px]">
          <div>
            <div class="text-14 text-[#FFF] ">V1</div>
            <div class="text-12 text-[#909090] mt-5">{{ $t('itemized.text-3') }}</div>
          </div>
          <div class="pl-10">
            <div class="text-14 text-[#FFF] ">1000U</div>
            <div class="text-12 text-[#909090] mt-5">{{ $t('itemized.text-4') }}</div>
          </div>
        </div>
      </div>
    </div>
    <!--    <list-view ref="listViewSearch" :getListApi="getListApi" v-model:pageModel="pageModel" v-model:dataList="dataList"-->
    <!--               v-model:dataInfo="dataInfo">-->
    <!--      <div v-for="item in dataList"-->
    <!--           class="ml-8 p-15 mb-15 relative rounded-md bg-[#F5FDFF] border border-solid border-[#000]">-->
    <!--        <img class="w-[15px] h-[20px] absolute -left-7 top-1/2 -translate-y-1/2" src="@/assets/image/home/image-13.png"-->
    <!--             alt="">-->
    <!--        <div class="flex items-center justify-between mb-5">-->
    <!--          <div>{{ $transactionFlows(item.type) }}</div>-->
    <!--          <div class="font-bold">{{ item.stype === 0 ? '-' : '+' }}{{ $filters.fixNumber(item.num) }} {{$filters.upperCase(item.coin) }}</div>-->
    <!--        </div>-->
    <!--        <div class="text-right text-[#7B92AB]">{{ item.create_time }}</div>-->
    <!--      </div>-->
    <!--    </list-view>-->
  </Main>
  <van-popup v-model:show="show" round position="bottom" class="popup-info"
             closeable
             :close-icon="getImageUrl('icon_tips_close')"
             :overlay-style="{ backgroundColor: 'transparent'}">
    <div class="max-w-[375px] mx-auto bg-[#1d1d1d] p-15">
      <div class="text-16 pb-15 border-b border-solid border-[rgba(255,255,255,0.10)] text-center">{{ $t('itemized.text-7') }}</div>
      <div v-for="item in typeList" @click="searchFun(item.value)" class="p-10 mb-5 text-center text-16 font-400 flex items-center justify-between" >
        <div>{{ $t(item.text) }}</div>
        <div class="flex items-center">
          <van-icon v-if="type !== item.value" name="circle" color="#6e6e6e" size="18px"/>
          <van-icon v-if="type === item.value" name="checked" color="#fad701" size="18px"/>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-[30px] px-20 text-16">
        <div class="bg-[#343434] py-10 text-center rounded-sm font-600">{{ $t('itemized.text-5') }}</div>
        <div class="bg-[#fad701] py-10 text-center rounded-sm font-600 text-[#000]">{{ $t('itemized.text-6') }}</div>
      </div>
    </div>
  </van-popup>
</template>


<style scoped lang="less">
.popup-info {
  --van-popup-background: transparent;
  fill: rgba(255, 255, 255, 0.80);
  stroke-width: 1px;
  stroke: #F0F0F2;
  backdrop-filter: blur(10px);
}
</style>

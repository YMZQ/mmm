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
  show.value = false
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

onMounted(() => {
  headerHeight.value = headerBackRef.value.$el.clientHeight;
});
</script>

<template>
  <HeaderBack ref="headerBackRef" :title="$t('assetRecord.text-0')">
    <img @click="show=!show" class="w-[24px] h-[24px]" src="@/assets/image/icon/icon-filter.png" alt="">
  </HeaderBack>
  <Main class="py-[15px] pl-9 pr-15  text-14">
    <list-view ref="listViewSearch" :getListApi="getListApi" v-model:pageModel="pageModel" v-model:dataList="dataList"
               v-model:dataInfo="dataInfo">
      <div v-for="item in dataList"
           class="ml-8 p-15 mb-15 relative rounded-md bg-[#F5FDFF] border border-solid border-[#000]">
        <img class="w-[15px] h-[20px] absolute -left-7 top-1/2 -translate-y-1/2" src="@/assets/image/home/image-13.png"
             alt="">
        <div class="flex items-center justify-between mb-5">
          <div>{{ $transactionFlows(item.type) }}</div>
          <div class="font-bold">{{ item.stype === 0 ? '-' : '+' }}{{ $filters.fixNumber(item.num) }}ELP
<!--            {{$filters.upperCase(item.coin) }}-->
          </div>
        </div>
        <div class="text-right text-[#7B92AB]">{{ item.create_time }}</div>
      </div>
    </list-view>
  </Main>
  <van-popup v-model:show="show" round position="bottom" class="popup-info"
             :overlay-style="{ backgroundColor: 'transparent'}">
    <div class="max-w-[375px] mx-auto bg-white p-15">
      <div v-for="item in typeList" @click="searchFun(item.value)"
           class="p-10 mb-5 text-center"
           :class="{
                  'text-16 font-700 text-[#1C3B5E] bg-[#E6FAFF] rounded-md':type===item.value,
                  'text-16 font-400 text-[#425F80]':type!==item.value
             }"
      >{{ $t(item.text) }}
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

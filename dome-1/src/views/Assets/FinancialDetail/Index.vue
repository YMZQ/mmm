<script setup>
// import {_getAssetRecords} from '@/service/home'
import {appStore} from "@/stores";
import {storeToRefs} from "pinia";

const store = appStore();
const {hideTitle} = storeToRefs(store);
const headerBackRef = ref(null); // 创建引用
const headerHeight = ref(0);
const dataList = ref([]);
const typeList = ref([
  // {id: 0, text: 'transactionType0', value: 0},
  {id: 0, text: 'transactionType1', value: 1},
  {id: 1, text: 'transactionType2', value: 2},
  {id: 2, text: 'transactionType3', value: 3},
  {id: 3, text: 'transactionType4', value: 4},
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
  // const result = await _getAssetRecords(pageModel);
  // const sleep = (time) => {
  //   return new Promise(resolve => setTimeout(resolve, time))
  // }
  // await sleep(50)
  // return new Promise(resolve => resolve(result))
}
const resetFun = async () => {
  pageModel.pageNo = 1
  pageModel.pageSize = 20
  pageModel.total = 0
  pageModel.pages = 0
  pageModel.type = ''
  listViewSearch.value.searchFun()
  show.value = false
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
  show.value = false
};
const getImageUrl = (name) => {
  return new URL(`/src/assets/image/icon/${name}.png`, import.meta.url).href
}
onMounted(() => {
  headerHeight.value = headerBackRef.value.$el.clientHeight;
});
</script>

<template>
  <div class="relative">
<!--    <div-->
<!--        class="absolute top-0 left-0 w-full h-svh bg-[url(@/assets/image/assets/image-bg-1.png)] bg-cover bg-no-repeat bg-center"></div>-->

    <HeaderBack ref="headerBackRef" :title="$t('financialDetail.title')">
    </HeaderBack>
    <Main class="p-15   text-14">
      <div>
        <div class="rounded-sm bg-[#262334] py-8 px-10 text-12 inline-block mb-10  mr-20" @click="show=!show">
          <div class="flex   items-center">
            <span>{{ $t('financialDetail.text-0') }}</span>
            <img class="w-[10px] h-[10px] ml-10" src="@/assets/image/icon/down.png" alt="">
          </div>
        </div>
        <div class="rounded-sm bg-[#262334] py-8 px-10 text-12 inline-block mb-10 " @click="show=!show">
          <div class="flex   items-center">
            <span>{{ $t('financialDetail.text-1') }}</span>
            <img class="w-[10px] h-[10px] ml-10" src="@/assets/image/icon/down.png" alt="">
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
      <!--      <div  v-for="item in dataList" class="bg-[#141414] rounded-md p-15 mb-15">-->
      <!--        <div-->
      <!--            class="text-[#909090]  text-14 pb-5 border-b border-solid border-[rgba(255,255,255,0.10)] mb-10">-->
      <!--          {{ $t('financialDetail.text-2') }}: {{ item.record_date }}-->
      <!--        </div>-->
      <!--        <div class="grid grid-cols-2 gap-[10px]">-->
      <!--          <div>-->
      <!--            <div class="text-14 text-[#FFF] ">{{$filters.fixNumber(item.amount_usdt)}}U</div>-->
      <!--            <div class="text-12 text-[#909090] mt-5">{{ $t('financialDetail.text-3') }}</div>-->
      <!--          </div>-->
      <!--          <div class="pl-10">-->
      <!--            <div class="text-14 text-[#FFF] ">{{ $transactionFlows(item.record_type) }}</div>-->
      <!--            <div class="text-12 text-[#909090] mt-5">{{ $t('financialDetail.text-4') }}</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="py-20 border-b border-solid border-[rgba(255,255,255,0.05)]">
        <div class="text-14 font-500 mb-14 flex items-center justify-between">
          <div>{{ $t('deposit.records.text-0') }}</div>
          <div class="text-style-1">{{ $filters.fixNumber(100, 4) }} BNB</div>
        </div>
        <div class="text-12 flex items-center justify-between">
          <div class="text-[#8C91A2]">{{ $t('deposit.records.text-1') }}</div>
          <div class="font-500">2025-3-26 09:00:00</div>
        </div>
      </div>
      <!--    </list-view>-->
    </Main>
    <van-popup v-model:show="show" round position="bottom" class="popup-info"
               closeable :close-icon="getImageUrl('icon_tips_close')" :overlay-style="{ backgroundColor: 'transparent'}">
      <div class="max-w-[375px] mx-auto bg-[#1d1d1d] p-20 pt-15">
        <div class="text-16 pb-15 font-600">
          {{ $t('financialDetail.text-2') }}
        </div>
        <div class="pb-20">
          <div v-for="item in typeList" @click="searchFun(item.value)"
               class="py-10  text-center text-16 font-400 flex items-center justify-between">
            <div>{{ $t(item.text) }}</div>
            <div class="flex items-center">
              <van-icon v-if="type !== item.value" name="circle" color="#6e6e6e" size="18px"/>
              <van-icon v-if="type === item.value" name="checked" color="#fff" size="18px"/>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-[13px]  text-16">
          <div class="bg-[#454545] py-10 text-center rounded-[100px] font-600" @click="resetFun">
            {{ $t('financialDetail.text-4') }}
          </div>
          <div class="bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)] py-10 text-center rounded-[100px] font-600" @click="searchFun">
            {{ $t('financialDetail.text-5') }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>


<style scoped lang="less">
.popup-info {
  --van-popup-background: transparent;
  fill: rgba(255, 255, 255, 0.80);
  stroke-width: 1px;
  stroke: #F0F0F2;
  backdrop-filter: blur(10px);
}

.text-style-1 {
  font-weight: 500;
  background: linear-gradient(180deg, #FFB59F 0%, #EA3400 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<script setup>
import {_getRecords} from '@/service/assets'
import {appStore} from "@/stores";
import {storeToRefs} from "pinia";

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

const currencyList = ref([
  {id: 0, text: 'BNB', value: 1},
  {id: 1, text: 'RFX', value: 2}
]);
const currency = ref({id: 0, text: 'BNB', value: 1});
const dataInfo = ref({});
const show = ref(false);
const show1 = ref(false);
const type = ref(null);
const listViewSearch = ref(null);

const pageModel = reactive({
  pageNo: 1,
  pageSize: 20,
  total: 0,
  pages: 0,
});
const getListApi = async (pageModel) => {
  const result = await _getRecords(pageModel);
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
  pageModel.coin = ''
  listViewSearch.value.searchFun()
  show.value = false
  show1.value = false
};
const searchFun = async (value) => {
  type.value = value
  pageModel.pageNo = 1
  pageModel.pageSize = 20
  pageModel.total = 0
  pageModel.pages = 0
  pageModel.type = type.value
  pageModel.coin = currency.value
  listViewSearch.value.searchFun()
  show.value = false
  show1.value = false
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
        <div class="rounded-sm bg-[#262334] py-8 px-10 text-12 inline-block mb-10  mr-20" @click="show1=!show1">
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
      <list-view ref="listViewSearch" :getListApi="getListApi" v-model:pageModel="pageModel" v-model:dataList="dataList"
                 v-model:dataInfo="dataInfo">
        <div v-for="item in dataList" class="py-20 border-b border-solid border-[rgba(255,255,255,0.05)]">
          <div class="text-14 font-500 mb-14 flex items-center justify-between">
            <div>{{ $transactionFlows(item.stype) }}</div>
            <div class="text-style-1">{{ item.stype === 0 ? '-' : '+' }}{{ $filters.fixNumber(item.num) }}
              {{ $filters.upperCase(item.coin) }}
            </div>
          </div>
          <div class="text-12 flex items-center justify-between">
            <div class="text-[#8C91A2]">{{ $t('deposit.records.text-1') }}</div>
            <div class="font-500">{{ item.create_time }}</div>
          </div>
        </div>
      </list-view>
    </Main>
    <van-popup v-model:show="show" round position="bottom" class="popup-info"
               closeable :close-icon="getImageUrl('icon_tips_close')"
               :overlay-style="{ backgroundColor: 'transparent'}">
      <div class="max-w-[375px] mx-auto bg-[#1d1d1d] p-20 pt-15">
        <div class="text-16 pb-15 font-600">
          {{ $t('financialDetail.text-2') }}
        </div>
        <div class="pb-20">
          <div v-for="item in typeList" @click="type=item.value"
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
          <div class="bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)] py-10 text-center rounded-[100px] font-600"
               @click="searchFun">
            {{ $t('financialDetail.text-5') }}
          </div>
        </div>
      </div>
    </van-popup>


    <van-popup v-model:show="show1" round position="bottom" class="popup-info"
               closeable :close-icon="getImageUrl('icon_tips_close')"
               :overlay-style="{ backgroundColor: 'transparent'}">
      <div class="max-w-[375px] mx-auto bg-[#1d1d1d] p-20 pt-15">
        <div class="text-16 pb-15 font-600">
          {{ $t('financialDetail.text-6') }}
        </div>
        <div class="pb-20">
          <div v-for="item in currencyList" @click="currency=item.value"
               class="py-10  text-center text-16 font-400 flex items-center justify-between">
            <div>{{ $t(item.text) }}</div>
            <div class="flex items-center">
              <van-icon v-if="currency !== item.value" name="circle" color="#6e6e6e" size="18px"/>
              <van-icon v-if="currency === item.value" name="checked" color="#fff" size="18px"/>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-[13px]  text-16">
          <div class="bg-[#454545] py-10 text-center rounded-[100px] font-600" @click="resetFun">
            {{ $t('financialDetail.text-4') }}
          </div>
          <div class="bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)] py-10 text-center rounded-[100px] font-600"
               @click="searchFun">
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

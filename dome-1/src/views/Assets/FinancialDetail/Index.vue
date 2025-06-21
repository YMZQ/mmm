<script setup>
import {_getRecords} from '@/service/assets'
import SelectionPopup from './components/SelectionPopup.vue'

const typeList = ref([
  {id: 0, text: 'transactionType1', value: 1},
  {id: 1, text: 'transactionType2', value: 2},
  {id: 2, text: 'transactionType3', value: 3},
  {id: 3, text: 'transactionType4', value: 4},
])

const currencyList = ref([
  {id: 0, text: 'BNB', value: 'bnb'},
  {id: 1, text: 'RFX', value: 'rfx'},
])


const headerBackRef = ref(null); // 创建引用
const headerHeight = ref(0);
const dataList = ref([]);

const dataInfo = ref({});
const show = ref(false);
const show1 = ref(false);
const type = ref(null);
const currency = ref(null);
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
const searchFun = async () => {
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
  <div class="relative ">
    <div
        class="absolute top-0 left-0 w-full h-svh bg-[url(@/assets/image/assets/image-bg-1.png)] bg-cover bg-no-repeat bg-center"></div>
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
    <!-- 类型弹窗 -->
    <SelectionPopup
        v-model:show="show"
        v-model="type"
        :list="typeList"
        :title="$t('financialDetail.text-2')"
        @reset="resetFun"
        @confirm="searchFun"
    />

    <!-- 币种弹窗 -->
    <SelectionPopup
        v-model:show="show1"
        v-model="currency"
        :list="currencyList"
        :title="$t('financialDetail.text-6')"
        @reset="resetFun"
        @confirm="searchFun"
    />
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

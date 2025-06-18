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
  <HeaderBack ref="headerBackRef" :title="$t('earnings.title')">
    <!--    <img @click="show=!show" class="w-[24px] h-[24px]" src="@/assets/image/icon/icon-filter.png" alt="">-->
  </HeaderBack>
  <Main class="p-15 text-14">
    <!--    <list-view ref="listViewSearch" :getListApi="getListApi" v-model:pageModel="pageModel" v-model:dataList="dataList"-->
    <!--               v-model:dataInfo="dataInfo">-->
    <!--      <div v-for="item in dataList"-->
    <!--           class="ml-8 p-15 mb-15 relative rounded-md bg-[#F5FDFF] border border-solid border-[#000]">-->
    <!--        <img class="w-[15px] h-[20px] absolute -left-7 top-1/2 -translate-y-1/2" src="@/assets/image/home/image-13.png"-->
    <!--             alt="">-->
    <!--        <div class="flex items-center justify-between mb-5">-->
    <!--          <div>{{ $transactionFlows(item.type) }}</div>-->
    <!--          <div class="font-bold">{{ item.stype === 0 ? '-' : '+' }}{{ $filters.fixNumber(item.num) }}ELP-->
    <!--            &lt;!&ndash;            {{$filters.upperCase(item.coin) }}&ndash;&gt;-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="text-right text-[#7B92AB]">{{ item.create_time }}</div>-->
    <!--      </div>-->
    <!--    </list-view>-->
    <div class="border-style-1 mb-15 grid grid-cols-2 gap-x-[10px] gap-y-[15px] p-15">
      <div>
        <div class="text-12 text-[#B1A899] mb-5">{{ $t('earnings.text-0') }}</div>
        <div class="text-14 font-bold">563511156.23 USDT</div>
      </div>
      <div>
        <div class="text-12 text-[#B1A899] mb-5">{{ $t('earnings.text-1') }}</div>
        <div class="text-14 font-bold">56351156.23 USDT</div>
      </div>
      <div>
        <div class="text-12 text-[#B1A899] mb-5">{{ $t('earnings.text-2') }}</div>
        <div class="text-14 font-bold">11111.23 BYTE</div>
      </div>
      <div>
        <div class="text-12 text-[#B1A899] mb-5">{{ $t('earnings.text-3') }}</div>
        <div class="text-14 font-bold">11111111.23 USDT</div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-[20px] text-14 mb-25">
      <router-link to="swap" class="flex items-center bg-[#25201a] rounded-md px-20 py-20">
        <img class="w-[20px] h-[20px] mr-10" src="@/assets/image/home/image-1.png" alt="">
        <div>{{ $t('earnings.text-4') }}</div>
      </router-link>
      <div class="flex items-center bg-[#25201a] rounded-md px-20 py-20">
        <img class="w-[20px] h-[20px] mr-10" src="@/assets/image/home/image-2.png" alt="">
        <div>{{ $t('earnings.text-5') }}</div>
      </div>
    </div>
    <div class="text-16 font-bold">{{ $t('earnings.text-6') }}</div>
    <!--    <div class="bg-[#25201a] rounded-md p-15 mb-5">-->
    <!--      <div class="flex items-center justify-between mb-5 text-14">-->
    <!--        <div>{{ $transactionFlows(item.type) }}</div>-->
    <!--        <div>{{ item.stype === 0 ? '-' : '+' }}{{ $filters.fixNumber(item.num) }}</div>-->
    <!--      </div>-->
    <!--      <div class="text-[#B1A899] text-12">-->
    <!--        {{ item.create_time }}-->
    <!--      </div>-->
    <!--    </div>-->
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

.border-style-1 {
  height: 123px;
  position: relative;
  --border-width: 1px;
  --border-radius: 20px;
  --border-color: linear-gradient(270deg, #686058 0%, #493F32 25.96%, #C5C1B3 50%, #493F32 83.12%, #686058 100%);
  background: linear-gradient(270deg, #1F180A -2.46%, #3C2D13 56.3%, #1F180A 106.67%);
  border-radius: 20px;
  &::after {
    content: "";
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: var(--border-width);
    border-radius: var(--border-radius);
    background: var(--border-color);
    /* 随便定义一个颜色 */
    --mask-bg: linear-gradient(#000, #000);
    /* 类似background-clip */
    --mask-clip: content-box, padding-box;
    /* mask允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域 */
    /* mask-image类似background-image 设置了用作元素蒙版层的图像，默认值为none，值为透明图片，或透明渐变 */
    -webkit-mask-image: var(--mask-bg), var(--mask-bg);
    /* 默认值为border-box，可选值与background-origin相同 */
    -webkit-mask-clip: var(--mask-clip);
    /* exclude排除，只显示不重合的地方,Firefox支持4个属性 */
    mask-composite: exclude;
    /* 只显示下方遮罩，重合的地方不显示 */
    -webkit-mask-composite: destination-out;
  }
}
</style>

<script setup>
const props = defineProps({
  balances: {
    type: Object,
    default: () => ({
      bnbBalance: null,
      usdtBalance: null,
    })
  }
})


const list = ref([{id: 0, text: 1000}, {id: 1, text: 2000}, {id: 2, text: 3000}])
const num = ref(0)
const number = ref(0)

const currentWalletBalance = computed(() => {
  return props.balances.usdtBalance ?? null
})


const onSubmit = async () => {

};
</script>

<template>
  <div class="pt-27 pb-30 px-15 text-14 border-b border-solid border-[#212020]">
    <div class="text-[#B1A899] mb-10">{{ $t('subscription.subscribe.text-0') }}</div>
    <div class="flex items-center mb-25">
      <div
          v-for="item in list"
          :key="item.id"
          class="py-7 px-10  mr-27 rounded-sm"
          :class="num === item.id ? 'border-style-1' : 'bg-[#241D15]'"
          @click="num = item.id"
      >
        {{ item.text }}USDT
      </div>
    </div>
    <van-form @submit="onSubmit">
      <!--      <van-field class="mb-5" :label="$t('subscription.subscribe.text-1')" label-align="top" :border="false"-->
      <!--                 v-model="number" type="number"-->
      <!--                 :placeholder="$t('subscription.subscribe.text-2')">-->
      <!--        <template #button>-->
      <!--          <div>{{ $t('subscription.subscribe.text-7') }}</div>-->
      <!--        </template>-->
      <!--      </van-field>-->
      <van-field name="stepper" :label="$t('subscription.subscribe.text-1')" label-align="top" :border="false">
        <template #input>
          <van-stepper v-model="number"/>
        </template>
      </van-field>
      <div class="flex items-center justify-center text-[#B1A899] mb-20 mt-5">
        <span>{{ $t('subscription.subscribe.text-3') }}:</span>
        <span v-if="currentWalletBalance === null"> <van-loading size="18" color="#FFA800"/> </span>
        <span v-else>{{ $filters.fixNumber(currentWalletBalance, 2) }}</span>
        <span>USDT</span>
      </div>
      <div class="bg-[#241D15] rounded-md p-15  mb-25">
        <div class="flex items-center justify-between mb-8">
          <div class="text-[#B1A899]">{{ $t('subscription.subscribe.text-4') }}</div>
          <div>0USDT</div>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-[#B1A899]">{{ $t('subscription.subscribe.text-5') }}</div>
          <div>365/{{ $t('subscription.subscribe.text-6') }}</div>
        </div>
      </div>
      <div class="flex items-end justify-center mb-15">
        <div class="text-12 text-[#B1A899]">{{ $t('subscription.subscribe.text-8') }}:</div>
        <div class="text-[#FFA800] text-28 font-blod">100.00USDT</div>
      </div>
      <van-button class="w-full  text-16 text-[#1C3B5E] font-600 relative">
        {{ $t('subscription.subscribe.submit') }}
      </van-button>
    </van-form>
  </div>
</template>

<style scoped lang="less">


:deep(.van-stepper) {
  margin: 0 auto;
  border-radius: 26px;
  border: 0.5px solid rgba(255, 255, 255, 0.40);

  .van-stepper__input {
    width: 158px !important;
    height: 41px !important;
    //background-color: rgba(255, 255, 255, 0.50) !important;
    font-size: 22px;
    font-weight: 700;
    position: relative;
    //border-radius: 8px;
    //margin: 0 15px;
    margin: 0;
    border-right: 0.5px solid rgba(255, 255, 255, 0.40);
    border-left: 0.5px solid rgba(255, 255, 255, 0.40);
  }

  .van-stepper__minus:before, .van-stepper__plus:before {
    height: 2px !important;
  }

  .van-stepper__minus:after, .van-stepper__plus:after {
    width: 2px !important;
  }

  button {
    width: 44px !important;
    height: 41px !important;
    font-weight: 700;
    border-radius: 26px 0   0 26px;
    //background-color: rgba(255, 255, 255, 0.50) !important;
  }
}

.border-style-1 {
  position: relative;
  --border-width: 1px;
  --border-radius: 8px;
  --border-color: linear-gradient(96deg, #FFE605 3.94%, #F90 97.26%);
  background: rgba(255, 153, 0, 0.10);

  color: #FFA800;

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

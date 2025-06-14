<script setup>

const router = useRouter()



const coinType = ref('')
const coinList = ref([])
const num = ref('')
const freeUsdt = ref(0)
const isRequesting = ref(false);
const isRotating = ref(false);
const exchangeBtnState = ref(true);
const rotateDirection = ref('forward');

const formInfo = ref()
const toInfo = ref()
const getExchangeConfig = async () => {

}


const calculateFee = (amount, feeType, feeValue) => {
  if (feeType === 1) {
    return feeValue; // 固定费用
  } else if (feeType === 2) {
    return MthodsMul(amount, feeValue); // 百分比费用
  }
  return 0;
};

const changeTradeType = async () => {
  if (isRequesting.value || isRotating.value) return;

  isRotating.value = true; // 开始旋转

  // 切换旋转方向
  rotateDirection.value = rotateDirection.value === 'forward' ? 'backward' : 'forward';

  isRequesting.value = true;
  coinType.value = toInfo.value.from_coin;
  toInfo.value.from_coin = formInfo.value.from_coin;

  await getExchangeConfig();

  isRequesting.value = false;

  // 动画结束后重置旋转状态
  setTimeout(() => {
    isRotating.value = false;
  }, 1000); // 动画持续 1 秒
}

const onSubmit = async () => {
  if (!Number(num.value) || Number(num.value) < 0) {
  }
  if (Number(formInfo.value.fromCoinBalance) < Number(num.value)) {
  }

  showLoadingToast({
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner',
  })
  const result = await _sendExchange({
    fromCoin: formInfo.value.from_coin,
    toCoin: toInfo.value.from_coin,
    num: num.value,
  })
  showSuccessToast($t('public.submitSuccess'))
  num.value = ''
  await getExchangeConfig();
}
const doAllFun = () => {
  num.value = formInfo.value.fromCoinBalance
};


const rotateClass = computed(() => {
  return rotateDirection.value === 'forward' ? 'rotate-forward' : 'rotate-backward';
});
const exchangeSum = computed({
  get() {
    if (!formInfo.value || !toInfo.value) return 0;

    const {from_coin, fee_type, fee_value, price} = formInfo.value;
    const {price: toPrice, fromCoinPricePlace} = toInfo.value;
    const baseAmount= num.value || 0;
    let finalAmount = 0;
    if (from_coin === 'usdt') {
      // 计算手续费
      const fee = calculateFee(baseAmount, fee_type, fee_value);
      freeUsdt.value = fee;

      // 计算扣除手续费后的金额
      const amountAfterFee = MthodsSub(baseAmount, fee);
      // 计算兑换金额
      // finalAmount = MthodsDiv(amountAfterFee, toPrice);
      finalAmount = (amountAfterFee / toPrice);
    } else {
      // 计算基础兑换金额
      const convertedAmount = MthodsMul(price || 0, baseAmount);

      // 计算手续费
      const fee = calculateFee(convertedAmount, fee_type, fee_value);
      freeUsdt.value = fee;

      // 计算扣除手续费后的兑换金额
      finalAmount = MthodsSub(convertedAmount, fee);
    }

    // 确保兑换金额不为负数并进行格式化
    finalAmount = fixNumber(finalAmount < 0 ? 0 : finalAmount, toInfo.value.fromCoinPricePlace);
    return finalAmount;
  },
  set(val) {
    // setter
  },
});
const unitPrice = computed({
  get() {
    if (!formInfo?.value?.from_coin || !toInfo?.value) return 0;
    const {from_coin, price} = formInfo.value;
    const {price: toPrice, fromCoinPricePlace} = toInfo.value;
    if (from_coin === 'usdt') {
      return fixNumber((1 / toPrice), fromCoinPricePlace);
    } else {
      return fixNumber(MthodsMul(price, 1), fromCoinPricePlace);
    }
  },
  set() {
    // setter logic (if needed)
  },
});

onMounted(async () => {
  try {
    const {query} = router.currentRoute.value;
    coinType.value = typeof query?.type === 'string' ? query.type.toLowerCase() : '';
    await getExchangeConfig();
  } catch (error) {
    console.error('Error in onMounted:', error);
  }
})

</script>

<template>
    <headerBack :title="$t('exchange.title')" :isShow="true" toUrl="exchangeRecord"></headerBack>
    <div class="py-10 px-15 text-14">
      <van-form @submit="onSubmit">
        <div class="bg-[#25201a] rounded-md   border border-solid border-[#000] p-15">
          <div class="flex items-center justify-between ">
            <div class="text-16 font-bold">{{ $t('exchange.text-0') }}</div>
            <div class="text-14" @click="doAllFun">{{ $t('exchange.text-2') }}</div>
          </div>
          <div class="flex items-center justify-between my-15">
            <div class="flex items-center">
<!--              <Image :src="formInfo.fromCoinIcon" class="token-icon" alt="" round/>-->
<!--                          <img class="w-[36px] h-[36px] mr-10" :src="formInfo?.fromCoinIcon" alt="">-->
<!--              <div class="font-bold">{{ upperCase(formInfo?.from_coin) }}</div>-->
              <img class="w-[36px] h-[36px] mr-10" src="@/assets/image/token/byte.png" alt="">
              <div class="font-bold">BYTE</div>
            </div>
            <van-cell-group :border="false" class="mb-[5px]">
              <van-field v-model="num" type="text" placeholder="0.00"></van-field>
            </van-cell-group>
          </div>
          <div class="flex items-center text-[#B1A899] mb-5">
            <div class="mr-5">{{ $t('exchange.text-3') }}:</div>
            <div>123123</div>
<!--            <div>{{ fixNumber(formInfo.fromCoinBalance, formInfo.fromCoinPricePlace) }}{{-->
<!--                upperCase(formInfo?.from_coin)-->
<!--              }}-->
<!--            </div>-->
          </div>
        </div>
        <img @click="changeTradeType" class="relative z-[2]" :class="['w-[40px] mx-auto mt-[-10px]', isRotating ? rotateClass : '']"
             src="@/assets/image/icon/icon-exchange.png" alt="">
        <div class="bg-[#25201a] rounded-4 p-15 mt-[-10px] mb-25">
          <div class="text-16 font-bold">{{ $t('exchange.text-1') }}</div>
          <div class="flex items-center justify-between my-15">
            <div class="flex items-center">
<!--              <Image :src="toInfo.fromCoinIcon" class="token-icon" :alt="toInfo.from_coin" round/>-->
<!--              <div class="font-bold">{{ upperCase(toInfo?.from_coin) }}</div>-->
              <img class="w-[36px] h-[36px] mr-10" src="@/assets/image/token/usdt.png" alt="">
              <div class="font-bold">USDT</div>
            </div>
            <van-cell-group :border="false" class="mb-[5px]">
              <van-field v-model="exchangeSum" readonly type="text" placeholder="0.00"></van-field>
            </van-cell-group>
          </div>
          <div class="flex items-center text-secondary-color justify-between bg-[#38322a]">
<!--            <div class=" rounded-21 px-10 py-3 bg-[#F9F9F9]">-->
<!--              1{{ upperCase(formInfo?.from_coin) }}≈{{ unitPrice }}{{ upperCase(toInfo?.from_coin) }}-->
<!--            </div>-->
<!--            <div class=" rounded-21 px-10 py-3 bg-[#F9F9F9]">-->
<!--              {{ $t('exchange.text5') }}{{ fixNumber(freeUsdt) }}%-->
<!--            </div>-->
          </div>
        </div>

        <div class="auto-flash">
          <van-button block type="primary" class="rounded-4" native-type="submit" :disabled="exchangeBtnState">
            <span class="flash lighting"></span>
            {{ $t('exchange.confirm') }}
          </van-button>
        </div>
      </van-form>
    </div>

</template>

<style scoped lang="less">
.van-cell {
  padding: 0;
}

:deep(.van-field) {
  .van-field__label {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 5px;
  }


  .van-field__button {
    height: 42px;
    padding: 4px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-field__button_left {
      padding: 0 10px 0 15px;
      height: 100%;
      line-height: 38px;
    }

    .van-field__button_left_border {
      border-right: 1px solid #8A8A8A;
    }

    .van-field__button_right {
      height: 100%;
      line-height: 38px;
      padding: 0 15px;
      font-size: 16px;
      color: #fff;

    }
  }
}

@keyframes rotateForward {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotateBackward {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.rotate-forward {
  animation: rotateForward 1s ease-in-out;
}

.rotate-backward {
  animation: rotateBackward 1s ease-in-out;
}
</style>

<script setup>
import {_sendOutAssets, _sendOutAssetsCallback} from "@/service/wallet";
import {_sendBreeding, _sendBreedingCallback, _sendAddLpBreeding, _sendAddLpBreedingCallback} from "@/service/feeding";
import Web3 from "@/utils/web3js/bnbWeb3";
import {tokenAbi} from "@/utils/web3js/abi/tokenAbi";
import {useI18n} from "vue-i18n";
import {appStore} from "@/stores";
import {storeToRefs} from "pinia";
import {fixNumber} from "@/utils";

const {proxy} = getCurrentInstance();
const {t} = useI18n();


const store = appStore();
const {user, address, globalConfig} = storeToRefs(store);

const emit = defineEmits(['callback'])
const props = defineProps({
  feedInfo: {
    type: Object,
    default: () => ({
      breedingPrice: 0,
      totalBreedingAmount: 0,
      eacToUsdt: 0,
      oldEacToUsdt: 0,
      eacToBnb: 0,
      balance: 0,
      totalProfit: 0,
      pool: 0,
      totalBreedingUsdtAmount: 0,
      surplusProfit: 0,
      feeRatio: 0,
    })
  },
  balances: {
    type: Object,
    default: () => ({
      eacBalance: null,
      oldEacBalance: null,
      usdtBalance: null,
      bnbBalance: null,
    })
  }
})
const num = ref(null);
const payment = ref('eac');
const paymentList = ref([
  {text: 'ELP', value: 'eac', id: 0},
  // {text: 'EAC', value: 'oldEac', id: 1},
  {text: 'USDT', value: 'usdt', id: 2},
  {text: 'BNB', value: 'bnb', id: 3},
])

const sendOutAssetsCallback = async (hash) => {
  let result = await _sendOutAssetsCallback({
    hash: hash
  });
  emit('callback')
  proxy.$toast.success(t('提交成功'));
}
const _Web3OutAssets = async (val) => {
  const param = {
    amount: val.amount,
    nonce: val.nonce,
    fee: val.fee,
    orderNumber: val.orderNumber,
    coinAddress: val.coinAddress,
    deadline: val.deadline,
    sign: val.sign,
  }
  const result = await Web3.sendOutAssets(param);
  if (result.status) {
    await sendOutAssetsCallback(result.hash)
  } else {
    proxy.$toast.error(result.message)
  }
};

const onSubmit = async (coin, num) => {
  if (!address.value) {
    return proxy.$toast.error(t('请先连接钱包'));
  }
  if (Number(num) <= 0) {
    return proxy.$toast.error(t('popup.insufficientBalance', {text: 'ELP'}));
  }
  let result = await _sendOutAssets({coin: coin, num: fixNumber(num)});
  proxy.$toast.loading(t('合约请求中'));
  await _Web3OutAssets(result)
};
const submitReinvest = async (num) => {
  if (!address.value) {
    return proxy.$toast.error(t('请先连接钱包'));
  }
  if (num <= 0) {
    return proxy.$toast.error(t('popup.insufficientBalance', {text: 'EAC'}));
  }
  // let result = await _sendOutAssets({coin: coin, num: num});
  emit('callback')
  proxy.$toast.success(t('提交成功'));
};

const sendBreedingCallback = async (hash) => {
  let result = await _sendBreedingCallback({
    hash: hash
  });
  num.value = ''
  emit('callback')
  proxy.$toast.success(t('提交成功'));
}

const _Web3Breeding = async (val) => {
  const param = {
    payAmount: val.payAmount,
    coinAddress: val.coinAddress,
    deadline: val.deadline,
    sign: val.sign,
  }
  const result = await Web3.sendBreeding(param);
  if (result.status) {
    await sendBreedingCallback(result.hash)
  } else {
    proxy.$toast.error(result.message)
  }
};

const eacDonate = async () => {
  let result = await _sendBreeding({
    num: num.value,
    coinAddress: payment.value === 'eac' ? globalConfig.value.eac : globalConfig.value.oldEacContract
  });
  proxy.$toast.loading(t('合约请求中'));
  const param = {
    authorizedAddress: address.value,
    authorizationAmount: 999999999999,
    authorizedLimit: num.value,
    token: payment.value === 'eac' ? 'ELP' : 'EAC',
    tokenAbi: tokenAbi,
    tokenAddress: payment.value === 'eac' ? globalConfig.value.eac : globalConfig.value.oldEacContract,
    businessAddress: globalConfig.value.serviceContract,
  }
  const {approve, message} = await Web3.authorization(param);
  if (approve === true) {
    proxy.$toast.loading(t('合约请求中'));
    await _Web3Breeding(result)
  } else {
    proxy.$toast.error(message)
  }
}

const sendAddLpBreedingCallback = async (hash) => {
  let result = await _sendAddLpBreedingCallback({
    hash: hash
  });
  num.value = ''
  emit('callback')
  proxy.$toast.success(t('提交成功'));
}

const _Web3AddLpBreeding = async (val) => {
  const param = {
    payAmount: val.payAmount,
    addLpRatio: val.addLpRatio,
    payCoinAddress: val.payCoinAddress,
    eacAddress: val.eacAddress,
    deadline: val.deadline,
    sign: val.sign,
  }
  const result = await Web3.sendAddLpBreeding(param);
  if (result.status) {
    await sendAddLpBreedingCallback(result.hash)
  } else {
    proxy.$toast.error(result.message)
  }
};

const bnbUsdtDonate = async () => {
  let result = await _sendAddLpBreeding({
    num: num.value,
    coinAddress: payment.value === 'usdt' ? globalConfig.value.usdt : globalConfig.value.bnb
  });
  proxy.$toast.loading(t('合约请求中'));
  if (payment.value === 'usdt') {
    const param = {
      authorizedAddress: address.value,
      authorizationAmount: 999999999999,
      authorizedLimit: num.value,
      token: 'USDT',
      tokenAbi: tokenAbi,
      tokenAddress: globalConfig.value.usdt,
      businessAddress: globalConfig.value.serviceContract,
    }
    const {approve, message} = await Web3.authorization(param);
    if (approve === true) {
      proxy.$toast.loading(t('合约请求中'));
      await _Web3AddLpBreeding(result)
    } else {
      proxy.$toast.error(message)
    }
  } else {
    proxy.$toast.loading(t('合约请求中'));
    await _Web3AddLpBreeding(result)
  }
}


const submit = async () => {
  if (!address.value) {
    return proxy.$toast.error(t('请先连接钱包'));
  }
  // if (fixedBreedingAmount.value > props.currentWalletBalance) {
  //   return proxy.$toast.error(t('popup.insufficientBalance', {text: 'EAC'}));
  // }
  // if (num.value < props.feedInfo.breedingPrice) {
  //   return proxy.$toast.error(t('feeding.feed.text-9', {text: props.feedInfo.breedingPrice + payment.value}));
  // }
  if (payment.value === 'eac' || payment.value === 'oldEac') {
    if (num.value > props.balances[payment.value + 'Balance']) {
      return proxy.$toast.error(t('popup.insufficientBalance', {text: payment.value === 'eac' ? 'ELP' : 'EAC'}));
    }
    await eacDonate()
  } else {
    if (num.value > props.balances[payment.value + 'Balance']) {
      return proxy.$toast.error(t('popup.insufficientBalance', {text: payment.value === 'bnb' ? 'BNB' : 'USDT'}));
    }
    // if (payment.value === 'usdt' && Number(num.value) > (props.balances[payment.value + 'Balance'] / props.feedInfo.eacToBnb)) {
    //   return proxy.$toast.error(t('popup.insufficientBalance', {text: 'USDT'}));
    // }
    // if (payment.value === 'bnb' && Number(num.value) > (props.balances[payment.value + 'Balance'] / props.feedInfo.eacToBnb)) {
    //   return proxy.$toast.error(t('popup.insufficientBalance', {text: 'BNB'}));
    // }
    await bnbUsdtDonate()
  }
};
const doAll = () => num.value = fixNumber(props.balances[payment.value + 'Balance'], payment.value === 'bnb' ? 6 : 2);
const blurInput = () => {
  if (num.value > 0) {
    num.value = fixNumber(num.value, payment.value === 'bnb' ? 6 : 2)
  }
};
const changePayment = (val) => {
  payment.value = val.value;
}

const currentWalletBalance = computed(() => {
  return props.balances[payment.value + 'Balance'] ?? null
})
const convertedAmount = computed(() => {
  if (currentWalletBalance.value == null) return null

  const balance = currentWalletBalance.value
  const info = props.feedInfo

  switch (payment.value) {
    case 'eac':
      return balance * info.eacToUsdt
    case 'oldEac':
      return balance * info.oldEacToUsdt
    case 'usdt':
      return info.eacToUsdt ? balance / info.eacToUsdt : 0
    case 'bnb':
      return fixNumber((info.eacToBnb ? balance / info.eacToBnb : 0), 6)
    default:
      return 0
  }
})

const minAmount = computed(() => {
  const info = props.feedInfo
  switch (payment.value) {
    case 'eac':
      return fixNumber(info.breedingPrice)
    case 'oldEac':
      return fixNumber(info.breedingPrice)
    case 'usdt':
      return fixNumber((info.eacToUsdt * info.breedingPrice), 2)
    case 'bnb':
      return fixNumber((info.eacToBnb * info.breedingPrice), 6)
    default:
      return 0
  }
})

const convertedUnit = computed(() =>
    ['eac', 'oldEac'].includes(payment.value) ? 'USDT' : 'EAC'
)

</script>

<template>
  <div class="pt-25 px-15 pb-20">
    <div class="text-center text-14">
      <van-form @submit="onSubmit" class="w-[325px] mx-auto">
        <img class="w-[174px] mx-auto mb-10" src="@/assets/image/home/image-15.png" alt="">
<!--        <div class="mb-15  text-center">-->
<!--          <div class="text-16 font-700 mb-10">{{ $filters.fixNumber(feedInfo.pool) }} EAC</div>-->
<!--          <div class="text-14 text-[#425F80]">{{ $t('feeding.feed.text-4') }}</div>-->
<!--        </div>-->
        <div class="mb-25">
          <div class="text-left  text-14 mb-10">{{ $t('feeding.feed.text-2') }}</div>
          <div class="grid grid-cols-4 gap-x-[6px]">
            <div v-for="item in paymentList" :key="item.value" @click="changePayment(item)"
                 class="rounded-[8px] py-10 px-5 text-14 relative"
                 :class="{ 'text-[#FFF] bg-[#A8DAF9] border border-solid border-[#7DCDFF] ':item.value===payment, 'text-[#7B92AB] bg-[#e4f5ff] border border-solid border-[#e4f5ff]':item.value!==payment}"
            >{{ item.text }}
              <div v-if="item.value===payment"
                   class="absolute -right-1 -top-1 w-[21px] h-[14px] bg-[#32b1ff] rounded-[0_8px_0_8px] flex items-center justify-center">
                <van-icon name="success" size="12px"/>
              </div>
            </div>
          </div>
        </div>
        <van-field @blur="blurInput" class="mb-5" :border="false" v-model="num" type="number"
                   :placeholder="$t('feeding.feed.text-9',{text: minAmount+$filters.upperCase(payment==='oldEac'?'EAC':payment==='eac'?'ELP':payment)})">
          <template #button>
            <div @click="doAll">{{ $t('feeding.feed.text-10') }}</div>
          </template>
        </van-field>
        <div class="flex items-center justify-start   mb-30">
          <p class="mr-4">{{ $t('feeding.feed.text-1') }}:</p>
          <p class="flex items-center">
            <span v-if="currentWalletBalance === null"> <van-loading size="18" color="#56e8ff"/> </span>
            <span v-else>{{ $filters.fixNumber(currentWalletBalance, payment === 'bnb' ? 6 : 2) }} </span>
            <span>{{ $filters.upperCase(payment==='oldEac'?'EAC':payment==='eac'?'ELP':payment) }}</span>
          </p>
          <p class="flex items-center">
            <span>≈</span>
            <span v-if="currentWalletBalance === null"><van-loading size="18" color="#56e8ff"/></span>
            <span v-else>{{ $filters.fixNumber(convertedAmount) }}</span>
            <span>{{ convertedUnit }}</span>
          </p>
        </div>
        <div class="relative z-[2] mb-20">
          <van-button @click="submit"
                      class="w-[150px] block mx-auto  text-16 text-[#1C3B5E] font-600 relative">
            {{ $t('feeding.feed.text-3') }}
            <img
                class="wow animate__animated  animate__fadeInBottomLeft absolute  -left-[45px] -bottom-[25px] w-[65px] h-[65px]"
                src="@/assets/image/home/image-2.png" alt="">
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="text-16 font-bold mb-10">{{ $t('feeding.feed.text-4') }}</div>
    <div
        class="bg-style-1 bg-[#F1FAFF] rounded-md p-15  border border-solid border-[#000] shadow-[2px_2px_0px_0px_#000]">

      <div class="mb-15">
        <div class="flex items-center mb-8">
          <div class="flex-1 ">
            <van-progress
                :pivot-text="$filters.fixNumber(((feedInfo.totalProfit/(feedInfo.totalBreedingUsdtAmount*2))*100))+'%'"
                :percentage="$filters.fixNumber(((feedInfo.totalProfit/(feedInfo.totalBreedingUsdtAmount*2))*100))"/>
          </div>
          <div class="ml-20">{{
              $filters.fixNumber(feedInfo.totalProfit)
            }}/{{ $filters.fixNumber(feedInfo.surplusProfit) }}
          </div>
        </div>
        <div class="flex items-center justify-between text-[#7B92AB]">
          <div>{{ $t('feeding.feed.text-11') }}：<span
              class="text-[#1C3B5E]"> {{ $filters.fixNumber(feedInfo.totalBreedingUsdtAmount) }}USDT</span></div>
          <div>{{ $t('feeding.feed.text-12') }}/{{ $t('feeding.feed.text-13') }}</div>
        </div>
      </div>


      <div class="flex items-center justify-between bg-[#FFF] rounded-[16px] p-10 mb-15">
        <div class="flex-1">
          <div class="text-12 mb-5 text-[#425F80]">{{ $t('feeding.feed.text-5') }}</div>
          <div class="text-15 font-bold mb-2">{{ $filters.fixNumber(feedInfo.totalProfit) }}USDT</div>
          <!--          <div class="text-12 text-[#7B92AB]">≈{{-->
          <!--              $filters.fixNumber(multiply(feedInfo.totalProfit, feedInfo.eacToUsdt))-->
          <!--            }}USDT-->
          <!--          </div>-->
        </div>
        <div class="w-[1px] h-[50px] bg-[#CBDFEB]"></div>
        <div class="flex-1 flex flex-col justify-center items-center">
          <div class="text-12 mb-5 text-[#425F80] ">{{ $t('feeding.feed.text-15') }}</div>
          <div class="text-15 font-bold mb-2 ">{{ $filters.fixNumber(feedInfo.surplusProfit) }}USDT</div>
          <!--          <div class="text-12 text-[#7B92AB] pl-45">-->
          <!--            ≈{{ $filters.fixNumber(multiply(feedInfo.totalBreedingAmount, feedInfo.eacToUsdt)) }}USDT-->
          <!--          </div>-->
        </div>
      </div>
      <div class="flex  justify-between">
        <div class="flex-1">
          <div class="text-12 mb-5 text-[#425F80] ">{{ $t('feeding.feed.text-7') }}</div>
          <div class="text-15 font-bold mb-2 ">{{ $filters.fixNumber(feedInfo.balance) }}ELP</div>
          <!--                    <div class="text-12 text-[#7B92AB] ">≈{{-->
          <!--                        $filters.fixNumber(multiply(feedInfo.balance, feedInfo.eacToUsdt))-->
          <!--                      }}USDT-->
          <!--                    </div>-->
        </div>
        <div class="flex flex-col">
          <div class="mb-13 text-right">{{ $t('feeding.feed.text-16') }}
            {{ $filters.fixNumber((feedInfo.feeRatio * 100)) }}%
          </div>
          <!--          <van-button @click="submitReinvest(feedInfo.balance)"-->
          <!--                      class="btn min-w-[70px] py-4 px-20 block mx-auto  h-32 text-14 text-[#1C3B5E] font-600 relative">-->
          <!--            {{ $t('feeding.feed.text-14') }}-->
          <!--          </van-button>-->
          <van-button @click="onSubmit('earth',feedInfo.balance)"
                      class="min-w-[70px] py-4 px-20 block mx-auto h-32 text-14 text-[#1C3B5E] font-600 relative">
            {{ $t('feeding.feed.text-8') }}
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
:deep(.van-button--default) {
  position: relative;
  border-radius: 8px !important;
  color: #1C3B5E !important;
  border: 1px solid #000 !important;
  background: #56E8FF !important;
  box-shadow: 2px 2px 0 0 #000 !important;

  .van-button__text {
    width: 100%;
  }
}

.h-32 {
  margin-left: 10px !important;
  height: 32px !important;
  font-size: 14px !important;
}

.btn {
  background: #fff !important;
}

:deep(.van-stepper) {
  .van-stepper__input {
    width: 158px !important;
    height: 42px !important;
    background-color: rgba(255, 255, 255, 0.50) !important;
    font-size: 22px;
    font-weight: 700;
    position: relative;
    border-radius: 8px;
    margin: 0 15px;
  }

  .van-stepper__minus:before, .van-stepper__plus:before {
    height: 2px !important;
  }

  .van-stepper__minus:after, .van-stepper__plus:after {
    width: 2px !important;
  }

  button {
    width: 44px !important;
    height: 44px !important;
    font-weight: 700;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.50) !important;
  }
}

:deep(.van-cell__value) {
  border-radius: 8px !important;
  border: 1px solid #F5FDFF !important;
  background: #F5FDFF !important;
  backdrop-filter: blur(2px) !important;

  .van-field__control {
    font-size: 14px !important;
    color: #000 !important;
    --van-field-placeholder-text-color: #7B92AB !important;
  }
}

:deep(.van-progress__pivot) {
  box-shadow: 0 0 10px rgba(255, 165, 39, 0.8), /* 发光颜色（主颜色的透明度） */ 0 0 10px rgba(255, 165, 39, 0.6),
  0 0 20px rgba(255, 165, 39, 0.4);
  animation: glow 1.5s infinite alternate; /* 动态发光动画 */
}

@keyframes glow {
  from {
    box-shadow: 0 0 5px rgba(255, 165, 39, 0.6),
    0 0 5px rgba(255, 165, 39, 0.4),
    0 0 10px rgba(255, 165, 39, 0.2);
  }
  to {
    box-shadow: 0 0 10px rgba(255, 165, 39, 0.8),
    0 0 2px rgba(255, 165, 39, 0.6),
    0 0 6px rgba(255, 165, 39, 0.4);
  }
}

.bg-style-1 {
  background-image: url(@/assets/image/home/image-bg-6.png);
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 98px 116px;
}
</style>

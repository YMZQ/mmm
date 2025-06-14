<script setup>
import {_sendOutAssets, _sendOutAssetsCallback} from "@/service/wallet";
import {
  _sendIdo,
  _sendIdoCallback
} from "@/service/feeding";
import Web3 from "@/utils/web3js/bnbWeb3";
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
  jointInfo: {
    type: Object,
    default: () => ({
      minIdoAmount: 0,
      maxIdoAmount: 0,
    })
  },
  balances: {
    type: Object,
    default: () => ({
      bnbBalance: null,
    })
  }
})
const num = ref(null);
const payment = ref('bnb');

const currentWalletBalance = computed(() => {
  return props.balances[payment.value + 'Balance'] ?? null
})


const sendIdoCallback = async (hash) => {
  let result = await _sendIdoCallback({
    hash: hash
  });
  num.value = ''
  emit('callback')
  proxy.$toast.success(t('提交成功'));
}

const _Web3Ido = async (val) => {
  const param = {
    payAmount: val.payAmount,
    coinAddress: val.coinAddress,
    deadline: val.deadline,
    sign: val.sign,
  }
  const result = await Web3.sendIdo(param);
  if (result.status) {
    await sendIdoCallback(result.hash)
  } else {
    proxy.$toast.error(result.message)
  }
};


const submit = async () => {
  if (!address.value) {
    return proxy.$toast.error(t('请先连接钱包'));
  }
  if (num.value < props.jointInfo.minIdoAmount || num.value > props.jointInfo.maxIdoAmount) {
    return proxy.$toast.error(t('feeding.joint.text-1', {text: props.jointInfo.minIdoAmount + '-' + props.jointInfo.maxIdoAmount + 'BNB'}));
  }

  if (num.value > props.balances[payment.value + 'Balance']) {
    return proxy.$toast.error(t('popup.insufficientBalance', {text: 'BNB'}));
  }

  let result = await _sendIdo({
    num: num.value
  });
  proxy.$toast.loading(t('合约请求中'));
  await _Web3Ido(result)
};
const doAll = () => num.value = fixNumber(props.currentWalletBalance);

</script>

<template>
  <div class="pt-25 px-15 pb-20">
    <div class="text-center text-14">
      <van-form class="w-[325px] mx-auto">
        <img class="w-[121px] mx-auto" src="@/assets/image/home/image-19.png" alt="">
        <div class="mb-25">
          <div class="text-left  text-14 ">{{ $t('feeding.joint.text-0') }}</div>
        </div>
        <van-field class="mb-5" :border="false" v-model="num" type="number"
                   :placeholder="$t('feeding.joint.text-1',{text: jointInfo.minIdoAmount+'-'+jointInfo.maxIdoAmount+'BNB'})">
          <template #button>
            <div @click="doAll">{{ $t('feeding.joint.text-3') }}</div>
          </template>
        </van-field>
        <div class="flex items-center justify-start   mb-30">
          <span class="mr-4">{{ $t('feeding.joint.text-2') }}:</span>
          <p class="flex items-center">
            <span v-if="currentWalletBalance === null"> <van-loading size="18" color="#56e8ff"/> </span>
            <span v-else>{{ $filters.fixNumber(currentWalletBalance, 6) }}</span>
            <span>{{ $filters.upperCase(payment) }}</span>
          </p>
        </div>
        <div class="relative z-[2] mb-20">
          <van-button @click="submit"
                      class="w-[150px] block mx-auto  text-16 text-[#1C3B5E] font-600 relative">
            {{ $t('feeding.joint.text-4') }}
            <img
                class="wow animate__animated  animate__fadeInBottomLeft absolute  -left-[45px] -bottom-[25px] w-[65px] h-[65px]"
                src="@/assets/image/home/image-2.png" alt="">
          </van-button>
        </div>
      </van-form>

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

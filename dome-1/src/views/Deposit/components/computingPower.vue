<script setup>
import {fixNumber} from "@/utils";
import {_sendDeposit, _sendDepositCallback} from "@/service/deposit";
import Web3 from "@/utils/web3js/bnbWeb3";
import {useI18n} from "vue-i18n";
const {proxy} = getCurrentInstance();
const {t} = useI18n();

const emit = defineEmits(['callback'])
const props = defineProps({
  balances: {
    type: Object,
    default: () => ({
      bnbBalance: null
    })
  },
  depositInfo: {
    type: Object,
    default: () => ({
      thisAmount: 0,
      todayOutput: 0,
      totalOutput: 0,
      surplusAmount: 0,
      minInAmount: 0,
    })
  },
})
const number = ref('')
const currentWalletBalance = computed(() => {
  return props.balances.bnbBalance ?? null
})

const doAll = () => number.value = fixNumber(currentWalletBalance.value, 5);


const sendDepositCallback = async (hash) => {
  let result = await _sendDepositCallback({
    hash: hash
  });
  emit('callback')
  proxy.$toast.success(t('common.submitSuccess'));
}

const _Web3InAmount = async (val) => {
  const param = {
    payAmount: val.payAmount,
    isTrigger: val.isTrigger,
    coinAddress: val.coinAddress,
    deadline: val.deadline,
    sign: val.sign,
  }
  const result = await Web3.sendInAmount(param);
  if (result.status) {
    await sendDepositCallback(result.hash)
  } else {
    proxy.$toast.error(result.message)
  }
};

const onSubmit = async () => {
  if (Number(number.value) < Number(props.depositInfo.minInAmount)) {
    return proxy.$toast.error(t('deposit.computingPower.text-4',{number:props.depositInfo.minInAmount,text:'BNB'}));
  }
  if (Number(number.value) > Number(currentWalletBalance.value)) {
    return proxy.$toast.error(t('popup.insufficientBalance', {text: 'BNB'}));
  }
  let result = await _sendDeposit({
    num: number.value
  });
  proxy.$toast.loading(t('common.contractRequesting'));
  await _Web3InAmount(result)
};


</script>

<template>
  <div
      class="mb-30 px-15  flex  items-end w-full h-[667px]  bg-[url(@/assets/image/deposit/image-bg-0-0.png)] bg-cover bg-no-repeat bg-center">
    <div class="flex-1">
      <div class="mb-20 bg-[rgba(255,255,255,0.05)] py-20 rounded-sm backdrop-blur-[40px] relative">
        <div class="absolute w-[16px] h-[16px] top-11 right-11"></div>
        <div class="w-full grid grid-cols-2 gap-x-[10px] gap-y-[20px] text-center">
          <div>
            <div class="text-20 font-600">{{ $filters.fixNumber(depositInfo.thisAmount, 5) }}</div>
            <div class="text-12 text-[#CED0D8]">{{ $t('deposit.computingPower.text-0', {text: 'BNB'}) }}</div>
          </div>
          <div>
            <div class="text-20 font-600">{{ $filters.fixNumber(depositInfo.todayOutput, 5) }}</div>
            <div class="text-12 text-[#CED0D8]">{{ $t('deposit.computingPower.text-1', {text: 'BNB'}) }}</div>
          </div>
          <div>
            <div class="text-20 font-600">{{ $filters.fixNumber(depositInfo.totalOutput, 5) }}</div>
            <div class="text-12 text-[#CED0D8]">{{ $t('deposit.computingPower.text-2', {text: 'BNB'}) }}</div>
          </div>
          <div>
            <div class="text-20 font-600">{{ $filters.fixNumber(depositInfo.surplusAmount, 5) }}</div>
            <div class="text-12 text-[#CED0D8]">{{ $t('deposit.computingPower.text-3', {text: 'BNB'}) }}</div>
          </div>
        </div>
      </div>
      <div>
        <van-form @submit="onSubmit">
          <van-field class="mb-5" :border="false"
                     v-model="number" type="number"
                     :placeholder="$t('deposit.computingPower.text-4',{number:fixNumber(depositInfo.minInAmount,5),text:'BNB'})">
            <template #button>
              <div @click="doAll">{{ $t('deposit.computingPower.all') }}</div>
            </template>
          </van-field>
          <div class="mb-24 mt-10 flex text-14">
            <span class="mr-4 text-style-1">{{ $t('subscription.subscribe.text-3') }}:</span>
            <span v-if="currentWalletBalance === null" class="flex items-center">
              <van-loading size="18" color="#ec4110"/>
              <span   class="text-style-1">BNB</span>
            </span>
            <span v-else class="text-style-1">{{ $filters.fixNumber(currentWalletBalance, 5) }} BNB</span>
          </div>
          <van-button class="w-full  text-16 text-[#1C3B5E] font-600 relative"  native-type="submit">
            {{ $t('deposit.computingPower.submit') }}
          </van-button>
        </van-form>
      </div>
    </div>
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

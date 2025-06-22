<script setup>
import {fixNumber} from '@/utils'
import {useI18n} from "vue-i18n";
import {appStore} from "@/stores";
import {storeToRefs} from "pinia";
import {_sendOutAssets, _sendOutAssetsCallback} from "@/service/wallet";
import Web3 from "@/utils/web3js/bnbWeb3";

const {proxy} = getCurrentInstance();
const {t} = useI18n();


const store = appStore();
const {user, address} = storeToRefs(store);
const emit = defineEmits(['callback'])
const props = defineProps({
  assetList: {
    type: Array,
    default: () => []
  }
})
const currencyInfo = ref({})
watch(
    () => props.assetList,
    (newList) => {
      if (newList.length > 0 && Object.keys(currencyInfo.value).length === 0) {
        currencyInfo.value = newList[0]
      }
    },
    { immediate: true, deep: true }
)



const show = ref(false);
const list = ref([{id: 0, text: 'USDT'}, {id: 1, text: 'BNB'}])
const number = ref('')
const getImageUrl = (name) => {
  return new URL(`/src/assets/image/icon/${name}.png`, import.meta.url).href
}
const setCurrencyInfo = (item) => {
  number.value = ''
  currencyInfo.value = item
}


const sendOutAssetsCallback = async (hash) => {
  let result = await _sendOutAssetsCallback({
    hash: hash
  });
  proxy.$toast.success(t('public.success.message'));
  emit('callback')
  show.value=false
}
const _Web3OutAssets = async (val) => {
  const param = {
    amount: val.amount,
    fee: val.fee,
    isTrigger: val.isTrigger,
    nonce: val.nonce,
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
const doAll = () => number.value = fixNumber(currencyInfo.value.balance, currencyInfo.value.coin==='bnb'?4:2);

const onSubmit = async () => {
  if (Number(number.value) <= 0 || Number(number.value)>currencyInfo.value.balance) {
    return proxy.$toast.error(t('popup.insufficientBalance', {text: currencyInfo.value.coin}));
  }
  let result = await _sendOutAssets({coin: currencyInfo.value.coin, num: number.value});
  proxy.$toast.loading(t('common.contractRequesting'));
  await _Web3OutAssets(result)
};
</script>

<template>
  <van-popup v-model:show="show" round position="bottom" class="popup-info"
             closeable :close-icon="getImageUrl('icon_tips_close')" :overlay-style="{ backgroundColor: 'transparent'}">
    <div class="max-w-[375px] mx-auto bg-[#1d1d1d] p-20 pt-15">
      <div class="text-16 pb-15 font-600">
        {{ $t('assets.extract.title') }}
      </div>
      <div class="flex items-center mb-25">
        <div
            v-for="item in assetList"
            :key="item.id"
            class="py-8 px-10 text-14 font-500  mr-12 rounded-[8px] w-[96px] text-center"
            :class="currencyInfo.id === item.id ? 'bg-[#f57753]' : 'bg-[#2d2d2d]'"
            @click="setCurrencyInfo(item)"
        >
          {{ $filters.upperCase(item.coin) }}
        </div>
      </div>
      <van-form @submit="onSubmit">
        <van-field class="mb-5" :border="false" v-model="number" type="number"
                   :placeholder="$t('assets.extract.text-0')">
          <template #button>
            <div @click="doAll">{{ $t('assets.extract.all') }}</div>
          </template>
        </van-field>
        <div class="mb-24 mt-10 flex">
          <span class="text-style-1">{{ $t('assets.extract.text-2') }}:{{ $filters.fixNumber(currencyInfo.balance,currencyInfo.coin==='bnb'?4:2) }}</span>
        </div>
        <van-button class="w-full  text-16 text-[#1C3B5E] font-600 relative" native-type="submit">
          {{ $t('assets.extract.submit') }}
        </van-button>
      </van-form>
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

.text-style-1 {
  font-weight: 500;
  background: linear-gradient(180deg, #FFB59F 0%, #EA3400 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

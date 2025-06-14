<template>
  <van-popup v-model:show="show" round :close-on-click-overlay="false" closeable
             :close-icon="getImageUrl('icon_tips_close')"
             :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, 0.4)'}">
    <div class="w-[300px] bg-[#232323] rounded-[16px] p-15">
      <div class="text-16 font-bold">{{ $t('popup.receive.title') }}</div>
      <!--      <div class="w-full h-[1px] bg-[linear-gradient(90deg,_rgba(37,170,255,0.00)_0%,_#25AAFF_52%,_rgba(37,170,255,0.00)_100%)]"></div>-->
      <div class="pt-[12px]">
        <van-form @submit="onSubmit">
          <van-cell-group :border="false">
            <van-field v-model="form.amount"
                       :placeholder="$t('popup.receive.placeholder')"
                       :rules="[{ required: true, message: $t('popup.receive.placeholder') }]">
              <template #button>
                <div class="flex">
                  <!--                  <div class="text-[#fff]">{{ $filters.upperCase(details.coin) }}</div>-->
                  <div class="text-style-1" @click="doAll">{{ $t('popup.receive.all') }}</div>
                </div>
              </template>
            </van-field>
          </van-cell-group>
          <div class="flex items-center justify-between mt-5">
            <p class="text-[#888] ">{{ $t('popup.receive.available') }}:</p>
            <p>{{ $filters.fixNumber(details.balance,details.precision) }} {{ $filters.upperCase(details.coin) }}</p>
          </div>
          <div class="flex items-center justify-between mt-5">
            <p class="text-[#888]">{{ $t('popup.receive.walletAvailable') }}:</p>
            <p class="text-[#EDA4FF]">{{ $filters.fixNumber(balance,details.precision) }}
              {{ $filters.upperCase(details.coin) }}</p>
          </div>
          <div class="w-[130px] mx-auto mt-25 ">
            <!--        <van-button  class="w-full" >{{ $t('home.text-12') }}</van-button>-->
            <van-button class="w-full" native-type="submit">{{ $t('popup.receive.confirm') }}</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import {ref, reactive, getCurrentInstance, watch} from 'vue'
import Web3 from "@/utils/web3js/bnbWeb3";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

import {storeToRefs} from "pinia";
import {appStore} from '@/stores/index'
import {tokenAbi} from "@/utils/web3js/abi/tokenAbi";
import {_sendOutAssets, _sendOutAssetsCallback, _sendRechargeCallback} from "@/service/wallet";

const store = appStore();
const {address, globalConfig} = storeToRefs(store);
const {proxy} = getCurrentInstance();
const emit = defineEmits(['callback']);
const show = ref(false);
const balance = ref(0);
const props = defineProps({
  details: Object
});
const form = reactive({
  amount: '', //
})
watch(() => show.value, async () => {
  form.amount = ''
  await getBalance();

})

const doAll = async () => {
  form.amount = props.details.balance
};
const getBalance = async () => {
  let result = null
  if(props.details.coin==='bnb'){
    result = await Web3.getBalance(address.value)
  }else{
    result = await Web3.getTokenBalance({
      account: address.value, tokenAbi: tokenAbi, tokenAddress: globalConfig.value.luckyBnb
    })
  }
  balance.value = result
};
const sendOutAssetsCallback = async (hash) => {
  let result = await _sendOutAssetsCallback({
    hash: hash
  });
  proxy.$toast.success(t('提交成功'));
  emit('callback');
  show.value = false;
}
const _Web3OutAssets = async (val) => {
  const param = {
    amount: val.amount,
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
const onSubmit = async () => {
  if (Number(form.amount) <=0 || Number(form.amount) > Number(props.details.balance)) {
    return proxy.$toast.error(t('popup.receive.insufficientBalance'));
  }
  let result = await _sendOutAssets({coin: props.details.coin, num: form.amount});
  proxy.$toast.loading(t('合约请求中'));
  await _Web3OutAssets(result)
};

const router = useRouter()
const routerTo = (url) => {
  router.push(url)
}
const getImageUrl = (name) => {
  return new URL(`/src/assets/image/icon/${name}.png`, import.meta.url).href
}
// 抛出方法，只有抛出方法，父组件的ref才能获取得到
defineExpose({
  show,
});
</script>

<style lang="less" scoped>

:deep(.van-field) {
  .van-field__label {
    font-size: 16px;
    font-weight: 500;
    color: #E0EEEE;
    line-height: 20px;
    margin-bottom: 5px;
  }

  --van-field-placeholder-text-color: #ACACAC;

  .van-cell__value {
    background-color: #1B1B1B !important;
    border-radius: 8px !important;

    .van-field__body {
      height: 44px;
    }

    .van-field__error-message {
      padding: 0 10px;
    }

    .van-field__control {
      height: 100%;
    }
  }

  .van-field__button {
    height: 44px;
    line-height: 44px;


    .text-style-1 {
      //font-weight: bold;
      //font-size: 16px;
      //text-align: center;
      //background: var(--Linear, linear-gradient(122deg, #0AFFEA 16.68%, #25AAFF 89.38%));
      //background-clip: text;
      //-webkit-background-clip: text;
      //-webkit-text-fill-color: transparent;
      //color: transparent; /* 使文字颜色透明以显示背景 */
      //display: inline-block; /* 使得背景仅包裹文本内容 */
      //padding: 0 10px 0 15px;
    }


  }
}

.btn {
  height: 42px;
  line-height: 42px;
  color: var(--, #95DCEE);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}


</style>

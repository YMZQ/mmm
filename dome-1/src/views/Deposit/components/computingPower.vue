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
const number = ref('')
const currentWalletBalance = computed(() => {
  return props.balances.bnbBalance ?? null
})
const onSubmit = async () => {

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
            <div class="text-20 font-600">{{ $filters.fixNumber(6545, 5) }}</div>
            <div class="text-12 text-[#CED0D8]">{{ $t('deposit.computingPower.text-0', {text: 'BNB'}) }}</div>
          </div>
          <div>
            <div class="text-20 font-600">{{ $filters.fixNumber(6545, 5) }}</div>
            <div class="text-12 text-[#CED0D8]">{{ $t('deposit.computingPower.text-1', {text: 'BNB'}) }}</div>
          </div>
          <div>
            <div class="text-20 font-600">{{ $filters.fixNumber(6545, 5) }}</div>
            <div class="text-12 text-[#CED0D8]">{{ $t('deposit.computingPower.text-2', {text: 'BNB'}) }}</div>
          </div>
          <div>
            <div class="text-20 font-600">{{ $filters.fixNumber(6545, 5) }}</div>
            <div class="text-12 text-[#CED0D8]">{{ $t('deposit.computingPower.text-3', {text: 'BNB'}) }}</div>
          </div>
        </div>
      </div>
      <div>
        <van-form @submit="onSubmit">
          <van-field class="mb-5" :border="false"
                     v-model="number" type="number"
                     :placeholder="$t('deposit.computingPower.text-4',{number:1,text:'BNB'})">
            <template #button>
              <div>{{ $t('deposit.computingPower.all') }}</div>
            </template>
          </van-field>
          <div class="mb-24 mt-10 flex">
              <span>{{ $t('subscription.subscribe.text-3') }}:</span>
              <span v-if="currentWalletBalance === null"> <van-loading size="18" color="#ec4110"/> </span>
              <span v-else>{{ $filters.fixNumber(currentWalletBalance, 2) }}</span>
              <span>BNB</span>
          </div>
          <van-button class="w-full  text-16 text-[#1C3B5E] font-600 relative">
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

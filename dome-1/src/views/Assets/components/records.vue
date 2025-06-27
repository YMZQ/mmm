<script setup>
const props = defineProps({
  assetList: {
    type: Array
  },
  rfxBalance: {
    type: [Number,String]
  },
  bnbBalance: {
    type: [Number,String]
  }
})
</script>

<template>
  <div class="px-16">
    <router-link v-for="item in assetList" to="financialDetail" class="rounded-sm p-12 border border-solid border-[rgba(255,255,255,0.05)] flex items-center justify-between mb-10">
      <div class="flex items-center">
        <img v-if="item.coin==='rfx'" class="w-[32px] h-[32px] mr-8" src="@/assets/image/token/rfx.png" alt="">
        <img v-else-if="item.coin==='bnb'" class="w-[32px] h-[32px] mr-8" src="@/assets/image/token/bnb.png" alt="">
        <div class="text-14 font-600">{{ $filters.upperCase(item.coin) }}</div>
      </div>
      <div class="flex items-center">
        <div class="text-right">
          <div class="text-14 font-600">{{ $filters.fixNumber(item.balance,item.coin==='bnb'?5:2) }}</div>
          <div class="text-12 text-[#F57753]">{{$t('assets.records.text-0')}}: <span class="font-600">{{ $filters.fixNumber(item.freeze,item.coin==='bnb'?5:2) }}</span></div>
        </div>
        <img class="w-[20px] h-[20px] ml-30" src="@/assets/image/icon/icon-arrow-right.png" alt="">
      </div>
    </router-link>

<!--    <router-link to="financialDetail" class="rounded-sm p-12 border border-solid border-[rgba(255,255,255,0.05)] flex items-center justify-between mb-10">-->
<!--      <div class="flex items-center">-->
<!--        <img class="w-[32px] h-[32px] mr-8" src="@/assets/image/token/rfx.png" alt="">-->
<!--        <div class="text-14 font-600">RFX</div>-->
<!--      </div>-->
<!--      <div class="flex items-center">-->
<!--        <div class="text-right">-->
<!--          <div class="text-14 font-600">{{ $filters.fixNumber(rfxBalance, 2) }}</div>-->
<!--          <div class="text-12 text-[#F57753]">82.256 USDT</div>-->
<!--        </div>-->
<!--        <img class="w-[20px] h-[20px] ml-30" src="@/assets/image/icon/icon-arrow-right.png" alt="">-->
<!--      </div>-->
<!--    </router-link>-->

<!--    <router-link to="financialDetail" class="rounded-sm p-12 border border-solid border-[rgba(255,255,255,0.05)] flex items-center justify-between mb-10">-->
<!--      <div class="flex items-center">-->
<!--        <img class="w-[32px] h-[32px] mr-8" src="@/assets/image/token/bnb.png" alt="">-->
<!--        <div class="text-14 font-600">BNB</div>-->
<!--      </div>-->
<!--      <div class="flex items-center">-->
<!--        <div class="text-right">-->
<!--          <div class="text-14 font-600">{{ $filters.fixNumber(bnbBalance, 4) }}</div>-->
<!--&lt;!&ndash;          <div class="text-12 text-[#8C91A2]">≈82.256 USDT</div>&ndash;&gt;-->
<!--        </div>-->
<!--        <img class="w-[20px] h-[20px] ml-30" src="@/assets/image/icon/icon-arrow-right.png" alt="">-->
<!--      </div>-->
<!--    </router-link>-->
  </div>
</template>

<style scoped lang="less">

</style>

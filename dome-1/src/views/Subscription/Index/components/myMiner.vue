<script setup>
const navList = ref([
  {id: 0, text: 'subscription.myMiner.text-0'},
  {id: 1, text: 'subscription.myMiner.text-1'},
  {id: 2, text: 'subscription.myMiner.text-2'},
])
const nav = ref(0)
</script>

<template>
  <div class="pt-25 ">
    <div class="text-16 mb-15 px-15 fonb-bold">{{ $t('subscription.myMiner.title') }}</div>
    <div class="px-15 border-b border-solid border-[#212020] flex items-center">
      <div class="flex-1 text-center  py-7 text-14" v-for="item in navList" :key="item.id" @click="nav=item.id"
           :class="{ 'bg-[#ffbc3f] text-[#0B0B0B] rounded-[8px_8px_0px_0px]':nav===item.id, 'text-[#B1A899]':nav!==item.id }">
        {{ $t(item.text) }}
      </div>
    </div>
    <div class="p-15">
      <div v-for="i in 20" class="bg-[#25201A] rounded-md p-15 mb-15">
        <div class="flex items-center border-b border-dashed border-[rgba(255,255,255,0.10)] pb-5">
          <div class="text-15 font-bold text-[#FFA800]">#365625</div>
          <div v-if="i===1"
               class="text-[10px] text-[#46BB7D] border border-solid border-[#46BB7D] rounded-sm px-4 py-2">
            {{ $t('subscription.myMiner.text-1') }}
          </div>
          <div v-if="i===2"
               class="text-[10px] text-[#B1A899] border border-solid border-[#5F5C5C] rounded-sm px-4 py-2">
            {{ $t('subscription.myMiner.text-2') }}
          </div>
        </div>
        <div class="pt-10 flex text-12">
          <div class="w-[85px] h-[85px] mr-10">
            <img src="" alt="">
          </div>
          <div class="flex-1">
            <div class="flex items-center mb-5">
              <div class="text-[#B1A899] mr-10">{{ $t('subscription.myMiner.text-3') }}</div>
              <div>100USDT</div>
            </div>
            <div class="flex items-center mb-5">
              <div class="text-[#B1A899] mr-10">{{ $t('subscription.myMiner.text-4') }}</div>
              <div>100USDT</div>
            </div>
            <div class="flex items-center mb-5">
              <div class="text-[#B1A899] mr-10">{{ $t('subscription.myMiner.text-5') }}</div>
              <div>90USDT</div>
            </div>
            <div class="flex items-center">
              <div class="text-[#B1A899] mr-10">{{ $t('subscription.myMiner.text-6') }}</div>
              <div>2025/12/20 15:30</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>

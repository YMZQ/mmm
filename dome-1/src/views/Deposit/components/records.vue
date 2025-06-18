<script setup>

</script>

<template>
  <div class="">
    <div class="border-b border-solid border-[rgba(255,255,255,0.05)]">
      <div class="text-14 font-600 px-15 pb-12 inline-block relative">
        <span>{{ $t('deposit.records.title') }}</span>
        <div class="bg-[#fff] w-[30px] h-[2px] mx-auto absolute left-1/2 -translate-x-1/2 bottom-0"></div>
      </div>
    </div>
    <div class="px-15">
        <div class="py-20 border-b border-solid border-[rgba(255,255,255,0.05)]">
          <div class="text-14 font-500 mb-14 flex items-center justify-between">
            <div>{{ $t('deposit.records.text-0') }}</div>
            <div class="text-style-1">{{ $filters.fixNumber(100,4) }} BNB</div>
          </div>
          <div class="text-12 flex items-center justify-between">
            <div class="text-[#8C91A2]">{{ $t('deposit.records.text-1') }}</div>
            <div class="font-500">2025-3-26 09:00:00</div>
          </div>
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

<script setup>

</script>

<template>
  <div class="px-16 mb-30 wow animate__animated animate__fadeInRight">

    <div class="text-18 text-center font-bold mb-12">{{ $t('home.tokenomics.title') }}</div>
    <div
        class="flex items-center justify-center w-full h-[166px] rounded-sm bg-[url(@/assets/image/home/image-bg-0-2.png)] bg-cover bg-no-repeat bg-center mb-12">
      <img class="w-[97px] h-[97px]" src="@/assets/image/home/image-1.png" alt="">
    </div>
    <div class="text-style-1 text-14 mb-10">
      {{ $t('home.tokenomics.text-0') }}
    </div>
    <div class="flex bg-[#20191a] mb-12 rounded-[0_20px_20px_0]">
      <div class="w-[9px]  bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)]"></div>
      <div class="flex-1 px-16 py-10 text-12">
        <div class="mb-2">
          <span class="mr-2">{{ $t('home.tokenomics.text-1') }}:</span>
          <span class="font-bold">RedFox(RFX)</span>
        </div>
        <div class="mb-2">
          <span class="mr-2">{{ $t('home.tokenomics.text-2') }}:</span>
          <span class="font-bold">{{ $t('home.tokenomics.text-3', {number: 8.4}) }}</span>
        </div>
        <div class="mb-2">
          <span class="mr-2">{{ $t('home.tokenomics.text-4') }}:</span>
          <span class="font-bold">BNB Chain</span>
        </div>
        <div class="mb-2">
          {{ $t('home.tokenomics.text-5') }}
        </div>
      </div>
    </div>
    <div class="text-style-1 text-14 mb-10">
      {{ $t('home.tokenomics.text-6') }}
    </div>
    <div class="flex bg-[#20191a]  mb-12 rounded-[0_20px_20px_0]">
      <div class="w-[9px]  bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)]"></div>
      <div class="flex-1 px-16 py-10 text-12">
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.tokenomics.text-7') }}:</span>
          <span> {{ $t('home.tokenomics.text-8', {'number-0': 0, 'number-1': 100}) }}</span>
        </div>
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.tokenomics.text-9') }}:</span>
          <span> {{
              $t('home.tokenomics.text-10', {
                'number-0': 5,
                'number-1': 3,
                'number-2': 2
              })
            }}</span>
        </div>
      </div>
    </div>
    <div class="text-style-1 text-14 mb-10">
      {{ $t('home.tokenomics.text-11') }}
    </div>
    <div class="flex bg-[#20191a]  mb-12 rounded-[0_20px_20px_0]">
      <div class="w-[9px]  bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)]"></div>
      <div class="flex-1 px-16 py-10 text-12">
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.tokenomics.text-12') }}:</span>
          <span> {{ $t('home.tokenomics.text-8', {'number-0': 1, 'number-1': 1.25,'text-0': 'BNB', 'text-1':'RFX'}) }}</span>
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

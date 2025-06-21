<script setup>

</script>

<template>
  <div class="px-16 mb-30 wow animate__animated animate__fadeInRight">
    <div class="text-18 text-center font-bold mb-12">{{ $t('home.architecture.title') }}</div>
    <div class="text-style-1 text-14 mb-10">
      {{ $t('home.architecture.text-0') }}
    </div>
    <div class="flex bg-[#20191a] mb-12 rounded-[0_20px_20px_0]">
      <div class="w-[9px]  bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)]"></div>
      <div class="flex-1 px-16 py-10 text-12">
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.architecture.text-1') }}:</span>
          <span>{{ $t('home.architecture.text-2') }}</span>
        </div>
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.architecture.text-3') }}:</span>
          <span>{{ $t('home.architecture.text-4') }}</span>
        </div>
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.architecture.text-5') }}:</span>
          <span>{{ $t('home.architecture.text-6') }}</span>
        </div>
        <div >
          <span class="font-bold mr-2">{{ $t('home.architecture.text-7') }}:</span>
          <span>{{ $t('home.architecture.text-8') }}</span>
        </div>
      </div>
    </div>
    <div class="text-style-1 text-14 mb-10">
      {{ $t('home.architecture.text-9') }}
    </div>
    <div class="flex bg-[#20191a] mb-12 rounded-[0_20px_20px_0]">
      <div class="w-[9px]  bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)]"></div>
      <div class="flex-1 px-16 py-10 text-12">
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.architecture.text-10') }}:</span>
          <span>{{ $t('home.architecture.text-11') }}</span>
        </div>
        <div>
          <span class="font-bold mr-2">{{ $t('home.architecture.text-12') }}:</span>
          <span>{{ $t('home.architecture.text-12', {'number-0': 0.1, 'number-1': 50, 'number-2': 50,}) }}</span>
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

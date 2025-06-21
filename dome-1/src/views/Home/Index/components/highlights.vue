<script setup>

</script>

<template>
  <div class="px-16 mb-30 wow animate__animated animate__fadeInLeft pb-40">
    <div class="text-18 text-center font-bold mb-12">{{ $t('home.highlights.title') }}</div>
    <div class="text-style-1 text-14 mb-10">
      {{ $t('home.highlights.text-0') }}
    </div>
    <div class="flex bg-[#20191a] mb-30 rounded-[0_20px_20px_0]">
      <div class="w-[9px]  bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)]"></div>
      <div class="flex-1 px-16 py-10 text-12">
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.highlights.text-1') }}:</span>
          <span>{{ $t('home.highlights.text-2') }}</span>
        </div>
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.highlights.text-3') }}:</span>
          <span>{{ $t('home.highlights.text-4') }}</span>
        </div>
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.highlights.text-5') }}:</span>
          <span>{{ $t('home.highlights.text-6') }}</span>
        </div>
        <div class="mb-2">
          <span class="font-bold mr-2">{{ $t('home.highlights.text-7') }}:</span>
          <span>{{ $t('home.highlights.text-8') }}</span>
        </div>
        <div>
          <span class="font-bold mr-2">{{ $t('home.highlights.text-9') }}:</span>
          <span>{{ $t('home.highlights.text-10') }}</span>
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

<script setup>

</script>

<template>
  <div class="relative px-16 mb-20">
    <div class="-mt-10 w-[240px] h-[240px] mx-auto text-14 font-700 flex items-center justify-center bg-[url(@/assets/image/assets/image-0.png)] bg-cover bg-no-repeat bg-center">
        <div class="pl-8">{{$t('assets.health.text-0')}}</div>
    </div>

<!--    <div class="-mt-10 w-[240px] h-[240px] mx-auto text-14 font-700 flex items-center justify-center bg-[url(@/assets/image/assets/image-1.png)] bg-cover bg-no-repeat bg-center">-->
<!--      <div class="pl-8">{{$t('assets.health.text-1')}}</div>-->
<!--    </div>-->

<!--    <div class="-mt-10 w-[240px] h-[240px] mx-auto text-14 font-700 flex items-center justify-center bg-[url(@/assets/image/assets/image-2.png)] bg-cover bg-no-repeat bg-center">-->
<!--      <div class="pl-8">{{$t('assets.health.text-2')}}</div>-->
<!--    </div>-->

<!--    <div class="text-center text-16 font-600 -mt-5 mb-20">-->
<!--      <span class="mr-4">{{$t('assets.health.text-3')}}:</span>-->
<!--      <span>2</span>-->
<!--    </div>-->
<!--    <img src="@/assets/image/assets/image-0.png" alt="">-->
<!--    <img src="@/assets/image/assets/image-1.png" alt="">-->
<!--    <img src="@/assets/image/assets/image-2.png" alt="">-->
    <div class="p-14 rounded-sm bg-[rgba(255,255,255,0.05)] backdrop-blur-[40px] text-12">
      <div class="mb-2">{{ $t('assets.health.text-4', {'number-0': 7, 'number-1': 7})}}</div>
      <div class="mb-2">{{ $t('assets.health.text-5', {'number-0': 1.5})}}</div>
      <div class="mb-2">{{ $t('assets.health.text-6', {'number-0': 0.8, 'number-1': 1.5,'number-2': 10})}}</div>
      <div>{{ $t('assets.health.text-7', {'number-0': 0.8, 'number-1': 20})}}</div>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>

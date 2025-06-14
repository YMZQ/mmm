<script setup>

</script>

<template>
  <div class="pt-15 pb-25 repeat-1">
    <div class="circle-0 absolute top-0 right-0"></div>
    <div class="px-15 mb-30 flex items-center justify-between">
      <div class="text-16 font-500">{{ $t('home.miners.title') }}</div>
      <router-link to="/" class="text-14">
        <span>{{ $t('home.miners.text-0') }}</span>
        <van-icon name="arrow" color="#b1a899"/>
      </router-link>
    </div>
    <div>
      <div
          class="wow animate__animated animate__flipInY w-[123px] h-[102px] mx-auto bg-[url(@/assets/image/home/image-bg-1.png)] bg-no-repeat bg-center bg-cover">
        <!--        <img class="w-[67px] h-[67px] mx-auto floating-image" src="@/assets/image/home/image-4.png" alt="">-->
        <div class="text-center">
          <CountUp :number="156132"/>
        </div>
      </div>
      <div class="-mt-20 mb-15 text-14 text-[#B1A899] text-center">{{ $t('home.miners.text-1') }}(BYTX)</div>
      <div class="flex justify-center">
        <router-link to="" class="button-style-1 inline-block  pb-10  text-center text-[#0B0B0B] text-16">
          <div class="-mt-1 min-w-[135px] mb-9 w-full h-[1px] bg-[linear-gradient(270deg,rgba(255,255,255,0.00)_5.51%,#FFF_45.77%,rgba(255,255,255,0.00)_86.53%)]"></div>
          <div>{{$t('home.miners.text-2')}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.circle-0 {
  width: 202px;
  height: 202px;
  background-color: #F90;
  filter: blur(190px);
}

:deep(.countup-wrap) {
  span {
    font-size: 20px;
    font-weight: bold;
    background: var(--Linear, linear-gradient(96deg, #FFE605 3.94%, #F90 97.26%));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.button-style-1{
  border-radius: 20px;
  background: linear-gradient(96deg, #FFE605 3.94%, #F90 97.26%);
  box-shadow: 0  0  4px 0  rgba(255, 163, 5, 0.50);
}
</style>

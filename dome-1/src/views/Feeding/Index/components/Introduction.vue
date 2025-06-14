<script setup>

</script>

<template>
  <div class="relative  h-[277px]">
    <video
        poster="@/assets/image/home/image-14.png"
        loop autoplay  playsinline muted
    >
      <source src="https://www.earthcoin.vip/resource/home.mp4" type="video/mp4"/>
    </video>
    <div class="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-between py-20">
      <div class="text-style-1 text-center">{{
          $t('feeding.introduction.text-1')
        }}
      </div>
     <div class="flex">

       <a href="https://pancakeswap.finance/swap?inputCurrency=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c&outputCurrency=0x8B9251A60538728eBCA337AFdc9516D1B0991209&chainId=56" target="_blank" class="w-[130px] block mx-auto bg-[#ffffff]  rounded-sm text-center py-9 border border-solid border-[#000] shadow-[2px_2px_0px_0px_#000] text-16 text-[#1C3B5E] font-600 relative">
         Swap
       </a>
       <router-link to="/about" class="w-[130px] ml-20 block mx-auto bg-[#56e8ff]  rounded-sm text-center py-9 border border-solid border-[#000] shadow-[2px_2px_0px_0px_#000] text-16 text-[#1C3B5E] font-600 relative">
         {{
           $t('feeding.introduction.text-0')
         }}
       </router-link>
     </div>
    </div>
  </div>
</template>

<style scoped lang="less">
video {
  width: 100%;
  height: 100%;
  -o-object-fit: cover !important;
  object-fit: cover !important;
}
:deep(.van-button--default) {
  margin: 0 auto!important;
  position: relative;
  border-radius: 8px !important;
  color: #1C3B5E !important;
  border: 1px solid #000 !important;
  background: #56E8FF !important;
  box-shadow: 2px 2px 0 0 #000 !important;

  .van-button__text {
    width: 100%;
  }
}
.text-style-1 {
  color: #FFA527;
  text-shadow: 2px 2px 0px #292C2F;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #070707;
  font-family: "RammettoOne-Regular";
  font-size: 21px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 30.8px */
}
</style>

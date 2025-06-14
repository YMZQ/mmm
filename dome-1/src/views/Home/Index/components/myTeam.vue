<script setup>

import copyToClipboard from "@/utils/clipboard";

const props = defineProps({
  shareLink: {
    type: String
  },
})

</script>

<template>
  <div class="pt-15 px-15 mb-25 ">
    <div class=" mb-15">
      <div class="text-16 font-500">{{ $t('home.team.title') }}</div>
    </div>
    <div class="p-15 w-[345px] h-[174px] bg-[url(@/assets/image/home/image-bg-2.png)] bg-cover bg-no-repeat bg-center">
      <div class="flex items-center mb-10">
        <div class="text-14 mr-10">{{ $t('home.team.text-0') }}</div>
        <div class="border-style-1 px-10">V1</div>
      </div>
      <div
          class="p-10 rounded-[10px] bg-[linear-gradient(274deg,rgba(255,255,255,0.00)_9.17%,rgba(255,255,255,0.10)_96.61%)]">
        <div class="mb-10">
          <div class="text-12 mb-5 text-[#B1A899]">{{ $t('home.team.text-1') }}</div>
          <div class="flex items-center">
            <div class="text-14">https://www.phjgdhsgfk.com</div>
            <img @click="copyToClipboard(shareLink)" class="ml-5 w-[16px] h-[16px]" src="@/assets/image/icon/icon-copy.png" alt="">
          </div>
        </div>
        <div>
          <div class="text-12 mb-5 text-[#B1A899]">{{ $t('home.team.text-2') }}</div>
          <div class="flex items-center">
            <div class="text-14">YI5358</div>
            <img @click="copyToClipboard(shareLink)" class="ml-5 w-[16px] h-[16px]" src="@/assets/image/icon/icon-copy.png" alt="">
          </div>
        </div>
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
.border-style-1 {
  background: linear-gradient(96deg, #FFE605 3.94%, #F90 97.26%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-radius: 4px;
  position: relative;
  --border-width: 1px;
  --border-radius: 4px;
  --border-color: linear-gradient(96deg, #FFE605 3.94%, #F90 97.26%);

  &::after {
    content: "";
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: var(--border-width);
    border-radius: var(--border-radius);
    background: var(--border-color);
    /* 随便定义一个颜色 */
    --mask-bg: linear-gradient(#000, #000);
    /* 类似background-clip */
    --mask-clip: content-box, padding-box;
    /* mask允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域 */
    /* mask-image类似background-image 设置了用作元素蒙版层的图像，默认值为none，值为透明图片，或透明渐变 */
    -webkit-mask-image: var(--mask-bg), var(--mask-bg);
    /* 默认值为border-box，可选值与background-origin相同 */
    -webkit-mask-clip: var(--mask-clip);
    /* exclude排除，只显示不重合的地方,Firefox支持4个属性 */
    mask-composite: exclude;
    /* 只显示下方遮罩，重合的地方不显示 */
    -webkit-mask-composite: destination-out;
  }
}
</style>

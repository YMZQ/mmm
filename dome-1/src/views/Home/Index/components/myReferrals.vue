<script setup>

const props = defineProps({
  address: {
    type: String
  },
  directList: {
    type: Array,
    default: () => []
  }
})

const getImageUrl = (name) => {
  return new URL(`/src/assets/image/empty-img/${name}.png`, import.meta.url).href;
}
</script>

<template>
  <div class="pt-15 px-15 mb-25 ">
    <div class="mb-15 text-16 font-500">{{ $t('home.referrals.title') }}</div>
    <div>
      <div class="bg-[rgba(255,255,255,0.10)] p-15 rounded-md">
        <div class="flex items-center border-b border-dashed border-[rgba(255,255,255,0.10)] pb-7 mb-10">
          <div class="text-14 font-bold mr-5">Ox2568...57568</div>
          <div class="border-style-1 px-10">V1</div>
        </div>
        <div class="grid grid-cols-2 gap-y-[5px] text-12">
          <div class="text-[#B1A899]">{{ $t('home.referrals.text-0') }}</div>
          <div class="text-[#B1A899] text-right">{{ $t('home.referrals.text-1') }}</div>
          <div>0</div>
          <div class="text-right">0</div>
        </div>
      </div>
      <div v-if="directList.length===0">
        <van-empty :image="address?getImageUrl('img'):getImageUrl('img-1')" :description="$t('暂无数据')"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">



.circle-1 {
  width: 103px;
  height: 103px;
  flex-shrink: 0;
  background-color: #0DACF6;
  filter: blur(93px);
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

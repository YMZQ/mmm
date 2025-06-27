<script setup>
const props = defineProps({
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
  <div class="">
    <div class="border-b border-solid border-[rgba(255,255,255,0.05)]">
      <div class="text-14 font-600 px-15 pb-12 inline-block relative">
        <span>{{ $t('community.my.title') }}</span>
        <div class="bg-[#fff] w-[30px] h-[2px] mx-auto absolute left-1/2 -translate-x-1/2 bottom-0"></div>
      </div>
    </div>
    <div class="px-15">
      <div v-for="item in directList" class="py-20 border-b border-solid border-[rgba(255,255,255,0.05)]">
        <div class="text-14 font-500 mb-16 flex items-center justify-between">
          <div class="flex items-center">
            <div>UID:{{ item.uid }}</div>
            <div class="ml-4 inline-block px-6 py-2 bg-[rgba(255,255,255,0.20)] rounded-[2px] text-[#EA3400] text-12">
              {{ $t('community.my.text-3') }}
            </div>
          </div>
          <div>
            {{ $t('community.my.text-0') }} <span class="text-style-1">{{ item.level }}</span>
          </div>
        </div>
        <div class="text-12 text-center flex items-center justify-between">
          <div>
            <div class="font-600 mb-4">{{ $filters.fixNumber(item.thisAmount, 5) }} BNB</div>
            <div class="text-[#8C91A2]">{{ $t('community.my.text-1') }}</div>
          </div>
          <div>
            <div class="font-600 mb-4">{{ $filters.fixNumber(item.teamAmount, 5) }} BNB</div>
            <div class="text-[#8C91A2]">{{ $t('community.my.text-2') }}</div>
          </div>
        </div>
      </div>
      <div v-if="directList.length===0">
        <van-empty :image="getImageUrl('img-1')" :description="$t('common.noData')"/>
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

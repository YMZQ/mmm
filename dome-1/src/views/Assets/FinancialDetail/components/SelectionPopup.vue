<template>
  <van-popup
      :show="show"
      @update:show="val => emit('update:show', val)"
      round
      position="bottom"
      class="popup-info"
      closeable
      :close-icon="getImageUrl('icon_tips_close')"
      :overlay-style="{ backgroundColor: 'transparent' }"
  >
    <div class="max-w-[375px] mx-auto bg-[#1d1d1d] p-20 pt-15">
      <div class="text-16 pb-15 font-600">{{ title }}</div>
      <div class="pb-20">
        <div
            v-for="item in list"
            :key="item.value"
            @click="selectItem(item)"
            class="py-10 text-center text-16 font-400 flex items-center justify-between"
        >
          <div>{{ $t(item.text) }}</div>
          <div class="flex items-center">
            <van-icon v-if="modelValue !== item.value" name="circle" color="#6e6e6e" size="18px" />
            <van-icon v-if="modelValue === item.value" name="checked" color="#fff" size="18px" />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-[13px] text-16">
        <div class="bg-[#454545] py-10 text-center rounded-[100px] font-600" @click="onReset">
          {{ $t('financialDetail.text-4') }}
        </div>
        <div
            class="bg-[linear-gradient(180deg,#FFB59F_0%,#EA3400_100%)] py-10 text-center rounded-[100px] font-600"
            @click="onConfirm"
        >
          {{ $t('financialDetail.text-5') }}
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  modelValue: null,
  list: Array,
  title: String,
})

const emit = defineEmits(['update:show', 'update:modelValue', 'reset', 'confirm'])

const selectItem = (item) => {
  emit('update:modelValue', item.value)
}

const onReset = () => {
  emit('reset')
  emit('update:show', false)
}

const onConfirm = () => {
  emit('confirm')
  emit('update:show', false)
}

const getImageUrl = (name) => {
  return new URL(`/src/assets/image/icon/${name}.png`, import.meta.url).href
}
</script>

<style scoped>
.popup-info {
  --van-popup-background: transparent;
  backdrop-filter: blur(10px);
}
</style>

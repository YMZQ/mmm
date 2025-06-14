<script setup>
import {Image, Loading} from 'vant'

const props = defineProps({
  size: {
    type: [String, Number],
    default: 16,
  },
  src: {
    type: String,
    default: '',
  },
  theme: {
    type: String,
    default: 'blue',
  },
})
</script>

<template>
  <Image fit="cover" class="y-image-loading" :class="props.theme" v-bind="props" :src="props.src" lazy-load>
    <template #loading>
      <Loading type="spinner" :size="size"/>
    </template>
  </Image>
</template>

<style lang="less" scoped>
.y-image-loading {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(.van-image__loading) {
    background: transparent;
  }

  :deep(.van-loading) {
    color: #ffffff !important;
  }

  :deep(.van-image__error) {
    background: transparent;
  }

  &.white {
    :deep(.van-image__loading) {
      background: #FFFFFF;
    }

    :deep(.van-loading) {
      color: var(--van-loading-spinner-color) !important;
    }
  }
}
</style>

<template>
  <van-nav-bar :title="title" @click-left="handleBack" fixed left-arrow placeholder safe-area-inset-top :z-index="2001"
               :border="false">
    <template #left>
      <img class="w-[24px] h-[24px]" src="@/assets/image/icon/icon-arrow-left.png" alt="">
    </template>
    <template #right>
      <img v-if="isShow" @click="navigateTo" class="icon-record" src="@/assets/image/icon/icon-record.png" alt="">
      <slot></slot>
    </template>
  </van-nav-bar>
</template>

<script setup>
import {useRouter, useRoute} from 'vue-router'
import {storeToRefs} from 'pinia'
import {appStore} from '@/stores'

const {user, language} = storeToRefs(appStore());
const {toUrl, isShow, title} = defineProps({
  title: String,
  toUrl: String,
  isShow: Boolean
});
const router = useRouter()
const route = useRoute()
const setLanguage = () => {
  getCurrentInstance().proxy.$i18n.locale = language.value;
}

const navigateTo = () => {
  router.push(toUrl);
}

const handleBack = () => {
  route.name === "inProgress" ? router.push('/game') : route.name === "completed" ? router.push('/game') : router.go(-1);
}

onMounted(setLanguage);
</script>

<style lang="less" scoped>
:deep(.van-nav-bar__placeholder) {
  box-sizing: border-box;
}


:deep(.van-nav-bar) {
  box-sizing: border-box;
  //background: #23052b;


  .icon-record {
    width: 24px;
    height: 24px;
  }
}
</style>

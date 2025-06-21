<script setup>
import Info from './components/info.vue'
import My from './components/my.vue'
import {_getCommunity} from "@/service/community";

import {storeToRefs} from "pinia";
import {appStore} from "@/stores";
const store = appStore();
const {user, address, globalConfig} = storeToRefs(store);

const directList = ref([])
const shareLink = ref(null)
const info = ref({
  upBnbProfit: 0,
  downBnbProfit: 0,
  level: 0,
});
const init = async () => {
  const response = await _getCommunity();
  directList.value = response.directList
  Object.assign(info.value, {
    upBnbProfit: response.upBnbProfit,
    downBnbProfit: response.downBnbProfit,
    level: response.level
  })
  shareLink.value = `${window.location.protocol}//${window.location.host}/#/home?code=${user.value.code}`;
};
onMounted(() => {
  init();
});
</script>

<template>

  <div class="pt-[46px] relative">
    <div
        class="absolute top-0 left-0 w-full h-svh bg-[url(@/assets/image/community/image-bg-0.png)] bg-cover bg-no-repeat bg-center"></div>
    <Header ref="header"></Header>
    <section id="info">
      <Info :shareLink="shareLink" :info="info"/>
    </section>
    <section id="my">
      <My :directList="directList"/>
    </section>
  </div>
</template>

<style scoped lang="less">
</style>

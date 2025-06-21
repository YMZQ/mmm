<script setup>
import Health from './components/health.vue'
import Features from './components/features.vue'
import Records from './components/records.vue'
import WithdrawModal from './components/withdrawModal.vue'
import {_getCommunity} from "@/service/community";

const showWithdrawModal = ref(false)


const assetList = ref([{id: 0, text: 'BNB', value: 'bnb', number: 100}, {
  id: 1,
  text: 'RFX',
  value: 'rfx',
  number: 100
}])
const healthInfo= ref({})

const init = async () => {
  const response = await _getCommunity();
  assetList.value = response
}

onMounted(init);
</script>

<template>
  <div class="pt-[46px] relative">
    <div
        class="absolute top-0 left-0 w-full h-svh bg-[url(@/assets/image/assets/image-bg-0.png)] bg-cover bg-no-repeat bg-center"></div>
    <Header ref="header"></Header>
    <section id="health">
      <Health :healthInfo="healthInfo"/>
    </section>
    <section id="features">
      <Features @click-extract="showWithdrawModal = true"/>
    </section>
    <section id="records">
      <Records/>
    </section>
    <WithdrawModal v-model:show="showWithdrawModal" @callback="init" :assetList="assetList"/>
  </div>
</template>
<style scoped lang="less">
</style>

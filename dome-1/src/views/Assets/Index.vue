<script setup>
import Health from './components/health.vue'
import Features from './components/features.vue'
import Records from './components/records.vue'
import WithdrawModal from './components/withdrawModal.vue'
import {_getAssets} from "../../service/assets";

const showWithdrawModal = ref(false)
const rfxBalance = ref(0)
const bnbBalance = ref(0)

const list = ref([])
const healthScore = ref(null)

const init = async () => {
  const response = await _getAssets();
  bnbBalance.value = response.bnbBalance
  rfxBalance.value = response.rfxBalance
  list.value[0] = {
    id: 0,
    coin: 'rfx',
    balance: response.rfxBalance
  }
  list.value[1] = {
    id: 1,
    coin: 'bnb',
    balance: response.bnbBalance
  }
  // console.log(list.value)

  healthScore.value = response.healthScore
  showWithdrawModal.value = false
}

onMounted(async () => {
  await init();
});
</script>

<template>
  <div class="pt-[46px] relative">
    <div
        class="absolute top-0 left-0 w-full h-svh bg-[url(@/assets/image/assets/image-bg-0.png)] bg-cover bg-no-repeat bg-center"></div>
    <Header ref="header"></Header>
    <section id="health">
      <Health :healthScore="healthScore"/>
    </section>
    <section id="features">
      <Features @click-extract="showWithdrawModal = true"/>
    </section>
    <section id="records">
      <Records :bnbBalance="bnbBalance" :rfxBalance="rfxBalance"/>
    </section>
    <WithdrawModal v-model:show="showWithdrawModal" @callback="init" :assetList="list"/>
  </div>
</template>
<style scoped lang="less">
</style>

<script setup>
import Health from './components/health.vue'
import Features from './components/features.vue'
import Records from './components/records.vue'
import WithdrawModal from './components/withdrawModal.vue'
import {_getAssets} from "../../service/assets";

const showWithdrawModal = ref(false)


const assetList = ref([])
const healthScore= ref(null)

const init = async () => {
  const response = await _getAssets();
  console.log(response.walletList)
  assetList.value = response.walletList
  healthScore.value = response.healthScore
}

onMounted(init);
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
      <Records :assetList="assetList"/>
    </section>
    <WithdrawModal v-model:show="showWithdrawModal" @callback="init" :assetList="assetList"/>
  </div>
</template>
<style scoped lang="less">
</style>

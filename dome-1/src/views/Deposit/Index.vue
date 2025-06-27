<script setup>
import ComputingPower from './components/computingPower.vue'
import Rules from './components/rules.vue'
import Records from './components/records.vue'
import {storeToRefs} from "pinia";
import {appStore} from "@/stores";
import Web3 from "@/utils/web3js/bnbWeb3";
import {_getDeposit} from "@/service/deposit";

const store = appStore();
const {user, address, globalConfig} = storeToRefs(store);
const recordRef= ref(null)
const balances = ref({
  bnbBalance: null
})
const depositInfo = ref({
  thisAmount: 0,
  todayOutput: 0,
  totalOutput: 0,
  surplusAmount: 0,
  minInAmount: 0,
});

async function getBalances(address) {

  const nativePromise = Web3.getBalance(address)
  const [bnbBalance] = await Promise.all([
    nativePromise
  ])
  return {bnbBalance}
}

const fetchData = async () => {
  try {
    const [response] = await Promise.all([_getDeposit()]);
    Object.assign(depositInfo.value, {
      thisAmount: response.thisAmount,
      todayOutput: response.todayOutput,
      totalOutput: response.totalOutput,
      surplusAmount: response.surplusAmount,
      minInAmount: response.minInAmount,
    })
    if (user.value.username) {
      balances.value = await getBalances(user.value.username)
    }
  } catch (error) {
    console.error("common.dataFetchFail", error);
  }
};


const init = async () => {
  await fetchData();
};
const handleReset = () => {
  recordRef.value.resetFun()
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="">
    <Header ref="header"></Header>
    <section id="computingPower">
      <ComputingPower :balances="balances" :depositInfo="depositInfo" @callback="handleReset"/>
    </section>
    <section id="rules">
      <Rules/>
    </section>
    <section id="records">
      <Records ref="recordRef"/>
    </section>
  </div>
</template>

<style scoped lang="less">
</style>

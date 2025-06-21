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

const balances = ref({
  bnbBalance: null
})
const depositInfo = ref({
  breedingPrice: 0,
  elpBreedingPrice: 0,
  usdtBreedingPrice: 0,
  bnbBreedingPrice: 0,
  totalBreedingAmount: 0,
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
      breedingPrice: response.breedingPrice,
      elpBreedingPrice: response.elpBreedingPrice,
      usdtBreedingPrice: response.usdtBreedingPrice,
      bnbBreedingPrice: response.bnbBreedingPrice,
      totalBreedingAmount: response.totalBreedingAmount,
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



onMounted(() => {
  init();
});
</script>

<template>
  <div class="">
    <Header ref="header"></Header>
    <section id="computingPower">
      <ComputingPower :balances="balances"/>
    </section>
    <section id="rules">
      <Rules/>
    </section>
    <section id="records">
      <Records/>
    </section>
  </div>
</template>

<style scoped lang="less">
</style>

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
  thisAmount: 0,
  todayOutput: 0,
  totalOutput: 0,
  surplusAmount: 0,
  minInAmount: 0,
});

async function getBalances(address) {
  console.log('123123')
  console.log(address)
  const nativePromise =await Web3.getBalance(address)
  console.log(nativePromise)
  // const [bnbBalance] = await Promise.all([
  //   nativePromise
  // ])
  // console.log(123123)
  // console.log(bnbBalance)
  // console.log(567)
  // return {bnbBalance}
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
      let bnbBalances = await getBalances(user.value.username)
      balances.value.bnbBalances = bnbBalances
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
      <ComputingPower :balances="balances" :depositInfo="depositInfo"/>
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

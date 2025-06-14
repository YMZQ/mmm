<script setup>
import Introduction from './components/Introduction.vue';
import Joint from './components/Joint.vue';
import Feed from './components/Feed.vue';
import AssetRecord from './components/AssetRecord.vue';
import Team from './components/Team.vue';
import {_getAssetRecords, _getFeeding} from "@/service/feeding";
import {storeToRefs} from "pinia";
import {appStore} from "@/stores";
import Web3 from "@/utils/web3js/bnbWeb3";
import {tokenAbi} from "@/utils/web3js/abi/tokenAbi";
import {useRouter} from "vue-router";
import {_loginOut} from "@/service/user";

const store = appStore();
const {user, address, globalConfig} = storeToRefs(store);
const walletBalance = ref(0)
const router = useRouter();


const code = ref(router.currentRoute.value.query.code || '');


const assetRecords = ref([])
const directList = ref([])
const teamInfo = ref({
  maxAmount: 0,
  minAmount: 0,
  grade: 0
})
const balances = ref({
  eacBalance: null,
  oldEacBalance: null,
  usdtBalance: null,
  bnbBalance: null
})
const feedInfo = ref({
  breedingPrice: 0,
  totalBreedingAmount: 0,
  eacToUsdt: 0,
  oldEacToUsdt: 0,
  eacToBnb: 0,
  balance: 0,
  totalProfit: 0
})
const jointInfo = ref({
  minIdoAmount: 0,
  maxIdoAmount: 0,
})
const shareLink = ref(null)

async function getBalances(address) {
  const eacPromise = Web3.getTokenBalance({
    account: address,
    tokenAbi,
    tokenAddress: globalConfig.value.eac,
  })
  const oldEacPromise = Web3.getTokenBalance({
    account: address,
    tokenAbi,
    tokenAddress: globalConfig.value.oldEacContract,
  })
  const usdtPromise = Web3.getTokenBalance({
    account: address,
    tokenAbi,
    tokenAddress: globalConfig.value.usdt,
  })
  //
  const nativePromise = Web3.getBalance(address)
  // const [eacBalance,oldEacBalance, usdtBalance, nativeBalance] = await Promise.all([
  //   eacPromise,
  //   oldEacPromise,
  //   usdtPromise,
  //   nativePromise,
  // ])

  const [eacBalance, oldEacBalance, usdtBalance, bnbBalance] = await Promise.all([
    eacPromise,
    oldEacPromise,
    usdtPromise,
    nativePromise,
  ])
  return {eacBalance, oldEacBalance, usdtBalance, bnbBalance}
}

// 调用示例

// 主动获取 Token 余额
const getTokenBalance = async () => {
  try {
    if (!address.value) {
      walletBalance.value = 0
      return
    }
    balances.value = await getBalances(address.value)
    walletBalance.value = balances.value.eacBalance
  } catch (error) {
    console.error('获取 Token 余额失败:', error)
  }
}

const getAssetRecords = async () => {
  const result = await _getAssetRecords({
    pageNo: 1,
    pageSize: 5,
  });
  assetRecords.value = result.page.pageItems

};

const loginOut = async () => {
  await _loginOut();
  store.$patch({
    address: "",
    token: "",
    user: [],
    info: [],
  });
  setTimeout(() => {
    window.location.reload();
  }, 500);
};
const fetchData = async () => {
  try {
    const [response] = await Promise.all([_getFeeding()]);
    directList.value = response.directList
    Object.assign(feedInfo.value, {
      breedingPrice: response.breedingPrice,
      totalBreedingAmount: response.totalBreedingAmount,
      eacToUsdt: response.eacToUsdt,
      oldEacToUsdt: response.oldEacToUsdt,
      eacToBnb: response.eacToBnb,
      balance: response.balance,
      totalProfit: response.totalProfit,
      totalBreedingUsdtAmount: response.totalBreedingUsdtAmount,
      surplusProfit: response.surplusProfit,
      pool: response.pool,
      feeRatio: response.feeRatio,
    })

    Object.assign(jointInfo.value, {
      minIdoAmount: response.minIdoAmount,
      maxIdoAmount: response.maxIdoAmount,
    })

    if (user.value.username) {
      Object.assign(teamInfo.value, {
        maxAmount: response.maxAmount,
        minAmount: response.minAmount,
        grade: response.grade,
        thisAmount: response.thisAmount,
      })
      shareLink.value = `${window.location.protocol}//${window.location.host}/#/home?code=${user.value.code}`;
      await Promise.all([getTokenBalance(), getAssetRecords()]);
    }
  } catch (error) {
    console.error("数据获取失败:", error);
  }
};

const init = async () => {
  // 邀请码逻辑
  if (code.value) {
    store.changeCode(code.value);
  }

  // 初始化数据拉取
  try {
    await fetchData();
  } catch (error) {
    console.error('初始化数据失败:', error);
  }
};

watch(
    [() => user.value.username, address],
    async ([newUsername, newAddress]) => {
      // 处理邀请码更新
      if (code.value) {
        store.changeCode(code.value);
      }

      // 处理余额更新
      if (!newAddress) {
        walletBalance.value = 0;
        return;
      }
      if (!user.value.username) return;
      try {
        await init();
      } catch (error) {
        console.error("请求失败:", error);
      }
    },
    {immediate: true}
);


onMounted(() => {
  init();
});

</script>

<template>
  <div class="pt-[46px] overflow-hidden">
    <Header ref="header"></Header>
    <Introduction></Introduction>
<!--    <Joint :balances="balances" :jointInfo="jointInfo" @callback="init"></Joint>-->
    <Feed :balances="balances" :feedInfo="feedInfo" @callback="init"></Feed>
    <AssetRecord :address="address" :assetRecords="assetRecords"></AssetRecord>
    <Team :address="address" :directList="directList" :teamInfo="teamInfo" :shareLink="shareLink"/>
    <a href="https://t.me/DX_LOVE" target="_blank" class="w-[54px] h-[54px] fixed right-10 bottom-20">
      <img class="w-[54px] h-[54px]" src="@/assets/image/home/image-17.png" alt="">
    </a>
  </div>
</template>

<style scoped lang="less">

</style>

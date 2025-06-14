import {showFailToast} from "vant";
import web3Utils from '@/utils/web3js/web3-utils.min'
import {targetChainId, nativeNetwork} from '@/config/network'
import {fanPoolAbi,} from '@/utils/web3js/abi/fanPoolAbi'
import {oilTankPoolAbi} from '@/utils/web3js/abi/oilTankPoolAbi'
import {aceBizAbi, aceBizAddress,fanPoolAddress,oilTankPoolAddress} from '@/utils/web3js/abi/aceBizAbi'

async function getAccountAndSignMessage() {
  try {
    // const isChainid = await web3Utils.checkChainId(targetChainId, nativeNetwork);
    // if (!isChainid) return;
    const {account, signature} = await web3Utils.getAccountAndSignMessage();
    return {account, signature};
  } catch (error) {
    showFailToast.error(error.message || error);
  }
}

/**
 * @param {Object} param
 * @param {string} param.authorizedAddress - 授权地址
 * @param {number} param.authorizationAmount - 授权金额
 * @param {string} param.authorizedLimit - 金额
 * @param {string} param.token - 代币
 * @param {Array}  param.tokenAbi - 代币 ABI
 * @param {string} param.tokenAddress - 代币地址
 * @param {string} param.businessAddress - 合约ABI
 * @returns
 */
async function authorization(param) {
  return await web3Utils.getTokenContractApprove(param);
}

/**
 * @param {Object} param
 * @param {string} param.account - 合约方法名
 * @param {string} param.tokenAddress - 合约地址
 * @param {Array} param.tokenAbi - 合约 ABI
 * @returns
 */
async function getTokenBalance(param) {
  return await web3Utils.getTokenBalance(param);
}

async function getBalance(account) {
  return await web3Utils.getBalance(account);
}


async function sendEther(param) {
  return await web3Utils.sendEther({to: param.to, amount: web3Utils.parseUnits(param.amount)});
}



// 业务合约接口
// airdrop 空投
// ido  私募
// addLp  添加Lp
// lpPledge  lp质押
// unLpPledge  解除Lp质押
// coinPledge  代币质押
// unCoinPledge   解除代币质押
// coinBurn  代币销毁
// outAssets   领取收益

async function sendAirdrop(param) {
  const method = 'airdrop';
  const params = [
    web3Utils.parseUnits(param.payAmount),
    web3Utils.parseUnits(param.callAmount),
    web3Utils.parseUnits(param.deadAmount),
    web3Utils.parseUnits(param.lockAmount),
    param.deadline,
    param.sign,
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendPrivateSale(param) {
  const method = 'ido';
  const params = [
    web3Utils.parseUnits(param.amount),
    web3Utils.parseUnits(param.payAmount),
    web3Utils.parseUnits(param.callAmount),
    web3Utils.parseUnits(param.deadAmount),
    web3Utils.parseUnits(param.lockAmount),
    web3Utils.parseUnits(param.parentAmount),
    param.parentAddress,
    param.deadline,
    param.sign,
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}
async function sendBurn(param) {
  const method = 'coinBurn';
  const params = [
    web3Utils.parseUnits(param.amount),
    web3Utils.parseUnits(param.burnAmount),
    web3Utils.parseUnits(param.baodiAmount),
    param.deadline,
    param.sign,
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendLpMint(param) {
  const method = 'addLp';
  const params = [
    web3Utils.parseUnits(param.amount),
    {
      value: web3Utils.parseUnits(param.amount),
    }
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendLpPledge(param) {
  const method = 'lpPledge';
  const params = [
    web3Utils.parseUnits(param.num),
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendUnLpPledge(param) {
  const method = 'unLpPledge';
  const params = [];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendTokenPledge(param) {
  const method = 'coinPledge';
  const params = [
    web3Utils.parseUnits(param.num),
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendUnTokenPledge(param) {
  const method = 'unCoinPledge';
  const params = [];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}


// async function sendOutAssets(param) {
//   const method = 'outAssets';
//   const params = [
//     web3Utils.parseUnits(param.amount),
//     web3Utils.parseUnits(param.fee),
//     param.nonce,
//     param.serviceType,
//     param.orderNumber,
//     param.coinAddress,
//     param.deadline,
//     param.sign,
//   ];
//   const options = {
//     method,
//     params,
//     businessAddress: aceBizAddress,
//     businessAbi: aceBizAbi
//   }
//   return await web3Utils.sendTransaction(options);
// }

//   添加Lp
// lpPledge  lp质押
// unLpPledge  解除Lp质押
// coinPledge  代币质押
// unCoinPledge   解除代币质押
// coinBurn  代币销毁
// outAssets   领取收益

async function sendFanPool(param) {
  const method = 'swap';
  const params = [
    web3Utils.parseUnits(param.amount),
    param.coinAddress,
    param.deadline,
    param.sign,
  ];
  const options = {
    method,
    params,
    businessAddress: fanPoolAddress,
    businessAbi: fanPoolAbi
  }
  return await web3Utils.sendTransaction(options);
}
async function sendOilTankPoolSwap(param) {
  const method = 'swap';
  const params = [
    param.fromCoin,
    param.toCoin,
    web3Utils.parseUnits(param.num),
  ];
  const options = {
    method,
    params,
    businessAddress: oilTankPoolAddress,
    businessAbi: oilTankPoolAbi
  }
  return await web3Utils.sendTransaction(options);
}

// buyWhite 购买白名单
// luckyDonate 幸运捐赠
// mintNft 铸造NFT
// pledgeGrade 质押等级
// unPledgeGrade 解除质押等级
// inAssets 入金
// outAssets 出金

async function sendBuyWhite(param) {
  const method = 'buyWhite';
  const params = [
    web3Utils.parseUnits(param.payAmount),
    web3Utils.parseUnits(param.parentAmount),
    param.parentAddress,
    param.deadline,
    param.sign,
    {
      value: web3Utils.parseUnits(param.payAmount),
    }
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendLuckyDonate(param) {
  const method = 'luckyDonate';
  const params = [
    web3Utils.parseUnits(param.payAmount),
    web3Utils.parseUnits(param.poolAmount),
    web3Utils.parseUnits(param.parentAmount),
    param.parentAddress,
    param.deadline,
    param.sign,
    {
      value: web3Utils.parseUnits(param.payAmount),
    }
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}
async function sendMintNft(param) {
  const method = 'mintNft';
  const params = [
    param.nonce,
    param.tokenId,
    param.deadline,
    param.sign,
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendPledgeGrade(param) {
  const method = 'pledgeGrade';
  const params = [
    web3Utils.parseUnits(param.payAmount),
    param.grade,
    param.coinAddress,
    param.deadline,
    param.sign,
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendUnPledgeGrade(param) {
  const method = 'unPledgeGrade';
  const params = [
    web3Utils.parseUnits(param.payAmount),
    param.grade,
    param.coinAddress,
    param.deadline,
    param.sign,
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendInAssets(param) {
  const method = 'inAssets';
  const params = [
    web3Utils.parseUnits(param.amount),
    param.coinAddress,
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendOutAssets(param) {
  const method = 'outAssets';
  const params = [
    web3Utils.parseUnits(param.amount),
    web3Utils.parseUnits(param.fee),
    param.nonce,
    param.orderNumber,
    param.coinAddress,
    param.deadline,
    param.sign,
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendBreeding(param) {
  const method = 'breeding';
  const params = [
    web3Utils.parseUnits(param.payAmount),
    param.coinAddress,
    param.deadline,
    param.sign,
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}
async function sendAddLpBreeding(param) {
  const method = 'addLpBreeding';
  const isNativeToken = param.payCoinAddress === "0x0000000000000000000000000000000000000000";
  const baseParams = [
    web3Utils.parseUnits(param.payAmount),
    param.addLpRatio,
    param.payCoinAddress,
    param.eacAddress,
    param.deadline,
    param.sign,
  ];
  const params = isNativeToken ? [...baseParams, { value: web3Utils.parseUnits(param.payAmount) }] : baseParams;
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

async function sendIdo(param) {
  const method = 'ido';
  const params = [
    web3Utils.parseUnits(param.payAmount),
    param.coinAddress,
    param.deadline,
    param.sign,
    {
      value:web3Utils.parseUnits(param.payAmount)
    }
  ];
  const options = {
    method,
    params,
    businessAddress: aceBizAddress,
    businessAbi: aceBizAbi
  }
  return await web3Utils.sendTransaction(options);
}

export default {
  authorization,
  getAccountAndSignMessage,
  getTokenBalance,
  getBalance,
  sendAirdrop, // 空投
  sendPrivateSale, // 私募
  sendLpMint, // 铸造
  sendLpPledge, // lp质押
  sendUnLpPledge, // 解除lp质押
  sendTokenPledge, // token质押
  sendUnTokenPledge, // 解除token质押
  // sendOutAssets,// 领取收益
  sendBurn,// 燃烧挖矿
  sendOilTankPoolSwap,// 燃烧挖矿
  sendFanPool,// 燃烧挖矿

  sendBuyWhite,
  sendLuckyDonate,
  sendMintNft,
  sendPledgeGrade,
  sendUnPledgeGrade,
  sendOutAssets,
  sendInAssets,
  sendEther,

  sendBreeding,
  sendAddLpBreeding,
  sendIdo,

}

import {showFailToast} from "vant";
import web3Utils from '@/utils/web3js/web3-utils.min'
import {targetChainId, nativeNetwork} from '@/config/network'
import {fanPoolAbi,} from '@/utils/web3js/abi/fanPoolAbi'
import {oilTankPoolAbi} from '@/utils/web3js/abi/oilTankPoolAbi'
import {aceBizAbi, aceBizAddress, fanPoolAddress, oilTankPoolAddress} from '@/utils/web3js/abi/aceBizAbi'

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

async function sendInAmount(param) {
    const method = 'inAmount';
    const params = [
        web3Utils.parseUnits(param.payAmount),
        param.isTrigger,
        param.coinAddress,
        param.deadline,
        param.sign,
        {
            value: web3Utils.parseUnits(param.payAmount)
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

async function sendOutAssets(param) {
    const method = 'outAssets';
    const params = [
        web3Utils.parseUnits(param.amount),
        web3Utils.parseUnits(param.fee),
        param.isTrigger,
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

export default {
    authorization,
    getAccountAndSignMessage,
    getTokenBalance,
    getBalance,

    sendInAmount,
    sendOutAssets,
    sendInAssets,
    sendEther,


}

import {defineStore} from 'pinia'

export const appStore = defineStore('appStore', {
    state() {
        return {
            language: "zhmsg",
            address: "",
            token: "",
            user: [],
            info: [],
            tradersInfo: {},
            globalConfig: {},
            sellOrderInfo: {},
            code: "",
            isPayPassword: "",
            selectedAsset: "",
        }
    },
    persist: {
        key: 'map', // 作为存储的默认秘钥，存储中的键名称
        storage: localStorage, // 默认为localStorage
        //paths: ['name', 'age', 'habby'], // 部分保持状态的点符号路径数组。[]意味着没有状态被持久化，undefined或者null意味着整个状态被持久化
    },
    getters: {
        getConverNum(num, ratio) {
            return num * ratio
        }
    },
    actions: {
        changeAddress(address) {
            this.address = address
        },
        changeGlobalConfig(globalConfig) {
            this.globalConfig = globalConfig
        },
        changeLang(lang) {
            this.language = lang
        },
        changeIsPayPassword(isPayPassword) {
            this.isPayPassword = isPayPassword
        },
        changeSellOrderInfo(sellOrderInfo) {
            this.sellOrderInfo = sellOrderInfo
        },
        changeTradersInfo(tradersInfo) {
            this.tradersInfo = tradersInfo
        },
        changeInfo(info) {
            this.info = info
        },
        changeSymbol(symbol) {
            this.symbol = symbol
        },
        changeCode(code) {
            this.code = code
        },
        changeSelectedAsset(selectedAsset) {
            this.selectedAsset = selectedAsset
        }
    },
})

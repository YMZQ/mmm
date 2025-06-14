
import {getBasicConfig} from '@/service/user'

let config = {}; // 初始化一个空对象
import {appStore} from '@/stores/index'

const getConfig = async () => {
    let result = await getBasicConfig();
    config.contractAddress = {
        business: result.serviceContract,
        lpBonusContract: result.lpBonusContract,
        youguanContract: result.youguanContract,
        bnbfenshiContract: result.bnbfenshiContract,
    }; // 保证contractAddress已经被初始化
    appStore().changeGlobalConfig(result)
}

const initializeConfig = async () => {
    await getConfig(); // 等待getConfig函数完成
    // 导出config或执行其他操作
    return config;
};
export default initializeConfig

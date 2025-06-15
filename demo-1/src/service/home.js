import axios from '@/utils/axios'

export function _getBulletinList(params) {
    return axios.post('/adc/html/elephant/10034.do', params);
}
export function _getBulletinDetail(params) {
    return axios.post('/adc/html/elephant/10035.do', params);
}
export function _getHome(params) {
    return axios.post('/adc/html/hpc/10004.do', params);
}
export function _sendBuyWhitelist(params) {
    return axios.post('/adc/html/elephant/10006.do', params);
}
export function _sendBuyWhitelistCallback(params) {
    return axios.post('/adc/html/elephant/10007.do', params);
}
export function _getAssetRecords(params) {
    return axios.post('/adc/html/hpc/10008.do', params);
}

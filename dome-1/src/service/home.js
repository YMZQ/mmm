import axios from '@/utils/axios'

export function _getBulletinList(params) {
    return axios.post('/adc/html/redfox/10034.do', params);
}
export function _getBulletinDetail(params) {
    return axios.post('/adc/html/redfox/10035.do', params);
}
export function _getHome(params) {
    return axios.post('/adc/html/redfox/10004.do', params);
}
export function _sendBuyWhitelist(params) {
    return axios.post('/adc/html/redfox/10006.do', params);
}
export function _sendBuyWhitelistCallback(params) {
    return axios.post('/adc/html/redfox/10007.do', params);
}

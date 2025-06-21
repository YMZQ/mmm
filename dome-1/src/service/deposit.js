import axios from '@/utils/axios'


export function _register(params) {
  return axios.post('/adc/html/elephant/10003.do', params);
}
export function _getDeposit(params) {
  return axios.post('/adc/html/elephant/10005.do', params);
}
export function _sendDeposit (params) {
  return axios.post('/adc/html/elephant/10006.do', params);
}
export function _sendDepositCallback(params) {
  return axios.post('/adc/html/elephant/10007.do', params);
}
export function _getRecords(params) {
  return axios.post('/adc/html/elephant/10008.do', params);
}

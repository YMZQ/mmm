import axios from '@/utils/axios'


export function _getAssets(params) {
  return axios.post('/adc/html/redfox/10014.do', params);
}

export function _getRecords(params) {
  return axios.post('/adc/html/redfox/10008.do', params);
}

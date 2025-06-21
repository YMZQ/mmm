import axios from '@/utils/axios'


export function _sendOutAssets(params) {
  return axios.post('/adc/html/redfox/10012.do', params);
}

export function _sendOutAssetsCallback(params) {
  return axios.post('/adc/html/redfox/10013.do', params);
}


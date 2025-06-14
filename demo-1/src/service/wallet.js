import axios from '@/utils/axios'


export function _sendOutAssets(params) {
  return axios.post('/adc/html/elephant/10012.do', params);
}

export function _sendOutAssetsCallback(params) {
  return axios.post('/adc/html/elephant/10013.do', params);
}


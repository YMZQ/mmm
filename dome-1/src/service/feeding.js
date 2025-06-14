import axios from '@/utils/axios'


export function _register(params) {
  return axios.post('/adc/html/elephant/10003.do', params);
}
export function _getFeeding(params) {
  return axios.post('/adc/html/elephant/10005.do', params);
}

export function _sendBreeding (params) {
  return axios.post('/adc/html/elephant/10006.do', params);
}

export function _sendBreedingCallback(params) {
  return axios.post('/adc/html/elephant/10007.do', params);
}
export function _sendAddLpBreeding (params) {
  return axios.post('/adc/html/elephant/10014.do', params);
}

export function _sendAddLpBreedingCallback(params) {
  return axios.post('/adc/html/elephant/10015.do', params);
}
export function _sendIdo (params) {
  return axios.post('/adc/html/elephant/10016.do', params);
}

export function _sendIdoCallback(params) {
  return axios.post('/adc/html/elephant/10017.do', params);
}
export function _getAssetRecords(params) {
  return axios.post('/adc/html/elephant/10008.do', params);
}

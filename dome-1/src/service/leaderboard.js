import axios from '@/utils/axios'
export function _getRecords(params) {
  return axios.post('/adc/html/elephant/10008.do', params);
}

import axios from '@/utils/axios'
export function _getRecords(params) {
  return axios.post('/adc/html/redfox/10010.do', params);
}

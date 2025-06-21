import axios from "@/utils/axios";

export function _getCommunity(params) {
  return axios.post('/adc/html/redfox/10009.do', params);
}

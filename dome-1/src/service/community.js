import axios from "@/utils/axios";

export function _getCommunity(params) {
  return axios.post('/adc/html/elephant/10005.do', params);
}

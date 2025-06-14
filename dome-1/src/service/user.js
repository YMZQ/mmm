import axios from '@/utils/axios'

export function doLang(params) {
    return axios.post('/adc/html/elephant/00000.do', params);
}

export function getBasicConfig(params) {
    return axios.post('/adc/html/elephant/10001.do', params);
}

export function login(params) {
    return axios.post('/adc/html/elephant/10002.do', params);
}


export function _loginOut(params) {
    return axios.post('/adc/html/elephant/10000.do', params);
}

export function _register(params) {
    return axios.post('/adc/html/elephant/10003.do', params);
}

export function getUploadConfig(params) {
    return axios.post('/adc/html/elephant/10079.do', params);
}

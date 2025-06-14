import axios from 'axios'
import {showFailToast} from 'vant'
import router from '../router'
import {appStore} from '@/stores/index'
axios.defaults.baseURL = ''
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

axios.interceptors.request.use(config => {
	return config;
})

axios.interceptors.response.use(res => {
	if (res.data.respCode !== '00000') {
		if (res.data.respMsg) showFailToast(res.data.respMsg)
		if (res.data.respCode === '500') {
			appStore().address = '';
			appStore().token = '';
			appStore().user = [];
			appStore().info = [];
			router.push({
				path: '/home'
			})
		}
		return Promise.reject(res.data)
	}

	return res.data
})

export default axios

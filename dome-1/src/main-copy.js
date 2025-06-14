import 'lib-flexible/flexible';
import './common/style/main.css';
import './common/style/theme.css';
import './common/style/tailwind.less';
import 'vant/es/toast/style';
import 'animate.css';
import { createPinia } from 'pinia';
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Vant, { Lazyload, showLoadingToast, showSuccessToast, showFailToast, closeToast, showToast } from 'vant';
import App from './App.vue';
import router from './router';
import i18n from './i18n/i18n';
import { MthodsMul, MthodsDiv, subStringNum, toDateString } from './common/js/utils';


import routerToDirective from '@/utils/routerToDirective.js';
import * as filters from '@/utils/filters';
const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(Vant);
app.use(i18n);
app.use(pinia);
app.use(Lazyload, { lazyComponent: true});

pinia.use(PiniaPluginPersistedstate);

// 注册全局过滤器
Object.keys(filters).forEach(key => {
    app.config.globalProperties[`$${key}`] = filters[key];
});

app.config.globalProperties.$toast = {
    loading(text) {
        showLoadingToast({
            duration: 0,
            forbidClick: true,
            loadingType: 'spinner',
            message: text
        });
    },
    success(text) {
        showSuccessToast(text);
    },
    error(text) {
        showFailToast(text);
    },
    show(text) {
        showToast(text);
    },
    close() {
        closeToast();
    }
}
// 全局过滤器
app.config.globalProperties.$filters = {
    upperCase(str) {
        if (!str) {
            return null;
        }
        return str.toUpperCase();
    },
    removeTokenPrefix(value) {
        if (!value) return '';
        return (value.replace(/(erc20|bep20|trc20)/ig, '').trim()).toUpperCase();
    },
    forZero(str) {
        if (str < 10) {
            str = '0' + str.toString();
            return str;
        }
        return str;
    },
    prefix(str, frontLen, endLen) {
        if (str) {
            str = str.toString();
            if (str.length > 28) {
                return str.substring(0, frontLen) + '***' + str.substring(str.length - endLen);
            } else if (str.length > 10) {
                return str.substring(0, frontLen) + '***' + str.substring(str.length - endLen);
            }
        }
        return str;
    },
    fixed(str) {
        if (str) {
            str = parseFloat(str).toFixed(5)
            return str
        }
        return 0;
    },
    MthodsMul(str, num) {
        if (str) {
            str = MthodsMul(str, num)
            return str
        }
        return 0;
    },
    MthodsDiv(str, num) {
        if (str) {
            str = MthodsDiv(str, num)
            return str
        }
        return 0;
    },
    subStringNum(str, num=2) {
        if (str) {
            str = subStringNum(str, num)
            return str
        }
        return 0;
    },
    pairFormat(pair) {
        if (pair && typeof pair === 'string') {
            const formattedPair = pair.replace(/([A-Z]+)(USDT)/, (_, first, second) => `${first.toLowerCase()}/${second}`);
            return formattedPair.toLocaleUpperCase();
        }
        return pair;
    },
    renamePair(pair) {
        if (pair && typeof pair === 'string') {
            const formattedPair = pair.replace(/([A-Z]+)USDT/, (_, first) => first.toLowerCase());
            return formattedPair.toLocaleUpperCase();
        }
        return pair;
    },
    toDateString(time, format, day) {
        if (time) {
            let str = ''
            str = toDateString(time, format, day)
            return str
        }
        return '';
    },
    truncateDecimal(value, decimals = 2) {
        if (!value || isNaN(value)) return '';
        const strValue = value.toString();
        const decimalIndex = strValue.indexOf('.');
        if (decimalIndex === -1) {
            return strValue;
        } else {
            return strValue.slice(0, decimalIndex + decimals + 1);
        }
    },
    fixNumber(val, units) {
        //最多支持14位小数，超出8位会丢失精度
        let value = Number(val).toFixed(8);
        let unit = units || 2;
        let isInt = value.indexOf(".") === -1;
        let intNum = value.split(".")[0];
        let floatNum = !isInt ? value.split(".")[1] : "0";
        let floatArry = floatNum.split("");
        let newFloatNum = ".";
        //末尾补零
        for (var i = 0; i < unit; i++) {
            if (!floatArry[i]) {
                newFloatNum += "0";
            } else {
                newFloatNum += floatArry[i];
            }
        }
        if (unit > 0) {
            return parseFloat(intNum + newFloatNum).toFixed(unit) === 'NaN' ? 0 : parseFloat(intNum + newFloatNum).toFixed(
                unit);
        } else {
            return parseInt(intNum);
        }
    },
    numberWithCommas(value, decimals = 2) {
        if (!value) return '';
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
app.directive('router-to', routerToDirective);

app.mount('#app')

import WOW from "wow.js";
const wow = new WOW({
    boxClass: "wow", // animated element css class (default is wow)
    animateClass: "animated", // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: true, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    callback: function () {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null, // optional scroll container selector, otherwise use window,
    resetAnimation: true, // reset animation on end (default is true)
});
wow.init();

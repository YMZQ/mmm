import * as filters from '@/utils/filters';
import { MthodsMul, MthodsDiv, subStringNum, toDateString } from '../common/js/utils';

export function setupFilters(app) {
  Object.keys(filters).forEach(function(key) {
    app.config.globalProperties['$' + key] = filters[key];
  });

  app.config.globalProperties.$filters = {
    upperCase: function(str) {
      if (!str) return null;
      return str.toUpperCase();
    },
    removeTokenPrefix: function(value) {
      if (!value) return '';
      return value.replace(/(erc20|bep20|trc20)/ig, '').trim().toUpperCase();
    },
    forZero: function(str) {
      if (str < 10) {
        return '0' + str.toString();
      }
      return str;
    },
    prefix: function(str, frontLen, endLen) {
      if (str) {
        str = str.toString();
        if (str.length > 10) {
          return str.substring(0, frontLen) + '***' + str.substring(str.length - endLen);
        }
      }
      return str;
    },
    fixed: function(str) {
      if (str) {
        return parseFloat(str).toFixed(5);
      }
      return 0;
    },
    MthodsMul: function(str, num) {
      if (str) {
        return MthodsMul(str, num);
      }
      return 0;
    },
    MthodsDiv: function(str, num) {
      if (str) {
        return MthodsDiv(str, num);
      }
      return 0;
    },
    subStringNum: function(str, num) {
      num = num || 2;
      if (str) {
        return subStringNum(str, num);
      }
      return 0;
    },
    pairFormat: function(pair) {
      if (pair && typeof pair === 'string') {
        var formattedPair = pair.replace(/([A-Z]+)(USDT)/, function(_, first, second) {
          return first.toLowerCase() + '/' + second;
        });
        return formattedPair.toUpperCase();
      }
      return pair;
    },
    renamePair: function(pair) {
      if (pair && typeof pair === 'string') {
        var formattedPair = pair.replace(/([A-Z]+)USDT/, function(_, first) {
          return first.toLowerCase();
        });
        return formattedPair.toUpperCase();
      }
      return pair;
    },
    toDateString: function(time, format, day) {
      if (time) {
        return toDateString(time, format, day);
      }
      return '';
    },
    truncateDecimal: function(value, decimals) {
      decimals = decimals || 2;
      if (!value || isNaN(value)) return '';
      var strValue = value.toString();
      var decimalIndex = strValue.indexOf('.');
      if (decimalIndex === -1) {
        return strValue;
      }
      return strValue.slice(0, decimalIndex + decimals + 1);
    },
    fixNumber: function(val, units) {
      var value = Number(val).toFixed(8);
      var unit = units || 2;
      var isInt = value.indexOf('.') === -1;
      var intNum = value.split('.')[0];
      var floatNum = isInt ? '0' : value.split('.')[1];
      var floatArry = floatNum.split('');
      var newFloatNum = '.';
      for (var i = 0; i < unit; i++) {
        newFloatNum += floatArry[i] || '0';
      }
      if (unit > 0) {
        var fixed = parseFloat(intNum + newFloatNum).toFixed(unit);
        return isNaN(fixed) ? 0 : fixed;
      }
      return parseInt(intNum);
    },
    numberWithCommas: function(value, decimals) {
      decimals = decimals || 2;
      if (!value) return '';
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  };
}

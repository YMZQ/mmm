export function subStringNum(a, num) {
	if (!a) {
		return 0
	}
	var a_type = typeof(a);
	if (a_type == "number") {
		var aStr = a.toString();
		var aArr = aStr.split('.');
	} else if (a_type == "string") {
		var aArr = a.split('.');
	}

	if (aArr.length > 1) {
		a = aArr[0] + "." + aArr[1].substr(0, num);
	}
	return a
}
export function MthodsAdd(arg1, arg2) {
	let r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	//动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return Number(((arg1 * m + arg2 * m) / m).toFixed(n));
}

export function MthodsSub(arg1, arg2) {
	let r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	//last modify by deeka
	//动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

export function MthodsMul(arg1, arg2) {
	// if (!arg1 || !arg2) {
	// 	return arg1;
	// }
	if (arg1 == 0 || arg2 == 0) {
		return 0;
	}
	var m = 0,
		s1 = arg1.toString(),
		s2 = arg2.toString();
	try {
		if (s1.split(".")[1]) {
			m += s1.split(".")[1].length;
		}
	} catch (e) {
		console.log(e);
	}
	try {
		if (s2.split(".")[1]) {
			m += s2.split(".")[1].length;
		}
	} catch (e) {
		console.log(e);
	}
	//最多保留8位小数
	return Number((Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(Math.min(6,m)));
}

export function MthodsDiv(arg1, arg2, digit) {
	if (!arg1 || !arg2) {
		return 0;
	}
	if (arg2 == 0) {
		return 0
	}
	var t1 = 0,
		t2 = 0,
		r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length
	} catch (e) {}
	try {
		t2 = arg2.toString().split(".")[1].length
	} catch (e) {}
	r1 = Number(arg1.toString().replace(".", ""))
	r2 = Number(arg2.toString().replace(".", ""))
	//获取小数点后的计算值
	var result = ((r1 / r2) * Math.pow(10, t2 - t1)).toString()
	var result2 = result.split(".")[1];
	if (result2) {
		result2 = result2.substring(0, digit > result2.length ? result2.length : digit);
	} else {
		result2 = 0
	}

	return Number(result.split(".")[0] + "." + result2);
}
export function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	} else {
		return null
	}
}

export const getLocal = (name) => {
	return localStorage.getItem(name)
}

export const setLocal = (name, value) => {
	localStorage.setItem(name, value)
}


export function add(a, b, decimals = 2) {
	let result = (a + b).toFixed(decimals);
	return noScientificNotation(result);
}

function subtract(a, b, decimals = 2) {
	let result = (a - b).toFixed(decimals);
	return noScientificNotation(result);
}

function multiply(a, b, decimals = 2) {
	let result = (a * b).toFixed(decimals);
	return noScientificNotation(result);
}

export function divide(a, b, decimals = 2) {
	if (b === 0) {
		throw new Error("Division by zero is not allowed.");
	}
	let result = (a / b).toFixed(decimals);
	return noScientificNotation(result);
}

function noScientificNotation(number) {
	let str = number.toString();
	if (str.indexOf('e') !== -1) {
		let [base, exp] = str.split('e');
		let sign = exp[0] === '-' ? -1 : 1;
		exp = Math.abs(exp);
		let result = base.split('.')[0];
		if (sign === -1) {
			result = '0.' + '0'.repeat(exp - 1) + result.replace('.', '');
		} else {
			let [intPart, decPart] = base.split('.');
			decPart = decPart || '';
			result = intPart + decPart.padEnd(exp, '0');
		}
		return result;
	}
	return str;
}



/**
 * 数字前置补零
 * @param num 数字
 * @param length 位数
 * @returns {string}
 */
function digit(num, length) {
	let str = '';
	num = String(num);
	length = length || 2;
	for (let i = num.length; i < length; i++) str += '0';
	return num < Math.pow(10, length) ? str + (num | 0) : num;
}

export const digitZero = (num, length) => {
	let str = '';
	num = String(num);
	length = length || 2;
	for (let i = num.length; i < length; i++) str += '0';
	return num < Math.pow(10, length) ? str + (num | 0) : num;
}
/**
 * 转化为日期格式字符
 * @param time 时间
 * @param format 格式
 * @returns {string}
 */
export const toDateString = (time, format, day) => {
	if (!time) return '';
	if (day) time = time + day*24*60*60*1000
	if (typeof time === 'string') time = time.replace(/-/g, '/');
	if (time.toString().length == 10) {
		time = time/1000;
	}
	let date = new Date(time || new Date()),
		ymd = [
			digit(date.getFullYear(), 4),
			digit(date.getMonth() + 1),
			digit(date.getDate())
		],
		hms = [
			digit(date.getHours()),
			digit(date.getMinutes()),
			digit(date.getSeconds())
		];
	format = format || 'yyyy/MM/dd';
	return format.replace(/yyyy/g, ymd[0])
		.replace(/MM/g, ymd[1])
		.replace(/dd/g, ymd[2]);
}
export const fixNumber = (val, units)  => {
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
}

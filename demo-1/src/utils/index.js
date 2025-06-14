export function fixNumber(val, units) {
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

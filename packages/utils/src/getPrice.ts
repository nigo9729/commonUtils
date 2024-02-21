/**
 * 分转成元
 * @returns 比如 1000 => 10.00
 * @param num 金额，单位：分
 * @param len 小数位长度
 * @param split 开启每三位数添加一个,符号
 */
export const getPrice = (num = 0, len = 2, split = false): string => {
  const float = num / 100;
  let result = (
    Math.round(float * Math.pow(10, len)) / Math.pow(10, len)
  ).toFixed(len);
  result =
    float !== parseFloat(result) ? float.toFixed(len).toString() : result;
  let splitResult = '';
  if (split) {
    // 检查是否有小数点
    const hasDecimal: boolean = result.includes('.');

    // 拆分整数部分和小数部分
    let integerPart = result.split('.')[0];
    const decimalPart = result.split('.')?.[1];

    // 对整数部分添加逗号
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 如果有小数部分，则将整数部分和小数部分合并
    if (hasDecimal) {
      splitResult = `${integerPart}.${decimalPart}`;
    } else {
      splitResult = integerPart;
    }
  }
  return split ? splitResult : result;
};

/**
 * 当前是否是正确的身份证号(较强校验，会校验校验码是否正确)
 * @param str 身份证号
 * @returns boolean
 */
export const isValidIdNum = (str?: string): boolean => {
  if (!str) {
    return false;
  }
  // 正则表达式用于验证身份证号码格式
  const idNumberRegex =
    /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/;

  if (!idNumberRegex.test(str)) {
    return false; // 格式不正确
  }

  // 加权因子
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

  // 校验码对应值
  const checkCodeMap = {
    '0': 1,
    '1': 0,
    '2': 'X',
    '3': 9,
    '4': 8,
    '5': 7,
    '6': 6,
    '7': 5,
    '8': 4,
    '9': 3,
    '10': 2,
  };

  // 计算校验码
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(str[i]) * weights[i];
  }

  const remainder = sum % 11;
  const checkCode =
    checkCodeMap[remainder.toString() as keyof typeof checkCodeMap];

  // 校验码匹配
  return str[17].toUpperCase() === checkCode.toString();
};

/**
 * 是否是正确的手机号
 * @param str 手机号
 * @returns
 */
export const isValidPhone = (str?: string): boolean => {
  if (!str) {
    return false;
  }
  return /^1[3-9]\d{9}$/.test(str);
};

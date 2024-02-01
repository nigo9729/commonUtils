/**
 * 名字脱敏
 * @param str 姓名
 * @returns 比如 张三 => 张*
 */
export const desensitizeName = (str?: string) => {
  if (!str || !str?.length) return '';
  if (str.length === 1) return str;
  if (str.length === 2) return str[0] + '*';
  const sep = str.length === 3 ? '*' : '**';
  return str[0] + sep + str[str.length - 1];
};

/**
 * 手机号脱敏
 * @param str 手机号
 * @returns 比如 13800138000 => 138****8000
 */
export const desensitizePhone = (str?: string) => {
  if (!str) {
    return '';
  }
  const length = str.length;
  const sep = length > 7 ? '****' : '*'.repeat(length - 3);
  return str.substring(0, 3) + sep + str.substring(7);
};

/**
 * 脱敏身份证号
 * @param str 身份证号
 * @returns 比如 110101199007123811 => 1101**********3811
 */
export const desensitizeIdNum = (str?: string): string => {
  if (!str) {
    return '';
  }
  const length = str.length;
  const sep = '*'.repeat(Math.min(length - 4, 10));
  return str.substring(0, 4) + sep + str.substring(14);
};

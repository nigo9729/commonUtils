import qs from 'qs';
import { isValidIdNum } from './';

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

/**
 * 性别转换
 * @param str 身份证号
 * @returns 比如 男 M 1 => 男
 */
export const translateGender = (str?: string | number): string => {
  // 特别处理 null 和 undefined，以及空字符串
  if (str === null || str === undefined || str === '') {
    return '未知';
  }
  // 确保数字0被正确处理，先转换为字符串
  const input = str.toString();
  switch (input) {
    case 'M':
    case '男':
    case '1':
      return '男';
    case 'F':
    case '女':
    case '0':
      return '女';
    default:
      return '未知';
  }
};

/**
 * 尝试解析 JSON 字符串。
 *
 * @param value 需要解析的字符串。
 * @returns 如果字符串是有效的 JSON 格式，则返回解析后的对象或数组；否则返回原始字符串。
 */
export const parseJSON = (value: any): any => {
  if (!value) {
    return '';
  }

  if (typeof value !== 'string') {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch (_) {
    return value;
  }
};

/**
 * 解析字符串(其格式类似于 url 的 query 参数形式)
 * @param str 解析的字符串
 * @returns 解析对象
 */
export const parseQueryStr = <T>(str?: string): T => {
  if (!str) return {} as T;
  const queryStrList = str.split('?');
  // 兼容没有 ？ 寻找
  if (queryStrList.length === 1) {
    return {} as T;
  }
  const queryStr = queryStrList[queryStrList.length - 1];
  return qs.parse(queryStr) as T;
};

/**
 * 通过身份证获取性别和出生日期
 * @returns 身份证号=>{birthday: 1998-01-01, gender: M}
 * @param idNo 身份证号
 */
export const getIdInfo = (
  idNo: string,
): {
  birthday?: string;
  gender?: 'F' | 'M';
  error?: string;
} => {
  if (!idNo) {
    return {
      error: '身份证号不能为空！',
    };
  }
  if (!isValidIdNum(idNo)) {
    return {
      error: '身份证号不合法！',
    };
  }
  const birthdayStr = idNo.substring(6, 14);
  const genderStr = idNo.substring(16, 17);
  const birthday =
    birthdayStr.substring(0, 4) +
    '-' +
    birthdayStr.substring(4, 6) +
    '-' +
    birthdayStr.substring(6, 8);
  const gender = Number(genderStr) % 2 === 1 ? 'M' : 'F';
  return {
    birthday,
    gender,
  };
};

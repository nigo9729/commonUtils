import { Decimal } from 'decimal.js';
type DiagnosisObj = {
  name: string;
  code: string;
};
/**
 *  格式化诊断,数组转字符串
 * @param diagnosis   诊断数组  例如: [{name: '感冒', code: 'J02.900'}, {name: '发烧', code: 'A01.000'}]
 * @returns 诊断字符串 例如: 无|感冒|无|J02.900;无|发烧|无|A01.000
 */
export const formatDiagnosis = (diagnosis?: DiagnosisObj[]): string => {
  if (!diagnosis || !Array.isArray(diagnosis)) {
    return '';
  }
  return diagnosis.map((item) => `无|${item.name}|无|${item.code}`).join(';');
};
/**
 *  解析诊断,字符串转数组
 * @param diagnosis 诊断字符串  例如: 无|感冒|无|J02.900;无|发烧|无|A01.000
 * @returns   诊断数组 例如: [{name: '感冒', code: 'J02.900'}, {name: '发烧', code: 'A01.000'}]
 */
export const parseDiagnosis = (diagnosis: string): DiagnosisObj[] => {
  if (!diagnosis) {
    return [];
  }
  return diagnosis.split(';').map((item) => {
    const [, name, , code] = item.split('|');
    return {
      name,
      code,
    };
  });
};
/**
 * 分转成元
 * @returns 比如 1000 => 10.00
 * @param cents 金额，单位：分
 * @param options 配置项
 * @param options.decimalPlaces 小数位长度
 * @param options.isThousandSeparator 开启千分位分隔符,每三位数添加一个,符号
 */
export const centsConversionYuan = (
  cents: number,
  options: {
    decimalPlaces?: number;
    isThousandSeparator?: boolean;
  } = {},
): string => {
  const { decimalPlaces = 2, isThousandSeparator = false } = options;
  const result = new Decimal(cents).div(100).toFixed(decimalPlaces);
  let splitResult = '';
  if (isThousandSeparator) {
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
  return isThousandSeparator ? splitResult : result;
};

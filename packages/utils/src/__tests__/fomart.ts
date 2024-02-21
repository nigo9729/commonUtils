import { formatDiagnosis, parseDiagnosis, centsConversionYuan } from '..';
import { describe, expect, test } from '@jest/globals';

describe('诊断格式化与解析', () => {
  const mockDiagnosis = [
    { name: '感冒', code: 'J02.900' },
    { name: '发烧', code: 'A01.000' },
  ];
  const formattedDiagnosis = '无|感冒|无|J02.900;无|发烧|无|A01.000';

  test('formatDiagnosis 应正确将诊断数组格式化为字符串', () => {
    expect(formatDiagnosis(mockDiagnosis)).toEqual(formattedDiagnosis);
  });

  test('parseDiagnosis 应正确将诊断字符串解析为数组', () => {
    expect(parseDiagnosis(formattedDiagnosis)).toEqual(mockDiagnosis);
  });

  test('formatDiagnosis 对于未定义输入应返回空字符串', () => {
    expect(formatDiagnosis()).toEqual('');
  });

  test('parseDiagnosis 对于空字符串输入应返回空数组', () => {
    expect(parseDiagnosis('')).toEqual([]);
  });

  test('从数组到字符串再回到数组的转换应返回原始数组', () => {
    const roundTrip = parseDiagnosis(formatDiagnosis(mockDiagnosis));
    expect(roundTrip).toEqual(mockDiagnosis);
  });
});
describe('测试centsConversionYuan', () => {
  test('returns 1000 for "10.00"', () => {
    expect(centsConversionYuan(1000)).toBe('10.00');
  });
  test('测试保留小数位数', () => {
    expect(centsConversionYuan(1000, { decimalPlaces: 3 })).toBe('10.000');
  });
  test('测试开启每三位数添加一个,符号', () => {
    expect(
      centsConversionYuan(101111, {
        decimalPlaces: 3,
        isThousandSeparator: true,
      }),
    ).toBe('1,011.110');
  });
  test('测试不开启显示符号', () => {
    expect(
      centsConversionYuan(101111, {
        decimalPlaces: 1,
        isThousandSeparator: false,
      }),
    ).toBe('1011.1');
  });
  test('测试不要小数点', () => {
    expect(centsConversionYuan(101111, { decimalPlaces: 0 })).toBe('1011');
  });
});

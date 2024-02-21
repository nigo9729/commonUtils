import { getPrice } from '../';
import { expect, test, describe } from '@jest/globals';

describe('测试getPrice', () => {
  test('returns 1000 for "10.00"', () => {
    expect(getPrice(1000)).toBe('10.00');
  });
  test('测试保留小数位数', () => {
    expect(getPrice(1000, 3)).toBe('10.000');
  });
  test('测试开启每三位数添加一个,符号', () => {
    expect(getPrice(101111, 3, true)).toBe('1,011.110');
  });
  test('测试不开启显示符号', () => {
    expect(getPrice(101111, 1, false)).toBe('1011.1');
  });
  test('测试不要小数点', () => {
    expect(getPrice(101111, 0)).toBe('1011');
  });
});

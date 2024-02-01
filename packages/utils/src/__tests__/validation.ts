import { isValidIdNum, isValidPhone } from '../';
import { expect, test, describe } from '@jest/globals';

describe('测试isValidIdNum', () => {
  test('测试isValidIdNum校验空字符串', () => {
    expect(isValidIdNum('')).toBeFalsy();
  });
  test('测试isValidIdNum校验错误身份证号', () => {
    expect(isValidIdNum('910101199007126713')).toBeFalsy();
  });
  test('测试isValidIdNum校验错误身份证号', () => {
    expect(isValidIdNum('s3421')).toBeFalsy();
  });
  test('测试isValidIdNum校验正确字符串', () => {
    expect(isValidIdNum('110101199007126713')).toBeTruthy();
  });
});

describe('测试isValidPhone', () => {
  test('测试isValidPhone校验空字符串', () => {
    expect(isValidPhone('')).toBeFalsy();
  });
  test('测试isValidPhone校验错误手机号', () => {
    expect(isValidPhone('1858')).toBeFalsy();
  });
  test('测试isValidPhone校验正确手机号', () => {
    expect(isValidPhone('18580001234')).toBeTruthy();
  });
});

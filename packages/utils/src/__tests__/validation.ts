import { isValidIdNum, isValidPhone, isValidBankCardNumber } from '../';
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

describe('测试isValidBankCardNumber', () => {
  test('测试isValidBankCardNumber校验空字符串', () => {
    expect(isValidBankCardNumber('')).toBeFalsy();
  });
  test('测试isValidBankCardNumber位数不足', () => {
    expect(isValidBankCardNumber('54738957493')).toBeFalsy();
  });
  test('测试isValidBankCardNumber不能0开头', () => {
    expect(isValidBankCardNumber('05473895749332232')).toBeFalsy();
  });
  test('测试isValidBankCardNumber正确卡号', () => {
    expect(isValidBankCardNumber('5473895749332232')).toBeTruthy();
  });
});

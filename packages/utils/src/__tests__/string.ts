import { desensitizeName, desensitizePhone, desensitizeIdNum } from '../string';
import { expect, test, describe } from '@jest/globals';

describe('测试desensitizeName', () => {
  test('desensitizeName返回空字符串', () => {
    expect(desensitizeName('')).toBe('');
  });
  test('desensitizeName可以正确加密长度为1的字符串', () => {
    expect(desensitizeName('张')).toBe('张');
  });
  test('desensitizeName可以正确加密长度为2的字符串', () => {
    expect(desensitizeName('张三')).toBe('张*');
  });
  test('desensitizeName可以正确加密长度为3及以上的字符串', () => {
    expect(desensitizeName('张三丰')).toBe('张*丰');
    expect(desensitizeName('张三宋撒丰')).toBe('张**丰');
  });
});

describe('测试desensitizePhone', () => {
  test('desensitizePhone返回空字符串', () => {
    expect(desensitizePhone('')).toBe('');
  });
  test('desensitizePhone可以正确加密11位的手机号', () => {
    expect(desensitizePhone('18580001234')).toBe('185****1234');
  });
  test('desensitizePhone可以正确非正常5位的手机号', () => {
    expect(desensitizePhone('18580')).toBe('185**');
  });
});

describe('测试desensitizeIdNum', () => {
  test('desensitizeIdNum返回空字符串', () => {
    expect(desensitizeIdNum('')).toBe('');
  });
  test('desensitizeIdNum可以正确加密18位的身份证号', () => {
    expect(desensitizeIdNum('110101199007123811')).toBe('1101**********3811');
  });
  test('desensitizeIdNum可以正确非正常5位的身份证号', () => {
    expect(desensitizeIdNum('110101')).toBe('1101**');
  });
});

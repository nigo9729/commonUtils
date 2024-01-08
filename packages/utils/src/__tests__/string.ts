import { encName } from '../string';
import { expect, test, describe } from '@jest/globals';

describe('测试encName', () => {
  test('encName返回空字符串', () => {
    expect(encName('')).toBe('');
  });
  test('encName可以正确加密长度为1的字符串', () => {
    expect(encName('张')).toBe('张');
  });
  test('encName可以正确加密长度为2的字符串', () => {
    expect(encName('张三')).toBe('张*');
  });
  test('encName可以正确加密长度为3及以上的字符串', () => {
    expect(encName('张三丰')).toBe('张*丰');
    expect(encName('张三宋撒丰')).toBe('张**丰');
  });
});

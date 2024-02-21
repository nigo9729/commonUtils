/**
 * @jest-environment jsdom
 */

import { copy } from '../';
import { expect, test, describe } from '@jest/globals';

describe('测试copy函数', () => {
  test('copy参数为空', () => {
    expect(copy()).rejects.toBe(false);
  });
  test('writeText 函数不存在', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => Promise.reject(false),
      },
      configurable: true,
    });
    return copy('31').then((data) => {
      expect(data).toBe(true);
    });
  });
  test('copy参数不为空', () => {
    return copy('31').then((data) => {
      expect(data).toBe(true);
    });
  });
});

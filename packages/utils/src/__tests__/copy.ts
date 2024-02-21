/**
 * @jest-environment jsdom
 */

import { copy, lowerVersionCopy } from '../';
import {
  expect,
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
} from '@jest/globals';

describe('lowerVersionCopy', () => {
  it('应该成功复制文本', async () => {
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => true),
      writable: true,
    });
    await expect(lowerVersionCopy('test text')).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('没有提供文本时应该拒绝', async () => {
    await expect(lowerVersionCopy()).rejects.toBe(false);
  });

  it('当 document.execCommand 抛出异常时应该拒绝', async () => {
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => {
        throw new Error('fail');
      }),
      writable: true,
    });
    await expect(lowerVersionCopy('test text')).rejects.toBe(false);
  });
});

describe('copy', () => {
  beforeEach(() => {
    // 模拟 secure context
    window.isSecureContext = true;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('在支持 clipboard API 的环境中应该成功复制文本', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockResolvedValue(undefined!),
      },
      writable: true,
    });
    await expect(copy('test text')).resolves.toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
  });

  it('在不支持 clipboard API 的环境中应该使用 lowerVersionCopy 方法', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => true),
      writable: true,
    });

    await expect(copy('test text')).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('在非 secure context 中应该使用 lowerVersionCopy 方法', async () => {
    window.isSecureContext = false;
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => true),
      writable: true,
    });

    await expect(copy('test text')).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('在非 secure context 中应该使用 lowerVersionCopy 方法, 但 lowerVersionCopy 方法异常', async () => {
    window.isSecureContext = false;
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => {
        throw new Error('fail');
      }),
      writable: true,
    });
    await expect(copy('test text')).rejects.toBe(false);
  });

  it('没有提供文本时应该拒绝', async () => {
    await expect(copy()).rejects.toBe(false);
  });

  it('当 clipboard API 失败时，应该尝试 lowerVersionCopy 方法', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockRejectedValue(new Error('fail') as never),
      },
      writable: true,
    });
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => true),
      writable: true,
    });
    await expect(copy('test text')).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });
  it('当 clipboard API 失败时, lowerVersionCopy 抛出异常', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockRejectedValue(new Error('fail') as never),
      },
      writable: true,
    });
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => {
        throw new Error('fail');
      }),
      writable: true,
    });
    await expect(copy('test text')).rejects.toBe(false);
  });
});

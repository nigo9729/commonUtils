/**
 * @jest-environment jsdom
 */

import { copy } from '../';
import { expect, test, describe } from '@jest/globals';

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
    navigator.clipboard = {
      writeText: jest.fn().mockResolvedValue(undefined),
    };

    await expect(copy('test text')).resolves.toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
  });

  it('在不支持 clipboard API 的环境中应该使用 lowerVersionCopy 方法', async () => {
    delete navigator.clipboard;
    document.execCommand = jest.fn().mockImplementation(() => true);

    await expect(copy('test text')).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('在非 secure context 中应该使用 lowerVersionCopy 方法', async () => {
    window.isSecureContext = false;
    document.execCommand = jest.fn().mockImplementation(() => true);

    await expect(copy('test text')).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('没有提供文本时应该拒绝', async () => {
    await expect(copy()).rejects.toBe(false);
  });

  it('当 clipboard API 失败时，应该尝试 lowerVersionCopy 方法', async () => {
    navigator.clipboard = {
      writeText: jest.fn().mockRejectedValue(new Error('fail')),
    };
    document.execCommand = jest.fn().mockImplementation(() => true);

    await expect(copy('test text')).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });
});

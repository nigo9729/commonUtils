/**
 * @jest-environment jsdom
 */

import { copyToClipboad, browerCopyToClipboard } from '..';
import {
  expect,
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
} from '@jest/globals';

describe('browerCopyToClipboard 函数', () => {
  beforeEach(() => {
    // 模拟 secure context
    window.isSecureContext = true;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('应该成功复制文本', async () => {
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => true),
      writable: true,
    });
    await expect(browerCopyToClipboard('test text')).resolves.toBe(true);
    // expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('空文本', async () => {
    await expect(browerCopyToClipboard()).resolves.toBe(true);
  });

  it(' document.execCommand 异常, 支持 navigator.clipboard 成功', async () => {
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => {
        throw new Error('fail');
      }),
      writable: true,
    });
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockResolvedValue(undefined!),
      },
      writable: true,
    });
    await expect(copyToClipboad('test text')).resolves.toBe(true);
  });

  it(' document.execCommand 异常, 支持 navigator.clipboard 失败', async () => {
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => {
        throw new Error('fail');
      }),
      writable: true,
    });
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockRejectedValue(undefined!),
      },
      writable: true,
    });
    await expect(copyToClipboad('test text')).resolves.toBe(false);
  });
  it('document.execCommand 异常, isSecureContext 为 false', async () => {
    window.isSecureContext = false;
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => {
        throw new Error('fail');
      }),
      writable: true,
    });
    await expect(copyToClipboad('test text')).resolves.toBe(false);
  });
  it('document.execCommand 异常, 不支持 navigator.clipboard', async () => {
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockImplementation(() => {
        throw new Error('fail');
      }),
      writable: true,
    });
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
    });
    await expect(copyToClipboad('test text')).resolves.toBe(false);
  });
});

describe('copyToClipboad 函数', () => {
  beforeEach(() => {
    // 模拟 secure context
    window.isSecureContext = true;
  });

  afterEach(() => {
    global.wx = undefined;
    global.my = undefined;
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('空文本', () => {
    expect(copyToClipboad()).resolves.toBe(true);
  });

  it('微信环境成功', () => {
    global.wx = { getSystemInfo: jest.fn() };
    global.wx.setClipboardData = (config: { success: () => void }) => {
      config.success();
    };
    expect(copyToClipboad('test text')).resolves.toBe(true);
  });
  it('微信环境不成功', async () => {
    global.wx = { getSystemInfo: jest.fn() };
    global.wx.setClipboardData = (config: { fail: () => void }) => {
      config.fail();
    };
    expect(copyToClipboad('test text')).resolves.toBe(false);
  });
  it('支付宝环境成功', async () => {
    global.my = { getSystemInfo: jest.fn() };
    global.my.setClipboard = (config: { success: () => void }) => {
      config.success();
    };
    expect(copyToClipboad('test text')).resolves.toBe(true);
  });
  it('支付宝环境不成功', async () => {
    global.my = { getSystemInfo: jest.fn() };
    global.my.setClipboard = (config: { fail: () => void }) => {
      config.fail();
    };
    await expect(copyToClipboad('test text')).resolves.toBe(false);
  });
});

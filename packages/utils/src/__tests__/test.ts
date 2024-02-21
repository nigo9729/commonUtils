// import { parseBrowser } from '../platform';

import { parseBrowser } from '..';

describe('parseBrowser', () => {
  //   it('应该返回wechat当在微信环境中', () => {
  //     Object.defineProperty(window.navigator, 'userAgent', {
  //       value: 'micromessenger',
  //       configurable: true,
  //     });

  //     expect(parseBrowser()).toBe('wechat');
  //   });

  const testSuits = [
    {
      describe: '应该返回wechat当在微信环境中',
      userAgent: 'micromessenger',
      expected: 'wechat',
    },
  ];

  testSuits.forEach((i) =>
    it(i.describe, () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: i.userAgent,
        configurable: true,
      });

      expect(parseBrowser()).toBe(i.expected);
    }),
  );

  it('应该返回ali当在支付宝环境中', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'alipayclient',
      configurable: true,
    });

    expect(parseBrowser()).toBe('ali');
  });

  it('应该返回iOS当在iOS环境中', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'iphone',
      configurable: true,
    });

    expect(parseBrowser()).toBe('iOS');
  });

  it('应该返回Android当在Android环境中', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'android',
      configurable: true,
    });

    expect(parseBrowser()).toBe('Android');
  });

  it('应该返回unknown当在未知环境中', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'unknown browser',
      configurable: true,
    });

    expect(parseBrowser()).toBe('unknown');
  });

  it('应该返回notBrower当不在浏览器环境中', () => {
    // jest.resetModules(); // 重置模块
    // jest.mock('../platform.ts', () => ({
    //   getRunningEnvironment: jest.fn(() => 'wechat'), // 默认环境设置为浏览器环境
    // }));

    (global as any).wx = { getSystemInfo: jest.fn() };

    expect(parseBrowser()).toBe('notBrower');
  });
});

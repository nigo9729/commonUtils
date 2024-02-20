import { getRunningEnvironment } from '../platform';

describe('getRunningEnvironment', () => {
  const globalObj = global as any;
  it('正确识别微信小程序环境', () => {
    globalObj.wx = { getSystemInfo: jest.fn() };
    expect(getRunningEnvironment()).toBe('wechat');
    delete globalObj.wx;
  });

  it('正确识别支付宝小程序环境', () => {
    globalObj.my = { getSystemInfo: jest.fn() };
    expect(getRunningEnvironment()).toBe('ali');
    delete globalObj.my;
  });

  it('正确识别微信H5环境', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'micromessenger',
      configurable: true,
    });
    expect(getRunningEnvironment()).toBe('wechatH5');
  });

  it('正确识别支付宝H5环境', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'alipayclient',
      configurable: true,
    });
    expect(getRunningEnvironment()).toBe('aliH5');
  });

  it('正确识别iOS浏览器环境', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'iphone',
      configurable: true,
    });
    expect(getRunningEnvironment()).toBe('iOS');
  });

  it('正确识别Android浏览器环境', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'android',
      configurable: true,
    });
    expect(getRunningEnvironment()).toBe('Android');
  });

  it('返回“未知环境”当环境不是微信H5、支付宝H5、微信小程序、支付宝小程序、iOS浏览器或Android浏览器', () => {
    // 模拟一个不被识别的 userAgent
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'unknownBrowser',
      configurable: true,
    });
    // 确保不在小程序环境中
    globalObj.wx = undefined;
    globalObj.my = undefined;

    expect(getRunningEnvironment()).toBe('unknown');
  });

  // 清理userAgent的模拟
  afterEach(() => {
    jest.resetModules();
    Object.defineProperty(navigator, 'userAgent', {
      value: '',
    });
  });
});

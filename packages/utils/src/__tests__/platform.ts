import { getRunningEnvironment, setWechatWebFontSize } from '../platform';
declare global {
  interface Document {
    attachEvent?: any;
  }
  interface Window {
    WeixinJSBridge?: any;
  }
}
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

describe('setWechatWebFontSize', () => {
  const originalWeixinJSBridge = window.WeixinJSBridge;
  const originalAddEventListener = document.addEventListener;
  const originalAttachEvent = document.attachEvent;

  beforeEach(() => {
    jest.clearAllMocks();
    window.WeixinJSBridge = undefined;
    document.addEventListener = jest.fn();
    document.attachEvent = undefined;
  });

  it('在wechatH5环境中直接设置字体大小', () => {
    window.WeixinJSBridge = {
      invoke: jest.fn(),
      on: jest.fn(),
    };
    setWechatWebFontSize('wechatH5');
    expect(window.WeixinJSBridge.invoke).toHaveBeenCalledWith(
      'setFontSizeCallback',
      { fontSize: 0 },
    );
  });

  it('在非wechatH5环境中不进行任何操作', () => {
    window.WeixinJSBridge = {
      invoke: jest.fn(),
      on: jest.fn(),
    };
    setWechatWebFontSize('otherEnvironment');
    expect(window.WeixinJSBridge.invoke).not.toHaveBeenCalled();
  });

  it('监听WeixinJSBridgeReady事件进行设置', () => {
    const handleFontSize = jest.fn();
    (document as any).addEventListener.mockImplementationOnce(
      (event: string) => {
        if (event === 'WeixinJSBridgeReady') {
          handleFontSize();
        }
      },
    );
    setWechatWebFontSize('wechatH5');
    expect(document.addEventListener).toHaveBeenCalledWith(
      'WeixinJSBridgeReady',
      expect.any(Function),
      false,
    );
    // To simulate the event being triggered you could call handleFontSize here
    // and assert WeixinJSBridge methods were called as expected.
  });

  it('使用attachEvent监听WeixinJSBridgeReady事件（旧IE版本）', () => {
    (document as any).addEventListener = undefined;
    document.attachEvent = jest.fn();
    setWechatWebFontSize('wechatH5');
    expect(document.attachEvent).toHaveBeenCalledWith(
      'onWeixinJSBridgeReady',
      expect.any(Function),
    );
  });
  it('在wechatH5环境中，监听WeixinJSBridgeReady事件并响应menu:setfont事件', () => {
    // 模拟在WeixinJSBridgeReady事件之前 WeixinJSBridge 是未定义的
    expect(window.WeixinJSBridge).toBeUndefined();

    // 模拟 document.addEventListener 来触发 WeixinJSBridgeReady 事件
    (document as any).addEventListener.mockImplementationOnce(
      (event: string, callback: () => void) => {
        if (event === 'WeixinJSBridgeReady') {
          // 定义 WeixinJSBridge
          window.WeixinJSBridge = {
            invoke: jest.fn(),
            on: jest.fn((menuEvent, handler) => {
              if (menuEvent === 'menu:setfont') {
                // 当 menu:setfont 事件被注册时，立即触发它
                handler();
              }
            }),
          };

          // 触发 WeixinJSBridgeReady 事件的回调
          callback();
        }
      },
    );

    // 调用函数，模拟wechatH5环境
    setWechatWebFontSize('wechatH5');

    // 验证 WeixinJSBridgeReady 事件被正确监听
    expect(document.addEventListener).toHaveBeenCalledWith(
      'WeixinJSBridgeReady',
      expect.any(Function),
      false,
    );

    // 验证 menu:setfont 事件处理器被注册
    expect(window.WeixinJSBridge.on).toHaveBeenCalledWith(
      'menu:setfont',
      expect.any(Function),
    );

    // 验证在 menu:setfont 事件处理器中，invoke 被调用以设置字体大小
    expect(window.WeixinJSBridge.invoke).toHaveBeenCalledWith(
      'setFontSizeCallback',
      { fontSize: 0 },
    );
  });

  afterEach(() => {
    window.WeixinJSBridge = originalWeixinJSBridge;
    document.addEventListener = originalAddEventListener;
    document.attachEvent = originalAttachEvent;
    jest.resetModules();
  });
});

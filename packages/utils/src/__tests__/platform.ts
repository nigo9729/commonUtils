import {
  getRunningEnvironment,
  parseBrowser,
  setWechatWebFontSize,
} from '../platform';

describe('getRunningEnvironment', () => {
  afterEach(() => {
    global.wx = undefined;
    global.my = undefined;
  });

  it('正确识别微信小程序环境', () => {
    global.wx = { getSystemInfo: jest.fn() };
    expect(getRunningEnvironment()).toBe('wechat');
  });

  it('正确识别支付宝小程序环境', () => {
    global.my = { getSystemInfo: jest.fn() };
    expect(getRunningEnvironment()).toBe('ali');
  });

  it('应当返回 "browser" 当在浏览器环境中', () => {
    // 确保 wx 和 my 都未定义，模拟浏览器环境
    expect(getRunningEnvironment()).toEqual('browser');
  });
});

describe('parseBrowser', () => {
  const testSuits = [
    {
      describe: '应该返回wechat当在微信环境中',
      userAgent: 'micromessenger',
      expected: 'wechat',
    },
    {
      describe: '应该返回ali当在支付宝环境中',
      userAgent: 'alipayclient',
      expected: 'ali',
    },
    {
      describe: '应该返回iOS当在iOS环境中',
      userAgent: 'iphone',
      expected: 'iOS',
    },
    {
      describe: '应该返回Android当在Android环境中',
      userAgent: 'android',
      expected: 'Android',
    },
    {
      describe: '应该返回unknown当在未知环境中',
      userAgent: 'unknown browser',
      expected: 'unknown',
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

  it('应该返回notBrowser当不在浏览器环境中', () => {
    global.wx = { getSystemInfo: jest.fn() };
    expect(parseBrowser()).toBe('notBrowser');
  });
});

describe('setWechatWebFontSize', () => {
  beforeEach(() => {
    global.wx = undefined;
    jest.clearAllMocks();
    window.WeixinJSBridge = undefined;
    document.addEventListener = jest.fn();
  });

  it('在wechatH5环境中直接设置字体大小', () => {
    window.WeixinJSBridge = {
      invoke: jest.fn(),
      on: jest.fn(),
    };
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'micromessenger',
      configurable: true,
    });
    setWechatWebFontSize();
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
    global.wx = { getSystemInfo: jest.fn() };
    setWechatWebFontSize();
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
    setWechatWebFontSize();
    expect(document.addEventListener).toHaveBeenCalledWith(
      'WeixinJSBridgeReady',
      expect.any(Function),
      false,
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
    setWechatWebFontSize();

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
    jest.resetModules();
    global.wx = undefined;
  });
});

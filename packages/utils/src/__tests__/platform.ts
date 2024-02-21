import { getRunningEnvironment } from '../platform';

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

//     // 调用函数，模拟wechatH5环境
//     setWechatWebFontSize('wechatH5');

//     // 验证 WeixinJSBridgeReady 事件被正确监听
//     expect(document.addEventListener).toHaveBeenCalledWith(
//       'WeixinJSBridgeReady',
//       expect.any(Function),
//       false,
//     );

//     // 验证 menu:setfont 事件处理器被注册
//     expect(window.WeixinJSBridge.on).toHaveBeenCalledWith(
//       'menu:setfont',
//       expect.any(Function),
//     );

//     // 验证在 menu:setfont 事件处理器中，invoke 被调用以设置字体大小
//     expect(window.WeixinJSBridge.invoke).toHaveBeenCalledWith(
//       'setFontSizeCallback',
//       { fontSize: 0 },
//     );
//   });

//   afterEach(() => {
//     window.WeixinJSBridge = originalWeixinJSBridge;
//     document.addEventListener = originalAddEventListener;
//     document.attachEvent = originalAttachEvent;
//     jest.resetModules();
//   });
// });

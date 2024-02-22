/* eslint-disable no-var */

declare var wx: any;
declare var my: any;

declare module globalThis {
  var wx = {
    getSystemInfo: () => string,
    setClipboardData: () => undefined,
  };
  var my = {
    getSystemInfo: () => string,
    setClipboard: () => undefined,
  };
  var WeixinJSBridge: any;
}

declare var getCurrentPages: () => any[];

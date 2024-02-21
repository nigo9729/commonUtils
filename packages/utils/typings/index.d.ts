/* eslint-disable no-var */

declare var wx: any;
declare var my: any;

declare module globalThis {
  var wx = {
    getSystemInfo: () => string,
    setClipboardData: () => any,
  };
  var my = {
    getSystemInfo: () => string,
    setClipboard: () => any,
  };
  var WeixinJSBridge: any;
}

declare var getCurrentPages: () => any[];

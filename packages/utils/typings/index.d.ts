/* eslint-disable no-var */

declare var wx: any;
declare var my: any;

declare module globalThis {
  var wx = {
    getSystemInfo: () => string,
  };
  var my = {
    getSystemInfo: () => string,
  };
  var WeixinJSBridge: any;
}

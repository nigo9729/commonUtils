import { getRunningEnvironment } from './platform';
import { parseQueryStr } from './string';

/**
 * 获取路径参数
 * @returns T
 */
export const getQueryParams = <T>(): T => {
  // 微信小程序 | 支付宝小程序
  if (
    getRunningEnvironment() === 'wechat' ||
    getRunningEnvironment() === 'ali'
  ) {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    // 解析路由信息，获取路径参数
    const options = currentPage.options;
    return options as T;
  } else {
    // 默认浏览器
    return parseQueryStr<T>(window.location.href);
  }
};

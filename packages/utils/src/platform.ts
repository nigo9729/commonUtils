/**
 * 判断当前运行环境。
 *
 * @returns {string} 返回当前环境的描述字符串，可能的值有：
 * - '微信H5'
 * - '支付宝H5'
 * - '微信小程序'
 * - '支付宝小程序'
 * - 'iOS浏览器'
 * - 'Android浏览器'
 * - '未知环境'
 */
export const getRunningEnvironment = (): string => {
  // 小程序环境判断
  if (typeof wx !== 'undefined' && wx?.getSystemInfo) {
    return 'wechat';
  }
  if (typeof my !== 'undefined' && my?.getSystemInfo) {
    return 'ali';
  }

  // userAgent 字符串用于后续环境判断
  const userAgent = navigator.userAgent.toLowerCase();

  // H5 环境判断
  if (userAgent.includes('micromessenger')) {
    return 'wechatH5';
  }
  if (userAgent.includes('alipayclient')) {
    return 'aliH5';
  }

  // 移动操作系统环境判断
  if (/ios|iphone|ipad|ipod|iwatch/.test(userAgent)) {
    return 'iOS';
  }
  if (/android|adr/.test(userAgent)) {
    return 'Android';
  }

  // 如果以上条件都不满足，则认为是未知环境
  return 'unknown';
};

import { getRunningEnvironment } from './platform';

/**
 * 文本复制功能（旧浏览器版本复制）
 * @param text 复制文案
 * @returns Promise<boolean>
 */
export const browerCopyToClipboard = async (
  text?: string,
): Promise<boolean> => {
  if (!text) return true;
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '-200px';
    textArea.style.left = '0px';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch (err) {
    // console.log('execCommand 旧版错误信息:', err);
    if (!navigator.clipboard || !window.isSecureContext) {
      return false;
    }
    return new Promise((resolve) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
};

/**
 * 文本复制功能
 * @param text 复制文案
 * @returns Promise<boolean>
 */
export const copyToClipboad = (text?: string): Promise<boolean> => {
  if (!text) {
    return Promise.resolve(true);
  }
  const env = getRunningEnvironment();

  if (['wechat', 'ali'].includes(env)) {
    return new Promise<boolean>((resolve) => {
      const fn = env === 'wechat' ? wx.setClipboardData : my.setClipboard;
      const successFn = () => resolve(true);
      const failFn = () => resolve(false);
      const miniProps = {
        data: text,
        success: successFn,
        fail: failFn,
      };
      fn(miniProps);
    });
  }

  return browerCopyToClipboard(text);
};

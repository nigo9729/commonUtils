import { getRunningEnvironment } from './platform';

/**
 * 文本复制功能（旧浏览器版本复制）
 * @param text 复制文案
 * @returns Promise<boolean>
 */
export const lowerVersionCopy = (text?: string): Promise<boolean> => {
  if (getRunningEnvironment() !== 'browser') return Promise.reject(false);
  if (!text) return Promise.reject(false);
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
    return Promise.resolve(true);
  } catch (err) {
    return Promise.reject(false);
  }
};

/**
 * 文本复制功能
 * @param text 复制文案
 * @returns Promise<boolean>
 */
export const copy = (text?: string): Promise<boolean> => {
  if (getRunningEnvironment() !== 'browser') return Promise.reject(false);
  if (!text) return Promise.reject(false);
  return new Promise((resolve, reject) => {
    if (!navigator.clipboard || !window.isSecureContext) {
      lowerVersionCopy(text)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    }
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        lowerVersionCopy(text)
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
      });
  });
};

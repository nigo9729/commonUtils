import { Hook } from 'console-feed';
import { guid } from './utils';
import * as utils from '@kq/utils';

type CreateContextEval = () => {
  remove: () => void;
  run: (
    src: string,
    config: {
      scopes?: Record<any, any>;
      options?: Record<any, any>;
      onMessage?: (event: any) => void;
    },
  ) => Promise<unknown>;
};

/**
 * 创建 iframe 页面内容
 * @param origin
 * @param senderId
 * @param receiverId
 */
const createSrcDoc = ({
  origin,
  senderId,
  receiverId,
  type = 'script',
}: any) => {
  // script does not require <script> because just use eval on contextWindow
  if (type === 'script') {
    return `<!doctype html>
  <html lang="en">
  <body></body>
  </html>`;
  }
  return `<!doctype html>
  <html lang="en">
  <body>
  <script>
  const origin = "${origin}";
  const senderId = "${senderId}";
  const receiverId = "${receiverId}";
  const handleMessage = async (event) => {
    if (event.source !== window.parent) {
      return;
    }
    if (event.origin !== origin) {
      return;
    }
    const { id, src } = event.data || {};
    if (id !== receiverId) {
      return;
    }
    try {
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      ${(() => {
        if (type === 'module') {
          // module can not get result
          return (
            'await import(`data:text/javascript;charset=utf-8, ${encodeURIComponent(src)}`);' +
            'window.parent.postMessage({ id: senderId, result: undefined }, origin);'
          );
        } else if (type === 'AsyncFunction') {
          // new AsyncFunction cano not get result
          return (
            'await new AsyncFunction(src)();' +
            'window.parent.postMessage({ id: senderId, result: undefined }, origin);'
          );
        } else {
          return (
            'const result = eval(src);' +
            'window.parent.postMessage({ id: senderId, result }, origin);'
          );
        }
      })()};
    } catch (error) {
      window.parent.postMessage({ id: senderId, error: {message:error.message} }, origin);
    }
    window.removeEventListener("message", handleMessage);
  };
  window.addEventListener("message", handleMessage);
  window.parent.postMessage({ id: senderId, ready: true }, origin);
  </script>
  </body>
  </html>`;
};

export const createContextEval: CreateContextEval = () => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'display: none;');
  const senderId = guid();
  const receiverId = guid();
  let mounted = false;
  return {
    remove: () => {
      if (mounted) {
        document.body.removeChild(iframe);
      }
    },
    /**
     * @param src
     * @param scopes
     * @param options
     */
    run: (
      src: string,
      config: {
        scopes?: Record<any, any>;
        options?: Record<any, any>;
        onMessage?: (event: any) => void;
      },
    ) => {
      if (mounted) {
        document.body.removeChild(iframe);
        mounted = false;
      }
      const { scopes = {}, options = {}, onMessage } = config;
      return new Promise((resolve, reject) => {
        const handleMessage = (event: WindowEventMap['message']) => {
          if (event.source !== iframe.contentWindow) {
            return;
          }
          const { id, result, error, ready } = event.data || {};
          if (id !== senderId) {
            return;
          }
          if (ready) {
            iframe.contentWindow?.postMessage({ id: receiverId, src }, '*');
            return;
          }
          if (error) {
            reject(new Error(error.message));
          } else {
            resolve(result);
          }
          window.removeEventListener('message', handleMessage);
        };
        window.addEventListener('message', handleMessage);
        const executionType = options.type ? options.type : 'script';
        iframe.srcdoc = createSrcDoc({
          origin: window.location.origin,
          senderId,
          receiverId,
          type: executionType,
        });
        document.body.appendChild(iframe);
        mounted = true;
        const iframeWindow = iframe.contentWindow as Window & typeof globalThis;
        Hook(iframeWindow.console as any, onMessage);
        const windowProperty = Object.assign({}, utils, scopes);
        Object.keys(windowProperty).forEach(function (key) {
          iframeWindow[key as any] = windowProperty[key];
        });
        if (executionType === 'script') {
          try {
            resolve(iframeWindow.eval(src));
          } catch (error) {
            reject(error);
          }
        }
      });
    },
  };
};

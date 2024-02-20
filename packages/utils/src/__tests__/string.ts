import {
  desensitizeName,
  desensitizePhone,
  desensitizeIdNum,
  translateGender,
  parseJSON,
  getRunningEnvironment,
} from '../';
import { expect, test, describe, jest, it } from '@jest/globals';

describe('测试desensitizeName', () => {
  test('desensitizeName返回空字符串', () => {
    expect(desensitizeName('')).toBe('');
  });
  test('desensitizeName可以正确加密长度为1的字符串', () => {
    expect(desensitizeName('张')).toBe('张');
  });
  test('desensitizeName可以正确加密长度为2的字符串', () => {
    expect(desensitizeName('张三')).toBe('张*');
  });
  test('desensitizeName可以正确加密长度为3及以上的字符串', () => {
    expect(desensitizeName('张三丰')).toBe('张*丰');
    expect(desensitizeName('张三宋撒丰')).toBe('张**丰');
  });
});

describe('测试desensitizePhone', () => {
  test('desensitizePhone返回空字符串', () => {
    expect(desensitizePhone('')).toBe('');
  });
  test('desensitizePhone可以正确加密11位的手机号', () => {
    expect(desensitizePhone('18580001234')).toBe('185****1234');
  });
  test('desensitizePhone可以正确非正常5位的手机号', () => {
    expect(desensitizePhone('18580')).toBe('185**');
  });
});

describe('测试desensitizeIdNum', () => {
  test('desensitizeIdNum返回空字符串', () => {
    expect(desensitizeIdNum('')).toBe('');
  });
  test('desensitizeIdNum可以正确加密18位的身份证号', () => {
    expect(desensitizeIdNum('110101199007123811')).toBe('1101**********3811');
  });
  test('desensitizeIdNum可以正确非正常5位的身份证号', () => {
    expect(desensitizeIdNum('110101')).toBe('1101**');
  });
});

describe('测试translateGender', () => {
  test('returns 男 for "M"', () => {
    expect(translateGender('M')).toBe('男');
  });

  test('returns 女 for "F"', () => {
    expect(translateGender('F')).toBe('女');
  });

  test('returns 男 for "1"', () => {
    expect(translateGender('1')).toBe('男');
  });

  test('returns 女 for "0"', () => {
    expect(translateGender('0')).toBe('女');
  });

  test('returns 男 for 1', () => {
    expect(translateGender(1)).toBe('男');
  });

  test('returns 女 for 0', () => {
    expect(translateGender(0)).toBe('女');
  });

  test('returns 未知 for undefined', () => {
    expect(translateGender(undefined)).toBe('未知');
  });

  test('returns 未知 for any other input', () => {
    expect(translateGender('X')).toBe('未知');
    expect(translateGender('2')).toBe('未知');
    expect(translateGender('')).toBe('未知');
  });
});

describe('测试parseJson', () => {
  test('returns 男 for "M"', () => {
    expect(translateGender('M')).toBe('男');
  });

  test('returns 女 for "F"', () => {
    expect(translateGender('F')).toBe('女');
  });

  test('returns 男 for "1"', () => {
    expect(translateGender('1')).toBe('男');
  });

  test('returns 女 for "0"', () => {
    expect(translateGender('0')).toBe('女');
  });

  test('returns 男 for 1', () => {
    expect(translateGender(1)).toBe('男');
  });

  test('returns 女 for 0', () => {
    expect(translateGender(0)).toBe('女');
  });

  test('returns 未知 for undefined', () => {
    expect(translateGender(undefined)).toBe('未知');
  });

  test('returns 未知 for any other input', () => {
    expect(translateGender('X')).toBe('未知');
    expect(translateGender('2')).toBe('未知');
    expect(translateGender('')).toBe('未知');
  });
});

describe('parseJSON函数测试', () => {
  test('正确解析有效的JSON字符串', () => {
    const jsonString = '{"name":"John", "age":30, "city":"New York"}';
    expect(parseJSON(jsonString)).toEqual({
      name: 'John',
      age: 30,
      city: 'New York',
    });
  });

  test('对于无效的JSON字符串，返回原始字符串', () => {
    const nonJsonString = '这不是JSON';
    expect(parseJSON(nonJsonString)).toBe(nonJsonString);
  });

  test('对于非字符串输入，返回原始值', () => {
    const nonStringInput = { message: '我不是字符串' };
    expect(parseJSON(nonStringInput)).toBe(nonStringInput);
  });

  test('处理数字输入，返回输入本身', () => {
    const numberInput = 12345;
    expect(parseJSON(numberInput)).toBe(numberInput);
  });

  test('处理null输入，返回输入空字符串', () => {
    const nullInput = null;
    expect(parseJSON(nullInput)).toBe('');
  });

  test('处理数组输入，返回输入本身', () => {
    const arrayInput = [1, 2, 3, '四'];
    expect(parseJSON(arrayInput)).toBe(arrayInput);
  });
});

describe('getRunningEnvironment', () => {
  const globalObj = global as any;
  it('正确识别微信小程序环境', () => {
    globalObj.wx = { getSystemInfo: jest.fn() };
    expect(getRunningEnvironment()).toBe('wechat');
    delete globalObj.wx;
  });

  it('正确识别支付宝小程序环境', () => {
    globalObj.my = { getSystemInfo: jest.fn() };
    expect(getRunningEnvironment()).toBe('ali');
    delete globalObj.my;
  });

  it('正确识别微信H5环境', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'micromessenger',
      configurable: true,
    });
    expect(getRunningEnvironment()).toBe('wechatH5');
  });

  it('正确识别支付宝H5环境', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'alipayclient',
      configurable: true,
    });
    expect(getRunningEnvironment()).toBe('aliH5');
  });

  it('正确识别iOS浏览器环境', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'iphone',
      configurable: true,
    });
    expect(getRunningEnvironment()).toBe('iOS');
  });

  it('正确识别Android浏览器环境', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'android',
      configurable: true,
    });
    expect(getRunningEnvironment()).toBe('Android');
  });

  it('返回“未知环境”当环境不是微信H5、支付宝H5、微信小程序、支付宝小程序、iOS浏览器或Android浏览器', () => {
    // 模拟一个不被识别的 userAgent
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'unknownBrowser',
      configurable: true,
    });
    // 确保不在小程序环境中
    globalObj.wx = undefined;
    globalObj.my = undefined;

    expect(getRunningEnvironment()).toBe('unknown');
  });

  // 清理userAgent的模拟
  afterEach(() => {
    jest.resetModules();
    Object.defineProperty(navigator, 'userAgent', {
      value: '',
    });
  });
});

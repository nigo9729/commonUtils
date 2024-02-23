import {
  desensitizeName,
  desensitizePhone,
  desensitizeIdNum,
  translateGender,
  parseJSON,
  parseQueryStr,
  getIdInfo,
} from '../';
import { expect, test, describe } from '@jest/globals';

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

describe('测试parseQueryStr函数', () => {
  test('参数为空', () => {
    expect(parseQueryStr()).toEqual({});
  });
  test('字符串?后空缺', () => {
    expect(parseQueryStr('http://www.example.com?')).toEqual({});
  });
  test('正常格式', () => {
    expect(
      parseQueryStr('http://www.example.com?key=value&key1=value1'),
    ).toEqual({ key: 'value', key1: 'value1' });
  });
  test('相同key, 其value为集合', () => {
    expect(
      parseQueryStr('http://www.example.com?key=value&key=value1'),
    ).toEqual({ key: ['value', 'value1'] });
  });
});

describe('测试getIdInfo函数 ', () => {
  test('有效的15位身份证号码', () => {
    expect(getIdInfo('130321860311219')).toStrictEqual({
      birthday: '1986-03-11',
      gender: 'M',
    });
  });
  test('有效的18位身份证号码', () => {
    expect(getIdInfo('110105198609081234')).toStrictEqual({
      birthday: '1986-09-08',
      gender: 'M',
    });
  });
  test('包含非法字符的身份证号码', () => {
    expect(getIdInfo('1101051986A9081234')).toStrictEqual(false);
  });
  test('长度不合法的身份证号码', () => {
    expect(getIdInfo('123456')).toBe(false);
  });
  test('边缘情况，如最后一位是X的18位身份证号码', () => {
    expect(getIdInfo('11010519860908123X')).toStrictEqual({
      birthday: '1986-09-08',
      gender: 'M',
    });
  });
});

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
  test('身份证为空', () => {
    expect(getIdInfo('')).toStrictEqual({ error: '身份证号不能为空！' });
  });

  test('身份证不合法', () => {
    expect(getIdInfo('123456789012345678')).toStrictEqual({
      error: '身份证号不合法！',
    });
  });
  test('正确的男性身份证', () => {
    expect(getIdInfo('520201200002245657')).toStrictEqual({
      birthday: '2000-02-24',
      gender: 'M',
    });
  });
  test('正确的女性身份证', () => {
    expect(getIdInfo('350627197104292920')).toStrictEqual({
      birthday: '1971-04-29',
      gender: 'F',
    });
  });
  test('边缘情况，如最后一位是X的18位身份证号码', () => {
    expect(getIdInfo('45032219980225001X')).toStrictEqual({
      birthday: '1998-02-25',
      gender: 'M',
    });
  });
});

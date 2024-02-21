import { getQueryParams } from '../url';

describe('getQueryParams 函数测试', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: undefined,
      writable: true,
    });
    window.location = {
      href: 'http://www.example.com?key1=value1&key2=value2',
    } as Location;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    // 恢复 window.location
    window.location = location;
  });

  test('返回对象', () => {
    const result = getQueryParams();

    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });

  test('空对象', () => {
    window.location.href = 'http://www.example.com';
    const result = getQueryParams();
    expect(result).toEqual({});
  });

  test('微信（支付宝）小程序浏览器环境', () => {
    global.wx = { getSystemInfo: jest.fn() };
    global.getCurrentPages = jest
      .fn()
      .mockReturnValue([{ route: { options: { key: 'value' } } }]);
    const result = getQueryParams();
    expect(result).toEqual({ key: 'value' });
  });
});

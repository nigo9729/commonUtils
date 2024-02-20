import { formatDiagnosis, parseDiagnosis } from '../'; // 假设您的函数在diagnosis.ts文件中

describe('诊断格式化与解析', () => {
  const mockDiagnosis = [
    { name: '感冒', code: 'J02.900' },
    { name: '发烧', code: 'A01.000' },
  ];
  const formattedDiagnosis = '无|感冒|无|J02.900;无|发烧|无|A01.000';

  test('formatDiagnosis 应正确将诊断数组格式化为字符串', () => {
    expect(formatDiagnosis(mockDiagnosis)).toEqual(formattedDiagnosis);
  });

  test('parseDiagnosis 应正确将诊断字符串解析为数组', () => {
    expect(parseDiagnosis(formattedDiagnosis)).toEqual(mockDiagnosis);
  });

  test('formatDiagnosis 对于未定义输入应返回空字符串', () => {
    expect(formatDiagnosis()).toEqual('');
  });

  test('parseDiagnosis 对于空字符串输入应返回空数组', () => {
    expect(parseDiagnosis('')).toEqual([]);
  });

  test('从数组到字符串再回到数组的转换应返回原始数组', () => {
    const roundTrip = parseDiagnosis(formatDiagnosis(mockDiagnosis));
    expect(roundTrip).toEqual(mockDiagnosis);
  });
});

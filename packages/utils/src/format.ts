type DiagnosisObj = {
  name: string;
  code: string;
};
/**
 *  格式化诊断,数组转字符串
 * @param diagnosis   诊断数组  例如: [{name: '感冒', code: 'J02.900'}, {name: '发烧', code: 'A01.000'}]
 * @returns 诊断字符串 例如: 无|感冒|无|J02.900;无|发烧|无|A01.000
 */
export const formatDiagnosis = (diagnosis?: DiagnosisObj[]): string => {
  if (!diagnosis || !Array.isArray(diagnosis)) {
    return '';
  }
  return diagnosis.map((item) => `无|${item.name}|无|${item.code}`).join(';');
};
/**
 *  解析诊断,字符串转数组
 * @param diagnosis 诊断字符串  例如: 无|感冒|无|J02.900;无|发烧|无|A01.000
 * @returns   诊断数组 例如: [{name: '感冒', code: 'J02.900'}, {name: '发烧', code: 'A01.000'}]
 */
export const parseDiagnosis = (diagnosis: string): DiagnosisObj[] => {
  if (!diagnosis) {
    return [];
  }
  return diagnosis.split(';').map((item) => {
    const [, name, , code] = item.split('|');
    return {
      name,
      code,
    };
  });
};

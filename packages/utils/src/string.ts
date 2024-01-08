/** 名字脱敏 */
export const encName = (str?: string) => {
  if (!str) return '';
  if (str.length === 1) return str;
  if (str.length === 2) return str[0] + '*';
  if (str.length === 3) return str[0] + '*' + str[2];
  if (str.length >= 4) return str[0] + '**';
};

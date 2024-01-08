/** 名字脱敏 */
export const encName = (str?: string) => {
  if (!str || !str?.length) return '';
  if (str.length === 1) return str;
  if (str.length === 2) return str[0] + '*';
  const sep = str.length === 3 ? '*' : '**';
  return str[0] + sep + str[str.length - 1];
};

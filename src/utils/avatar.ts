const alpha = 'abcdefghijklmnopqrstuvwxyz';
const colors = [
  '#330000',
  '#330033',
  '#330066',
  '#330099',
  '#3300CC',
  '#3300FF',
  '#660000',
  '#660033',
  '#660066',
  '#660099',
  '#6600CC',
  '#6600FF',
  '#CC0000',
  '#CC0033',
  '#CC0066',
  '#CC0099',
  '#CC00CC',
  '#CC00FF',
  '#FF6600',
  '#FF6633',
  '#FF6666',
  '#FF6699',
  '#FF66CC',
  '#FF66FF',
  '#006600',
  '#006633',
  '#006666',
];
export const generateName = (name: string) => {
  const arrName = name?.trim().toUpperCase().split(' ');
  const nameVisible = arrName
    ? arrName.length === 1
      ? arrName[0][0] === undefined
        ? 'None'
        : arrName[0][0]
      : arrName[0][0] + arrName[arrName.length - 1][0]
    : 'None';
  return nameVisible;
};
export const getColor = (name: string) => {
  name = name ?? 'A';
  const color = colors[alpha.lastIndexOf(name[0]?.toLowerCase())] ?? colors[colors.length - 1];
  return color;
};

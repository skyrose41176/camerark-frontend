export const sum = (array: (number | string)[]): number => {
  return array.reduce((acc: number, curr) => {
    if (typeof curr === 'string') {
      return acc + Number(curr);
    }
    return acc + curr;
  }, 0);
};

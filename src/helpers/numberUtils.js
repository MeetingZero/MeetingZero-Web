export const lpadZero = (num, width) => {
  num = num + '';

  return num.length >= width ? num : new Array(width - num.length + 1).join('0') + num;
}
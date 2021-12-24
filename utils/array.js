import R from "ramda";

export const sortAsc = R.sort((a, b) => a - b);

export const sortDesc = R.sort((a, b) => b - a);

export const minBy = R.curry((cb, arr) => {
  if (arr.length === 1) return arr[0];
  return R.reduce(R.minBy(cb), Infinity, arr);
});

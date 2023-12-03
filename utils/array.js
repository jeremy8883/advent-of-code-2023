import R from "ramda";

export const sortAsc = R.sort((a, b) => a - b);

export const sortDesc = R.sort((a, b) => b - a);

export const minBy = R.curry((cb, arr) => {
  if (arr.length === 1) return arr[0];
  return R.reduce(R.minBy(cb), Infinity, arr);
});

export const reduceChunks = R.curry((predicate, fn, initialValue, arr) => {
  const result = [];

  let isReducing = false;
  let acc;
  for (const item of arr) {
    if (!isReducing) {
      if (predicate(initialValue, item)) {
        acc = fn(initialValue, item);
        isReducing = true;
      }
    } else {
      if (predicate(acc, item)) {
        acc = fn(acc, item);
      } else {
        isReducing = false;
        result.push(acc);
      }
    }
  }
  if (isReducing) {
    result.push(acc);
  }

  return result;
});

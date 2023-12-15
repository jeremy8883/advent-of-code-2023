import R from "ramda";

export const parseInput = (str) => str.split(",");

export const runChallengeA = R.pipe(
  R.map(
    R.reduce((acc, val) => {
      const charCode = val.charCodeAt(0);
      return ((acc + charCode) * 17) % 256;
    }, 0)
  ),
  R.sum
);

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

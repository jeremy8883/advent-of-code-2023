import R from "ramda";
import { parseInt10 } from "../utils/number.js";

export const parseInput = (str) =>
  str.split("\n").map(R.pipe(R.split(" "), R.map(parseInt10)));

const getDiffs = (line) => {
  let diffs = [line];
  while (!R.head(diffs).every(R.equals(0))) {
    diffs = [
      R.pipe(
        R.head,
        R.aperture(2),
        R.map(([a, b]) => b - a)
      )(diffs),
      ...diffs,
    ];
  }
  return diffs;
};

const completeNextSequence = (line) => {
  const diffs = getDiffs(line);

  diffs[0].push(0);
  for (let i = 1; i < diffs.length; i++) {
    diffs[i].push(R.last(diffs[i]) + R.last(diffs[i - 1]));
  }

  return R.last(diffs);
};

export const runChallengeA = R.pipe(
  R.map(completeNextSequence),
  R.map(R.last),
  R.sum
);

const completePrevSequence = (line) => {
  let diffs = getDiffs(line);

  diffs[0].unshift(0);
  for (let i = 1; i < diffs.length; i++) {
    diffs[i].unshift(R.head(diffs[i]) - R.head(diffs[i - 1]));
  }

  return R.last(diffs);
};

export const runChallengeB = R.pipe(
  R.map(completePrevSequence),
  R.map(R.head),
  R.sum
);

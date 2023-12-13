import R from "ramda";
import { reduceChunks } from "../utils/array.js";
import { logGrid, rotateGrid90 } from "../utils/2d.js";

export const parseInput = (str) =>
  reduceChunks(
    (acc, line) => !!line,
    (acc, line) => [...acc, line.split("")],
    [],
    str.split("\n")
  );

const isReflection = (i, grid) => {
  const top = R.reverse(grid.slice(0, i));
  const bottom = grid.slice(i);

  const len = Math.min(top.length, bottom.length);

  for (let j = 0; j < len; j++) {
    if (!R.equals(top[j], bottom[j])) {
      return false;
    }
  }

  return true;
};

const getReflectionRowIndex = (grid) => {
  for (let i = 1; i < grid.length; i++) {
    if (isReflection(i, grid)) {
      return i;
    }
  }

  return 0; // This just so happens to work
};

export const runChallengeA = (input) => {
  return R.pipe(
    R.map((grid) => {
      return (
        getReflectionRowIndex(rotateGrid90(grid)) +
        getReflectionRowIndex(grid) * 100
      );
    }),
    R.sum
  )(input);
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

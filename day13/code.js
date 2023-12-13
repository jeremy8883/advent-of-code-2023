import R from "ramda";
import { reduceChunks } from "../utils/array.js";
import { rotateGrid90 } from "../utils/2d.js";

export const parseInput = (str) =>
  reduceChunks(
    (acc, line) => !!line,
    (acc, line) => [...acc, line.split("")],
    [],
    str.split("\n")
  );

const countImperfections = (rowA, rowB) => {
  let acc = 0;
  for (let i = 0; i < rowA.length; i++) {
    if (rowA[i] !== rowB[i]) {
      acc++;
    }
  }
  return acc;
};

const isReflection = (imperfectionCount, i, grid) => {
  const top = R.reverse(grid.slice(0, i));
  const bottom = grid.slice(i);

  const len = Math.min(top.length, bottom.length);

  let imperfections = 0;
  for (let j = 0; j < len; j++) {
    imperfections += countImperfections(top[j], bottom[j]);
  }

  return imperfections === imperfectionCount;
};

const getReflectionRowIndex = (imperfectionCount, grid) => {
  for (let i = 1; i < grid.length; i++) {
    if (isReflection(imperfectionCount, i, grid)) {
      return i;
    }
  }

  return 0; // This just so happens to work
};

const run = (imperfectionCount) =>
  R.pipe(
    R.map(
      (grid) =>
        getReflectionRowIndex(imperfectionCount, rotateGrid90(grid)) +
        getReflectionRowIndex(imperfectionCount, grid) * 100
    ),
    R.sum
  );

export const runChallengeA = run(0);

export const runChallengeB = run(1);

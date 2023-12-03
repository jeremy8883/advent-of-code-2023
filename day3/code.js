import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { findPoints, getNeighbours, logGrid, map2d } from "../utils/2d.js";
import { reduceChunks } from "../utils/array.js";

export const parseInput = parse2dCharArray;

// Symbols from test data: -%+=*/$&#@
const isSymbol = (char) => !/(\d|\.)/.test(char);

const getPartNumberGrid = (grid) => {
  const visited = map2d(() => false, grid);
  const partNumberGrid = map2d(() => null, grid);
  const symbolPoints = findPoints(isSymbol, grid);

  const queue = symbolPoints.flatMap((p) => getNeighbours(p, grid));

  let next = null;
  while ((next = queue.pop()) != null) {
    const { x, y } = next;
    if (visited[y][x]) {
      continue;
    }
    visited[y][x] = true;

    const char = grid[y][x];
    if (!isSymbol(char) && char !== ".") {
      partNumberGrid[y][x] = char;
      queue.push(...getNeighbours(next, grid));
    }
  }

  return partNumberGrid;
};

export const runChallengeA = (grid) => {
  return R.pipe(
    getPartNumberGrid,
    R.chain(reduceChunks((acc, val) => val != null, R.concat, "")),
    R.sum
  )(grid);
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

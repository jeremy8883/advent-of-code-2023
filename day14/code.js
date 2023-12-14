import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { forEach2d, getCol, logGrid, map2d, reduce2d } from "../utils/2d.js";

export const parseInput = parse2dCharArray;

const tiltNorth = (grid) => {
  const newGrid = map2d((v) => v, grid);

  forEach2d((val, x, y) => {
    if (val !== "O") return;
    const col = getCol(newGrid, x, 0, y).reverse();
    const index = col.findIndex((v) => v !== ".");
    const newY = index === -1 ? 0 : y - index;

    if (newY !== y) {
      newGrid[newY][x] = "O";
      newGrid[y][x] = ".";
    }
  }, newGrid);

  return newGrid;
};

const countLoad = (grid) => {
  return reduce2d(
    (acc, val, x, y) => {
      if (val !== "O") return acc;

      return acc + (grid.length - y);
    },
    0,
    grid
  );
};

export const runChallengeA = R.pipe(tiltNorth, countLoad);

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

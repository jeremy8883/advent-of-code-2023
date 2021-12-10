import R from "ramda";
import {
  find2d,
  find2dSubsection,
  map2d,
  reduce2d,
  reduce2dSubsection,
} from "../utils/2d.js";
import { sortAsc } from "../utils/array.js";
import { newRect } from "../utils/geometry.js";

export const parseInput = (str) =>
  str.split("\n").map((l) => l.split("").map(Number));

const getHasLowerNeighbour = (input, x, y) => {
  const value = input[y][x];

  return (
    find2dSubsection(
      (v, i, j) => v < value,
      newRect(x - 1, y - 1, 3, 3),
      input
    ) != null
  );
};

export const runChallengeA = (input) => {
  return reduce2d(
    (count, value, x, y) => {
      if (!getHasLowerNeighbour(input, x, y)) {
        return count + value + 1;
      }
      return count;
    },
    0,
    input
  );
};

const prepareInput = map2d(R.equals(9));

const findBasin = find2d((cell) => !cell);

const isHvNeighbour = (x, y, i, j) => {
  return !(
    (i === x && j === y) ||
    (i === x - 1 && j === y - 1) ||
    (i === x + 1 && j === y - 1) ||
    (i === x - 1 && j === y + 1) ||
    (i === x + 1 && j === y + 1)
  );
};

const reduce2dHvNeighbour = (cb, initalValue, x, y, grid) =>
  reduce2dSubsection(
    (acc, nextValue, i, j) => {
      if (!isHvNeighbour(x, y, i, j)) {
        return acc;
      }

      return cb(acc, nextValue, i, j);
    },
    initalValue,
    newRect(x - 1, y - 1, 3, 3),
    grid
  );

const fillGrid = (grid, x, y, count = 0) => {
  if (grid[y][x]) {
    return count;
  }

  grid[y][x] = true;

  return reduce2dHvNeighbour(
    (acc, isFilled, i, j) => fillGrid(grid, i, j, acc),
    count + 1,
    x,
    y,
    grid
  );
};

export const runChallengeB = (input) => {
  let grid = prepareInput(input);

  let basin;
  let sizes = [];

  while ((basin = findBasin(grid)) != null) {
    const [x, y] = basin;

    const size = fillGrid(grid, x, y);
    sizes.push(size);
  }

  return R.product(R.takeLast(3, sortAsc(sizes)));
};

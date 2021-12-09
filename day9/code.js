import R from "ramda";
import { find2d, map2d, reduce2d } from "../utils/2d.js";

export const parseInput = (str) =>
  str.split("\n").map((l) => l.split("").map(Number));

const getHasLowerPoint = (input, x, y) => {
  const value = input[y][x];

  for (
    let y2 = Math.max(y - 1, 0);
    y2 <= Math.min(y + 1, input.length - 1);
    y2++
  ) {
    for (
      let x2 = Math.max(x - 1, 0);
      x2 <= Math.min(x + 1, input[y].length - 1);
      x2++
    ) {
      if (x2 === x && y2 === y) continue;

      if (input[y2][x2] < value) return true;
    }
  }
  return false;
};

export const runChallengeA = (input) => {
  return reduce2d(
    (count, value, x, y) => {
      if (!getHasLowerPoint(input, x, y)) {
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

const fillGrid = (grid, x, y, count = 0) => {
  if (grid[y][x]) {
    return count;
  }

  grid[y][x] = true;

  let thisCount = count + 1;

  for (
    let y2 = Math.max(y - 1, 0);
    y2 <= Math.min(y + 1, grid.length - 1);
    y2++
  ) {
    for (
      let x2 = Math.max(x - 1, 0);
      x2 <= Math.min(x + 1, grid[y].length - 1);
      x2++
    ) {
      if (
        (x2 === x && y2 === y) ||
        (x2 === x - 1 && y2 === y - 1) ||
        (x2 === x + 1 && y2 === y - 1) ||
        (x2 === x - 1 && y2 === y + 1) ||
        (x2 === x + 1 && y2 === y + 1)
      ) {
        continue;
      }

      thisCount = fillGrid(grid, x2, y2, thisCount);
    }
  }

  return thisCount;
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

  const diff = function (a, b) {
    return a - b;
  };

  return R.product(R.takeLast(3, R.sort(diff, sizes)));
};

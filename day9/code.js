const R = require("ramda");

const parseInput = (str) => str.split("\n").map((l) => l.split("").map(Number));

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

const runChallengeA = (input) => {
  let count = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const value = input[y][x];
      if (!getHasLowerPoint(input, x, y)) {
        count += value + 1;
      }
    }
  }
  return count;
};

const prepareInput = (input) => {
  return input.map((col) => {
    return col.map((number) => {
      return number === 9;
    });
  });
};

const findBasin = (input) => {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (!input[y][x]) return [x, y];
    }
  }
  return undefined;
};

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

const runChallengeB = (input) => {
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

module.exports = { parseInput, runChallengeA, runChallengeB };

const R = require("ramda");

const forEach2d = R.curry((cb, grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      cb(grid[y][x], x, y);
    }
  }
});

const map2d = R.curry((cb, grid) => {
  return grid.map((row, y) => row.map((cell, x) => cb(cell, x, y)));
});

const reduce2d = R.curry((cb, initial, grid) => {
  return grid.reduce(
    (acc, row, y) => row.reduce((acc, cell, x) => cb(acc, cell, x, y), acc),
    initial
  );
});

const find2d = R.curry((cb, grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (cb(grid[y][x], x, y)) {
        return [x, y];
      }
    }
  }
  return undefined;
});

module.exports = {
  forEach2d,
  map2d,
  reduce2d,
  find2d,
};

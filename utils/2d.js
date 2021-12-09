import R from "ramda";

export const forEach2d = R.curry((cb, grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      cb(grid[y][x], x, y);
    }
  }
});

export const map2d = R.curry((cb, grid) => {
  return grid.map((row, y) => row.map((cell, x) => cb(cell, x, y)));
});

export const reduce2d = R.curry((cb, initial, grid) => {
  return grid.reduce(
    (acc, row, y) => row.reduce((acc, cell, x) => cb(acc, cell, x, y), acc),
    initial
  );
});

export const find2d = R.curry((cb, grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (cb(grid[y][x], x, y)) {
        return [x, y];
      }
    }
  }
  return undefined;
});

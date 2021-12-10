import R from "ramda";

export const findByColumn = R.curry((predicate, grid) => {
  for (let x = 0; x < grid[0].length; x++) {
    const column = grid.map((row, y) => grid[y][x]);

    if (predicate(column)) {
      return column;
    }
  }
});

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

export const forEach2dSubsection = R.curry((cb, subsection, grid) => {
  for (
    let y = Math.max(subsection.y, 0);
    y < Math.min(subsection.y + subsection.height, grid.length);
    y++
  ) {
    for (
      let x = Math.max(subsection.x, 0);
      x < Math.min(subsection.x + subsection.width, grid[y].length);
      x++
    ) {
      cb(grid[y][x], x, y);
    }
  }
});

export const reduce2dSubsection = R.curry((cb, initial, subsection, grid) => {
  let acc = initial;
  forEach2dSubsection(
    (item, x, y) => {
      acc = cb(acc, item, x, y);
    },
    subsection,
    grid
  );
  return acc;
});

export const find2dSubsection = R.curry((cb, subsection, grid) => {
  for (
    let y = Math.max(subsection.y, 0);
    y < Math.min(subsection.y + subsection.height, grid.length);
    y++
  ) {
    for (
      let x = Math.max(subsection.x, 0);
      x < Math.min(subsection.x + subsection.width, grid[y].length);
      x++
    ) {
      if (cb(grid[y][x], x, y)) {
        return grid[y][x];
      }
    }
  }
});

import R from "ramda";
import { newRectByPoints } from "./geometry.js";

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

export const map2dSubsection = R.curry((cb, subsection, grid) => {
  let cloned = R.clone(grid);
  forEach2dSubsection(
    (item, x, y) => {
      cloned[y][x] = cb(item, x, y);
    },
    subsection,
    cloned
  );
  return cloned;
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

export const gridToString = (grid) => {
  return grid.map((row) => row.join("")).join("\n");
};

export const newGrid = R.curry((defaultValue, { width, height }) =>
  R.range(0, height).map(() => R.range(0, width).map(() => defaultValue))
);

export const getBounds = (points) =>
  newRectByPoints(
    R.apply(
      Math.min,
      points.map((p) => p.x)
    ) + 1,
    R.apply(
      Math.min,
      points.map((p) => p.y)
    ) + 1,
    R.apply(
      Math.max,
      points.map((p) => p.x)
    ) + 1,
    R.apply(
      Math.max,
      points.map((p) => p.y)
    ) + 1
  );

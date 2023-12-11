import R from "ramda";
import {
  getX2,
  getY2,
  newPoint,
  newRect,
  newRectByPoints,
  newSize,
} from "./geometry.js";

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
        return newPoint(x, y);
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

export const getNeighbours = R.curry(({ x, y }, grid) => {
  const result = [];
  forEach2dSubsection(
    (item, thisX, thisY) => {
      if (!(x === thisX && y === thisY)) {
        result.push(newPoint(thisX, thisY));
      }
    },
    newRect(x - 1, y - 1, 3, 3),
    grid
  );
  return result;
});

export const getHvNeighbours = R.curry(({ x, y }, grid) => {
  const result = [];
  if (y > 0) {
    result.push({ y: y - 1, x });
  }
  if (x > 0) {
    result.push({ y, x: x - 1 });
  }
  if (x < grid[y].length - 1) {
    result.push({ y, x: x + 1 });
  }
  if (y < grid.length - 1) {
    result.push({ y: y + 1, x });
  }
  return result;
});

export const getHNeighbours = R.curry(({ x, y }, grid) => {
  const result = [];
  if (x > 0) {
    result.push({ y, x: x - 1 });
  }
  if (x < grid[y].length - 1) {
    result.push({ y, x: x + 1 });
  }
  return result;
});

export const getVNeighbours = R.curry(({ x, y }, grid) => {
  const result = [];
  if (y > 0) {
    result.push({ y: y - 1, x });
  }
  if (y < grid.length - 1) {
    result.push({ y: y + 1, x });
  }
  return result;
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

export const getSubsection = R.curry((subsection, grid) => {
  const rows = [];
  for (
    let y = Math.max(subsection.y, 0);
    y < Math.min(subsection.y + subsection.height, grid.length);
    y++
  ) {
    rows.push(grid[y].slice(subsection.x, subsection.x + subsection.width));
  }
  return rows;
});

export const find2dSubsectionPoint = R.curry((cb, subsection, grid) => {
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
        return newPoint(x, y);
      }
    }
  }
});

export const gridToString = (grid) => {
  return grid.map((row) => row.join("")).join("\n");
};

export const logGrid = (g) => {
  console.log(gridToString(g));
};

export const newGrid = R.curry((defaultValue, { width, height }) =>
  R.range(0, height).map(() => R.range(0, width).map(() => defaultValue))
);

export const getBounds = (points) =>
  newRectByPoints(
    R.apply(
      Math.min,
      points.map((p) => p.x)
    ),
    R.apply(
      Math.min,
      points.map((p) => p.y)
    ),
    R.apply(
      Math.max,
      points.map((p) => p.x)
    ) + 1,
    R.apply(
      Math.max,
      points.map((p) => p.y)
    ) + 1
  );

export const getSize = (grid) => newSize(grid[0].length, grid.length);

export const reduceRect = R.curry((cb, initial, rect) => {
  let acc = initial;
  for (let y = rect.y; y < getY2(rect); y++) {
    for (let x = rect.x; x < getX2(rect); x++) {
      acc = cb(acc, x, y);
    }
  }
  return acc;
});

export const findPoints = R.curry((cb, grid) => {
  const arr = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (cb(grid[y][x], x, y)) {
        arr.push(newPoint(x, y));
      }
    }
  }
  return arr;
});

export const expandGrid = (multiple, callback, grid) => {
  const expandedGrid = newGrid(
    null,
    newSize(grid[0].length * multiple, grid.length * multiple)
  );

  forEach2d((val, x, y) => {
    const newItems = callback(val, x, y);
    forEach2d((val, i, j) => {
      expandedGrid[y * multiple + j][x * multiple + i] = val;
    }, newItems);
  }, grid);

  return expandedGrid;
};

export const shrinkGrid = R.curry((multiple, callback, grid) => {
  const shrunkGrid = newGrid(
    null,
    newSize(grid[0].length / multiple, grid.length / multiple)
  );

  return map2d((val, x, y) => {
    return callback(
      getSubsection(
        newRect(x * multiple, y * multiple, multiple, multiple),
        grid
      )
    );
  }, shrunkGrid);
});

const bucketFillWithPredicate = R.curry(
  (predicate, newValue, startPos, grid) => {
    const queue = [];
    queue.push(startPos);
    const visited = map2d(() => false, grid);
    const newGrid = map2d((v) => v, grid);

    while (queue.length > 0) {
      const pos = queue.shift();
      if (visited[pos.y][pos.x]) continue;

      visited[pos.y][pos.x] = true;
      if (predicate(grid[pos.y][pos.x], pos.x, pos.y)) {
        newGrid[pos.y][pos.x] = newValue;
        queue.push(...getNeighbours(pos, grid));
      }
    }

    return newGrid;
  }
);

export const bucketFill = R.curry((newValue, startPos, grid) => {
  const firstVal = grid[startPos.y][startPos.x];
  return bucketFillWithPredicate(
    (v) => v === firstVal,
    newValue,
    startPos,
    grid
  );
});

export const replace2d = R.curry((from, to, grid) =>
  map2d((val) => (val === from ? to : val), grid)
);

export const rotateGrid90 = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const rotatedGrid = [];
  for (let y = 0; y < cols; y++) {
    const newRow = [];
    for (let x = rows - 1; x >= 0; x--) {
      newRow.push(grid[x][y]);
    }
    rotatedGrid.push(newRow);
  }

  return rotatedGrid;
};

export const getRow = (grid, y, xFrom, xTo) => {
  const _xFrom = Math.min(xFrom, xTo);
  const _xTo = Math.max(xFrom, xTo);

  return grid[y].slice(_xFrom, _xTo);
};

export const getCol = (grid, x, yFrom, yTo) => {
  const _yFrom = Math.min(yFrom, yTo);
  const _yTo = Math.max(yFrom, yTo);

  const colValues = [];
  for (let i = _yFrom; i < _yTo; i++) {
    colValues.push(grid[i][x]);
  }
  return colValues;
};

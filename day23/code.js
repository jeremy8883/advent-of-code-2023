import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { getHvNeighbours, logGrid, map2d } from "../utils/2d.js";
import { addPoints, newPoint } from "../utils/geometry.js";

export const parseInput = parse2dCharArray;

const printPath = (grid, path) => {
  const newGrid = map2d(
    (val, x, y) => (path.find(R.equals(newPoint(x, y))) ? "O" : val),
    grid
  );
  logGrid(newGrid);
};

export const runChallengeA = (grid) => {
  const startPos = newPoint(1, 0);
  const targetPos = newPoint(grid[0].length - 2, grid.length - 1);
  const queue = [{ pos: startPos, path: [] }];
  let best = 0;

  while (queue.length) {
    const { pos, path } = queue.shift();
    const char = grid[pos.y][pos.x];

    if (path.find(R.equals(pos))) {
      continue;
    }

    if (R.equals(pos, targetPos)) {
      // printPath(grid, path);
      best = Math.max(best, path.length);
    }

    const neighbours =
      char === ">"
        ? [addPoints(pos, newPoint(1, 0))]
        : char === "v"
        ? [addPoints(pos, newPoint(0, 1))]
        : char === "<"
        ? [addPoints(pos, newPoint(-1, 0))]
        : char === "^"
        ? [addPoints(pos, newPoint(0, -1))]
        : getHvNeighbours(pos, grid).filter((p) => grid[p.y][p.x] !== "#");

    queue.push(...neighbours.map((p) => ({ pos: p, path: [...path, pos] })));
  }

  return best;
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

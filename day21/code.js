import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import {
  find2d,
  getHvNeighbours,
  logGrid,
  map2d,
  reduce2d,
} from "../utils/2d.js";
import { ObjectSet } from "../utils/ObjectSet.js";
import { newPoint } from "../utils/geometry.js";

export const parseInput = (input) => {
  const grid = parse2dCharArray(input);
  const startPoint = find2d((val, x, y) => val === "S", grid);
  grid[startPoint.y][startPoint.x] = ".";

  return {
    grid,
    startPoint,
  };
};

export const runChallengeA = ({ startPoint, grid }, stepCount = 64) => {
  const runStep = (grid, points) => {
    const newPoints = new ObjectSet();
    for (const point of points) {
      for (const neighbour of getHvNeighbours(point, grid)) {
        if (grid[neighbour.y][neighbour.x] === ".") {
          newPoints.add(neighbour);
        }
      }
    }
    return newPoints;
  };

  let points = new ObjectSet();
  points.add(startPoint);

  for (let i = 0; i < stepCount; i++) {
    points = runStep(grid, points);
  }

  return points.size;
};

export const getHvNeighboursUnsafe = R.curry(({ x, y }) => {
  return [
    { y: y - 1, x },
    { y, x: x - 1 },
    { y, x: x + 1 },
    { y: y + 1, x },
  ];
});

const getWrappedPoint = (point, grid) => {
  const x = point.x % grid[0].length;
  const y = point.y % grid.length;
  return newPoint(x < 0 ? grid[0].length + x : x, y < 0 ? grid.length + y : y);
};

const getDimKey = (point, grid) =>
  `${Math.floor(point.x / grid[0].length)},${Math.floor(
    point.y / grid.length
  )}`;

const logPoints = (grid, points) => {
  logGrid(
    map2d((val, x, y) => {
      return points.has(newPoint(x, y)) ? "O" : val;
    }, grid)
  );
};

export const runStepsWrapped = ({ grid, startPoint }, stepCount) => {
  const runStep = (grid, points, i) => {
    const newPoints = new ObjectSet();

    for (const point of points) {
      for (const neighbour of getHvNeighboursUnsafe(point)) {
        const wrappedNeighbour = getWrappedPoint(neighbour, grid);

        if (grid[wrappedNeighbour.y][wrappedNeighbour.x] === ".") {
          newPoints.add(neighbour);
        }
      }
    }

    return newPoints;
  };

  let points = new ObjectSet();
  points.add(startPoint);

  // This will mutate
  const completedDims = {};

  for (let i = 0; i < stepCount; i++) {
    points = runStep(grid, points, completedDims, i);
  }

  return points.size;
};

export const runChallengeB = ({ startPoint, grid }, stepCount = 26501365) => {
  const wrapCount = Math.floor(stepCount / grid.length);
  const remainderCount = stepCount % grid.length;

  const x1 = 0;
  const y1 = runStepsWrapped({ grid, startPoint }, remainderCount);
  const x2 = 1;
  const y2 = runStepsWrapped(
    { grid, startPoint },
    remainderCount + grid.length
  );
  const x3 = 2;
  const y3 = runStepsWrapped(
    { grid, startPoint },
    remainderCount + 2 * grid.length
  );

  const f = (x) =>
    (y1 * (x - x2) * (x - x3)) / (x1 - x2) / (x1 - x3) +
    (y2 * (x - x1) * (x - x3)) / (x2 - x1) / (x2 - x3) +
    (y3 * (x - x1) * (x - x2)) / (x3 - x1) / (x3 - x2);

  return f(wrapCount);
};

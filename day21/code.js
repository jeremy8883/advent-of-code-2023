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

export const runChallengeB = ({ startPoint, grid }, stepCount = 26501365) => {
  const runStep = (grid, points, completedDims, i) => {
    const newPoints = new ObjectSet();

    for (const point of points) {
      for (const neighbour of getHvNeighboursUnsafe(point)) {
        const dimKey = getDimKey(neighbour, grid);
        if (completedDims[dimKey]?.finishedAt != null) {
          continue;
        }

        const wrappedNeighbour = getWrappedPoint(neighbour, grid);

        if (grid[wrappedNeighbour.y][wrappedNeighbour.x] === ".") {
          newPoints.add(neighbour);
        }
      }
    }

    // logGrid(
    //   map2d((val, x, y) => {
    //     return newPoints.has(newPoint(x, y)) ? "O" : val;
    //   }, grid)
    // );

    // console.log(
    //   reduce2d(
    //     (acc, val, x, y) => (points.has(newPoint(x, y)) ? acc + 1 : acc),
    //     0,
    //     grid
    //   )
    // );

    const groups = R.groupBy(
      (point) => getDimKey(point, grid),
      newPoints.values()
    );
    for (const [key, points] of Object.entries(groups)) {
      if (!completedDims[key]) {
        completedDims[key] = { lengths: [points.length], finishedAt: null };
      } else {
        if (
          completedDims[key].lengths.length === 2 &&
          completedDims[key].lengths[0] === points.length
        ) {
          completedDims[key].finishedAt = i;
        }
        completedDims[key].lengths = [
          R.last(completedDims[key].lengths),
          points.length,
        ];
      }
    }

    console.log(groups);

    return newPoints;
  };

  let points = new ObjectSet();
  points.add(startPoint);

  // This will mutate
  const completedDims = {};

  for (let i = 0; i < stepCount; i++) {
    points = runStep(grid, points, completedDims, i);
    if (i % 10000 === 0) {
      console.log(".");
    }
  }

  return points.size;
};

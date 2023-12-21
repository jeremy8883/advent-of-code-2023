import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { find2d, getHvNeighbours } from "../utils/2d.js";
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

export const runChallengeB = ({ startPoint, grid }, stepCount = 26501365) => {
  const runStep = (grid, points) => {
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

  for (let i = 0; i < stepCount; i++) {
    points = runStep(grid, points);
  }

  return points.size;
};

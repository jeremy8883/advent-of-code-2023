import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { find2d, getHvNeighbours } from "../utils/2d.js";
import { ObjectSet } from "../utils/ObjectSet.js";

export const parseInput = (input) => {
  const grid = parse2dCharArray(input);
  const startPoint = find2d((val, x, y) => val === "S", grid);
  grid[startPoint.y][startPoint.x] = ".";

  return {
    grid,
    startPoint,
  };
};

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

export const runChallengeA = ({ startPoint, grid }, stepCount = 64) => {
  let points = new ObjectSet();
  points.add(startPoint);

  for (let i = 0; i < stepCount; i++) {
    points = runStep(grid, points);
  }

  return points.size;
};

export const runChallengeB = ({ startPoint, grid }, stepCount = 26501365) => {
  let points = new ObjectSet();
  points.add(startPoint);

  for (let i = 0; i < stepCount; i++) {
    points = runStep(grid, points);
  }

  return points.size;
};

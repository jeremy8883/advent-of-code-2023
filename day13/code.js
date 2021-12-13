import R from "ramda";
import { getBounds, gridToString, newGrid } from "../utils/2d.js";

export const parseInput = (str) => {
  const lines = str.split("\n");

  const points = lines
    .filter((l) => l && !l.startsWith("fold"))
    .map((l) => l.split(","))
    .map(([x, y]) => ({ x: Number(x), y: Number(y) }));

  const folds = lines
    .filter((l) => l && l.startsWith("fold"))
    .map((l) => l.replace("fold along", "").split("="))
    .map(([axis, value]) => ({ axis: axis.trim(), value: Number(value) }));

  return {
    points,
    folds,
  };
};

const makeFold = ({ axis, value }, point) => {
  if (axis === "x") {
    if (point.x < value) {
      return point;
    } else {
      return {
        ...point,
        x: point.x - 2 * (point.x - value),
      };
    }
  } else {
    if (point.y < value) {
      return point;
    } else {
      return {
        ...point,
        y: point.y - 2 * (point.y - value),
      };
    }
  }
};

const doFold = (points, fold) => {
  return R.pipe(
    R.map((point) => {
      return makeFold(fold, point);
    }),
    R.uniqBy((point) => `${point.x},${point.y}`)
  )(points);
};

export const runChallengeA = (input) => {
  return doFold(input.points, input.folds[0]).length;
};

const renderPoints = (points) => {
  const size = getBounds(points);
  const grid = newGrid(".", size);
  return points.reduce((grid, point) => {
    grid[point.y][point.x] = "#";
    return grid;
  }, grid);
};

export const runChallengeB = (input) => {
  const points = input.folds.reduce((points, f) => {
    return doFold(points, f);
  }, input.points);
  const grid = renderPoints(points);
  return gridToString(grid);
};

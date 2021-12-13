import R from "ramda";
import { newRectByPoints } from "../utils/geometry.js";

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

const getGridSize = (points) =>
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

const newGrid = (width, height) =>
  R.range(0, height).map(() => R.range(0, width).map(() => "."));

const renderPoints = (points) => {
  const size = getGridSize(points);
  const grid = newGrid(size.width, size.height);
  return points.reduce((grid, point) => {
    grid[point.y][point.x] = "#";
    return grid;
  }, grid);
};

const gridToString = (grid) => {
  return grid.map((row) => row.join("")).join("\n");
};

export const runChallengeB = (input) => {
  const points = input.folds.reduce((points, f) => {
    return doFold(points, f);
  }, input.points);
  const grid = renderPoints(points);
  return gridToString(grid);
};

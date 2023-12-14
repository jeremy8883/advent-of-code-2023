import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { findPoints, getCol, getRow, rotateGrid90Cw } from "../utils/2d.js";

export const parseInput = parse2dCharArray;

const expandRows = (grid) =>
  grid.map((row) => {
    return row.every((i) => [".", "E"].includes(i))
      ? R.repeat("E", row.length)
      : row;
  });

const markExpanded = R.pipe(
  expandRows,
  rotateGrid90Cw,
  expandRows,
  rotateGrid90Cw,
  rotateGrid90Cw,
  rotateGrid90Cw
);

const charToDistance = R.curry((expandedValue, v) =>
  v === "E" ? expandedValue : 1
);

const getDistance = (factor, grid, pointA, pointB) => {
  return R.sum([
    ...getRow(grid, pointA.y, pointA.x, pointB.x).map(charToDistance(factor)),
    ...getCol(grid, pointA.x, pointA.y, pointB.y).map(charToDistance(factor)),
  ]);
};

const findDistances = (factor) => (grid) => {
  const points = findPoints((v) => v === "#", grid);

  const distances = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = getDistance(factor, grid, points[i], points[j]);
      distances.push(dist);
    }
  }
  return distances;
};

export const runChallengeA = R.pipe(markExpanded, findDistances(2), R.sum);

export const runChallengeB = R.pipe(
  markExpanded,
  findDistances(1000000),
  R.sum
);

import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { findPoints, logGrid, rotateGrid90 } from "../utils/2d.js";

export const parseInput = parse2dCharArray;

const expandRows = (grid) =>
  grid.flatMap((row) => {
    return row.every((i) => i === ".") ? [row, row] : [row];
  });

const expandSpace = R.pipe(
  expandRows,
  rotateGrid90,
  expandRows,
  rotateGrid90,
  rotateGrid90,
  rotateGrid90
);

const getDistance = (pointA, pointB) =>
  Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);

const findDistances = (grid) => {
  const points = findPoints((v) => v === "#", grid);

  const distances = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = getDistance(points[i], points[j]);
      distances.push(dist);
    }
  }
  return distances;
};

export const runChallengeA = R.pipe(expandSpace, findDistances, R.sum);

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

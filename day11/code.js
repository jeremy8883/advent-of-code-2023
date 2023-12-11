import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { findPoints, logGrid, rotateGrid90 } from "../utils/2d.js";

export const parseInput = parse2dCharArray;

const expandRows = (factor) => (grid) =>
  grid.flatMap((row) => {
    return row.every((i) => i === ".") ? R.repeat(row, factor) : [row];
  });

const expandSpace = (factor) =>
  R.pipe(
    expandRows(factor),
    rotateGrid90,
    expandRows(factor),
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

export const runChallengeA = R.pipe(expandSpace(2), findDistances, R.sum);

export const runChallengeB = R.pipe(expandSpace(100), findDistances, R.sum);

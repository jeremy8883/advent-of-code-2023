import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { getSize, isInsideGrid, logGrid, map2d, newGrid } from "../utils/2d.js";
import { addPoints, isInside, newPoint } from "../utils/geometry.js";

export const parseInput = parse2dCharArray;

function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

const reflectVector = (vector, slope) => {
  if (slope === Infinity) {
    return newPoint(-vector.x, vector.y);
  }

  // This will always be 1
  const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  const angle = Math.atan2(vector.y, vector.x);
  const slopeAngle = Math.atan(slope);

  const reflectedAngle = 2 * slopeAngle - angle;

  return newPoint(
    Math.round(magnitude * Math.cos(reflectedAngle)),
    Math.round(magnitude * Math.sin(reflectedAngle))
  );
};

const isDiff180 = (vectorA, vectorB) => {
  const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;

  return dotProduct === -1;
};

const sumVisited = R.pipe(
  R.flatten,
  R.map((v) => (v.size ? 1 : 0)),
  R.sum
);

const splitReflection = (vector) => [
  newPoint(-vector.y, vector.x),
  newPoint(vector.y, -vector.x),
];

const charToSlope = {
  "|": Infinity,
  "-": 0,
  "/": -1,
  "\\": 1,
};

const pointToString = (p) => `${p.x},${p.y}`;

export const runChallengeA = (grid) => {
  const visited = map2d(() => new Set(), grid);
  const queue = [];
  queue.push({ direction: newPoint(1, 0), pos: newPoint(0, 0) });

  while (queue.length > 0) {
    // logGrid(map2d((c) => (c.size ? "#" : "."), visited));
    const { direction, pos } = queue.shift();
    if (!isInsideGrid(pos, grid)) {
      continue;
    }
    if (visited[pos.y][pos.x].has(pointToString(direction))) {
      continue;
    }
    visited[pos.y][pos.x].add(pointToString(direction));
    const val = grid[pos.y][pos.x];
    if (val === ".") {
      queue.push({ direction, pos: addPoints(pos, direction) });
    } else {
      const reflectedDirection = reflectVector(direction, charToSlope[val]);
      if (isDiff180(reflectedDirection, direction)) {
        for (const newDirection of splitReflection(direction)) {
          queue.push({
            direction: newDirection,
            pos: addPoints(pos, newDirection),
          });
        }
      } else {
        queue.push({
          direction: reflectedDirection,
          pos: addPoints(pos, reflectedDirection),
        });
      }
    }
  }

  return sumVisited(visited);
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

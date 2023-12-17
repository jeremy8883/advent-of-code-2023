import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { isInsideGrid, logGrid, map2d } from "../utils/2d.js";
import { addPoints, newPoint } from "../utils/geometry.js";

export const parseInput = parse2dCharArray;

function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

const reflectVector = (vector, slope) => {
  if (slope === Infinity) {
    return newPoint(-vector.x, vector.y);
  }

  const angle = Math.atan2(vector.y, vector.x);
  const slopeAngle = Math.atan(slope);
  const reflectedAngle = 2 * slopeAngle - angle;

  return newPoint(
    Math.round(Math.cos(reflectedAngle)),
    Math.round(Math.sin(reflectedAngle))
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

const energiseCells = (initDirection, initPos, grid) => {
  const visited = map2d(() => new Set(), grid);
  const queue = [];
  queue.push({ direction: initDirection, pos: initPos });

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

export const runChallengeA = (grid) =>
  energiseCells(newPoint(1, 0), newPoint(0, 0), grid);

export const runChallengeB = (grid) => {
  let max = 0;
  for (let x = 0; x < grid[0].length; x++) {
    max = Math.max(max, energiseCells(newPoint(0, 1), newPoint(x, 0), grid));
    max = Math.max(
      max,
      energiseCells(newPoint(0, -1), newPoint(x, grid.length - 1), grid)
    );
  }
  for (let y = 0; y < grid.length; y++) {
    max = Math.max(max, energiseCells(newPoint(1, 0), newPoint(0, y), grid));
    max = Math.max(
      max,
      energiseCells(newPoint(-1, 0), newPoint(grid[0].length - 1, y), grid)
    );
  }

  return max;
};

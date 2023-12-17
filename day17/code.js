import R from "ramda";
import { parse2dNumberArray } from "../utils/inputParsing.js";
import { addPoints, newPoint } from "../utils/geometry.js";
import { getSize, isInsideGrid, logGrid, map2d, newGrid } from "../utils/2d.js";
import PriorityQueue from "priorityqueuejs";
export const parseInput = parse2dNumberArray;

const getCost = (grid, { path }) => {
  const pos = R.last(path);
  return grid[pos.y][pos.x];
};

const getDirection = (pointA, pointB) =>
  newPoint(
    pointA.x < pointB.x ? 1 : pointA.x > pointB.x ? -1 : 0,
    pointA.y < pointB.y ? 1 : pointA.y > pointB.y ? -1 : 0
  );

const getLastDirection = (points) => {
  if (points.length < 2) {
    return null;
  }
  return getDirection(points[points.length - 2], points[points.length - 1]);
};

const getIs3InARow = (path) => {
  if (path.length < 4) return false;
  const directions = R.pipe(
    R.takeLast(4),
    R.aperture(2),
    R.map(([a, b]) => getDirection(a, b))
  )(path);

  return directions.every(R.equals(directions[0]));
};

const getLrf = (pos, path, debug) => {
  const direction = getLastDirection(path) || newPoint(1, 0);

  if (debug) {
    console.log(direction, path);
  }

  const directions = [
    getIs3InARow(path) ? null : direction,
    newPoint(-direction.y, direction.x),
    newPoint(direction.y, -direction.x),
  ].filter(Boolean);

  return directions.map((d) => addPoints(pos, d));
};

const pathToGrid = (grid, path) => {
  return path.reduce((acc, val) => {
    acc[val.y][val.x] = "#";
    return acc;
  }, newGrid(".", getSize(grid)));
};

const getKey = R.pipe(
  R.takeLast(4),
  R.map((p) => `${p.x},${p.y}`),
  R.join("|")
);

const debugPath = [
  newPoint(0, 0),
  newPoint(1, 0),
  newPoint(2, 0),
  newPoint(2, 1),
  newPoint(3, 1),
  newPoint(4, 1),
  newPoint(5, 1),
  newPoint(5, 0),
  newPoint(6, 0),
  newPoint(7, 0),
  newPoint(8, 0),
  newPoint(8, 1),
  newPoint(8, 2),
  newPoint(9, 2),
  newPoint(10, 2),
  newPoint(10, 3),
  newPoint(10, 4),
  newPoint(11, 4),
  newPoint(11, 5),
  newPoint(11, 6),
  newPoint(11, 7),
  newPoint(12, 7),
  newPoint(12, 8),
  newPoint(12, 9),
  newPoint(12, 10),
  newPoint(11, 10),
  newPoint(11, 11),
  newPoint(11, 12),
  newPoint(12, 12),
];

const isOnPath = (path) => {
  if (path.length > debugPath.length) return false;
  return R.equals(R.take(path.length, debugPath), path);
};

const getHeuristic = (pos, endPos) =>
  2 * (Math.abs(pos.x - endPos.x) + Math.abs(pos.y - endPos.y));

export const getShortestPath = (grid) => {
  const queue = new PriorityQueue(
    (a, b) => -(a.costSoFar + a.heuristic - b.costSoFar + a.heuristic)
  );
  const startPos = newPoint(0, 0);
  const destPos = newPoint(grid[0].length - 1, grid.length - 1);
  const visited = newGrid(() => ({}), getSize(grid));
  let bestResult = null;

  queue.enq({
    costSoFar: 0,
    // costSoFar: grid[startPos.y][startPos.x],
    path: [startPos],
  });
  while (queue.size()) {
    const next = queue.deq();
    const pos = R.last(next.path);
    const key = getKey(next.path);

    // if (isOnPath(next.path)) {
    //   console.log(
    //     "!!!",
    //     next.path,
    //     next.costSoFar,
    //     R.sum(next.path.map((p) => grid[p.y][p.x]))
    //   );
    // }

    if (visited[pos.y][pos.x][key] < next.costSoFar) {
      continue;
    }

    visited[pos.y][pos.x][key] = next.costSoFar;
    if (R.equals(destPos, pos)) {
      if (!bestResult || next.costSoFar < bestResult.costSoFar) {
        console.log(next.costSoFar);
        bestResult = next;
      }
      continue;
      // return next;
    }

    for (const nextPos of getLrf(pos, next.path)) {
      if (!isInsideGrid(nextPos, grid)) continue;
      queue.enq({
        costSoFar: next.costSoFar + grid[nextPos.y][nextPos.x],
        heuristic: getHeuristic(nextPos, destPos),
        path: [...next.path, nextPos],
      });
    }
  }

  // logGrid(map2d((val) => `${val.size},`, visited));

  return bestResult;
  // return undefined;
};

export const runChallengeA = (input) => {
  const result = getShortestPath(input);
  logGrid(pathToGrid(input, result.path));
  return result.costSoFar;
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

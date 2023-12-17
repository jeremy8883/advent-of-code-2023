import R from "ramda";
import { parse2dNumberArray } from "../utils/inputParsing.js";
import { addPoints, newPoint } from "../utils/geometry.js";
import { getSize, isInsideGrid, newGrid } from "../utils/2d.js";
import PriorityQueue from "priorityqueuejs";
export const parseInput = parse2dNumberArray;

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

const getSameAxisCount = (path) => {
  if (path.length === 0) return 0;
  if (path.length === 1) return 1;

  let lastDirection = null;
  for (let i = path.length - 2; i >= 0; i--) {
    const direction = getDirection(path[i], path[i + 1]);
    if (lastDirection !== null && !R.equals(direction, lastDirection)) {
      return path.length - i - 1;
    }

    lastDirection = direction;
  }

  return path.length;
};

const getLrf = (pos, path, minSame, maxSame) => {
  const direction = getLastDirection(path) || newPoint(1, 0);

  const sameDirectionCount = getSameAxisCount(path);

  const directions =
    path.length > 1 && sameDirectionCount < minSame
      ? [direction]
      : [
          sameDirectionCount >= maxSame ? null : direction,
          newPoint(-direction.y, direction.x),
          newPoint(direction.y, -direction.x),
        ].filter(Boolean);

  return directions.map((d) => addPoints(pos, d));
};

const getKey = (path, maxSame) => {
  if (path.length < 2) {
    return `0,0x1`;
  }
  const lastDirection = getLastDirection(path);
  const sameDirectionCount = Math.min(maxSame, getSameAxisCount(path));
  return `${lastDirection.x},${lastDirection.y}x${sameDirectionCount}`;
};

export const getShortestPath = (grid, minSame, maxSame) => {
  const queue = new PriorityQueue((a, b) => -(a.costSoFar - b.costSoFar));
  const startPos = newPoint(0, 0);
  const destPos = newPoint(grid[0].length - 1, grid.length - 1);
  const visited = newGrid(() => ({}), getSize(grid));

  queue.enq({
    costSoFar: 0,
    path: [startPos],
  });
  while (queue.size()) {
    const next = queue.deq();
    const pos = R.last(next.path);
    const key = getKey(next.path, maxSame);

    if (visited[pos.y][pos.x][key] <= next.costSoFar) {
      continue;
    }

    visited[pos.y][pos.x][key] = next.costSoFar;
    if (R.equals(destPos, pos) && getSameAxisCount(next.path) >= minSame) {
      return next;
    }

    for (const nextPos of getLrf(pos, next.path, minSame, maxSame)) {
      if (!isInsideGrid(nextPos, grid)) continue;
      queue.enq({
        costSoFar: next.costSoFar + grid[nextPos.y][nextPos.x],
        path: [...next.path, nextPos],
      });
    }
  }
};

export const runChallengeA = (input) => {
  const result = getShortestPath(input, 1, 4);
  return result.costSoFar;
};

export const runChallengeB = (input) => {
  const result = getShortestPath(input, 5, 11);
  return result.costSoFar;
};

import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import {
  bucketFill,
  cloneGrid,
  forEach2d,
  getHvNeighbours,
  getSize,
  logGrid,
  map2d,
  newGrid,
} from "../utils/2d.js";
import { addPoints, newPoint } from "../utils/geometry.js";
import { addToSet } from "../utils/set.js";

export const parseInput = parse2dCharArray;

const printPath = (grid, path) => {
  const newGrid = map2d(
    (val, x, y) => (path.find(R.equals(newPoint(x, y))) ? "O" : val),
    grid
  );
  logGrid(newGrid);
};

const removeDeadEndsSingle = (grid) => {
  const startPos = newPoint(1, 0);
  const targetPos = newPoint(grid[0].length - 2, grid.length - 1);

  let blockedGrid = cloneGrid(grid);

  forEach2d((_, x, y) => {
    const val = blockedGrid[y][x];
    const pos = newPoint(x, y);
    if (val !== ".") return;

    const neighboursPoints = getHvNeighbours(pos, blockedGrid).filter((p) => {
      return blockedGrid[p.y][p.x] === ".";
    });
    if (
      neighboursPoints.length === 1 &&
      !R.equals(pos, startPos) &&
      !R.equals(pos, targetPos)
    ) {
      blockedGrid[y][x] = "#";
      return;
    }

    blockedGrid[y][x] = "X";
    for (const neighboursPoint of neighboursPoints) {
      const filledGrid = bucketFill("#", neighboursPoint, blockedGrid);
      if (
        filledGrid[startPos.y][startPos.x] === "." &&
        filledGrid[targetPos.y][targetPos.x] === "."
      ) {
        blockedGrid = filledGrid;
      }
    }
    blockedGrid[y][x] = ".";
  }, blockedGrid);

  return blockedGrid;
};

export const removeDeadEnds = R.pipe(
  removeDeadEndsSingle,
  removeDeadEndsSingle
);

const getWarpGrid = (grid) => {
  const startPos = newPoint(1, 0);
  const queue = [{ pos: startPos, pipeStart: null, pipePath: null }];
  const visited = newGrid(false, getSize(grid));
  const warpGrid = newGrid(null, getSize(grid));

  const pipedGrid = map2d((v) => v, grid);

  while (queue.length) {
    const { pos, pipeStart, warpLength, lastPos, pipePath } = queue.shift();

    visited[pos.y][pos.x] = true;

    const availableDirections = getHvNeighbours(pos, grid).filter(
      (p) => grid[p.y][p.x] !== "#" && !visited[p.y][p.x]
    );
    const walls = getHvNeighbours(pos, grid).filter(
      (p) => grid[p.y][p.x] === "#"
    );
    const isInHallway = walls.length === 2;

    if (isInHallway && availableDirections.length > 1) {
      throw new Error("Logic error: " + pos.x + "," + pos.y);
    }

    if (pipeStart) {
      if (isInHallway) {
        queue.push(
          ...availableDirections.map((p) => ({
            pos: p,
            pipeStart,
            pipePath: [...pipePath, pos],
            lastPos: pos,
          }))
        );
      } else {
        if (!R.equals(lastPos, pipeStart)) {
          warpGrid[pipeStart.y][pipeStart.x] = {
            dest: lastPos,
            warpLength: pipePath.length,
          };
          warpGrid[lastPos.y][lastPos.x] = {
            dest: pipeStart,
            warpLength: pipePath.length,
          };
          for (const p of R.take(pipePath.length - 1, pipePath)) {
            pipedGrid[p.y][p.x] = "*";
          }
        }

        queue.push(
          ...availableDirections.map((p) => ({
            pos: p,
            pipeStart: null,
            pipePath: null,
            lastPos: pos,
          }))
        );
      }
    } else {
      if (isInHallway) {
        queue.push(
          ...availableDirections.map((p) => ({
            pos: p,
            pipeStart: pos,
            pipePath: [],
            lastPos: pos,
          }))
        );
      } else {
        queue.push(
          ...availableDirections.map((p) => ({
            pos: p,
            pipeStart: null,
            pipePath: null,
            lastPos: pos,
          }))
        );
      }
    }
  }

  return { grid: pipedGrid, warpGrid };
};

const getKey = (pos) => `${pos.x},${pos.y}`;

export const findLongestPath = (grid, warpGrid) => {
  const startPos = newPoint(1, 0);
  const targetPos = newPoint(grid[0].length - 2, grid.length - 1);
  const queue = [
    { pos: startPos, lastPos: null, path: new Set(), pathLength: 0 },
  ];
  let best = 0;

  while (queue.length) {
    const { pos, path, pathLength, lastPos } = queue.shift();
    // console.log(pos, pathLength);
    // printPath(grid, path);
    const char = grid[pos.y][pos.x];

    if (path.has(getKey(pos))) {
      continue;
    }

    if (R.equals(pos, targetPos)) {
      if (pathLength > best) {
        console.log(pathLength);
      }
      // printPath(grid, path);
      best = Math.max(best, pathLength);
    }

    const warp = warpGrid[pos.y][pos.x];
    if (warp && (!path.size || !R.equals(lastPos, warp.dest))) {
      queue.push({
        pos: warp.dest,
        path: addToSet(path, getKey(pos)),
        lastPos: pos,
        pathLength: pathLength + warp.warpLength,
      });
      continue;
    }

    const neighbours =
      char === ">"
        ? [addPoints(pos, newPoint(1, 0))]
        : char === "v"
        ? [addPoints(pos, newPoint(0, 1))]
        : char === "<"
        ? [addPoints(pos, newPoint(-1, 0))]
        : char === "^"
        ? [addPoints(pos, newPoint(0, -1))]
        : getHvNeighbours(pos, grid).filter(
            (p) => !["#", "*"].includes(grid[p.y][p.x])
          );

    // if (!neighbours.length) {
    //   console.log("dead end", pos);
    // }

    queue.push(
      ...neighbours.map((p) => ({
        pos: p,
        path: addToSet(path, getKey(pos)),
        lastPos: pos,
        pathLength: pathLength + 1,
      }))
    );
  }

  return best;
};

export const runChallengeA = (grid) =>
  findLongestPath(grid, newGrid(null, getSize(grid)));

export const runChallengeB = R.pipe(
  map2d((val) => (/[<>v^]/.test(val) ? "." : val)),
  R.tap(logGrid),
  removeDeadEnds,
  R.tap(logGrid),
  (g) => {
    const { grid, warpGrid } = getWarpGrid(g);
    return findLongestPath(grid, warpGrid);
  }
);

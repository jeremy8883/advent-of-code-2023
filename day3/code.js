import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import {
  find2dSubsectionPoint,
  findPoints,
  getNeighbours,
  map2d,
} from "../utils/2d.js";
import { reduceChunks } from "../utils/array.js";
import { newPoint, newRect, newRectByPoints } from "../utils/geometry.js";

export const parseInput = parse2dCharArray;

// Symbols from test data: -%+=*/$&#@
const isSymbol = (char) => !/(\d|\.)/.test(char);

const getPartNumberGrid = (grid) => {
  const visited = map2d(() => false, grid);
  const partNumberGrid = map2d(() => null, grid);
  const symbolPoints = findPoints(isSymbol, grid);

  const queue = symbolPoints.flatMap((p) => getNeighbours(p, grid));

  let next = null;
  while ((next = queue.pop()) != null) {
    const { x, y } = next;
    if (visited[y][x]) {
      continue;
    }
    visited[y][x] = true;

    const char = grid[y][x];
    if (!isSymbol(char) && char !== ".") {
      partNumberGrid[y][x] = char;
      queue.push(...getNeighbours(next, grid));
    }
  }

  return partNumberGrid;
};

export const runChallengeA = (grid) => {
  return R.pipe(
    getPartNumberGrid,
    R.chain(reduceChunks((acc, val) => val != null, R.concat, "")),
    R.sum
  )(grid);
};

const getPartNumberData = (grid) => {
  const partNumberGrid = getPartNumberGrid(grid);

  return partNumberGrid.flatMap((row, y) =>
    reduceChunks(
      (acc, val) => val != null,
      (acc, val, x) => {
        return !acc
          ? {
              pos: newPoint(x, y),
              num: val,
            }
          : {
              pos: acc.pos,
              num: `${acc.num}${val}`,
            };
      },
      null,
      row
    )
  );
};

const findGear = (grid, data) => {
  const pos = data.pos;
  const len = data.num.length;
  return find2dSubsectionPoint(
    (val) => val === "*",
    newRectByPoints(pos.x - 1, pos.y - 1, pos.x + len + 1, pos.y + 2),
    grid
  );
};

const getGearResults = (grid) =>
  R.reduce((acc, data) => {
    const gear = findGear(grid, data);
    if (!gear) return acc;
    const key = `${gear.x},${gear.y}`;

    return {
      ...acc,
      [key]: [...(acc[key] ?? []), parseInt(data.num)],
    };
  }, {});

const multiplyAndSumGearResults = R.pipe(
  R.toPairs,
  R.filter(([_, val]) => val.length === 2),
  R.map((val) => val[1].reduce(R.multiply)),
  R.sum
);

export const runChallengeB = (grid) => {
  return R.pipe(
    getPartNumberData,
    getGearResults(grid),
    multiplyAndSumGearResults
  )(grid);
};

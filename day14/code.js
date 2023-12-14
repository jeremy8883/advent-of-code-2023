import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import {
  forEach2d,
  getCol,
  logGrid,
  map2d,
  reduce2d,
  rotateGrid90Ccw,
  rotateGrid90Cw,
} from "../utils/2d.js";

export const parseInput = parse2dCharArray;

const tiltNorth = (grid) => {
  const newGrid = map2d((v) => v, grid);

  forEach2d((val, x, y) => {
    if (val !== "O") return;
    const col = getCol(newGrid, x, 0, y).reverse();
    const index = col.findIndex((v) => v !== ".");
    const newY = index === -1 ? 0 : y - index;

    if (newY !== y) {
      newGrid[newY][x] = "O";
      newGrid[y][x] = ".";
    }
  }, newGrid);

  return newGrid;
};

const countLoad = (grid) => {
  return reduce2d(
    (acc, val, x, y) => {
      if (val !== "O") return acc;

      return acc + (grid.length - y);
    },
    0,
    grid
  );
};

export const runChallengeA = R.pipe(tiltNorth, countLoad);

const getHash = (grid) => reduce2d((acc, val) => acc + val, "", grid);

export const runChallengeB = (input) => {
  let newGrid = input;
  const cycleCount = 1000000000;
  let hashes = [];
  for (let i = 0; i < cycleCount; i++) {
    const hash = getHash(newGrid);

    if (!hasSkipped && hashes.includes(hash)) {
      const hashIndex = hashes.findIndex((v) => v === hash);
      const rotationLength = i - hashIndex;

      i =
        hashIndex +
        rotationLength * Math.floor((cycleCount - hashIndex) / rotationLength);
      hashes = null;
    }
    if (i >= cycleCount) break;

    newGrid = R.pipe(
      tiltNorth,
      rotateGrid90Cw,
      tiltNorth,
      rotateGrid90Cw,
      tiltNorth,
      rotateGrid90Cw,
      tiltNorth,
      rotateGrid90Cw
    )(newGrid);
    hashes?.push(hash);
  }

  return countLoad(newGrid);
};

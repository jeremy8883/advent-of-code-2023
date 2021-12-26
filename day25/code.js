import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { gridToString, map2dSubsection, reduce2d } from "../utils/2d.js";
import { newPoint, newRect } from "../utils/geometry.js";

export const parseInput = parse2dCharArray;

const getSeaCucumberChar = (direction) => {
  return direction.x === 1 ? ">" : "v";
};

const getAllMovesForDirection = (grid, direction) => {
  const seaCucumberChar = getSeaCucumberChar(direction);
  return reduce2d(
    (acc, char, x, y) => {
      if (char !== seaCucumberChar) return acc;

      const targetPos = {
        x: (x + direction.x) % grid[0].length,
        y: (y + direction.y) % grid.length,
      };
      const targetCell = grid[targetPos.y][targetPos.x];

      return targetCell === "."
        ? [
            ...acc,
            {
              from: { x, y },
              to: targetPos,
            },
          ]
        : acc;
    },
    [],
    grid
  );
};

const moveCucumber = (from, to, grid) => {
  const char = grid[from.y][from.x];
  grid[from.y][from.x] = ".";
  grid[to.y][to.x] = char;
  return grid;
};

const moveCucumbers = (grid, moves) => {
  return moves.reduce((acc, { from, to }) => {
    return moveCucumber(from, to, acc);
  }, grid);
};

export const runChallengeA = (grid) => {
  let newGrid = grid;
  let count = 0;

  while (true) {
    count++;

    const hMoves = getAllMovesForDirection(newGrid, newPoint(1, 0));
    if (hMoves.length) {
      newGrid = moveCucumbers(newGrid, hMoves);
    }
    const vMoves = getAllMovesForDirection(newGrid, newPoint(0, 1));
    if (vMoves.length) {
      newGrid = moveCucumbers(newGrid, vMoves);
    }
    if (!hMoves.length && !vMoves.length) break;
  }

  return count;
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

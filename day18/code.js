import R from "ramda";
import { parseInt10 } from "../utils/number.js";
import { addPoints, newPoint, newSize } from "../utils/geometry.js";
import { bucketFill, logGrid, newGrid, reduce2d } from "../utils/2d.js";

const directionMap = {
  R: newPoint(1, 0),
  L: newPoint(-1, 0),
  D: newPoint(0, 1),
  U: newPoint(0, -1),
};

export const parseInput = (str) =>
  str.split("\n").map((l) => {
    const [direction, amount, color] = l.split(" ");
    return {
      direction: directionMap[direction],
      amount: parseInt10(amount),
      color: color.replace(/[()]/g, ""),
    };
  });

const digGrid = R.curry((startPoint, instructions) => {
  let pos = startPoint;
  const grid = newGrid(".", newSize(1000, 1000));
  grid[startPoint.y][startPoint.x] = "#";

  for (const { direction, amount, color } of instructions) {
    for (let i = 0; i < amount; i++) {
      grid[pos.y][pos.x] = "#";
      pos = addPoints(direction, pos);
    }
  }

  return grid;
});

export const runChallengeA = R.pipe(
  digGrid(newPoint(500, 500)),
  bucketFill("#", newPoint(501, 501)),
  reduce2d((acc, val) => (val === "#" ? acc + 1 : acc), 0)
);

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

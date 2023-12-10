import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import {
  bucketFill,
  expandGrid,
  find2d,
  getHvNeighbours,
  map2d,
  reduce2d,
  replace2d,
  shrinkGrid,
} from "../utils/2d.js";
import { newPoint, newSize } from "../utils/geometry.js";

export const parseInput = parse2dCharArray;

// Assumption, no pipes leak outside the grid
const getConnectingNeighbours = (pos, grid) => {
  const char = grid[pos.y][pos.x];
  switch (char) {
    case ".":
      return [];
    case "|":
      return [newPoint(pos.x, pos.y - 1), newPoint(pos.x, pos.y + 1)];
    case "-":
      return [newPoint(pos.x - 1, pos.y), newPoint(pos.x + 1, pos.y)];
    case "L":
      return [newPoint(pos.x, pos.y - 1), newPoint(pos.x + 1, pos.y)];
    case "J":
      return [newPoint(pos.x, pos.y - 1), newPoint(pos.x - 1, pos.y)];
    case "7":
      return [newPoint(pos.x - 1, pos.y), newPoint(pos.x, pos.y + 1)];
    case "F":
      return [newPoint(pos.x + 1, pos.y), newPoint(pos.x, pos.y + 1)];
    case "S":
      return getHvNeighbours(pos, grid)
        .map((np) => ({
          pos: np,
          connections: getConnectingNeighbours(np, grid),
        }))
        .filter((neighbouringPoses) =>
          neighbouringPoses.connections.find((np) => R.equals(np, pos))
        )
        .map((np) => np.pos);
    default:
      throw new Error("???");
  }
};

const findStartPoint = (grid) => find2d(R.equals("S"), grid);

export const runChallengeA = (input) => {
  const queue = [];
  const startPos = findStartPoint(input);
  queue.push(startPos);
  const distances = map2d(() => null, input);
  distances[startPos.y][startPos.x] = 0;

  while (queue.length > 0) {
    const pos = queue.shift();
    const currentDistance = distances[pos.y][pos.x];
    const connections = getConnectingNeighbours(pos, input);
    for (const c of connections) {
      if (distances[c.y][c.x] == null) {
        distances[c.y][c.x] = currentDistance + 1;
        queue.push(c);
      }
    }
  }

  return reduce2d(R.max, 0, distances);
};

const expandPipeGrid = (grid) =>
  expandGrid(
    3,
    (val) => {
      switch (val) {
        case ".":
          return parse2dCharArray(`...
...
...`);
        case "|":
          return parse2dCharArray(`.#.
.#.
.#.`);
        case "-":
          return parse2dCharArray(`...
###
...`);
        case "L":
          return parse2dCharArray(`.#.
.##
...`);
        case "J":
          return parse2dCharArray(`.#.
##.
...`);
        case "7":
          return parse2dCharArray(`...
##.
.#.`);
        case "F":
          return parse2dCharArray(`...
.##
.#.`);
        case "S":
          return parse2dCharArray(`.#.
###
.#.`);
        default:
          throw new Error("Invalid char " + val);
      }
    },
    grid
  );

const removeOuterPipes = (grid) =>
  map2d(
    (val, x, y) =>
      x === 0 || x === grid[0].length - 1 || y === 0 || y === grid.length - 1
        ? "."
        : val,
    grid
  );

export const runChallengeB = (input) => {
  const startPoint = findStartPoint(input);
  return R.pipe(
    expandPipeGrid,
    removeOuterPipes,
    bucketFill("M", newPoint(startPoint.x * 3 + 1, startPoint.y * 3 + 1)), // Trace main pipe
    replace2d("#", "."), // Remove junk pipes
    bucketFill("O", newPoint(0, 0)), // Mark outer grounds
    shrinkGrid(3, (section) => section[1][1]),
    reduce2d((acc, val) => (val === "." ? acc + 1 : acc), 0)
  )(input);
};

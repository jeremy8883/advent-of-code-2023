import R from "ramda";
import { parse2dCharArray } from "../utils/inputParsing.js";
import { find2d, getHvNeighbours, map2d, reduce2d } from "../utils/2d.js";
import { newPoint } from "../utils/geometry.js";

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

export const runChallengeA = (input) => {
  const queue = [];
  const startPos = find2d(R.equals("S"), input);
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

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

import R from "ramda";
import { parse2dNumberArray } from "../utils/inputParsing.js";
import { newPoint, newSize, pointEquals } from "../utils/geometry.js";
import { getHvNeighbours, map2d, newGrid } from "../utils/2d.js";
import PriorityQueue from "priorityqueuejs";

export const parseInput = parse2dNumberArray;

const createPriorityQueue = () => {
  // Lowest number is highest priority
  return new PriorityQueue((a, b) => b.priority - a.priority);
};

export const runChallengeA = (grid) => {
  const queue = createPriorityQueue();
  const startPoint = newPoint(0, 0);
  queue.enq({ point: startPoint, priority: 0 });
  const endPoint = newPoint(grid[0].length - 1, grid.length - 1);
  const costGraph = map2d(() => undefined, grid);
  costGraph[startPoint.y][startPoint.x] = 0;

  let currentPoint;
  while ((currentPoint = queue.deq()?.point)) {
    if (pointEquals(currentPoint, endPoint)) {
      return costGraph[currentPoint.y][currentPoint.x];
    }

    for (const nextPoint of getHvNeighbours(currentPoint, grid)) {
      const newCost =
        costGraph[currentPoint.y][currentPoint.x] +
        grid[nextPoint.y][nextPoint.x];

      if (costGraph[nextPoint.y][nextPoint.x] === undefined) {
        costGraph[nextPoint.y][nextPoint.x] = newCost;

        queue.enq({ point: nextPoint, priority: newCost });
      }
    }
  }

  throw new Error("Unable to find finish");
};

export const runChallengeB = (smallGrid) => {
  let largeGrid = newGrid(
    undefined,
    newSize(smallGrid.length * 5, smallGrid[0].length * 5)
  );
  largeGrid = map2d((_, x, y) => {
    const smallX = x % smallGrid[0].length;
    const smallY = y % smallGrid.length;

    const smallValue = smallGrid[smallY][smallX];

    const largeX = Math.floor(x / smallGrid[0].length);
    const largeY = Math.floor(y / smallGrid.length);

    return ((smallValue + largeX + largeY - 1) % 9) + 1;
  }, largeGrid);

  return runChallengeA(largeGrid);
};

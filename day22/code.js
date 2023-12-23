import R from "ramda";
import { parseInt10 } from "../utils/number.js";
import { ObjectSet } from "../utils/ObjectSet.js";
import PriorityQueue from "priorityqueuejs";

export const parseInput = (str) =>
  str.split("\n").map((line) => {
    const [a, b] = line
      .split("~")
      .map((p) => p.split(",").map(parseInt10))
      .map(([x, y, z]) => ({ x, y, z }));
    return { a, b };
  });

const sortBricks = R.sortBy(({ a, b }) => Math.min(a.z, b.z));

const rangeIntersects = (rangeA, rangeB) => {
  rangeA = R.sort((a, b) => a - b, rangeA);
  rangeB = R.sort((a, b) => a - b, rangeB);

  return rangeA[0] <= rangeB[1] && rangeB[0] <= rangeA[1];
};

export const brickIntersects = (brickA, brickB) => {
  return (
    rangeIntersects([brickA.a.z, brickA.b.z], [brickB.a.z, brickB.b.z]) &&
    rangeIntersects([brickA.a.x, brickA.b.x], [brickB.a.x, brickB.b.x]) &&
    rangeIntersects([brickA.a.y, brickA.b.y], [brickB.a.y, brickB.b.y])
  );
};

const brickIntersectsOthers = (brick, otherBricks) => {
  return !!otherBricks.find((b) => {
    return brickIntersects(brick, b);
  });
};

const getBottomZ = (brick) => Math.min(brick.a.z, brick.b.z);
const getTopZ = (brick) => Math.max(brick.a.z, brick.b.z);

const moveBottomOfBrick = (to, brick) => {
  let startZ = getBottomZ(brick);
  const diff = startZ - to;
  return {
    a: { ...brick.a, z: brick.a.z - diff },
    b: { ...brick.b, z: brick.b.z - diff },
  };
};

const settleBrick = (brick, otherBricks) => {
  let startZ = getBottomZ(brick);
  for (let i = startZ - 1; i >= 1; i--) {
    if (brickIntersectsOthers(moveBottomOfBrick(i, brick), otherBricks)) {
      return i + 1;
    }
  }
  return 1;
};

const moveZ = (brick, amount) => ({
  a: { ...brick.a, z: brick.a.z + amount },
  b: { ...brick.b, z: brick.b.z + amount },
});

const makeZs = (brick, amount) => ({
  a: { ...brick.a, z: amount },
  b: { ...brick.b, z: amount },
});

const settleBricks = R.reduce((acc, val) => {
  const settledZ = settleBrick(val, acc);
  const diff = getBottomZ(val) - settledZ;

  if (diff === 0) {
    return [...acc, val];
  } else {
    return [...acc, moveZ(val, -diff)];
  }
}, []);

const getBricksThatIntersect = (brick, otherBricks) => {
  return otherBricks.filter((b) => {
    return brickIntersects(brick, b);
  });
};

export const isDestroyable = (brick, allBricks) => {
  const areaAbove = makeZs(brick, getTopZ(brick) + 1);
  const bricksAbove = getBricksThatIntersect(areaAbove, allBricks);
  if (!bricksAbove.length) return true;

  return !bricksAbove.find((thisBrick) => {
    const areaBelow = makeZs(thisBrick, getBottomZ(thisBrick) - 1);
    const bricksBelow = getBricksThatIntersect(areaBelow, allBricks);
    return bricksBelow.length === 1;
  });
};

const getDestroyableCount = (bricks) => {
  return bricks.reduce((acc, val) => {
    return isDestroyable(val, bricks) ? acc + 1 : acc;
  }, 0);
};

export const runChallengeA = R.pipe(
  sortBricks,
  settleBricks,
  getDestroyableCount
);

const getDirectlyAboveBricks = (brick, allBricks) => {
  const areaAbove = makeZs(brick, getTopZ(brick) + 1);
  return getBricksThatIntersect(areaAbove, allBricks);
};

export const hasSupport = (brick, allBricks, destroyed) => {
  const areaBelow = makeZs(brick, getBottomZ(brick) - 1);
  const bricksBelow = getBricksThatIntersect(areaBelow, allBricks).filter(
    (b) => !destroyed.has(b)
  );
  return bricksBelow.length !== 0;
};

const enqAll = (queue, items) => {
  for (const b of items) {
    queue.enq(b);
  }
};

export const getDestroyCountsFoxBrick = (startBrick, otherBricks) => {
  const queue = new PriorityQueue((a, b) => getBottomZ(a) - getBottomZ(b));
  const destroyed = new ObjectSet();
  destroyed.add(startBrick);
  enqAll(queue, getDirectlyAboveBricks(startBrick, otherBricks));

  let count = 0;

  while (queue.size()) {
    const brick = queue.deq();

    if (hasSupport(brick, otherBricks, destroyed)) {
      continue;
    }
    count++;
    destroyed.add(brick);
    const bricksAbove = getDirectlyAboveBricks(brick, otherBricks);
    enqAll(queue, bricksAbove);
  }

  return count;
};

const getDestroyCount = (bricks) => {
  return bricks.reduce(
    (acc, val) => acc + getDestroyCountsFoxBrick(val, bricks),
    0
  );
};

export const runChallengeB = R.pipe(
  sortBricks,
  settleBricks,
  sortBricks,
  getDestroyCount
);

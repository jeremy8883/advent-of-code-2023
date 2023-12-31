import {
  runChallengeA,
  runChallengeB,
  parseInput,
  brickIntersects,
  isDestroyable,
  hasSupport,
  getDestroyCountsFoxBrick,
} from "./code.js";
import { ObjectSet } from "../utils/ObjectSet.js";

const mockInput = parseInput(
  `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`
);

describe("Day 22: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(5);
  });
});

describe("brickIntersects", () => {
  it("should work", () => {
    expect(
      brickIntersects(
        { a: { x: 1, y: 1, z: 1 }, b: { x: 3, y: 1, z: 1 } },
        { a: { x: 1, y: 1, z: 1 }, b: { x: 3, y: 1, z: 1 } }
      )
    ).toEqual(true);

    expect(
      brickIntersects(
        { a: { x: 1, y: 1, z: 1 }, b: { x: 3, y: 1, z: 1 } },
        { a: { x: 1, y: 1, z: 1 }, b: { x: 4, y: 1, z: 1 } }
      )
    ).toEqual(true);

    expect(
      brickIntersects(
        { a: { x: 1, y: 1, z: 1 }, b: { x: 4, y: 1, z: 1 } },
        { a: { x: 1, y: 1, z: 1 }, b: { x: 3, y: 1, z: 1 } }
      )
    ).toEqual(true);

    expect(
      brickIntersects(
        { a: { x: 1, y: 1, z: 1 }, b: { x: 4, y: 1, z: 1 } },
        { a: { x: 1, y: 1, z: 2 }, b: { x: 4, y: 1, z: 1 } }
      )
    ).toEqual(true);
  });
});

const allBricks = [
  { a: { x: 1, y: 0, z: 1 }, b: { x: 1, y: 2, z: 1 } },
  { a: { x: 0, y: 0, z: 2 }, b: { x: 2, y: 0, z: 2 } },
  { a: { x: 0, y: 2, z: 2 }, b: { x: 2, y: 2, z: 2 } },
  { a: { x: 0, y: 0, z: 3 }, b: { x: 0, y: 2, z: 3 } },
  { a: { x: 2, y: 0, z: 3 }, b: { x: 2, y: 2, z: 3 } },
  { a: { x: 0, y: 1, z: 4 }, b: { x: 2, y: 1, z: 4 } },
  { a: { x: 1, y: 1, z: 5 }, b: { x: 1, y: 1, z: 6 } },
];

describe("isDestroyable", () => {
  it("should work", () => {
    expect(
      isDestroyable(
        { a: { x: 1, y: 0, z: 1 }, b: { x: 1, y: 2, z: 1 } },
        allBricks
      )
    ).toEqual(false);
  });
});

describe("hasSupport", () => {
  it("should work", () => {
    const destroyed = new ObjectSet();
    destroyed.add({ a: { x: 0, y: 1, z: 4 }, b: { x: 2, y: 1, z: 4 } });
    destroyed.add({ a: { x: 1, y: 1, z: 5 }, b: { x: 1, y: 1, z: 6 } });
    const result = hasSupport(
      { a: { x: 0, y: 1, z: 4 }, b: { x: 2, y: 1, z: 4 } },
      allBricks,
      destroyed
    );

    expect(result).toEqual(true);
  });
});

describe("getDestroyCountsFoxBrick", () => {
  it.each([
    [allBricks[0], 6],
    [allBricks[1], 0],
    [allBricks[2], 0],
    [allBricks[3], 0],
    [allBricks[4], 0],
    [allBricks[5], 1],
    [allBricks[6], 0],
  ])("should work", (brick, expected) => {
    const result = getDestroyCountsFoxBrick(brick, allBricks);
    expect(result).toEqual(expected);
  });
});

describe("Day 22: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(7);
  });
});

import {
  runChallengeA,
  runChallengeB,
  parseInput,
  _depthCount,
  _getLeftDigitPath,
  _getRightDigitPath,
} from "./code.js";

const mockInput = parseInput(
  `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`
);

describe("depthCount", () => {
  it("retruns the max depth count", () => {
    expect(_depthCount([2, 3])).toEqual(1);
    expect(_depthCount([[2, 3], 4])).toEqual(2);
    expect(_depthCount([[2, [3, 4]], 5])).toEqual(3);
  });
});

describe("_getLeftDigitPath", () => {
  it("returns the digit to the left, given the path", () => {
    expect(_getLeftDigitPath([0, 1], [[2, [3, 4]], 5])).toEqual([0, 0]);
    expect(_getLeftDigitPath([0, 1, 0], [[2, [3, 4]], 5])).toEqual([0, 0]);
    expect(_getLeftDigitPath([1, 1], [2, [3, [4, 5]]])).toEqual([1, 0]);
    expect(
      _getLeftDigitPath(
        [1, 0],
        [
          [2, 3],
          [4, 5],
        ]
      )
    ).toEqual([0, 1]);
  });

  it("returns nothing if no left value is to be found", () => {
    expect(_getLeftDigitPath([0], [2, 5])).toEqual(null);
    expect(_getLeftDigitPath([0, 0], [[2, 3], 4])).toEqual(null);
  });
});

describe("_getRightDigitPath", () => {
  it("returns the digit to the left, given the path", () => {
    expect(_getRightDigitPath([0, 1], [[2, [3, 4]], 5])).toEqual([1]);
    expect(_getRightDigitPath([0, 1, 1], [[2, [3, 4]], 5])).toEqual([1]);
    expect(_getRightDigitPath([0, 1], [[2, [3, 4]], 5])).toEqual([1]);
    expect(_getRightDigitPath([0, 1, 1], [[2, [3, 4]], 5])).toEqual([1]);
    expect(
      _getRightDigitPath(
        [0, 1, 1],
        [
          [2, [3, 4]],
          [5, 6],
        ]
      )
    ).toEqual([1, 0]);
  });

  it("returns nothing if no left value is to be found", () => {
    expect(_getRightDigitPath([1], [2, 5])).toEqual(null);
    expect(_getRightDigitPath([1, 1], [2, [3, 4]])).toEqual(null);
  });
});

describe("Day 18: runChallengeA", () => {
  it("gets the results", () => {
    expect(
      runChallengeA(
        parseInput(`[[[[4,3],4],4],[7,[[8,4],9]]]
[1,1]`)
      )
    ).toEqual(1384);

    expect(runChallengeA(mockInput)).toEqual(4140);
  });
});

describe("Day 18: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(3993);
  });
});

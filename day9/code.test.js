import { parseInput, runChallengeA, runChallengeB } from "./code.js";

const mockInput = parseInput(
  `2199943210
3987894921
9856789892
8767896789
9899965678`
);

describe("Day 9: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(15);
  });
});

describe("Day 9: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(1134);
  });
});

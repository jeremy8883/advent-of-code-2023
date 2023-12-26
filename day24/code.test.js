import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`
);

describe("Day 24: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(2);
  });
});

describe("Day 24: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});

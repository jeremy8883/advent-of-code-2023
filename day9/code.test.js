import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`
);

describe("Day 9: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(114);
  });
});

describe("Day 9: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});

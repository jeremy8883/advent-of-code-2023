import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `Time:      7  15   30
Distance:  9  40  200`
);

describe("Day 6: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(288);
  });
});

describe("Day 6: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});

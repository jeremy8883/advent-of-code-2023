import {
  runChallengeA,
  runChallengeB,
  parseInput,
  parseInputB,
} from "./code.js";

describe("Day 6: runChallengeA", () => {
  const mockInput = parseInput(
    `Time:      7  15   30
  Distance:  9  40  200`
  );

  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(288);
  });
});

describe("Day 6: runChallengeB", () => {
  const mockInput = parseInputB(
    `Time:      7  15   30
  Distance:  9  40  200`
  );

  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(71503);
  });
});

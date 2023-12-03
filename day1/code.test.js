import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`
);

xdescribe("Day 1: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(35);
  });
});

describe("Day 1: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(281);
  });
});

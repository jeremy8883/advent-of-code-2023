import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
);

describe("Day 3: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(4361);
  });
});

describe("Day 3: runChallengeB", () => {
  it.only("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(467835);
  });
});

import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`
);

describe("Day 11: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput, 10);
    expect(result).toEqual(204);
  });

  it("gets the results for 100", () => {
    const result = runChallengeA(mockInput, 100);
    expect(result).toEqual(1656);
  });
});

describe("Day 11: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput, 200);
    expect(result).toEqual(195);
  });
});

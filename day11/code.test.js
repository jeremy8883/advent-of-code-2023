import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`
);

describe("Day 11: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(374);
  });
});

describe("Day 11: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(82000210);
  });
});

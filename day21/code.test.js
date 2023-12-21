import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`
);

describe("Day 21: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput, 6);
    expect(result).toEqual(16);
  });
});

describe("Day 21: runChallengeB", () => {
  it.each([
    [6, 16],
    [10, 50],
    [50, 1594],
    [100, 6536],
    // [5000, 1673304],
  ])("gets the results", (stepCount, expected) => {
    const result = runChallengeB(mockInput, stepCount);
    expect(result).toEqual(expected);
  });
});

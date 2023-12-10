import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInputA = parseInput(
  `.....
.S-7.
.|.|.
.L-J.
.....`
);
const mockInputB = parseInput(
  `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`
);

describe("Day 10: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInputA);
    expect(result).toEqual(4);
  });

  it.only("gets the results", () => {
    const result = runChallengeA(mockInputB);
    expect(result).toEqual(8);
  });
});

describe("Day 10: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInputA);
    expect(result).toEqual("TODO");
  });
});

import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `Player 1 starting position: 4
Player 2 starting position: 8`
);

describe("Day 21: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(739785);
  });
});

describe("Day 21: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(444356092776315);
  });
});

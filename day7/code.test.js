import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`
);

describe("Day 7: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(6440);
  });
});

describe("Day 7: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});

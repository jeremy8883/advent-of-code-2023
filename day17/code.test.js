import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(`target area: x=20..30, y=-10..-5`);

describe("Day 17: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(45);
  });
});

describe("Day 17: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});

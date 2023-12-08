import { runChallengeA, runChallengeB, parseInput } from "./code.js";

describe("Day 8: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(
      parseInput(
        `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`
      )
    );
    expect(result).toEqual(6);
  });
});

describe("Day 8: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(
      parseInput(`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`)
    );
    expect(result).toEqual(6);
  });
});

import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`
);

describe("Day 14: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput, 10);
    expect(result).toEqual(1588);
  });
});

describe("Day 14: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput, 10);
    expect(result).toEqual(1588);

    const resultB = runChallengeB(mockInput, 40);
    expect(resultB).toEqual(2188189693529);
  });
});

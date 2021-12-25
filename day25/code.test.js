import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`
);

describe("Day 25: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(58);
  });
});

describe("Day 25: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});

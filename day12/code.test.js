import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`
);
// const mockInput = parseInput(`???.### 1,1,3`);

describe("Day 12: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(21);
  });
  it("gets the results", () => {
    const result = runChallengeA(parseInput(`????#??.#? 1,3,1,1`));
    expect(result).toEqual(1);
  });
  it("gets the results", () => {
    const result = runChallengeA(parseInput(`?????????#?#?.# 2,1,2,1,1`));
    expect(result).toEqual(10);
  });
  it("gets the results", () => {
    const result = runChallengeA(
      parseInput(
        `..??????##. 1,3
..????????##. 1,3`
      )
    );
    expect(result).toEqual(10);
  });
});

describe("Day 12: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(525152);
  });
});

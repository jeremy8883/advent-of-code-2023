import { runChallengeA, runChallengeB } from "./code.js";

const mockInput = [3, 4, 3, 1, 2];

describe("Day 6: runChallengeA", () => {
  it("gets the results", () => {
    expect(runChallengeA(mockInput, 18)).toEqual(26);

    expect(runChallengeA(mockInput, 80)).toEqual(5934);
  });
});

describe("Day 6: runChallengeB", () => {
  it("gets the results", () => {
    expect(runChallengeB(mockInput, 18)).toEqual(26);

    expect(runChallengeB(mockInput, 80)).toEqual(5934);

    expect(runChallengeB(mockInput, 256)).toEqual(26984457539);
  });
});

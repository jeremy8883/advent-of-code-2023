const { runChallengeA, runChallengeB } = require("./code");

const mockInput = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

describe("Day 7: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(37);
  });
});

describe("Day 7: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(168);
  });
});

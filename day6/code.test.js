const { runChallengeA, runChallengeB } = require("./code");

const mockInput = [3, 4, 3, 1, 2];

describe("Day 6: runChallengeA", () => {
  it("gets the results", () => {
    expect(runChallengeA(mockInput, 18)).toEqual(26);

    expect(runChallengeA(mockInput, 80)).toEqual(5934);
  });
});

describe("Day 6: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});

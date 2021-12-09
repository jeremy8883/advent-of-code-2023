const { runChallengeA, runChallengeB } = require("./code");

const mockInput = [
  "2199943210",
  "3987894921",
  "9856789892",
  "8767896789",
  "9899965678",
].map((s) => s.split("").map(Number));

describe("Day 9: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(15);
  });
});

describe("Day 9: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual(1134);
  });
});

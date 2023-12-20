import { runChallengeA, runChallengeB, parseInput } from "./code.js";

const mockInput = parseInput(
  `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`
);

describe("Day 20: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual(11687500);
  });
});

describe("Day 20: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});

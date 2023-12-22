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
    expect(result).toEqual(32000000);
  });

  it("gets the results", () => {
    const result = runChallengeA(
      parseInput(
        `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`
      )
    );
    expect(result).toEqual(11687500);
  });
});

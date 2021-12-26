import {
  runChallengeA,
  runChallengeB,
  parseInput,
  _runInstructions,
} from "./code.js";

const mockInput = parseInput(
  `inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`
);

describe("_runInstructions", () => {
  it("runs the instruction set", () => {
    const result = _runInstructions(mockInput, "5");
    expect(result).toEqual({ w: 0, x: 1, y: 0, z: 1 });
  });
});

xdescribe("Day 24: runChallengeA", () => {
  it("gets the results", () => {
    const result = runChallengeA(mockInput);
    expect(result).toEqual("TODO");
  });
});

xdescribe("Day 24: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB(mockInput);
    expect(result).toEqual("TODO");
  });
});

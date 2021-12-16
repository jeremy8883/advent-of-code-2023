import { runChallengeA, runChallengeB, parseInput } from "./code.js";

describe("Day 16: runChallengeA", () => {
  it("gets the results", () => {
    expect(runChallengeA(parseInput(`8A004A801A8002F478`))).toEqual(16);
    expect(runChallengeA(parseInput(`620080001611562C8802118E34`))).toEqual(12);
    expect(runChallengeA(parseInput(`C0015000016115A2E0802F182340`))).toEqual(
      23
    );
    expect(runChallengeA(parseInput(`A0016C880162017C3686B18A3D4780`))).toEqual(
      31
    );
  });
});

describe("Day 16: runChallengeB", () => {
  it("gets the results", () => {
    const result = runChallengeB("");
    expect(result).toEqual("TODO");
  });
});

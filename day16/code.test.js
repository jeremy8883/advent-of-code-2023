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
    expect(runChallengeB(parseInput(`C200B40A82`))).toEqual(3);
    expect(runChallengeB(parseInput(`04005AC33890`))).toEqual(54);
    expect(runChallengeB(parseInput(`880086C3E88112`))).toEqual(7);
    expect(runChallengeB(parseInput(`CE00C43D881120`))).toEqual(9);
    expect(runChallengeB(parseInput(`D8005AC2A8F0`))).toEqual(1);
    expect(runChallengeB(parseInput(`F600BC2D8F`))).toEqual(0);
    expect(runChallengeB(parseInput(`9C005AC2F8F0`))).toEqual(0);
    expect(runChallengeB(parseInput(`9C0141080250320F1802104A08`))).toEqual(1);
  });
});

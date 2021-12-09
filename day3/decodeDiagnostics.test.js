import { decodeDiagnostics, decodeLifeSupport } from "./decodeDiagnostics.js";

describe("decodeDiagnostics", () => {
  it("returns the correct position", () => {
    const result = decodeDiagnostics([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ]);

    expect(result).toEqual({
      gammaRate: 22,
      epsilonRate: 9,
      powerConsumption: 198,
    });
  });
});

describe("decodeLifeSupport", () => {
  it("returns the correct position", () => {
    const result = decodeLifeSupport([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ]);

    expect(result).toEqual({
      oxygenGeneratorRating: 23,
      co2ScrubberRating: 10,
      lifeSupportRating: 230,
    });
  });
});

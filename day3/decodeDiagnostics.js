import R from "ramda";

const invert = (bit) => {
  return bit === 1 ? 0 : 1;
};

const getMostCommonBit = (diagnostics, bitIndex) => {
  const oneCount = R.sum(diagnostics.map((d) => parseInt(d[bitIndex])));
  const zeroCount = diagnostics.length - oneCount;

  return oneCount > zeroCount ? 1 : zeroCount > oneCount ? 0 : null;
};

export const decodeDiagnostics = (diagnostics) => {
  const bitsLength = diagnostics[0].length;

  const result = R.range(0, bitsLength).reduce((acc, bitIndex) => {
    const mostCommonBit = getMostCommonBit(diagnostics, bitIndex);
    const leastCommonBit = invert(mostCommonBit);

    if (acc == null) {
      return { gammaRate: mostCommonBit, epsilonRate: leastCommonBit };
    }

    return {
      gammaRate: (acc.gammaRate << 1) | mostCommonBit,
      epsilonRate: (acc.epsilonRate << 1) | leastCommonBit,
    };
  }, null);

  return {
    ...result,
    powerConsumption: result.gammaRate * result.epsilonRate,
  };
};

const findOxygenGeneratorRating = (diagnostics, bitIndex = 0) => {
  const bitsLength = diagnostics[0].length;
  if (bitIndex >= bitsLength) {
    throw new Error("This shouldn't happen?");
  }

  const mostCommonBit = getMostCommonBit(diagnostics, bitIndex) ?? 1;
  const filtered = diagnostics.filter(
    (d) => parseInt(d[bitIndex]) === mostCommonBit
  );
  if (filtered.length === 1) {
    return parseInt(filtered[0], 2);
  }

  return findOxygenGeneratorRating(filtered, bitIndex + 1);
};

const findCo2ScrubberRating = (diagnostics, bitIndex = 0) => {
  const bitsLength = diagnostics[0].length;
  if (bitIndex >= bitsLength) {
    throw new Error("This shouldn't happen?");
  }

  const mostCommonBit = getMostCommonBit(diagnostics, bitIndex);
  const specificBit = mostCommonBit === null ? 0 : invert(mostCommonBit);

  const filtered = diagnostics.filter(
    (d) => parseInt(d[bitIndex]) === specificBit
  );
  if (filtered.length === 1) {
    return parseInt(filtered[0], 2);
  }

  return findCo2ScrubberRating(filtered, bitIndex + 1);
};

export const decodeLifeSupport = (diagnostics) => {
  const oxygenGeneratorRating = findOxygenGeneratorRating(diagnostics);
  const co2ScrubberRating = findCo2ScrubberRating(diagnostics);

  return {
    oxygenGeneratorRating,
    co2ScrubberRating,
    lifeSupportRating: oxygenGeneratorRating * co2ScrubberRating,
  };
};

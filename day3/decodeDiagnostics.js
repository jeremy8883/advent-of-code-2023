const R = require("ramda");

const decodeDiagnostics = (diagnostics) => {
  const bitsLength = diagnostics[0].length;

  const result = R.range(0, bitsLength).reduce((acc, bitIndex) => {
    const oneCount = R.sum(diagnostics.map((d) => parseInt(d[bitIndex])));
    const zeroCount = diagnostics.length - oneCount;

    const mostCommonBit = oneCount > zeroCount ? 1 : 0;
    const leastCommonBit = oneCount <= zeroCount ? 1 : 0;

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

module.exports = { decodeDiagnostics };

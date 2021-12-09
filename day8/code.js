import R from "ramda";

export const runChallengeA = (input) => {
  return R.sum(
    input.map(
      ({ output }) =>
        // 1, 4, 7, 8
        output.filter((v) => [2, 4, 3, 7].includes(v.length)).length
    )
  );
};

const digits = {
  0: "abcefg",
  1: "cf",
  2: "acdeg",
  3: "acdfg",
  4: "bcdf",
  5: "abdfg",
  6: "abdefg",
  7: "acf",
  8: "abcdefg",
  9: "abcdfg",
};

const digitsByCode = R.invertObj(digits);

const pushDigit = (wireMap, possibleLocations, code) => {
  const pl = possibleLocations.split("");
  pl.forEach((char) => {
    wireMap[char] = R.intersection(wireMap[char], code.split(""));
  });

  const notHere = R.difference(["a", "b", "c", "d", "e", "f", "g"], pl);
  notHere.forEach((char) => {
    wireMap[char] = R.difference(wireMap[char], code.split(""));
  });
};

const allLetters = ["a", "b", "c", "d", "e", "f", "g"];

const decodeLine = ({ uniquePatterns, output }) => {
  const one = uniquePatterns.find((digit) => digit.length === 2);
  const four = uniquePatterns.find((digit) => digit.length === 4);
  const seven = uniquePatterns.find((digit) => digit.length === 3);

  const wireMap = {
    a: allLetters,
    b: allLetters,
    c: allLetters,
    d: allLetters,
    e: allLetters,
    f: allLetters,
    g: allLetters,
  };

  pushDigit(wireMap, "acf", seven);
  pushDigit(wireMap, "cf", one);
  pushDigit(wireMap, "bcdf", four);

  const sixOrNineOrZero = uniquePatterns.filter((digit) => digit.length === 6);
  const notSixOrNineOrZero = [
    R.difference(allLetters, sixOrNineOrZero[0])[0],
    R.difference(allLetters, sixOrNineOrZero[1])[0],
    R.difference(allLetters, sixOrNineOrZero[2])[0],
  ].join("");
  pushDigit(wireMap, "ced", notSixOrNineOrZero);

  const wireMapByCode = R.invertObj(R.map((v) => v[0], wireMap));

  const decodedOutput = output
    .map((n) => {
      const result = n
        .split("")
        .map((v) => wireMapByCode[v])
        .sort()
        .join("");
      const d = digitsByCode[result];
      if (d == null) {
        throw new Error(`Could not decode ${n} (attempt to find ${result})`);
      }
      return d;
    })
    .join("");
  return parseInt(decodedOutput);
};

export const runChallengeB = (input) => {
  return R.sum(input.map(decodeLine));
};

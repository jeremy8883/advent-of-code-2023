import R from "ramda";

export const parseInput = (str) => {
  return str.split("\n");
};

const patterns = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
}

export const runChallengeA = (lines) => {
  console.log("TODO");
};

const parseResult = (result) => {
  const pattern = Object.entries(patterns)
    .find(([regex, val]) => result.match(new RegExp(regex)))
  return pattern ? pattern[1] : result;
}

export const runChallengeB = (lines) => {
  return R.pipe(
    R.map((line) => {
      const regexH = new RegExp(`(${Object.keys(patterns).join("|")})|\\d`, "g");
      const matchesH = line.match(regexH)
      const numberH = parseResult(R.head(matchesH));

      const regexT = new RegExp(`(${Object.keys(patterns).map(R.reverse).join("|")}|\\d)`, "g");
      const matchesT = R.reverse(line).match(regexT);
      const numberT = parseResult(R.reverse(R.head(matchesT)));

      return parseInt(`${numberH}${numberT}`);
    }),
    R.sum,
  )(lines)
}

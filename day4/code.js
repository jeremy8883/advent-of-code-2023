import R from "ramda";

export const parseInput = (str) =>
  str.split("\n").map((line) => {
    const [winningNums, cardNums] = line.replace(/Card \d: /, "").split(" | ");
    return {
      winningNums: winningNums.split(" ").filter(Boolean),
      cardNums: cardNums.split(" ").filter(Boolean),
    };
  });

export const runChallengeA = (input) => {
  return R.pipe(
    R.map(({ winningNums, cardNums }) => R.intersection(winningNums, cardNums)),
    R.filter((matches) => matches.length > 0),
    R.map((matches) => Math.pow(2, matches.length - 1)),
    R.sum
  )(input);
};

export const runChallengeB = (input) => {
  const result = "TODO";
  return result;
};

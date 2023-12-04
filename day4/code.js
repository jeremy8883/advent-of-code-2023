import R from "ramda";

export const parseInput = (str) =>
  str.split("\n").map((line) => {
    const [winningNums, cardNums] = line.replace(/Card \d: /, "").split(" | ");
    return {
      winningNums: winningNums.split(" ").filter(Boolean),
      cardNums: cardNums.split(" ").filter(Boolean),
    };
  });

export const runChallengeA = R.pipe(
  R.map(({ winningNums, cardNums }) => R.intersection(winningNums, cardNums)),
  R.filter((matches) => matches.length > 0),
  R.map((matches) => Math.pow(2, matches.length - 1)),
  R.sum
);

export const runChallengeB = (input) => {
  let cache = {};
  return input
    .map(
      ({ winningNums, cardNums }) =>
        R.intersection(winningNums, cardNums).length
    )
    .reverse()
    .reduce((acc, count, i) => {
      const thisScore =
        1 + R.range(i - count, i).reduce((acc, j) => acc + cache[j], 0);
      cache[i] = thisScore;
      return acc + thisScore;
    }, 0);
};

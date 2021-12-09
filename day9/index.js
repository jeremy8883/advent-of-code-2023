const R = require("ramda");
const { runChallengeA, runChallengeB, parseInput } = require("./code");
const { readInput } = require("../utils/readInput");

const main = async () => {
  const str = await readInput("day9/input.txt");
  const input = parseInput(str);

  const resultA = runChallengeA(input);
  console.log(JSON.stringify(resultA));

  const resultB = runChallengeB(input);
  console.log(JSON.stringify(resultB));
};

main();

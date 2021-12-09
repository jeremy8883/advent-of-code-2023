const R = require("ramda");
const { runChallengeA, runChallengeB } = require("./code");
const { readInput } = require("../utils/readInput");

const main = async () => {
  const lines = (await readInput("day6/input.txt")).split("\n");
  const input = lines[0].split(",").map(Number);

  const resultA = runChallengeA(input, 80);
  console.log(JSON.stringify(resultA));

  const resultB = runChallengeB(input, 256);
  console.log(JSON.stringify(resultB));
};

main();

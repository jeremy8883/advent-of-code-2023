const R = require("ramda");
const { runChallengeA, runChallengeB } = require("./code");
const { readInput } = require("../utils/readInput");

const main = async () => {
  const lines = await readInput("day8/input.txt");
  const input = lines.split("\n").map((l) => {
    const [uniquePatterns, output] = l.split(" | ");
    return {
      uniquePatterns: uniquePatterns.split(" "),
      output: output.split(" "),
    };
  });

  const resultA = runChallengeA(input);
  console.log(JSON.stringify(resultA));

  const resultB = runChallengeB(input);
  console.log(JSON.stringify(resultB));
};

main();

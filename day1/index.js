import { runChallengeA, runChallengeB, parseInput } from "./code.js";
import { readInput } from "../utils/readInput.js";

const main = async () => {
  const lines = (await readInput("day20/input.txt"));
  const input = parseInput(lines);

  const resultA = runChallengeA(input);
  console.log(JSON.stringify(resultA));

  const resultB = runChallengeB(input);
  console.log(JSON.stringify(resultB));
};

main();

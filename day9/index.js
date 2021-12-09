import { parseInput, runChallengeA, runChallengeB } from "./code.js";
import { readInput } from "../utils/readInput.js";

const main = async () => {
  const str = await readInput("day9/input.txt");
  const input = parseInput(str);

  const resultA = runChallengeA(input);
  console.log(JSON.stringify(resultA));

  const resultB = runChallengeB(input);
  console.log(JSON.stringify(resultB));
};

main();

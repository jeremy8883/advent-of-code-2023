import { runChallengeA, runChallengeB } from "./code.js";
import { readInput } from "../utils/readInput.js";

const main = async () => {
  const lines = await readInput("day7/input.txt");
  const input = lines.split(",");

  const resultA = runChallengeA(input);
  console.log(JSON.stringify(resultA));

  const resultB = runChallengeB(input);
  console.log(JSON.stringify(resultB));
};

main();

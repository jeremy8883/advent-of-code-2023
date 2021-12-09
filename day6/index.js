import { runChallengeA, runChallengeB } from "./code.js";
import { readInput } from "../utils/readInput.js";

const main = async () => {
  const lines = (await readInput("day6/input.txt")).split("\n");
  const input = lines[0].split(",").map(Number);

  const resultA = runChallengeA(input, 80);
  console.log(JSON.stringify(resultA));

  const resultB = runChallengeB(input, 256);
  console.log(JSON.stringify(resultB));
};

main();

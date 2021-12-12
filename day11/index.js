import R from "ramda";
import { runChallengeA, runChallengeB, parseInput } from "./code.js";
import { readInput } from "../utils/readInput.js";

const main = async () => {
  const lines = await readInput("day11/input.txt");
  const input = parseInput(lines);

  const resultA = runChallengeA(input, 100);
  console.log(JSON.stringify(resultA));

  const resultB = runChallengeB(input, 1000);
  console.log(JSON.stringify(resultB));
};

main();

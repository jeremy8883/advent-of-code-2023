import R from "ramda";
import {
  runChallengeA,
  runChallengeB,
  parseInput,
  parseInputB,
} from "./code.js";
import { readInput } from "../utils/readInput.js";

const main = async () => {
  const lines = await readInput("day6/input.txt");

  const resultA = runChallengeA(parseInput(lines));
  console.log(JSON.stringify(resultA));

  const resultB = runChallengeB(parseInputB(lines));
  console.log(JSON.stringify(resultB));
};

main();

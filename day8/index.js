import R from "ramda";
import { runChallengeA, runChallengeB } from "./code.js";
import { readInput } from "../utils/readInput.js";

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

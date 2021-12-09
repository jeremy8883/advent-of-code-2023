import {
  getIncreasedCount,
  getSlidingWindowIncreasedCount,
} from "./getIncreasedCount.js";
import { readInput } from "../utils/readInput.js";

const main = async () => {
  const input = await readInput("day1/input.txt");
  const readings = input.split("\n").map(Number);

  console.log("A: " + getIncreasedCount(readings));
  console.log("B: " + getSlidingWindowIncreasedCount(readings));
};

main();

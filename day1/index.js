const {
  getIncreasedCount,
  getSlidingWindowIncreasedCount,
} = require("./getIncreasedCount");
const { readInput } = require("../utils/readInput");

const main = async () => {
  const input = await readInput("day1/input.txt");
  const readings = input.map(Number);

  console.log("A: " + getIncreasedCount(readings));
  console.log("B: " + getSlidingWindowIncreasedCount(readings));
};

main();

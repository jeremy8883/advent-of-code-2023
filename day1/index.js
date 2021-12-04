const {
  getIncreasedCount,
  getSlidingWindowIncreasedCount,
} = require("./getIncreasedCount");
const { readFile } = require("fs").promises;

const main = async () => {
  const input = await readFile("day1/input.txt");
  const readings = input.toString().split("\n").map(Number);

  console.log("A: " + getIncreasedCount(readings));
  console.log("B: " + getSlidingWindowIncreasedCount(readings));
};

main();

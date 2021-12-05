const R = require("ramda");
const { getClouds } = require("./getClouds");
const { readInput } = require("../utils/readInput");

const main = async () => {
  const lines = await readInput("day5/input.txt");
  const vectors = lines.map((line) =>
    line.split(" -> ").map((value) => value.split(",").map((v) => parseInt(v)))
  );

  const result = getClouds(vectors);
  console.log(JSON.stringify(result));
};

main();

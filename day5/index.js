import { readInput } from "../utils/readInput.js";
import { getClouds, getCloudsWithDiagonals } from "./getClouds.js";

const main = async () => {
  const lines = (await readInput("day5/input.txt")).split("\n");
  const vectors = lines.map((line) =>
    line.split(" -> ").map((value) => value.split(",").map((v) => parseInt(v)))
  );

  const result = getClouds(vectors);
  console.log(JSON.stringify(result));

  const resultD = getCloudsWithDiagonals(vectors);
  console.log(JSON.stringify(resultD));
};

main();

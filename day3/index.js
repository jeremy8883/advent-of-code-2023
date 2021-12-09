import { decodeDiagnostics, decodeLifeSupport } from "./decodeDiagnostics.js";
import { readInput } from "../utils/readInput.js";

const main = async () => {
  const diagnostics = (await readInput("day3/input.txt")).split("\n");

  const decoded = decodeDiagnostics(diagnostics);
  console.log(JSON.stringify(decoded));

  const lifeSupport = decodeLifeSupport(diagnostics);
  console.log(JSON.stringify(lifeSupport));
};

main();
